"use client";

import navLinks from "@/data/navLinks";
import SearchFormComponent from "./SearchFormComponent";
import Link from "next/link";
import NavbarProfileDropdown from "./NavbarProfileDropdown";
import { IoIosMenu } from "react-icons/io";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { User } from "@/types/types";

const NavbarResponsiveComponent = ({ user }: { user: User | null }) => {
  const [open, setOpen] = useState(false);
  return (
    <nav className="px-1 py-3 w-full bg-blue-900">
      {open ? (
        <div className="flex justify-between text-white mx-4">
          <div className="block md:hidden" onClick={() => setOpen(false)}>
            <IoClose className="text-2xl font-semibold" />
          </div>
          {<NavbarProfileDropdown user={user} />}
        </div>
      ) : (
        <div className="block md:hidden pl-4" onClick={() => setOpen(true)}>
          <IoIosMenu className="text-2xl font-semibold text-white" />
        </div>
      )}
      <div
        className={`${open ? "flex flex-col" : "hidden"} md:flex flex-row justify-between items-center gap-3 md:gap-5 text-white max-w-6xl mx-auto`}
      >
        <div className="hidden md:block">
          <Link href={"/"}>
            <h3 className="text-2xl font-bold text-white px-2 py-1">Movio</h3>
          </Link>
        </div>
        <SearchFormComponent type="movies" />
        <ul className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-7">
          {navLinks.map((link) => {
            return (
              <li key={link.id} className="cursor-pointer">
                <Link href={link.defaultPath} onClick={() => setOpen(false)}>
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
        {!open && <NavbarProfileDropdown user={user} />}
      </div>
    </nav>
  );
};

export default NavbarResponsiveComponent;
