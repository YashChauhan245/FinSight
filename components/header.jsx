import React from "react";
import NavbarClient from "./navbar-client";

const Header = async () => {
  // checkUser() is now called only on protected pages (dashboard, account, transaction)
  // via their own server components, not on every single route navigation.
  return <NavbarClient />;
};

export default Header;