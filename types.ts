import { type Prisma } from "@prisma/client";

// 1: Define a type that includes the relation to `User` && `SavedVideo`
export type PlaylistWithPayload = Prisma.PlaylistGetPayload<{
  include: {
    saved: true;
    user: true;
  };
}>;
// 1: Define a type that includes the relation to `User`
export type CommentWithPayload = Prisma.CommentGetPayload<{
  include: {
    author: true;
  };
}>;
