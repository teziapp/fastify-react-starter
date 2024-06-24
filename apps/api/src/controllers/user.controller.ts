import {
  protectedProcedure,
  publicProcedure,
  router,
  teziAdminProcedure,
} from "../context.trpc";

export const userController = router({
  all: teziAdminProcedure.query(() => {
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
