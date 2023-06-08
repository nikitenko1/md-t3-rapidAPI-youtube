import { videoValue } from "atom/video";
import { toast } from "react-hot-toast";
import { useRecoilValue } from "recoil";
import { trpc } from "utils/trpc";

const useSavePlaylist = () => {
  const utils = trpc.useContext();
  const videoState = useRecoilValue(videoValue);

  const { mutateAsync: saveVideo } = trpc.playlist.saveToPlaylist.useMutation({
    // Always refetch after error or success:
    onSettled: () => {
      utils.playlist.playlistDetails.invalidate();
    },
  });

  const { mutateAsync: createAndSaveToPlaylist } =
    trpc.playlist.createAndSaveToPlaylist.useMutation({
      // Always refetch after error or success:
      onSettled: () => {
        utils.playlist.userPlaylists.invalidate();
      },
    });

  const handleSaveToPlaylist = async (playlistId: string) => {
    const data = {
      ...videoState,
      playlistId,
    };
    await toast.promise(saveVideo(data), {
      loading: "Saving to playlist",
      error: (err) => `Oops... something went wrong ${err}`,
      success: () => "Saved to playlist",
    });
  };

  const handleCreateandSavetoPlaylist = async (
    playlistName: string,
    privacy: string
  ) => {
    const data = {
      ...videoState,
      playlistName,
      privacy,
    };
    await toast.promise(createAndSaveToPlaylist(data), {
      loading: "Creating playlist",
      error: (err) => `Oops... something went wrong ${err}`,
      success: () => "Saved to playlist",
    });
  };

  return { handleSaveToPlaylist, handleCreateandSavetoPlaylist };
};

export default useSavePlaylist;
