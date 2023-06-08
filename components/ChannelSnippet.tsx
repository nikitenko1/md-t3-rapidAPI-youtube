import React from "react";
import Link from "next/link";
import Image from "next/legacy/image";
import { IChannel } from "interface";

interface IProps {
  channel: IChannel;
}

const ChannelSnippet = ({ channel }: IProps) => {
  return (
    <Link href={`/channel/${channel.channel.channelId}/feature`}>
      <div
        className=" mx-auto flex max-w-4xl cursor-pointer flex-col items-center justify-center 
      gap-x-16 gap-y-4 lg:flex-row"
      >
        <div className="relative h-24 w-24 md:h-32 md:w-32">
          <Image
            //   url:"https://yt3.ggpht.com/8Lwf4LCR2VmxD2JK...
            src={channel.channel.avatar[1].url ?? ""}
            layout="fill"
            objectFit="cover"
            className="rounded-full"
            alt="channel"
          />
        </div>

        <div className="max-w-sm text-center text-sm md:text-base lg:text-start">
          {/* title:"John Cena vs. Batista – full rivalry history: WWE Playlist" */}
          <p className="font-semibold text-white">{channel.channel.title}</p>
          <p className="text-sm text-red-800">
            Length {channel.channel.lengthSeconds} Seconds
          </p>
          <p className="text-sm text-gray-400">
            {/* descriptionSnippet:"Watch the legendary battles and story between John Cena and Batista, ... */}
            {channel.channel.descriptionSnippet}
          </p>
        </div>
        <button className="rounded-sm bg-[#CC00F00] px-4 py-2 font-semibold text-white lg:ml-auto">
          Subscribe
        </button>
      </div>
    </Link>
  );
};

export default ChannelSnippet;
