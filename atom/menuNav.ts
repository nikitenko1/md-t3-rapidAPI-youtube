import { atom, selector } from "recoil";

export const menuNavState = atom({
  key: "menuNavState",
  default: false,
});
// Selectors represent a function, or derived state in Recoil
export const isMenuOpen = selector({
  key: "isMenuOpen", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const isOpen = get(menuNavState);

    return isOpen;
  },
});
