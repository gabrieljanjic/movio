"use client";

import { signoutUser } from "@/lib/actions/userActions";
import Link from "next/link";
import { FiEye } from "react-icons/fi";
import { useState } from "react";
import { IoIosLogOut } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { FaRegHeart } from "react-icons/fa";
import { IoChatboxOutline } from "react-icons/io5";
import { BiLogIn } from "react-icons/bi";

const NavbarProfileDropdown = ({
  user,
}: {
  user: { firstName: string } | null;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      {!user ? (
        <Link href="/login">
          <div className="flex gap-1 items-center">
            <BiLogIn className="text-lg" />
            Login
          </div>
        </Link>
      ) : (
        <div className="relative">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setOpen(!open)}
          >
            <div className="w-8 h-8 rounded-full bg-white text-blue-900 flex items-center justify-center font-bold">
              {user.firstName[0]}
            </div>
            <span>{user.firstName}</span>
          </div>
          {open && (
            <div className="absolute right-0 w-40 mt-2 bg-white flex flex-col z-50 rounded">
              <div className="hover:bg-slate-300 px-4 py-2  hover:rounded-tl hover:rounded-tr">
                <Link href={"/profile"} className="text-black">
                  <div className="flex gap-2 items-center">
                    <CgProfile />
                    Profile
                  </div>
                </Link>
              </div>

              <div className="hover:bg-slate-300 px-4 py-2 border-b border-gray-300">
                <Link href={"/chat"} className="text-black">
                  <div className="flex gap-2 items-center">
                    <IoChatboxOutline />
                    Chat
                  </div>
                </Link>
              </div>
              <div className="hover:bg-slate-300 px-4 py-2">
                <Link href={"/watch-list"} className="text-black">
                  <div className="flex gap-2 items-center">
                    <FiEye />
                    Watch list
                  </div>
                </Link>
              </div>
              <div className="hover:bg-slate-300 px-4 py-2 border-b border-gray-300">
                <Link href={"/favorites"} className="text-black ">
                  <div className="flex gap-2 items-center">
                    <FaRegHeart />
                    Favorites
                  </div>
                </Link>
              </div>
              <div className="hover:bg-slate-300 px-4 py-2 text-left hover:rounded-bl hover:rounded-br">
                <button
                  className="text-red-500 font-semibold"
                  onClick={async () => {
                    await signoutUser();
                  }}
                >
                  <div className="flex gap-2 items-center">
                    <IoIosLogOut />
                    Sign out
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NavbarProfileDropdown;
