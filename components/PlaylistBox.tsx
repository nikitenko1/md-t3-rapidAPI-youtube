import { SavedVideo } from "@prisma/client";
import Image from "next/legacy/image";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";
import { PlaylistWithPayload } from "types";
import { v4 } from "uuid";

const PlaylistBox = ({ playlist }: { playlist: PlaylistWithPayload }) => {
  return (
    <div className="mb-4 overflow-hidden rounded-xl border border-gray-400">
      <div className="bg-neutral-800 p-4">
        {/* title:"Today's Hits Clean 2022 - Clean Songs Playlist - Clean Music 2022" */}
        <h1 className="text-lg font-bold text-white">{playlist?.title}</h1>
        <p className="text-sm text-white">{playlist?.user?.name}</p>
      </div>
      <div className="space-y-4 px-1 py-4">
        {playlist?.saved.map((video, i) => (
          <PlaylistVideo video={video} index={i} key={v4()} />
        ))}
      </div>
    </div>
  );
};

export default PlaylistBox;

interface IProps {
  index: number;
  video: SavedVideo;
}

const PlaylistVideo = ({ index, video }: IProps) => {
  const router = useRouter();

  const { query } = router;

  return (
    <Link
      href={{
        pathname: router.pathname,
        query: { ...query, v: video.videoId },
      }}
      className="flex items-start gap-x-2"
    >
      <span className="hidden text-gray-500 md:flex">{index + 1}</span>
      <div className="relative h-20 w-1/3">
        <Image
          // thumbnail         String
          src={video.thumbnail}
          objectFit="cover"
          layout="fill"
          className="rounded-xl"
          alt="thumbnail"
        />
      </div>
      <div>
        {/* title String */}
        <p className="text-sm text-white md:text-base">{video.title}</p>
        {/* authorTitle String */}
        <p className="text-xs text-gray-500 md:text-sm">{video.authorTitle}</p>
      </div>
    </Link>
  );
};
