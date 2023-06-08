import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const commentRouter = router({
  getVideoComments: publicProcedure
    .input(z.object({ videoId: z.string() }))
    .query(({ ctx, input }) => {
      const { videoId } = input;

      return ctx.prisma.comment.findMany({
        where: {
          videoId,
        },
        // To customize the result: Use include to explicitly include relations
        include: {
          author: true,
        },
      });
    }),

  createComment: publicProcedure
    .input(z.object({ videoId: z.string(), text: z.string() }))
    .mutation(({ ctx, input }) => {
      const { text, videoId } = input;
      const userId = ctx?.session?.user?.id;

      return ctx.prisma.comment.create({
        data: {
          text,
          // connects that record (connect) to User
          author: {
            connect: {
              id: userId as string,
            },
          },
          videoId,
        },
      });
    }),
});
