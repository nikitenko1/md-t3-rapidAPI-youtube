import { IVideo } from "interface";
import Image from "next/legacy/image";
import Link from "next/link";
import React from "react";
import toHHMS from "helper/toHHMS";
import Avatar from "./Avatar";
import nFormatter from "helper/convertion";

interface IProps {
  video: IVideo;
  column: boolean;
}

const VideoSnippet = ({ video, column }: IProps) => {
  return (
    // videoId:"TyHvyGVs42U"
    <Link href={`/watch?v=${video.video.videoId}`}>
      <div
        className={`${
          column ? "flex-col" : "flex-row"
        } flex cursor-pointer gap-2`}
      >
        <div className="relative">
          <Image
            src={
              // url:"https://i.ytimg.com/vi/TyHvyGVs42U/hqdefault.jpg
              video?.video.thumbnails[3]?.url ?? video?.video.thumbnails[0].url
            }
            // nullish coalescing (??)
            // height:94
            height={
              video?.video.thumbnails[3]?.height ??
              video?.video.thumbnails[0].height
            }
            objectFit="cover"
            // width:168
            width={
              video?.video.thumbnails[3]?.width ??
              video?.video.thumbnails[0].width
            }
            className="w-full rounded-xl"
            alt="thumbnails"
          />
          {/* lengthSeconds:211 */}
          <div className="absolute bottom-2 right-2 rounded-sm bg-black p-1 text-xs text-white opacity-75">
            {toHHMS(video.video.lengthSeconds?.toString())}
          </div>
        </div>
        <div
          className={`${
            column ? "w-full" : " w-1/2"
          } space-y-1 overflow-hidden`}
        >
          {/* title:"Luis Fonsi, Demi Lovato - Échame La Culpa (Video Oficial)" */}
          <h1 className="text-sm text-white  md:text-base">
            {video.video.title}
          </h1>
          {video.video.author && (
            <Link href="/">
              <div className="flex items-center gap-x-2 ">
                <Avatar
                  // url:"https://yt3.ggpht.com/8Lwf4LCR...
                  src={video.video.author?.avatar[0].url ?? ""}
                  width={30}
                  height={30}
                />
                <p className="text-xs text-gray-400 md:text-sm">
                  {/* title:"Luis Fonsi" */}
                  {video.video.author?.title}
                </p>
              </div>
            </Link>
          )}
          <div className="flex items-center gap-x-2 text-xs md:text-sm">
            <p className="text-gray-400">
              {/* views:7870471715 */}
              {nFormatter(video.video.stats.views)} views
            </p>
            {/* publishedTimeText:"4 years ago" */}
            <p className="text-gray-400 ">{video.video.publishedTimeText}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoSnippet;
