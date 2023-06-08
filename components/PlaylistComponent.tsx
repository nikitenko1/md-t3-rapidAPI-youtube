import Image from "next/legacy/image";
import Link from "next/link";
import React from "react";
import { MdPlaylistPlay } from "react-icons/md";
import { PlaylistWithPayload } from "types";

const PlaylistComponent = ({ playlist }: { playlist: PlaylistWithPayload }) => {
  return (
    <div className="relative">
      <Link href={`/watch?v=${playlist.saved[0].videoId}&list=${playlist.id}`}>
        <div className="flex cursor-pointer flex-col space-y-2">
          <div className="relative">
            <Image
              src={playlist?.saved[0].thumbnail}
              width={320}
              height={180}
              className="rounded-xl"
              alt=""
            />
            <div className="absolute bottom-0 right-0 top-0 grid w-1/3 place-items-center bg-neutral-900 opacity-75">
              <div className="flex flex-col items-center gap-y-2 text-white">
                <p className="text-lg">{playlist.saved.length}</p>

                <MdPlaylistPlay className="text-3xl" />
              </div>
            </div>
            <p className="text-white">{playlist.title}</p>
            <p className="font-semibold text-gray-400">VIEW FULL PLAYLIST</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PlaylistComponent;
