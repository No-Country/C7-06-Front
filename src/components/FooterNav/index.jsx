import styles from "./FooterNav.module.sass";
import { Link } from "react-router-dom";

const FooterNav = () => {
  return (
    <nav className={styles.footerNav}>
      <ul>
        <li>
          <Link to="/about">Acerca de Animatch</Link>
        </li>
        <li>
          <Link to="/policy">Política de privacidad</Link>
        </li>
        <li>
          <Link to="/terms">Términos y condiciones</Link>
        </li>
      </ul>
    </nav>
  );
};
export default FooterNav;
