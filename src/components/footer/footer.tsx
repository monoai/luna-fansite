import styles from "./footer.module.css";
import castle from "./img/castle.png";

export const Footer = () => (
  <footer className={styles.pageFooter}>
    <div className={styles.footerText}>Footer text here</div>
    <img src={castle} className={styles.castle}></img>
  </footer>
);
