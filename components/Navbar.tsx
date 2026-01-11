import navLinks from "@/data/navLinks";
import SearchFormComponent from "./SearchFormComponent";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="px-1 py-3 w-full bg-blue-900">
      <div className="flex justify-between items-center gap-7 text-white max-w-6xl mx-auto">
        <h3 className="text-2xl font-bold text-white px-2 py-1">Movio</h3>
        <SearchFormComponent type="movies" />
        <ul className="flex justify-between gap-7">
          {navLinks.map((link) => {
            return (
              <li key={link.id} className="cursor-pointer">
                <Link href={link.defaultPath}>{link.name}</Link>
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
