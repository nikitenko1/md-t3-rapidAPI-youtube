import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { isPlaylistDialogOpen } from "atom/playlist";
import useSearch from "hooks/useSearch";
import { AiFillFilter } from "react-icons/ai";
import { useRecoilValue } from "recoil";
import { v4 } from "uuid";
import ChannelSnippet from "components/ChannelSnippet";
import SaveToPlaylist from "components/SaveToPlaylist";
import PlaylistVideo from "components/PlaylistVideo";
import SearchSnippet from "components/SearchSnippet";
import Backdrop from "components/Backdrop";
import Body from "components/Body";
import { IChannel, IPlaylistVideo, IVideo } from "interface";

const SearchPage = () => {
  const router = useRouter();
  const { results } = router.query;
  const [cursorToken, setCursorToken] = useState<string>("");
  const [didYouMean, setDidYouMean] = useState<string | null>(null);
  const [filterClicked, setFilterClicked] = useState<boolean>(false);

  const isPlaylistOpen = useRecoilValue(isPlaylistDialogOpen);
  useEffect(() => {
    setCursorToken("");
  }, [router.pathname]);

  const { data, loading, error } = useSearch(
    cursorToken === ""
      ? `?q=${didYouMean ? didYouMean : results}`
      : `?q=${didYouMean ? didYouMean : results}&cursor=${cursorToken}`
  );

  if (error)
    return <p>Something went wrong (might have exceeded api monthly limit)</p>;

  return (
    <Body>
      {isPlaylistOpen && (
        <Backdrop>
          <SaveToPlaylist />
        </Backdrop>
      )}
      <div className="flex flex-col space-y-4  ">
        <button
          onClick={() => setFilterClicked(!filterClicked)}
          className="flex items-center font-semibold text-gray-400"
        >
          <AiFillFilter />
          <span>FILTERS</span>
        </button>
        <div className={` ${filterClicked ? "block" : "hidden"}`}>
          <div className="flex justify-between gap-x-8  ">
            {data?.filterGroups?.map((item: any) => (
              <div key={v4()}>
                <p className="border-b border-gray-400 text-sm font-semibold uppercase text-white">
                  {/* title:"Upload date" */}
                  {item.title}
                </p>
                <div className="cursor-pointer space-y-3 pt-4">
                  {item.filters.map((filter: any) => (
                    <p
                      key={v4()}
                      //   cursorSelect:"ZGVzcGFjaXRvJiYmRWdJSUFRJTNEJTNE"
                      onClick={() => setCursorToken(filter.cursorSelect)}
                      className={`${
                        filter.selected ? "text-white" : "text-gray-400"
                      }  text-sm`}
                    >
                      {/* label:"Last hour" */}
                      {filter.label}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <>
          {data?.didYouMean && (
            <p className="text-white">
              Did you mean{" "}
              <span
                onClick={() => setDidYouMean(data?.didYouMean)}
                className="cursor-pointer font-semibold"
              >
                {/* didYouMean:null */}
                {data?.didYouMean}?
              </span>
            </p>
          )}
        </>
        <div>
          {data?.contents
            .filter((item: IChannel) => item.type === "channel")
            .map((item: IChannel) => (
              <div className="py-6" key={v4()}>
                <ChannelSnippet channel={item} />
              </div>
            ))}
        </div>

        <div className=" flex flex-col gap-y-4">
          {data?.contents
            .filter((item: IVideo) => item.type === "video")
            .map((item: IVideo) => (
              <SearchSnippet video={item} key={v4()} />
            ))}
        </div>
        <div className=" space-y-4">
          {data?.contents
            .filter((item: IVideo) => item.type === "playlist")
            .map((item: IPlaylistVideo) => (
              <PlaylistVideo playlist={item} key={v4()} />
            ))}
        </div>
      </div>
    </Body>
  );
};

export default SearchPage;
