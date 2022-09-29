import styles from "./FooterNav.module.sass";

const FooterNav = () => {
  return (
    <nav className={styles.footerNav}>
      <ul>
        <li>About us</li>
        <li>Privacy Policy</li>
        <li>Terms & Conditions</li>
      </ul>
    </nav>
  );
};
export default FooterNav;
