import { env } from "../configs/env.config"
import { protectedProcedure, publicProcedure, router } from "../context.trpc"
import { db } from "../db/db.config"
import { USER_TOKEN } from "./cookies"

export const authApi = router({
	logout: publicProcedure.mutation(({ ctx }) => {
		ctx.res.clearCookie(USER_TOKEN, {
			httpOnly: true,
			path: '/',
			secure: env.ENVIRONMENT === 'prod',
			signed: env.ENVIRONMENT === 'prod',
		})

		return
	}),
	profile: protectedProcedure.query(async ({ ctx }) => {
		const user = await db.user
			.select(
				"id",
				"name",
				"email",
				"isVerified",
				"profilePicture",
				"lastLoginAt"
			)
			.find(ctx.user?.id);
		return { user };
	}),
})
