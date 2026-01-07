"use client";

import navLinks from "@/data/navLinks";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const Navbar = () => {
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);

  const dropdownRefs = useRef<(HTMLLIElement | null)[]>([]);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        !dropdownRefs.current.some(
          (ref) => ref && ref.contains(e.target as Node)
        )
      ) {
        setOpenDropdownId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="px-1 py-4 w-full bg-blue-900 mb-4">
      <div className="flex justify-between items-center  text-white max-w-6xl mx-auto">
        <h3 className="text-2xl">Movio</h3>
        <ul className="flex justify-between gap-7">
          {navLinks.map((link, index) => {
            return (
              <li
                key={link.id}
                ref={(el) => {
                  dropdownRefs.current[index] = el;
                }}
                className="relative"
              >
                {link.list ? (
                  <>
                    <button
                      className="cursor-pointer hover:text-gray-300"
                      onClick={() => {
                        setOpenDropdownId(
                          openDropdownId === link.id ? null : link.id
                        );
                      }}
                    >
                      {link.name}
                    </button>
                    {openDropdownId === link.id && (
                      <div className="absolute top-full left-0 mt-2 w-48 bg-white text-black rounded shadow-lg z-50">
                        <ul>
                          {link.list.map((item) => {
                            return (
                              <Link href={item.href}>
                                <li
                                  key={item.id}
                                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                                >
                                  {item.name}
                                </li>
                              </Link>
                            );
                          })}
                        </ul>
                      </div>
                    )}
                  </>
                ) : (
                  <button className="cursor-pointer">
                    <Link
                      href={link.href || "#"}
                      className="hover:text-gray-300"
                    >
                      {link.name}
                    </Link>
                  </button>
                )}
              </li>
            );
          })}
        </ul>
        <button>Login</button>
      </div>
    </nav>
  );
};

export default Navbar;
