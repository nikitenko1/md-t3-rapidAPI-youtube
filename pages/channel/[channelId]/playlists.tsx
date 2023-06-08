import { useRouter } from "next/router";
import React from "react";
import useChannelPlaylists from "hooks/useChannelPlaylists";
import { v4 } from "uuid";
import { BsFilterLeft } from "react-icons/bs";
import Body from "components/Body";
import ChannelWrapper from "components/ChannelWrapper";

const PlaylistPage = () => {
  const router = useRouter();
  const { channelId } = router.query;

  const { data, loading, error } = useChannelPlaylists(`?id=${channelId}`);
  return (
    <Body>
      <ChannelWrapper>
        <p className="mt-8 text-lg text-white">Collections</p>
        {data?.collections?.map((item: any) => (
          <div key={v4()} className="text-white">
            <div className="flex items-center gap-x-2 font-semibold">
              <BsFilterLeft className="text-2xl" />
              <span>SORT BY</span>
            </div>

            <p className="mt-4 text-base">{item?.title}</p>
            <p className="mt-4 text-sm">{item?.filter}</p>
          </div>
        ))}
      </ChannelWrapper>
    </Body>
  );
};

export default PlaylistPage;
