import styles from "./styles/AboutUs.module.sass";
import josefina from "../assets/josefina.jpeg";
import juan from "../assets/juan.jpeg";
import albert from "../assets/albert.jpeg";
import romina from "../assets/romina.png";
import maria from "../assets/maria.jpg";
import martin from "../assets/martin.jpeg";
import karen from "../assets/userDefault.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";

const AboutUs = () => {
  return (
    <div className={styles.team}>
      <h2 className={styles.team__title}>Nuestro equipo</h2>
      <p className={styles.team__text}>
        Somos un grupo equipo interdisciplinar participando en el reto de simulación profesional de
        No Country.
      </p>
      {/* Team Leader */}
      <div className={styles.team__member}>
        <div className={styles.team__tl}>
          <h3 className={styles.team__subtitle}>Team Leader</h3>
          <div className={styles.team__container}>
            <div className={styles.team__card}>
              <img src={romina} alt="Romina" />
              <h4 className={styles.team__name}>Romina Bello</h4>
              <p className={styles.team__description}>Team Leader</p>
              <div>
                <a
                  href="https://www.linkedin.com/in/rominabello87/"
                  target="_blank"
                  rel="noreferrer">
                  <FontAwesomeIcon icon={faLinkedin} size="2x" />
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* UX */}
        <div className={styles.team__ux}>
          <h3 className={styles.team__subtitle}>UX</h3>
          <div className={styles.team__container}>
            <div className={styles.team__card}>
              <img src={josefina} alt="Josefina" />
              <h4 className={styles.team__name}>Josefina</h4>
              <p className={styles.team__description}>Diseñadora UX/UI</p>
              <div>
                <a
                  href="https://www.linkedin.com/in/cordobajosefina/"
                  target="_blank"
                  rel="noreferrer">
                  <FontAwesomeIcon icon={faLinkedin} size="2x" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Frontend */}
      <div className={styles.team__frontend}>
        <h3 className={styles.team__subtitle}>Frontend</h3>
        <div className={styles.team__container}>
          <div className={styles.team__card}>
            <img src={maria} alt="María" />
            <h4 className={styles.team__name}>María Villén</h4>
            <p className={styles.team__description}>Desarrolladora Full Stack</p>
            <div>
              <a href="https://github.com/MariaVillen" target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faGithub} size="2x" />
              </a>
            </div>
          </div>
          <div className={styles.team__card}>
            <img src={juan} alt="Juan" />
            <h4 className={styles.team__name}>Juan Carracedo</h4>
            <p className={styles.team__description}>Desarrollador Frontend</p>
            <div>
              <a
                href="https://www.linkedin.com/in/juancarracedodev/"
                target="_blank"
                rel="noreferrer">
                <FontAwesomeIcon icon={faLinkedin} size="2x" />
              </a>
              <a href="https://github.com/juancarracedo7" target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faGithub} size="2x" />
              </a>
            </div>
          </div>
          <div className={styles.team__card}>
            <img src={albert} alt="Alberto" />
            <h4 className={styles.team__name}>Alberto Gómez Juan</h4>
            <p className={styles.team__description}>Desarrollador Full Stack</p>
            <div>
              <a href="https://www.linkedin.com/in/agomezjuan/" target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faLinkedin} size="2x" />
              </a>
              <a href="https://github.com/agomezjuan" target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faGithub} size="2x" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Backend */}
      <div className={styles.team__backend}>
        <h3 className={styles.team__subtitle}>Backend</h3>
        <div className={styles.team__container}>
          <div className={styles.team__card}>
            <img src={karen} alt="Karen" />
            <h4 className={styles.team__name}>Karen Huaman</h4>
            <p className={styles.team__description}>Desarrolladora Backend Java</p>
            <a href="https://github.com/yoelexe" target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={faGithub} size="2x" />
            </a>
          </div>
          <div className={styles.team__card}>
            <img src={martin} alt="Martín" />
            <h4 className={styles.team__name}>Martín Kun</h4>
            <p className={styles.team__description}>Desarrollador Full Stack</p>
            <div>
              <a
                href="https://www.linkedin.com/in/mart%C3%ADn-kun-b13620209/"
                target="_blank"
                rel="noreferrer">
                <FontAwesomeIcon icon={faLinkedin} size="2x" />
              </a>
              <a href="https://github.com/MartinKun" target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faGithub} size="2x" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
