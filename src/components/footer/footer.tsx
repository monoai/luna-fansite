import styles from "./footer.module.css";

export const Footer = () => (
  <footer className={styles.pageFooter}>
    <div className={styles.footerText}>
      Created with ❤️ by LuKnights of{" "}
      <a href="https://discord.gg/cuteisjustice">Luna's Candy Kingdom</a>{" "}
      Discord
    </div>
    <a
      href="https://www.youtube.com/@HimemoriLuna"
      className={styles.castle}
    ></a>
  </footer>
);
