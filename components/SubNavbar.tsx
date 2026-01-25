import { Navbar } from "@/types/types";
import Link from "next/link";

const SubNavbar = ({
  subNavBarItem,
  nowLink,
}: {
  subNavBarItem: Navbar;
  nowLink: string;
}) => {
  return (
    <div className="flex flex-col items-center w-full bg-white border-b border-b-gray-300 py-2 space-y-1">
      <h4 className="text-xl font-medium text-gray-700 text-center border-b border-gray-300 pb-1 w-1/2">
        {subNavBarItem.name}
      </h4>
      <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
        {subNavBarItem?.list?.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className={`px-2  transition-colors ${
              nowLink === item.href
                ? "font-semibold border-b-2 border-blue-800 text-blue-900"
                : "border-b-2 border-transparent hover:border-gray-400 hover:text-gray-700"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SubNavbar;
