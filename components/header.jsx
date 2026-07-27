import React from "react";
import { checkUser } from "@/lib/checkUser";
import NavbarClient from "./navbar-client";

const Header = async () => {
  try {
    await checkUser();
  } catch (error) {
    // Gracefully handle any auth check error during layout rendering
  }

  return <NavbarClient />;
};

export default Header;