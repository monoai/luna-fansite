import logo from "./img/luna_header2.png";
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
      {t("Lang: ")}
      <select
        onChange={(evt) => {
          changeLanguage(evt.target.value);
        }}
        value={i18n.language}
      >
        <option value={"en"}>{t("en")}</option>
        <option value={"ja"}>{t("ja")}</option>
      </select>
    </NavItem>
  );
};

export const Header = () => {
  const { t } = useTranslation();
  return <header className={styles.pageHeader}></header>;
};
