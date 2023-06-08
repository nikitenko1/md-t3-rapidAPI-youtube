import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import moment from "moment";
import { FiThumbsDown, FiThumbsUp } from "react-icons/fi";
import { MdPlaylistAdd } from "react-icons/md";
import nFormatter from "helper/convertion";
import { toast } from "react-hot-toast";
import { useRecoilState, useRecoilValue } from "recoil";
import { isPlaylistDialogOpen } from "atom/playlist";
import { videoState } from "atom/video";
import useFetchDetails from "hooks/useFetchDetails";
import useOutsideClick from "hooks/useOutsideClick";
import useVideoComments from "hooks/useVideoComments";
import useFetchRelated from "hooks/useFetchRelated";
import { trpc } from "utils/trpc";
import { v4 } from "uuid";
import Avatar from "components/Avatar";
import SaveDialog from "components/SaveDialog";
import Comment from "components/Comment";
import PlaylistBox from "components/PlaylistBox";
import VideoSnippet from "components/VideoSnippet";
import Body from "components/Body";
import { CommentWithPayload, PlaylistWithPayload } from "types";
import { IVideo } from "interface";

const VideoPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const { v, list } = router.query;
  const { data, loading, error } = useFetchDetails(`?id=${v}`);
  const { comments, handleAddComment } = useVideoComments(v as string);

  const isPlaylistOpen = useRecoilValue(isPlaylistDialogOpen);

  useEffect(() => {
    document.body.style.overflowY = "hidden";
    if (!isPlaylistOpen) {
      document.body.style.overflowY = "visible";
    }
  }, [isPlaylistOpen]);

  const [_videoState, setVideoState] = useRecoilState(videoState);

  const [dialogOpen, setDialogOpen] = useState(false);
  const saveDialogRef = useRef<HTMLDivElement>(null);
  useOutsideClick(saveDialogRef, () => {
    setDialogOpen(false);
  });

  const [textComment, setTextComment] = useState<string>("");
  const commentInputRef = useRef<HTMLInputElement>(null);
  const postComment = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleAddComment(textComment);
    commentInputRef!.current!.value = "";
  };

  const { data: relatedContents, loading: relatedLoading } = useFetchRelated(
    // id: 'kJQP7kiw5Fk',
    `?id=${v}`
  );

  const { data: playlistDetails } = trpc.playlist.playlistDetails.useQuery(
    {
      playlistId: list as string,
    },
    {
      // The query will not execute until the list !exists
      enabled: list !== undefined,
    }
  );

  const saveVideoProps = {
    // videoId:"kJQP7kiw5Fk"
    videoId: data?.videoId as string,
    thumbnail: data?.thumbnails[1].url as string,
    // title:"Luis Fonsi - Despacito ft. Daddy Yankee"
    title: data?.title as string,
    // title:"LuisFonsiVEVO"
    authorTitle: data?.author.title as string,
    // publishedDate:"2017-01-12"
    publishedTimeText: data?.publishedDate as string,
  };

  if (error)
    return <p>Something went wrong (might have exceeded api monthly limit)</p>;

  return (
    <Body>
      <div className="flex flex-col gap-x-6 gap-y-6 lg:flex-row">
        <div className="flex-[0.6] space-y-4">
          <iframe
            height={400}
            className="w-full "
            src={`https://www.youtube.com/embed/${data?.videoId}`}
          ></iframe>
          <p className="text-sm text-blue-500">
            {/* 0:"#LuisFonsi"  1:"#Despacito"  2:"#Imposible"*/}
            {data?.superTitle.items.map((item: string) => item + " ")}
          </p>
          {/* title:"Luis Fonsi - Despacito ft. Daddy Yankee" */}
          <h1 className="text-base text-white lg:text-xl">{data?.title}</h1>
          <div
            className="flex flex-col items-start justify-between gap-y-4 text-sm md:flex-row 
          md:items-center md:text-base"
          >
            <div className="flex items-center gap-x-3 ">
              <p className="text-gray-400 ">
                {/* views:7870471715 */}
                {Number(data?.stats.views).toLocaleString()} views
              </p>
              <p className="text-sm text-gray-400">
                {/* publishedDate:"2017-01-12" */}
                {moment(data?.publishedDate).format("ll")}
              </p>
            </div>
            <div className="flex items-center gap-x-4">
              <div className="flex cursor-pointer items-center gap-x-2">
                <FiThumbsUp className="text-white" />
                <p className="font-semibold text-white">
                  {/* likes:48743781 */}
                  {nFormatter(data?.stats.likes as number)}
                </p>
              </div>
              <div className="flex cursor-pointer items-center gap-x-2">
                <FiThumbsDown className="text-white" />
                <p className="font-semibold text-white">DISLIKE</p>
              </div>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  status === "authenticated"
                    ? setDialogOpen(true)
                    : toast.error("Please login first");
                  setVideoState(saveVideoProps);
                }}
                className="relative flex cursor-pointer items-center gap-x-2"
              >
                <MdPlaylistAdd className="text-lg text-white" />
                <p className="font-semibold text-white">SAVE</p>
                {dialogOpen ? (
                  <div ref={saveDialogRef} className="left-full top-full">
                    <SaveDialog {...saveVideoProps} />
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <Link href={`/channel/${data?.author.channelId}/feature`}>
            <div className="mt-4 flex items-center gap-x-4 ">
              <Avatar
                src={data?.author.avatar[0].url as string}
                width={data?.author.avatar[0].width as number}
                height={data?.author.avatar[0].height as number}
              />
              <p className="cursor-pointer text-sm font-semibold text-white md:text-base">
                {data?.author.title}
              </p>
            </div>
          </Link>
          <p className="text-sm text-white md:text-base ">
            {data?.description}
          </p>
          <div className="hidden lg:block">
            <h1 className="mt-16 text-lg text-white">Comments</h1>
            <div className="mt-4 flex items-center gap-x-2">
              {status === "authenticated" && (
                <Avatar
                  src={session?.user?.image ?? ""}
                  width={30}
                  height={30}
                />
              )}
              <form className="w-full" onSubmit={postComment}>
                <input
                  className="w-full border-b border-gray-600 bg-transparent p-2 text-sm text-white 
                  outline-none focus:border-blue-500"
                  type="text"
                  disabled={status === "unauthenticated"}
                  placeholder={`${
                    status === "authenticated"
                      ? "Add a comment"
                      : "Please login first before comment"
                  }`}
                  onChange={(e) => setTextComment(e.target.value)}
                />
              </form>
            </div>
            <div className="mt-6 space-y-6">
              {comments?.map((comment) => (
                <Comment comment={comment as CommentWithPayload} key={v4()} />
              ))}
            </div>
          </div>
        </div>

        <div className="flex-[0.4] space-y-2">
          {list ? (
            <PlaylistBox playlist={playlistDetails as PlaylistWithPayload} />
          ) : null}
          {relatedContents?.contents
            .filter((item: IVideo) => item.type === "video")
            .map((item: IVideo) => (
              <VideoSnippet column={false} key={v4()} video={item} />
            ))}
        </div>
      </div>
      <div className="lg:hidden">
        <h1 className="mt-16 text-lg text-white">Comments</h1>
        <div className="mt-4 flex items-center gap-x-2">
          {status === "authenticated" && (
            <Avatar src={session?.user?.image ?? ""} width={30} height={30} />
          )}
          <form className="w-full" onSubmit={postComment}>
            <input
              ref={commentInputRef}
              className="w-full border-b border-gray-600 bg-transparent p-2 text-sm text-white
               outline-none focus:border-blue-500"
              type="text"
              disabled={status === "unauthenticated"}
              placeholder={`${
                status === "authenticated"
                  ? "Add a comment"
                  : "Please login first before comment"
              }`}
              onChange={(e) => setTextComment(e.target.value)}
            />
          </form>
        </div>
        <div className="mt-6 space-y-6">
          {comments?.map((comment) => (
            <Comment comment={comment as CommentWithPayload} key={v4()} />
          ))}
        </div>
      </div>
    </Body>
  );
};

export default VideoPage;
