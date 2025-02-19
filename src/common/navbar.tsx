import { decrypt } from "@/lib/session";
import { cookies } from "next/headers";
import NavbarClient from "./navbar-client";
import { handleLogout } from "./auth";
const Navbar = async () => {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  return <NavbarClient session={session} handleLogout={handleLogout} />;
};

export default Navbar;
