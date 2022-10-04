import { useContext } from "react";
import { NavbarContext } from "../../contexts/NavbarContext";
import styles from "./Navbar.module.sass";

const IconMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useContext(NavbarContext);

  const handleClick = e => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={styles.barsMenu} onClick={handleClick}>
      <span className={`${isMenuOpen && styles.line1_bars}`}></span>
      <span className={`${isMenuOpen && styles.line2_bars}`}></span>
      <span className={`${isMenuOpen && styles.line3_bars}`}></span>
    </div>
  );
};
export default IconMenu;
