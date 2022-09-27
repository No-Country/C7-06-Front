import React from "react";
import Logo from "../Logo";
import NavbarMenu from "../NavbarMenu";
import styles from "./Navbar.module.sass";

const Navbar = () => {
  return (
    <header className={styles.navbar}>
      <Logo />
      <NavbarMenu />
    </header>
  );
};

export default Navbar;
