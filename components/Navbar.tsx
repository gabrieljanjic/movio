import navLinks from "@/data/navLinks";
import SearchFormComponent from "./SearchFormComponent";
import Link from "next/link";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { User } from "@/lib/models/User";
import { connectDB } from "@/lib/db";

const Navbar = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  let user = null;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        id: string;
      };
      await connectDB();
      user = await User.findById(decoded.id).select("firstName lastName");
    } catch {
      user = null;
    }
  }

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
        {!user ? (
          <Link href="/login">Login</Link>
        ) : (
          <Link href={"/profile"}>
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-white text-blue-900 flex items-center justify-center font-bold">
                {user.firstName[0]}
              </div>
              <span>{user.firstName}</span>
            </div>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
