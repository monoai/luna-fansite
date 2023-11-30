import React, { Provider, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { createContext } from "react";

type LanguageLoaderContext = {
  loading: boolean;
  changeLanguage: (language: string) => Promise<void>;
};

export const LanguageLoader = createContext<LanguageLoaderContext>({
  loading: false,
  changeLanguage: () => Promise.resolve(),
});

export const LanguageLoaderProvider = (props: React.PropsWithChildren<{}>) => {
  const [languageLoaded, setLanguageLoaded] = useState<Record<string, boolean>>(
    {},
  );
  const [lastLoadedLanguage, setLastLoadedLanguage] = useState("ja");
  const { i18n } = useTranslation("translation");
  const changeLanguage = async (str: string) => {
    setLastLoadedLanguage("en");
    if (!i18n.hasResourceBundle(str, "translation")) {
      setLanguageLoaded({ ...languageLoaded, [str]: false });
      let language;
      try {
        language = await fetch(`./luna-fansite/${str}.json`);
        language = await language.json();
      } catch (e) {
        language = await fetch(`./luna-fansite/en.json`);
        language = await language.json();
      }
      i18n.addResourceBundle(str, "translation", language);
    }
    setLanguageLoaded({ ...languageLoaded, [str]: true });
    i18n.changeLanguage(str);
  };

  useEffect(() => {
    const lang = navigator.language.split("-")[0];
    switch (lang) {
      case "ja":
      case "jp":
        changeLanguage("ja");
        break;
      default:
        changeLanguage("en");
    }
  }, []);

  return (
    <LanguageLoader.Provider
      {...props}
      value={{
        changeLanguage,
        loading: !languageLoaded[lastLoadedLanguage],
      }}
    />
  );
};
