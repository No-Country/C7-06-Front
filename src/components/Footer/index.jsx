import FooterNav from "../FooterNav";
import styles from "./Footer.module.sass";
import logo from "../../assets/logoAM-completo-v.png";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <img src={logo} className={styles.logo} alt="Animatch Logo" />
      <div className={styles.footerContent}>
        <h3>Necesitas ayuda?</h3>
        <p>Contáctanos por correo electrónico en contacto@animatch.com</p>
        <FooterNav />
      </div>
    </footer>
  );
};

export default Footer;
