"use client";

import { signoutUser } from "@/lib/actions/userActions";
import Link from "next/link";
import { useState } from "react";
import { FiEye } from "react-icons/fi";
import { IoIosLogOut } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { FaRegHeart } from "react-icons/fa";
import { IoChatboxOutline } from "react-icons/io5";
import { BiLogIn } from "react-icons/bi";
import Image from "next/image";

const NavbarProfileDropdown = ({
  user,
}: {
  user: { firstName: string; userName: string; avatar?: string } | null;
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
            {user.avatar ? (
              <div className="relative w-8 h-8 rounded-full">
                <Image
                  src={user.avatar}
                  alt={user.avatar}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-white text-blue-900 flex items-center justify-center font-bold uppercase">
                {user.firstName[0]}
              </div>
            )}
            <span>{user.firstName}</span>
          </div>
          {open && (
            <div className="absolute right-0 w-40 mt-2 bg-white flex flex-col z-50 rounded">
              <Link
                href={`/user/${user.userName}`}
                className="text-black"
                onClick={() => setOpen(false)}
              >
                <div className="flex gap-2 items-center hover:bg-slate-300 px-4 py-2  hover:rounded-tl hover:rounded-tr">
                  <CgProfile />
                  Profile
                </div>
              </Link>

              <Link
                href={"/chat"}
                className="text-black"
                onClick={() => setOpen(false)}
              >
                <div className="flex gap-2 items-center hover:bg-slate-300 px-4 py-2 border-b border-gray-300">
                  <IoChatboxOutline />
                  Chat
                </div>
              </Link>
              <Link
                href={"/watch-list"}
                className="text-black"
                onClick={() => setOpen(false)}
              >
                <div className="flex gap-2 items-center hover:bg-slate-300 px-4 py-2">
                  <FiEye />
                  Watch list
                </div>
              </Link>
              <Link href={"/favorites"} className="text-black ">
                <div
                  className="flex gap-2 items-center hover:bg-slate-300 px-4 py-2 border-b border-gray-300"
                  onClick={() => setOpen(false)}
                >
                  <FaRegHeart />
                  Favorites
                </div>
              </Link>
              <button
                className="flex gap-2 items-center hover:bg-slate-300 px-4 py-2 text-left hover:rounded-bl hover:rounded-br text-red-500 font-semibold"
                onClick={async () => {
                  await signoutUser();
                }}
              >
                <IoIosLogOut />
                Sign out
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NavbarProfileDropdown;
