import { atom, selector } from "recoil";
import { ISaved } from "../interface";

export const videoState = atom<Omit<ISaved, "id" | "user">>({
  key: "videoState",
  default: {
    title: "",
    authorTitle: "",
    publishedTimeText: "",
    thumbnail: "",
    videoId: "",
  },
});
// Selectors represent a function, or derived state in Recoil
export const videoValue = selector({
  key: "videoValue", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const video = get(videoState);

    return video;
  },
});
