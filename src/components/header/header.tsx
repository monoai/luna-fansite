import hime from './img/Channel_Logo_-_Himemori_Luna_01.png';
import "./header.css";
import { NavItem } from './nav_item';
import { useTranslation } from 'react-i18next';
import { withLanguageSelector } from '../language_selector';

const LangugeSelector = (props: { changeLanguage: (lang: string) => Promise<void> }) => {
  const { t, i18n } = useTranslation()
  return <NavItem>{t('Lang: ')}<select onChange={evt => {
    console.log(evt.target.value);
    props.changeLanguage(evt.target.value)
  }} value={i18n.language}>
    <option value={'en'}>{t('en')}</option>
    <option value={'ja'}>{t('ja')}</option>
  </select></NavItem>

}

const LanguageSelectorNavItem = withLanguageSelector(LangugeSelector);

export const Header = () => {
  const { t } = useTranslation()
  return <header id="page-header">
    <div id="title">
      <img src={hime} id="ch-logo" />
    </div>
    <nav id="site-nav">
      <NavItem>Home</NavItem>
      <NavItem>Projects</NavItem>
      <NavItem>{t("About")}</NavItem>
      <LanguageSelectorNavItem />
      {/* Home <span className="menudot">•</span> Projects <span className="menudot">•</span> About <span className="menudot">•</span> Lang: EN */}
    </nav>
    <div className="top-divider">
      <div className="moon-and-star-divider"></div>
      <div className="wave-divider"></div>
    </div>
  </header>
}