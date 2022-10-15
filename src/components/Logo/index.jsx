import styles from "./Logo.module.sass";
import logo from "../../assets/logoAM.png";

const Logo = () => {
  return <img src={logo} alt="Animatch logo" className={styles.logo} />;
};

export default Logo;
