import React, { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRecoilState } from "recoil";
import { menuNavState } from "atom/menuNav";
import Link from "next/link";
import Image from "next/legacy/image";
import { AiOutlineMenu } from "react-icons/ai";
import Search from "./Search";
import Avatar from "./Avatar";
import Button from "./Button";
import { GoSearch } from "react-icons/go";
import { BsArrowLeft } from "react-icons/bs";
import useMediaQuery from "hooks/useMediaQuery";

const Header = () => {
  const { data, status } = useSession();
  const [openMobileSearch, setOpenMobileSearch] = useState<boolean>(false);
  const [openMenuNav, setMenuNav] = useRecoilState(menuNavState);

  // Easily retrieve media dimensions with this Hook React which also works onResize.
  const matches = useMediaQuery("(min-width: 500px)");

  useEffect(() => {
    if (matches) {
      setOpenMobileSearch(false);
    } else {
      setOpenMobileSearch(true);
    }
  }, [matches]);

  const handleSignIn = async () => {
    await signIn("github", {
      callbackUrl: "http://localhost:3000",
    });
  };

  const handleSignOut = async () => {
    await signOut({
      callbackUrl: "http://localhost:3000/",
    });
  };
  return (
    <div
      className="fixed right-0 top-0 z-50 flex w-full items-center justify-between bg-neutral-800 
    px-4 py-2"
    >
      <div className="flex items-center gap-x-2">
        <AiOutlineMenu
          className="cursor-pointer text-lg text-white"
          onClick={() => setMenuNav(!openMenuNav)}
        />
        <Link href="/">
          <Image
            alt="logo"
            className="mr-auto cursor-pointer"
            src="/youtube.png"
            width={100}
            height={70}
          />
        </Link>
      </div>
      {matches ? (
        <Search />
      ) : (
        <>
          {openMobileSearch ? (
            <div className="flex items-center gap-x-4">
              <BsArrowLeft
                onClick={() => setOpenMobileSearch(false)}
                className="cursor-pointer text-xl text-white"
              />
              <Search />
            </div>
          ) : (
            <GoSearch
              className="cursor-pointer text-lg text-white"
              onClick={() => setOpenMobileSearch(true)}
            />
          )}
        </>
      )}
      <div className="flex items-center gap-x-2">
        {!openMobileSearch && (
          <Button
            text={status === "authenticated" ? "Sign out" : "Sign In"}
            handleClick={() => {
              status === "authenticated" ? handleSignOut() : handleSignIn();
            }}
          />
        )}
        {status === "authenticated" && (
          <>
            {!openMobileSearch && (
              <Link href="/profile">
                <div>
                  <Avatar
                    src={data?.user?.image ?? ""}
                    width={30}
                    height={30}
                  />
                </div>
              </Link>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
