import styles from "./header.module.css";

import { NavItem } from "./nav_item";
import { useTranslation } from "react-i18next";
import { LanguageLoader } from "../providers/language";
import { useContext, useEffect, useState, PropsWithChildren } from "react";

import { isPortrait, LayoutContext } from "../providers/layout";

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
  return <header className={styles.header}></header>;
};

export const CollapsibleHeader = (props: PropsWithChildren<{}>) => {
  const ANIM_THRESHOLD = 140;

  const [scrollY, setScrollY] = useState(0.0);
  const orientation = useContext(LayoutContext);

  useEffect(() => {
    const onScroll = () => {
      setScrollY(window.scrollY);
    };

    if (isPortrait(orientation)) {
      window.addEventListener("scroll", onScroll);

      return () => {
        window.removeEventListener("scroll", onScroll);
      };
    } else {
      window.removeEventListener("scroll", onScroll);
    }
  }, [orientation]);

  return (
    <>
      <div className={styles.collapsibleHeader}>
        <div className={styles.logo}>
          <div
            className={styles.lunaLogo}
            style={{ opacity: scrollY > ANIM_THRESHOLD ? 0.0 : 1.0 }}
          ></div>
          <div
            className={styles.collapsedLogo}
            style={{ opacity: scrollY < ANIM_THRESHOLD ? 0.0 : 1.0 }}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          ></div>
        </div>
        {props.children}
      </div>
    </>
  );
};
