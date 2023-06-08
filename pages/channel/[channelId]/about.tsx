import { useRouter } from "next/router";
import useChannelDetails from "hooks/useChannelDetails";
import { v4 } from "uuid";
import Body from "components/Body";
import ChannelWrapper from "components/ChannelWrapper";

const AboutPage = () => {
  const router = useRouter();
  const { channelId } = router.query;
  const {
    data: channel,
    loading,
    error,
  } = useChannelDetails(`?id=${channelId}`);

  console.log(channel);

  return (
    <Body>
      <ChannelWrapper>
        <div className="flex justify-between px-4 py-6">
          <div className="w-2/3 divide-y divide-zinc-600">
            <div className="pb-4">
              <p className="text-lg text-white">Description</p>
              {/* description:"WWE on YouTube is your number one spot to ... */}
              <p className="mt-4 text-sm text-white">{channel?.description}</p>
            </div>
            <div className="py-4">
              <p className="text-lg text-white">Details</p>
              <p className="text-sm text-gray-400">
                {/* country:null */}
                Location: {channel?.country}
              </p>
            </div>
            <div className="grid grid-cols-4 pt-4">
              {channel?.links.map((link: any) => (
                <a
                  // targetUrl:"https://www.peacocktv.com/sports...
                  href={link.targetUrl}
                  key={v4()}
                  className="text-sm text-blue-500"
                >
                  {/* title:"WWE on Peacock" */}
                  {link.title}
                </a>
              ))}
            </div>
          </div>
          <div className="w-1/4 divide-y divide-zinc-600 text-white">
            <div className="py-2">Stats</div>
            {/* joinedDateText:"Joined May 10, 2007" */}
            <p className="py-2">{channel?.joinedDateText}</p>
            {/* views:69263586611 */}
            <p className="py-2">{channel?.stats.views} views</p>
          </div>
        </div>
      </ChannelWrapper>
    </Body>
  );
};

export default AboutPage;
