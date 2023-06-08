import { useRouter } from "next/router";
import useChannelVideos from "hooks/useChannelVideos";
import { v4 } from "uuid";
import Body from "components/Body";
import VideoSnippet from "components/VideoSnippet";
import ChannelWrapper from "components/ChannelWrapper";
import HomeVideo from "components/HomeVideo";
import { IVideo } from "interface";

const ChannelPage = () => {
  const router = useRouter();

  const { channelId } = router.query;

  const { data: channelVideos } = useChannelVideos(`?id=${channelId}`);

  return (
    <Body>
      <ChannelWrapper>
        <div className="mt-4 grid grid-cols-5 gap-x-2 gap-y-4 p-4">
          {channelVideos?.contents.slice(0, 1).map((video: IVideo) => (
            <div className="col-span-5 row-span-3" key={v4()}>
              <HomeVideo video={video} />
            </div>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-skeleton gap-2">
          {channelVideos?.contents
            .slice(1, channelVideos?.contents.length)
            .map((video: IVideo) => (
              <VideoSnippet video={video} column={true} key={v4()} />
            ))}
        </div>
      </ChannelWrapper>
    </Body>
  );
};

export default ChannelPage;
