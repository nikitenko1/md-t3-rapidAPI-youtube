import { atom, selector } from "recoil";

export const playlistDialogState = atom({
  key: "playlistDialogState",
  default: false,
});
// Selectors represent a function, or derived state in Recoil
export const isPlaylistDialogOpen = selector({
  key: "isPlaylistDialogOpen", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const isOpen = get(playlistDialogState);

    return isOpen;
  },
});
