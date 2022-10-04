import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { NavbarContext } from "../../contexts/NavbarContext";
import styles from "./NavbarMenu.module.sass";

const NavbarMenu = () => {
  const { isMenuOpen, setIsMenuOpen } = useContext(NavbarContext);

  const handleClick = e => {
    setIsMenuOpen(!isMenuOpen);
  };

  // useEffect(() => {
  //   const handleResize = () => {
  //     if (window.innerWidth > 768) {
  //       setIsMenuOpen(false);
  //     }
  //   };

  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  return (
    <nav className={styles.menu} style={isMenuOpen && { display: "flex" }}>
      <ul onClick={handleClick}>
        <li>
          <NavLink to="/">Inicio</NavLink>
        </li>
        <li>
          <NavLink to="/login">Iniciar sesión</NavLink>
        </li>
        <li>
          <NavLink to="/register">Registro</NavLink>
        </li>
        <li>
          <NavLink to="/">About</NavLink>
        </li>
        <li>
          <NavLink to="/" className={styles.search}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </NavLink>
        </li>
      </ul>
      <div className={styles.user}>
        <span>User</span>
        <FontAwesomeIcon icon={faCircleUser} />
      </div>
    </nav>
  );
};

export default NavbarMenu;
