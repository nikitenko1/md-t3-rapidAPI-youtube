import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const playlistRouter = router({
  userPlaylists: publicProcedure.query(({ ctx }) => {
    const userId = ctx.session?.user?.id;

    // By default, when a query returns records, the result includes the default selection set:
    return ctx.prisma.playlist.findMany({
      where: {
        userId,
      },
      // To customize the result: Use include  to explicitly include relations
      include: {
        saved: true,
        user: true,
      },
    });
  }),

  playlistDetails: publicProcedure
    .input(z.object({ playlistId: z.string() }))
    .query(({ ctx, input }) => {
      const { playlistId } = input;
      // By default, when a query returns records, the result includes the default selection set:
      return ctx.prisma.playlist.findUnique({
        where: {
          id: playlistId as string,
        },
        // To customize the result: Use include  to explicitly include relations
        include: {
          saved: true,
          user: true,
        },
      });
    }),

  createAndSaveToPlaylist: publicProcedure
    .input(
      z.object({
        playlistName: z.string(),
        privacy: z.string(),
        videoId: z.string(),
        thumbnail: z.string(),
        title: z.string(),
        publishedTimeText: z.string(),
        authorTitle: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      const userId = ctx?.session?.user?.id;
      const {
        playlistName,
        privacy,
        videoId,
        thumbnail,
        title,
        publishedTimeText,
        authorTitle,
      } = input;

      return prisma?.playlist.create({
        data: {
          title: playlistName,
          privacy,
          // connects that record (connect) to User
          user: {
            connect: {
              id: userId as string,
            },
          },
          // connects that record (connect) to SavedVideo
          saved: {
            create: {
              user: {
                connect: {
                  id: userId as string,
                },
              },
              videoId,
              thumbnail,
              title,
              publishedTimeText,
              authorTitle,
            },
          },
        },
      });
    }),

  saveToPlaylist: publicProcedure
    .input(
      z.object({
        playlistId: z.string(),
        videoId: z.string(),
        thumbnail: z.string(),
        title: z.string(),
        authorTitle: z.string(),
        publishedTimeText: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      const {
        playlistId,
        videoId,
        thumbnail,
        title,
        authorTitle,
        publishedTimeText,
      } = input;

      const userId = ctx?.session?.user?.id;

      return ctx.prisma.savedVideo.create({
        data: {
          playlist: {
            connect: {
              id: playlistId as string,
            },
          },
          videoId,
          thumbnail,
          title,
          authorTitle,
          publishedTimeText,
          // connects that record (connect) to User
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });
    }),
});
