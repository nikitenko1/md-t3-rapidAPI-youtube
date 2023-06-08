import Link from "next/link";
import { useRouter } from "next/router";
import useChannelChannels from "hooks/useChannelChannels";
import { IChannel } from "interface";
import { v4 } from "uuid";
import Avatar from "components/Avatar";
import Body from "components/Body";
import ChannelWrapper from "components/ChannelWrapper";

const ChannelChannelsPage = () => {
  const router = useRouter();
  const { channelId } = router.query;

  const { data: channelChannels } = useChannelChannels(
    `?id=${channelId}&filter=subscriptions`
  );

  <Body>
    <ChannelWrapper>
      <p className="mt-8 text-lg text-white">Subscriptions</p>
      <div className="grid  grid-cols-1 gap-4 p-8 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {channelChannels?.contents?.map((channel: IChannel) => (
          <Link
            key={v4()}
            href={`/channel/${channel.channel.channelId}/feature`}
          >
            <div className="flex flex-col items-center space-y-2">
              <Avatar
                // url:"https://yt3.ggpht.com/z-V7NoY8nmFQyUNf....
                src={channel.channel.avatar[2].url ?? ""}
                width={88}
                height={88}
              />
              <p className="font-semibold  text-white">
                {/* title:"WWE 2K" */}
                {channel.channel.title}
              </p>
              <p className="text-sm text-gray-400">
                {/* subscribersText:"576K subscribers" */}
                {channel.channel.stats.subscribersText}
              </p>
              <button className=" bg-zinc-800 p-2 font-semibold text-gray-400">
                SUBSCRIBE
              </button>
            </div>
          </Link>
        ))}
      </div>
    </ChannelWrapper>
  </Body>;
};

export default ChannelChannelsPage;
