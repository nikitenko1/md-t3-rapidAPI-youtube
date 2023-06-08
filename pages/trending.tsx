import React, { useState } from "react";
import nFormatter from "helper/convertion";
import useTrending from "hooks/useTrending";
import Image from "next/legacy/image";
import Link from "next/link";
import TrendingLogo from "public/trending_avatar.png";
import { v4 } from "uuid";
import Body from "components/Body";
import { ITrending } from "interface";

interface IProps {
  trending: ITrending;
}
const TrendingVideo = ({ trending }: IProps) => {
  return (
    <Link href={`/watch?v=${trending.videoId}`}>
      <div className="flex w-full cursor-pointer flex-col gap-3 sm:flex-row">
        <div className="relative h-44 w-full sm:w-1/3">
          <Image
            //   url:"https://i.ytimg.com/vi/XhaRYxIbnSI/hqdefault.jpg?
            src={trending.thumbnail[2].url}
            // width:246
            width={trending.thumbnail[1].width}
            // height:138
            height={trending.thumbnail[1].height}
            layout="fill"
            className=" rounded-xl"
            objectFit="cover"
            alt="trending"
          />
        </div>
        <div className="w-2/3">
          {/* title:"Yo Gotti, Moneybagg Yo, 42 Dugg, EST Gee, Mozzy, Blac Youngsta - Steppas [Official Music Video]" */}
          <h1 className="text-base text-white md:text-lg">{trending.title}</h1>
          <div className="flex items-center gap-x-2 text-xs text-gray-400 md:text-sm">
            {/* channelTitle:"MoneyBagg Yo" */}
            <p>{trending.channelTitle}</p>
            {/* viewCount:"1659703" */}
            <p>{nFormatter(parseInt(trending.viewCount))}</p>
            {/* publishedText:"2 days ago" */}
            <p>{trending.publishedText}</p>
          </div>
          <p className="mt-3 text-xs text-gray-400 md:text-base">
            {/* description:"Stream 'Steppas' from the CMG Compilation here: http://CMGTheLabel.lnk.to/Steppas ... */}
            {trending.description}
          </p>
        </div>
      </div>
    </Link>
  );
};

const TrendingPage = () => {
  const trendingTypes = [
    {
      name: "now",
    },
    {
      name: "music",
    },
    {
      name: "gaming",
    },
    {
      name: "movies",
    },
  ];

  const [trendingType, setTrendingType] = useState<string>("now");

  const { data, error, loading } = useTrending(
    `/trending?type=${trendingType}`
  );

  return (
    <Body>
      <div className="flex items-center gap-x-6 py-4">
        <Image
          src={TrendingLogo}
          width={100}
          height={100}
          className="rounded-full"
          alt="TrendingLogo"
        />
        <p className="text-xl text-white">Trending</p>
      </div>
      <nav>
        <ul className="flex items-center gap-x-4 font-semibold text-gray-400 md:gap-x-8 xl:gap-x-16">
          {trendingTypes.map(({ name }) => (
            <li
              key={v4()}
              className={`${
                name === trendingType ? "border-b-2" : ""
              } mb-4 cursor-pointer border-gray-400 text-sm font-semibold uppercase md:text-base`}
              onClick={() => setTrendingType(name)}
            >
              {name}
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex flex-wrap gap-y-4  px-2 py-4">
        {data?.data.map((trending: ITrending) => (
          <TrendingVideo trending={trending} key={v4()} />
        ))}
      </div>
    </Body>
  );
};

export default TrendingPage;
