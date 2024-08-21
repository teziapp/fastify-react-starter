import { TRPCError, initTRPC } from "@trpc/server";
import { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";
import z from "zod";
import { USER_TOKEN } from "./auth/cookies";
import { env } from "./configs/env.config";
import { parseToken } from "./auth/create-token";
import { UserSchema } from "@repo/utils";

const userValidator = z.object({
	...UserSchema.shape,
	exp: z.number()
})

export function trpcContext({ req, res }: CreateFastifyContextOptions) {

  let user: z.infer<typeof userValidator> | null = null
		const userToken = req.cookies ? req.cookies[USER_TOKEN] : undefined

		if (userToken) {
			const unsigned =
				env.ENVIRONMENT === 'prod' 
					? req.unsignCookie(userToken)
					: {
							valid: true,
							value: userToken,
						}
			if (unsigned.valid && unsigned.value) {
				try {
					user = parseToken({
						secret: env.JWT_SECRET,
						token: unsigned.value,
						validator: userValidator,
					})
				} catch (error) {
					if (error instanceof Error) {
						req.log.warn(
							`Couldn't parse user token: ${error.message}.\nToken:${unsigned.value}`,
						)
					}
				}
    }
  }

  return { req, res, user };
}

export type TrpcContext = Awaited<ReturnType<typeof trpcContext>>;

export const t = initTRPC.context<TrpcContext>().create();

const isAuthed = t.middleware(async ({ next, ctx }) => {
  try {
      if (ctx.user) {
        const currentTimestamp = Math.floor(Date.now() / 1000);
  
        if (ctx.user.exp < currentTimestamp) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "Session has expired",
          });
        }
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
export const adminProcedure = t.procedure.use(isAuthed);
export const router = t.router;
