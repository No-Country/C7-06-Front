import styles from "./UserBanner.module.sass";
import image from "../../assets/userProfileBanner.png";

const UserBanner = () => {
  return (
    <div className={styles.userBanner}>
      <div className={styles.userBanner_overlay}></div>
      <img src={image} alt="dog" className={styles.image} />
      <p className={styles.userBanner_title}>Usuarios</p>
    </div>
  );
};

export default UserBanner;
