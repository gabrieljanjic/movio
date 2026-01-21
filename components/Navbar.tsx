import { cookies } from "next/headers";
import { getUserFromToken } from "@/lib/auth";
import NavbarResponsiveComponent from "./NavbarResponsiveComponent";

const Navbar = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  const user = token ? await getUserFromToken(token) : null;

  return <NavbarResponsiveComponent user={user} />;
};

export default Navbar;
