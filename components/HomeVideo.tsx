import React from "react";
import nFormatter from "../helper/convertion";
import { IVideo } from "../interface";
import toHHMS from "helper/toHHMS";

interface IProps {
  video: IVideo;
}

const HomeVideo = ({ video }: IProps) => {
  return (
    <div className="flex w-full flex-col gap-4 md:flex-row">
      <iframe
        height={300}
        className="w-full flex-[0.5] rounded-xl"
        src={`https://www.youtube.com/embed/${video.video.videoId}`}
      ></iframe>
      <div className="flex-[0.5] space-y-4">
        {/* title:"Brie Bella vs. Nikki Bella: Hell in a Cell 2014" */}
        <p className="text-white">{video.video.title}</p>
        <div className="flex items-center gap-x-2 text-sm text-gray-500">
          {/* views:7555 */}
          <p>{nFormatter(video.video.stats.views)} Views</p>
          {/* ublishedTimeText:"13 minutes ago" */}
          <p>{video.video.publishedTimeText}</p>
        </div>
        <p className="text-gray-500">
          Length {toHHMS(video.video.lengthSeconds?.toString())}
        </p>
      </div>
    </div>
  );
};

export default HomeVideo;
