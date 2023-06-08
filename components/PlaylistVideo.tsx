import Image from "next/legacy/image";
import Link from "next/link";
import { IPlaylistVideo } from "../interface";
import NoImage from "public/no-image.png";

interface IProps {
  playlist: IPlaylistVideo;
}
const PlaylistVideo = ({ playlist }: IProps) => {
  return (
    <div>
      <div className="relative flex items-center gap-x-4">
        {playlist.playlist.thumbnails !== null ? (
          <Image
            //   url:"https://i.ytimg.com/vi/mRD0-GxqHVo/hqdefaul
            src={playlist?.playlist?.thumbnails[3].url ?? NoImage}
            // height:138
            height={playlist?.playlist?.thumbnails[3].height}
            // width:246
            width={playlist?.playlist?.thumbnails[3].width}
            alt="playlist"
          />
        ) : (
          <Image src={NoImage} height={150} width={200} alt="playlist" />
        )}
        <div>
          {/* title:"Today's Hits Clean 2022 - Clean Songs Playlist - Clean Music 2022" */}
          <h1 className="text-lg text-white">{playlist.playlist.title}</h1>
          {/* channelId:"UC6LgzwM4TqzlkX5AuwOe-ag" */}
          <Link href={`/channel/${playlist.playlist.author.channelId}/feature`}>
            <p className="cursor-pointer text-sm text-gray-400">
              {/* title:"Roses are Red" */}
              {playlist.playlist.author.title}
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PlaylistVideo;
