import styles from "./Banner.module.sass";
import animatch from "../../assets/banner.png";

const Banner = () => {
  return (
    <div className={styles.container}>
      <img src={animatch} alt="dog" className={styles.img} />
      <p>Encuenta al mejor compañero para tu mascota</p>
    </div>
  );
};

export default Banner;
