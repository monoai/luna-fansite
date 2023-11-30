import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export function withLanguageSelector<T extends { changeLanguage: (lang: string) => Promise<void> }>(
    Component: React.ComponentType<T>
): React.ComponentType<Omit<T, 'changeLanguage'>> {
    return (props: Omit<T, 'changeLanguage'>) => {
        const [languageLoaded, setLanguageLoaded] = useState<Record<string, boolean>>({});
        const { i18n } = useTranslation('translation');
        const changeLanguage = async (str: string) => {
            if (!i18n.hasResourceBundle(str, 'translation')) {
                setLanguageLoaded({ ...languageLoaded, [str]: false });
                let language;
                try {
                    language = await fetch(`./${str}.json`);
                    language = await language.json();
                } catch (e) {
                    language = await fetch(`./en.json`);
                    language = await language.json();
                }
                i18n.addResourceBundle(str, 'translation', language);
            }
            setLanguageLoaded({ ...languageLoaded, [str]: true });
            i18n.changeLanguage(str)
        }
        return <Component {...props as T} changeLanguage={changeLanguage} />
    }
}