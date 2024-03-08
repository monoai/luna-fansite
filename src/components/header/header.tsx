import hime from "./img/Channel_Logo_-_Himemori_Luna_01.png";
import styles from "./header.module.css";
import { NavItem } from "./nav_item";
import { useTranslation } from "react-i18next";
import { LanguageLoader } from "../language_selector";
import { useContext } from "react";

const LanguageSelectorNavItem = () => {
  const { changeLanguage } = useContext(LanguageLoader);
  const { t, i18n } = useTranslation();
  return (
    <NavItem>
      <select
        onChange={(evt) => {
          changeLanguage(evt.target.value);
        }}
        className={styles.languageSelector}
        value={i18n.language}
      >
        <option value={"en"}>🇬🇧</option>
        <option value={"ja"}>🇯🇵</option>
      </select>
    </NavItem>
  );
};

export const Header = () => {
  const { t } = useTranslation();
  return (
    <header className={styles.pageHeader}>
      <div className={styles.title}>
        <img src={hime} className={styles.chLogo} />
      </div>
      <div className={styles.languageNav}>
        <LanguageSelectorNavItem />
      </div>
      <div className={styles.topDivider}>
        <div className={styles.moonAndStarDivider}></div>
        <div className={styles.waveDivider}></div>
      </div>
    </header>
  );
};
