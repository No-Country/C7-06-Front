import { useContext, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { NavbarContext } from "../../contexts/NavbarContext";
import { useSelector } from "react-redux";
import styles from "./NavbarMenu.module.sass";

const NavbarMenu = () => {
  const { userInfo } = useSelector(state => state.auth);
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
          <NavLink to="/search">Nuestras mascotas</NavLink>
        </li>
        <li>
          <NavLink to="/">Acerca de Animatch</NavLink>
        </li>
        {!userInfo ? (
          <li>
            <NavLink to="/login">Iniciar Sesión</NavLink>
          </li>
        ) : null}
        {/* <li>
          <NavLink to="/search" className={styles.search}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </NavLink>
        </li> */}
      </ul>
      {userInfo ? (
        <Link to="/user" className={styles.user} onClick={handleLinkClick}>
          <span>User</span>
          <FontAwesomeIcon icon={faCircleUser} />
        </Link>
      ) : null}
    </nav>
  );
};

export default NavbarMenu;
