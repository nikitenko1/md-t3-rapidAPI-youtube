import React, { useRef } from "react";
import { AiFillClockCircle } from "react-icons/ai";
import { MdPlaylistAdd } from "react-icons/md";
import { useRecoilState } from "recoil";
import { playlistDialogState } from "atom/playlist";
import { videoState } from "atom/video";
import useSaveWatchLater from "hooks/useSaveWatchLater";

interface IProps {
  videoId: string;
  thumbnail: string;
  title: string;
  authorTitle: string;
  publishedTimeText: string;
}
const SaveDialog = ({
  videoId,
  thumbnail,
  title,
  authorTitle,
  publishedTimeText,
}: IProps) => {
  const [openDialog, setOpenDialog] = useRecoilState(playlistDialogState);
  const [saveVideoState, setVideoState] = useRecoilState(videoState);
  const ref = useRef(null);

  const { handleSaveToWatchLater } = useSaveWatchLater();

  const saveVideoObj = {
    videoId,
    thumbnail,
    title,
    authorTitle,
    publishedTimeText,
  };

  return (
    <div className="relative" ref={ref}>
      <div className="absolute  -right-8 top-full z-50 w-72 space-y-4 rounded-lg bg-zinc-800 py-2 text-white">
        <button
          className="flex w-full items-center gap-x-3 px-4 py-1 hover:bg-zinc-600"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            handleSaveToWatchLater();
          }}
        >
          <AiFillClockCircle className="text-xl" />
          Save to watch later
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            window.scrollTo(0, 0);
            setOpenDialog(true);
            setVideoState(saveVideoObj);
          }}
          className="flex w-full items-center gap-x-3 px-4 py-1 hover:bg-zinc-500"
        >
          <MdPlaylistAdd className="text-xl" />
          Save to playlist
        </button>
      </div>
    </div>
  );
};

export default SaveDialog;
