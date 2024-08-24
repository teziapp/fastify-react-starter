import cookiePlugin from "@fastify/cookie";
import fastifyJwt from "@fastify/jwt";
import {
  FastifyTRPCPluginOptions,
  fastifyTRPCPlugin,
} from "@trpc/server/adapters/fastify";
import fastify from "fastify";
import { env } from "./configs/env.config";
import { logsConfig } from "./configs/logger.config";
import { trpcContext } from "./context.trpc";
import { ApiRouter, trpcRouter } from "./router.trpc";
import { googleAuth } from "./auth/google-auth";
import webpush from 'web-push';
import { PushSubscription } from 'web-push';
import { addSubscription, scheduleFrequentNotification } from './controllers/pushNotifications';


export const app = fastify({
  logger: logsConfig[env.ENVIRONMENT],
  // maxParamLength: 5000,
});

// Declare a route
app.get("/", function (_, reply) {
  reply.send("Hello World!");
});

// Fastify level centralized error handling
app.setErrorHandler(function (error, _request, reply) {
  if (error instanceof fastify.errorCodes.FST_ERR_BAD_STATUS_CODE) {
    // Log error
    this.log.error(error);
    // Send error response
    reply.status(500).send({ ok: false });
  } else {
    // fastify will use parent error handler to handle this
    reply.send(error);
  }
});

app.register(cookiePlugin).register(fastifyJwt, { secret: env.JWT_SECRET as string }).register(googleAuth)

// Configure web-push
webpush.setVapidDetails(
  'mailto:mohit@teziapp.com',
  env.VAPID_PUBLIC_KEY,
  env.VAPID_PRIVATE_KEY
);

// In-memory storage for subscriptions (replace with database in production)
const pushSubscriptions = new Set<PushSubscription>();

// Add push subscription
app.post('/subscribe', async (request, reply) => {
  const subscription = request.body as PushSubscription;
  addSubscription(subscription);
  scheduleFrequentNotification();
  reply.send({ success: true });
});

// Trigger push notification

app.post<{
  Body: { title: string; body: string }
}>('/send-notification', async (request, reply) => {
  const { title, body } = request.body;
  for (const subscription of pushSubscriptions) {
    try {
      await webpush.sendNotification(subscription, JSON.stringify({ title, body }));
    } catch (error) {
      console.error('Error sending notification:', error);
      pushSubscriptions.delete(subscription);
    }
  }
  
  reply.send({ success: true });
});

app.register(fastifyTRPCPlugin, {
  prefix: "/v1",
  trpcOptions: {
    router: trpcRouter,
    createContext: trpcContext,
    // TRPC level centralized error handling
    onError({ path, error }) {
      // report to error monitoring
      console.error(`Error in tRPC handler on path '${path}':`, error);
    },
  } satisfies FastifyTRPCPluginOptions<ApiRouter>["trpcOptions"],
});