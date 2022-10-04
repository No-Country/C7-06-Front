import Logo from "../Logo";
import NavbarMenu from "../NavbarMenu";
import IconMenu from "./IconMenu";
import NavbarProvider from "../../contexts/NavbarContext";
import styles from "./Navbar.module.sass";

const Navbar = () => {
  return (
    <NavbarProvider>
      <header className={styles.navbar}>
        <Logo />
        <NavbarMenu />
        <IconMenu />
      </header>
    </NavbarProvider>
  );
};

export default Navbar;
