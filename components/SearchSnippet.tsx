import { videoState } from "atom/video";
import toHHMS from "helper/toHHMS";
import useOutsideClick from "hooks/useOutsideClick";
import { IVideo } from "interface";
import { useSession } from "next-auth/react";
import Image from "next/legacy/image";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import Avatar from "./Avatar";
import MenuHorizontal from "./MenuHorizontal";
import SaveDialog from "./SaveDialog";
import nFormatter from "helper/convertion";

interface IProps {
  video: IVideo;
}

const SearchSnippet = ({ video }: IProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const session = useSession();
  const [_videoState, setVideoState] = useRecoilState(videoState);

  const ref = useRef(null);

  useOutsideClick(ref, () => {
    setDialogOpen(false);
  });

  const saveVideoProps = {
    videoId: video.video.videoId,
    thumbnail: video.video.thumbnails[1]?.url,
    title: video.video.title,
    authorTitle: video.video.author.title,
    publishedTimeText: video.video.publishedTimeText,
  };

  return (
    // videoId:"kJQP7kiw5Fk"
    <Link href={`/watch?v=${video?.video?.videoId}`}>
      <div className="flex cursor-pointer gap-x-3">
        <div className="relative h-24 w-1/2 sm:h-36 md:h-44 md:w-1/3 lg:w-1/4 ">
          <Image
            //   url:"https://i.ytimg.com/vi/kJQP7kiw5Fk/hqdefault.jpg?
            src={video.video.thumbnails[0].url}
            layout="fill"
            className="rounded-xl"
            objectFit="cover"
            alt="video"
          />
          <div className="absolute bottom-2 right-2 rounded-sm bg-black p-1 text-xs text-white opacity-75">
            {/* lengthSeconds:282 */}
            {toHHMS(video.video.lengthSeconds?.toString())}
          </div>
        </div>
        <div className="w-3/4 space-y-1 md:space-y-2">
          <div className="flex items-center justify-between">
            <h1 className="text-ellipsis text-sm text-white sm:text-lg  md:text-xl">
              {/* title:"LuisFonsiVEVO" */}
              {video.video.title}
            </h1>

            {session.status === "authenticated" ? (
              <div
                onClick={(e) => {
                  e.preventDefault();
                  setDialogOpen(!dialogOpen);
                  setVideoState(saveVideoProps);
                }}
              >
                <MenuHorizontal />
                {dialogOpen ? <SaveDialog {...saveVideoProps} /> : null}
              </div>
            ) : null}
          </div>

          <div className="flex items-center gap-x-3 text-xs md:text-sm">
            <p className="text-gray-400">
              {nFormatter(video?.video.stats.views)} views
            </p>
            <p className="text-gray-400">{video?.video.publishedTimeText}</p>
          </div>

          <Link href={`/channel/${video.video.author.channelId}/feature`}>
            <div className="flex items-center gap-x-2">
              <Avatar
                src={video.video.author?.avatar[0].url ?? ""}
                width={30}
                height={30}
              />
              <p className="pt-2 text-xs text-gray-400 hover:text-gray-300 md:text-sm">
                {video.video.author?.title}
              </p>
            </div>
          </Link>

          <p className="hidden pt-3 text-sm text-gray-400 sm:block">
            {video?.video.descriptionSnippet}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default SearchSnippet;
