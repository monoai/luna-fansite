import styles from "./footer.module.css";

import { useContext } from "react";
import { useTranslation, Trans } from "react-i18next";
import { isPortrait, LayoutContext } from "../providers/layout";

export const Footer = () => {
  let link = (
    <a href="https://discord.gg/cuteisjustice">Luna's Candy Kingdom</a>
  );
  const orientation = useContext(LayoutContext);
  const { t } = useTranslation();

  return (
    <footer
      className={
        isPortrait(orientation) ? styles.pageFooterPortrait : styles.pageFooter
      }
    >
      <a
        href="https://www.youtube.com/@HimemoriLuna"
        className={styles.castle}
      ></a>
      <div className={styles.footerText}>
        <div>
          <Trans i18nKey="footer.text">Text{link}</Trans>
        </div>
      </div>
    </footer>
  );
};
