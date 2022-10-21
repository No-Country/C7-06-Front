import styles from "./Logo.module.sass";
import logo from "../../assets/logoAM-completo-pp-der.png";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/">
      <img src={logo} alt="Animatch logo" className={styles.logo} />
    </Link>
  );
};

export default Logo;
