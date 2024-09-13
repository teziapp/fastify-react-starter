import { TRPCError, initTRPC } from "@trpc/server";
import { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";
import z from "zod";
import { USER_TOKEN } from "./auth/cookies";
import { env } from "./configs/env.config";
import { parseToken } from "./auth/create-token";

const userValidator = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  isVerified: z.boolean(),
  profilePicture: z.string().optional(),
  exp: z.number()
})

export const trpcContext =
  ({ req, res }: CreateFastifyContextOptions) => {
    const userToken = req.cookies && req.cookies[USER_TOKEN];
    const user = parseToken({
      secret: env.JWT_SECRET,
      token: userToken,
      validator: userValidator,
    });

    return { req, res, user };
  };

export type TrpcContext = Awaited<ReturnType<typeof trpcContext>>;

export const t = initTRPC.context<TrpcContext>().create();

const isAuthed = t.middleware(async ({ next, ctx }) => {
	if (ctx.user) {
		const currentTimestamp = Math.floor(Date.now() / 1000);

		if (ctx.user.exp < currentTimestamp) {
			throw new TRPCError({
				code: "UNAUTHORIZED",
				message: "Session has expired",
			});
		}
		return next({
			ctx: {
				...ctx,
				user: ctx.user,
			},
		});
	} else {
		throw new TRPCError({
			code: "UNAUTHORIZED",
			message: "Unauthorized User",
		});
	}
});


export const trpcMiddleware = t.middleware;
export const protectedProcedure = t.procedure.use(isAuthed);
export const publicProcedure = t.procedure;
export const adminProcedure = t.procedure.use(isAuthed);
export const router = t.router;
