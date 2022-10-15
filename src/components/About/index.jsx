import { Link } from "react-router-dom";
import styles from "./About.module.sass";

const About = () => {
  return (
    <div className={styles.aboutContainer}>
      <h1>Sobre ANIMATCH</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel
        sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam
        eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique
        accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut molestias architecto
        voluptate aliquam nihil, eveniet aliquid culpa officia aut!
      </p>
      <div className={styles.button}>
        <Link to="/contact">Contacto </Link>
      </div>
    </div>
  );
};

export default About;
