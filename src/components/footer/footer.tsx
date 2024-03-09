import styles from "./footer.module.css";
import castle from "./img/castle.png";

export const Footer = () => (
  <footer className={styles.pageFooter}>
    <div className={styles.footerText}>
      Created with ❤️ by LuKnights of{" "}
      <a href="https://discord.gg/cuteisjustice">Luna's Candy Kingdom</a>{" "}
      Discord
    </div>
    <img src={castle} className={styles.castle}></img>
  </footer>
);
