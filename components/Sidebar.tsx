import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useRef } from "react";
import { MdHomeFilled } from "react-icons/md";
import { AiFillFire } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { FiLogIn, FiLogOut } from "react-icons/fi";

const Sidebar = () => {
  const sidebarRef = useRef<HTMLDivElement>(null);

  const { status } = useSession();
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
    <aside
      ref={sidebarRef}
      className="fixed bottom-0 left-0 top-0 z-50 flex min-h-screen flex-col gap-y-8 bg-neutral-800 
      px-4 pt-24 text-white"
    >
      <Link as="/" href="/">
        <div className="flex cursor-pointer flex-col items-center">
          <MdHomeFilled className="text-xl" />
          <p className="text-xs">Home</p>
        </div>
      </Link>
      <Link as="/trending" href="/trending">
        <div className="flex cursor-pointer flex-col items-center">
          <AiFillFire className="text-xl" />
          <p className="text-xs">Trending</p>
        </div>
      </Link>
      {status === "authenticated" ? (
        <Link as="/profile" href="/profile">
          <div className="flex cursor-pointer flex-col items-center">
            <FaUser className="text-xl" />
            <p className="text-xs">Profile</p>
          </div>
        </Link>
      ) : null}
      {status === "authenticated" ? (
        <div
          className="flex cursor-pointer flex-col items-center"
          onClick={handleSignOut}
        >
          <FiLogOut className="text-xl" />
          <p className="text-xs">Logout</p>
        </div>
      ) : (
        <div
          className="flex cursor-pointer flex-col items-center"
          onClick={handleSignIn}
        >
          <FiLogIn className="text-xl" />
          <p className="text-xs">Login</p>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
