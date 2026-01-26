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
    <>
      <nav className="hidden md:flex px-1 py-3 w-full bg-blue-900">
        <div className="flex flex-row justify-between items-center gap-5 text-white max-w-6xl mx-auto w-full">
          <Link href={"/"}>
            <h3 className="text-2xl font-bold text-white px-2 py-1">Movio</h3>
          </Link>
          <SearchFormComponent type="movies" />
          <ul className="flex flex-row justify-between items-center gap-7">
            {navLinks.map((link) => (
              <li key={link.id} className="cursor-pointer">
                <Link href={link.defaultPath}>{link.name}</Link>
              </li>
            ))}
          </ul>
          <NavbarProfileDropdown user={user} />
        </div>
      </nav>
      <nav className="md:hidden px-4 py-3 w-full bg-blue-900 flex justify-between items-center">
        <button onClick={() => setOpen(true)} className="text-white">
          <IoIosMenu className="text-2xl font-semibold" />
        </button>
        <Link href={"/"}>
          <h3 className="text-2xl font-bold text-white">Movio</h3>
        </Link>
        <NavbarProfileDropdown user={user} />
      </nav>
      {open && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setOpen(false)}
        />
      )}
      <div
        className={`md:hidden fixed top-0 left-0 h-full w-64 bg-blue-900 z-50 transform transition-transform duration-300 ease-in-out overflow-hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-blue-700">
          <h3 className="text-xl font-bold text-white">Menu</h3>
          <button onClick={() => setOpen(false)} className="text-white">
            <IoClose className="text-2xl font-semibold" />
          </button>
        </div>
        <div className="flex flex-col gap-4 p-4 text-white overflow-y-auto h-full pb-20">
          <SearchFormComponent type="movies" />
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <div key={link.id}>
                <Link
                  href={link.defaultPath}
                  onClick={() => setOpen(false)}
                  className="block py-2 px-2 text-lg font-medium hover:bg-blue-800 rounded transition-colors"
                >
                  {link.name}
                </Link>
                {link.list && link.list.length > 0 && (
                  <ul className="ml-4 flex flex-col">
                    {link.list.map((subLink) => (
                      <li key={subLink.href}>
                        <Link
                          href={`${subLink.href}`}
                          onClick={() => setOpen(false)}
                          className="block py-1.5 px-2 text-sm hover:bg-blue-800 rounded transition-colors"
                        >
                          ・{subLink.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default NavbarResponsiveComponent;
