import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/legacy/image";
import useChannelDetails from "hooks/useChannelDetails";
import useMediaQuery from "hooks/useMediaQuery";
import NoImage from "public/no-image.png";
import Avatar from "./Avatar";

interface IProps {
  children: React.ReactNode;
}

const ChannelWrapper = ({ children }: IProps) => {
  const router = useRouter();
  const { channelId } = router.query;
  const isNotMobile = useMediaQuery("(min-width:768px)");

  const {
    data: channel,
    loading,
    error,
  } = useChannelDetails(`?id=${channelId}`);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      {channel !== null && (
        <div>
          {channel.banner.desktop !== null ? (
            <Image
              alt="thumbnail"
              //   url:"https://yt3.ggpht.com/_qUjnd6iV...
              src={channel?.banner.desktop[0].url}
              //   height:283
              height={channel?.banner.desktop[2].height}
              //   width:1707
              width={channel?.banner.desktop[2].width}
            />
          ) : (
            <Image alt="thumbnail" src={NoImage} height={150} width={200} />
          )}

          <div className="mt-4 flex items-center justify-between px-8">
            <div className="flex flex-col items-start gap-x-4 md:flex-row md:items-center">
              <Avatar
                //   url:"https://yt3.ggpht.com/ytc/AKedOLQhW5...
                src={channel?.avatar[1].url}
                height={
                  isNotMobile
                    ? //   height:88
                      channel?.avatar[1].height
                    : //   height:48
                      channel?.avatar[0].height
                }
                width={
                  // width:88 width:48
                  isNotMobile
                    ? channel?.avatar[1].width
                    : channel?.avatar[0].width
                }
              />
              <div>
                {/* title:"WWE" */}
                <p className="text-base text-white md:text-lg">
                  {channel?.title}
                </p>
                <p className="text-xs text-gray-400 md:text-sm">
                  {/* subscribersText:"88.9M subscribers" */}
                  {channel?.stats.subscribersText}
                </p>
              </div>
            </div>
            <button className="rounded-sm bg-[#c91515] px-4 py-2 text-sm font-semibold text-white">
              SUBSCRIBE
            </button>
          </div>
          <ul
            className="mt-4 flex flex-wrap items-center justify-around gap-2 
      text-xs font-semibold text-white sm:text-sm md:gap-4 md:text-base"
          >
            <li
              className={` text-gray-400 ${
                router.pathname.includes("/feature")
                  ? "border-b-2 font-semibold text-white"
                  : null
              }`}
            >
              <Link
                href={`/channel/${channelId}/feature`}
                as={`/channel/${channelId}/feature`}
              >
                HOME
              </Link>
            </li>
            <li
              className={` text-gray-400 ${
                router.pathname.includes("/videos")
                  ? "border-b-2 font-semibold text-white"
                  : null
              }`}
            >
              <Link
                href={`/channel/${channelId}/videos`}
                as={`/channel/${channelId}/videos`}
              >
                VIDEOS
              </Link>
            </li>
            <li
              className={` text-gray-400 ${
                router.pathname.includes("/playlists")
                  ? "border-b-2 font-semibold text-white"
                  : null
              }`}
            >
              <Link
                href={`/channel/${channelId}/playlists`}
                as={`/channel/${channelId}/playlists`}
              >
                PLAYLISTS
              </Link>
            </li>
            <li
              className={` text-gray-400 ${
                router.pathname.includes("/channels")
                  ? "border-b-2 font-semibold text-white"
                  : null
              }`}
            >
              <Link
                href={`/channel/${channelId}/channels`}
                as={`/channel/${channelId}/channels`}
              >
                CHANNELS
              </Link>
            </li>
            <li
              className={` text-gray-400 ${
                router.pathname.includes("/about")
                  ? "border-b-2 font-semibold text-white"
                  : null
              }`}
            >
              <Link
                href={`/channel/${channelId}/about`}
                as={`/channel/${channelId}/about`}
              >
                ABOUT
              </Link>
            </li>
          </ul>
          {children}
        </div>
      )}
    </>
  );
};

export default ChannelWrapper;
