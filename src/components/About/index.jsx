import { Link } from "react-router-dom";
import styles from "./About.module.sass";

const About = () => {
  return (
    <div className={styles.aboutContainer}>
      <h1>Sobre ANIMATCH</h1>
      <p>
        ANIMATCH surge de la necesidad de los amantes de las mascotas por encontrar la pareja ideal
        de su querida mascotita. Si buscas una raza en especifico seguro aqui la encontraras, vas a
        poder contactar a su dueño y acordad el momento del encuentro.
      </p>
      <div className={styles.button}>
        <Link to="/contact">Contacto </Link>
      </div>
    </div>
  );
};

export default About;
