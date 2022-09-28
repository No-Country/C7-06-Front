import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import styles from "./NavbarMenu.module.sass";

const NavbarMenu = () => {
  return (
    <nav className={styles.menu}>
      <ul>
        <li>Home</li>
        <li>Adopt</li>
        <li>Donate</li>
        <li>About</li>
        <li className={styles.search}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
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
