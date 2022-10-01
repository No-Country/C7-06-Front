import Logo from "../Logo";
import NavbarMenu from "../NavbarMenu";
import IconMenu from "./IconMenu";
import styles from "./Navbar.module.sass";

const Navbar = () => {
  return (
    <header className={styles.navbar}>
      <Logo />
      <NavbarMenu />
      <IconMenu />
    </header>
  );
};

export default Navbar;
