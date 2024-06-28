import {
  adminProcedure,
  protectedProcedure,
  publicProcedure,
  router,
} from "../context.trpc";

export const userController = router({
  all: adminProcedure.query(() => {
    return {
      name: "All",
    };
  }),
  me: protectedProcedure.query(() => {
    return {
      name: "Me",
    };
  }),
  create: publicProcedure.mutation(({ input, ctx: { req } }) => {
    req.server.log.debug({ input });
    // return db.user.create(input);
  }),
});
