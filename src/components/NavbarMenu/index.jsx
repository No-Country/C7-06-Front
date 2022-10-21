import { useContext, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { NavbarContext } from "../../contexts/NavbarContext";
import { useDispatch, useSelector } from "react-redux";
import styles from "./NavbarMenu.module.sass";
import { getUserLogged } from "../../Redux/slices/user/userAction";
import PropTypes from "prop-types";

// Submenú del usuario
const ProfileSubmenu = ({ handleLogout, handleLinkClick }) => {
  return (
    <div className={styles.userSubmenu}>
      <ul className={styles.userSubmenu_container} onClick={handleLinkClick}>
        <li>
          <NavLink to="/user">Mi perfil</NavLink>
        </li>
        <li>
          <Link to="/account">Información personal</Link>
        </li>
        <li>
          <Link to="/add-pet">Gestión de mascotas</Link>
        </li>
        <li>
          <Link to="/" className={styles.logout} onClick={handleLogout}>
            Cerrar sesión
          </Link>
        </li>
      </ul>
    </div>
  );
};

ProfileSubmenu.propTypes = {
  handleLogout: PropTypes.func.isRequired,
  handleLinkClick: PropTypes.func.isRequired
};

const NavbarMenu = () => {
  const { userLogged } = useSelector(state => state.auth);
  const { userInfo, loading } = useSelector(state => state.user);

  const dispatch = useDispatch();
  // Estado del contexto global del header
  const [isMenuOpen, setIsMenuOpen] = useContext(NavbarContext);

  // Función para cerrar el menú
  const handleLinkClick = e => {
    setIsMenuOpen(false);
  };

  // Renderizado condicional del menú
  const renderMenu = {
    display: isMenuOpen && "flex",
    width: isMenuOpen & (window.innerWidth < 850) ? "350px" : "100%"
  };

  useEffect(() => {
    if (userLogged && !userInfo) {
      const id = userLogged.id;
      dispatch(getUserLogged({ id }));
    }
  }, [userLogged, dispatch]);

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

  const handleLogout = () => {
    setIsMenuOpen(false);
    console.log("logout");
    localStorage.removeItem("userToken");
    window.location.replace("/");
  };

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
          <NavLink to="/contact">Contacto</NavLink>
        </li>
        {!userLogged ? (
          <li>
            <NavLink to="/login">Iniciar Sesión</NavLink>
          </li>
        ) : null}
      </ul>
      {userLogged ? (
        <>
          <Link className={styles.user} onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span>
              {loading ? (
                <>User</>
              ) : (
                <>
                  {userInfo.name} {userInfo.surname}{" "}
                </>
              )}
            </span>
            <FontAwesomeIcon icon={faCircleUser} />
          </Link>
          {isMenuOpen && (
            <ProfileSubmenu handleLogout={handleLogout} handleLinkClick={handleLinkClick} />
          )}
        </>
      ) : null}
    </nav>
  );
};

export default NavbarMenu;
