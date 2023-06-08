import React, { useState } from "react";
import { useRouter } from "next/router";
import useChannelVideos from "hooks/useChannelVideos";
import { IVideo } from "interface";
import { BsFilterLeft } from "react-icons/bs";
import { v4 } from "uuid";
import Body from "components/Body";
import ChannelWrapper from "components/ChannelWrapper";
import VideoSnippet from "components/VideoSnippet";

const ChannelVideos = () => {
  const router = useRouter();

  const { channelId } = router.query;
  const [filtering, setFiltering] = useState<string>("");

  const { data: channelVideos } = useChannelVideos(
    filtering === ""
      ? `?id=${channelId}`
      : `?id=${channelId}&filter=${filtering}`
  );

  const [openSortBy, setOpenSortBy] = useState<boolean>(false);

  return (
    <Body>
      <ChannelWrapper>
        <button
          onClick={() => setOpenSortBy(!openSortBy)}
          className="relative ml-auto mt-3 flex items-center gap-x-2 font-semibold text-white"
        >
          <BsFilterLeft className="text-2xl text-white" />
          <span>SORT BY</span>
          {openSortBy && (
            <div
              className="absolute right-0 top-full z-50 flex w-44 flex-col items-start 
            rounded-sm bg-neutral-800 p-2 text-sm text-white"
            >
              <p
                className="w-full p-2 text-left hover:bg-gray-400"
                onClick={() => setFiltering("uploads_popular")}
              >
                Most popular
              </p>
              <p
                className="w-full p-2 text-left hover:bg-gray-400"
                onClick={() => setFiltering("uploads_latest")}
              >
                Date added(newest)
              </p>
              <p
                className="w-full p-2 text-left hover:bg-gray-400"
                onClick={() => setFiltering("uploads_oldest")}
              >
                Date added(oldest)
              </p>
            </div>
          )}
        </button>

        <div className="mt-4 grid grid-cols-5 gap-x-2 gap-y-4 bg-black p-4">
          {channelVideos?.contents.map((video: IVideo) => (
            <VideoSnippet video={video} column={true} key={v4()} />
          ))}
        </div>
      </ChannelWrapper>
    </Body>
  );
};

export default ChannelVideos;
