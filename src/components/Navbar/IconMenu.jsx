import styles from "./Navbar.module.sass";
const IconMenu = () => {
  return (
    <div className={styles.barsMenu}>
      <span className={styles.line1_bars}></span>
      <span className={styles.line2_bars}></span>
      <span className={styles.line3_bars}></span>
    </div>
  );
};
export default IconMenu;
