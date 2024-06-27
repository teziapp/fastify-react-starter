import { TRPCError, initTRPC } from "@trpc/server";
import { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";
import { app } from "./app";

export function trpcContext({ req, res }: CreateFastifyContextOptions) {
  const session = req.cookies.session;
  const user = session?.length ? app.jwt.decode(session) : null;
  return { req, res, session, user };
}

export type TrpcContext = Awaited<ReturnType<typeof trpcContext>>;

export const t = initTRPC.context<TrpcContext>().create();

const isAuthed = t.middleware(async ({ next, ctx }) => {
  try {
    if (ctx.session?.length) {
      return next({
        ctx,
      });
    } else {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Unauthorized User",
      });
    }
  } catch (error) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: error instanceof Error ? error.message : "INTERNAL_SERVER_ERROR",
    });
  }
});

export const trpcMiddleware = t.middleware;
export const protectedProcedure = t.procedure.use(isAuthed);
export const publicProcedure = t.procedure;
export const teziAdminProcedure = t.procedure.use(isAuthed); //.use(isTeziAdmin);
export const router = t.router;
