import React, { useRef, useState } from "react";
import { MdClose } from "react-icons/md";
import { playlistDialogState } from "../atom/playlist";
import { useRecoilState } from "recoil";
import { BsGlobe, BsLockFill, BsPlusLg } from "react-icons/bs";
import { v4 } from "uuid";
import { trpc } from "utils/trpc";
import useSavePlaylist from "hooks/useSavePlaylist";
import useOutsideClick from "hooks/useOutsideClick";

const SaveToPlaylist = () => {
  const ref = useRef(null);
  const [openPlaylist, setOpenPlaylist] = useRecoilState(playlistDialogState);

  const { data: userPlaylists } = trpc.playlist.userPlaylists.useQuery();

  useOutsideClick(ref, () => {
    setOpenPlaylist(false);
  });

  const [showPlaylistForm, setShowPlaylistForm] = useState<boolean>(false);
  const [playlistName, setPlaylistName] = useState<string>("");
  const [privacy, setPrivacy] = useState<string>("public");

  const { handleSaveToPlaylist, handleCreateandSavetoPlaylist } =
    useSavePlaylist();

  const createPlaylistAndSaveVideo = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    handleCreateandSavetoPlaylist(playlistName, privacy);

    setOpenPlaylist(false);
  };
  return (
    <div
      ref={ref}
      className=" relative z-[99999] min-w-fit  divide-y divide-zinc-600 bg-zinc-800 py-2 text-white"
    >
      <header className="flex items-center justify-between px-4 py-2">
        <p>Save to...</p>
        <MdClose className="text-lg" onClick={() => setOpenPlaylist(false)} />
      </header>
      <div className="flex flex-col ">
        {userPlaylists?.map((playlist) => (
          <div
            key={v4()}
            onClick={() => handleSaveToPlaylist(playlist.id)}
            className="flex cursor-pointer items-center  justify-between gap-x-4 p-3 hover:bg-zinc-600"
          >
            <p>{playlist.title}</p>
            {playlist.privacy === "private" ? <BsLockFill /> : <BsGlobe />}
          </div>
        ))}
      </div>
      <div className="px-4 py-2">
        {showPlaylistForm ? (
          <form
            className="flex flex-col space-y-2"
            onSubmit={createPlaylistAndSaveVideo}
          >
            <div className="flex flex-col ">
              <label htmlFor="name" className="">
                Name
              </label>
              <input
                onChange={(e) => setPlaylistName(e.target.value)}
                name="name"
                type="text"
                placeholder="Enter playlist name..."
                className="border-gray-400 bg-transparent p-1 outline-none focus:border-b"
              />
            </div>
            <div className="flex flex-col ">
              <label htmlFor="privacy">Privacy</label>
              <select
                name="privacy"
                className="bg-transparent outline-none"
                value={privacy}
                onChange={(e) => setPrivacy(e.target.value)}
              >
                <option value="public" className=" bg-zinc-700">
                  Public
                </option>
                <option value="private" className=" bg-zinc-700">
                  Private
                </option>
              </select>
              <button
                type="submit"
                className="self-start bg-transparent px-4 py-2 font-semibold text-blue-500"
              >
                CREATE
              </button>
            </div>
          </form>
        ) : (
          <button
            className="flex items-center gap-x-4 "
            onClick={(e) => {
              e.stopPropagation();
              setShowPlaylistForm(true);
            }}
          >
            <BsPlusLg />
            <p>Create new playlist</p>
          </button>
        )}
      </div>
    </div>
  );
};

export default SaveToPlaylist;
