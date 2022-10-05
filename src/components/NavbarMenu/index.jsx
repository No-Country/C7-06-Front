import { useContext, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { NavbarContext } from "../../contexts/NavbarContext";
import styles from "./NavbarMenu.module.sass";

const NavbarMenu = () => {
  // Estado del contexto global del header
  const [isMenuOpen, setIsMenuOpen] = useContext(NavbarContext);

  // Función para cerrar el menú
  const handleLinkClick = e => {
    setIsMenuOpen(false);
  };

  // Renderizado condicional del menú
  const renderMenu = {
    display: isMenuOpen && "flex",
    width: isMenuOpen && "100%"
  };

  useEffect(() => {
    // Si la pantalla es mayor a 850px, el menú se cierra
    const handleResize = () => {
      if (window.innerWidth > 850) {
        setIsMenuOpen(false);
      }
    };

    // Evento para cerrar el menú al hacer resize
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className={styles.menu} style={renderMenu}>
      <ul onClick={handleLinkClick}>
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
          <NavLink to="/search" className={styles.search}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </NavLink>
        </li>
      </ul>
      <Link to="/user" className={styles.user}>
        <span>User</span>
        <FontAwesomeIcon icon={faCircleUser} />
      </Link>
    </nav>
  );
};

export default NavbarMenu;
