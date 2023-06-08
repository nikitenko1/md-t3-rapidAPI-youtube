import React, { useState } from "react";
import Link from "next/link";
import Image from "next/legacy/image";
import { useSession } from "next-auth/react";
import { AiFillClockCircle } from "react-icons/ai";
import { BiLoaderAlt } from "react-icons/bi";
import { v4 } from "uuid";
import { MdPlaylistPlay } from "react-icons/md";
import { trpc } from "utils/trpc";
import PlaylistComponent from "components/PlaylistComponent";
import Body from "components/Body";
import Avatar from "components/Avatar";

const ProfilePage = () => {
  const { data: userPlaylists, isLoading: userPlaylistsLoading } =
    trpc.playlist.userPlaylists.useQuery();
  const { data: userWatchLaterVideos, isLoading: userWatchLaterVideosLoading } =
    trpc.watchLater.userWatchLater.useQuery();

  const { data: session } = useSession();

  const [showMore, setShowMore] = useState<number>(5);

  return (
    <Body>
      <>
        <div className="flex items-center gap-x-4">
          <Avatar src={session?.user?.image ?? ""} width={80} height={80} />
          <p className="text-xl text-white">{session?.user?.name}</p>
        </div>
        <div>
          <div className="mt-8 flex items-center gap-x-4">
            <AiFillClockCircle className="text-white" />
            <p className=" text-xl text-white">Watch later</p>
          </div>
          <div>
            {userWatchLaterVideosLoading ? (
              <BiLoaderAlt className="animate-spin text-xl text-red-600" />
            ) : null}
            {userWatchLaterVideos?.length === 0 ? (
              <p className="text-lg text-white">No videos saved</p>
            ) : (
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {userWatchLaterVideos?.slice(0, showMore).map((video: any) => (
                  <Link href={`/watch?v=${video.videoId}`} key={v4()}>
                    <div className="flex cursor-pointer flex-col space-y-2">
                      <Image
                        src={video.thumbnail}
                        width={320}
                        height={180}
                        className="rounded-xl"
                        alt="video"
                      />
                      <p className="text-white">{video.title}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-400">
                          {video.authorTitle}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={() => {
              (userWatchLaterVideos?.length as number) < showMore
                ? setShowMore((prev) => prev - 5)
                : setShowMore((prev) => prev + 5);
            }}
            className={`${
              (userWatchLaterVideos?.length as number) <= 5 ? "hidden" : "block"
            } mt-4 border border-blue-500 bg-transparent px-4 py-2 font-semibold uppercase text-white`}
          >
            {(userWatchLaterVideos?.length as number) < showMore
              ? "Show less"
              : "Show more"}
          </button>
        </div>
        <div className="mt-8">
          <div className="flex items-center gap-x-4 text-white">
            <MdPlaylistPlay />
            <h1 className="text-xl">Playlists</h1>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {userPlaylistsLoading ? (
              <BiLoaderAlt className="animate-spin text-xl text-red-600" />
            ) : null}{" "}
            {userPlaylists?.length === 0 ? (
              <p className="text-lg text-white">No playlists created</p>
            ) : (
              <>
                {userPlaylists?.map((playlist) => (
                  <PlaylistComponent key={v4()} playlist={playlist} />
                ))}
              </>
            )}
          </div>
        </div>
      </>
    </Body>
  );
};

export default ProfilePage;
