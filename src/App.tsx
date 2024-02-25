import "./App.css";
import { Header } from "./components/header/header";
import { CardGrid } from "./components/cards/card_grid";
import { Card } from "./components/cards/card";
import castle from "./img/castle.png";
import { Footer } from "./components/footer/footer";
import { LanguageLoaderProvider } from "./components/language_selector";
import { PageProvider } from "./components/page_measurer/page_measurer";

function App() {
  return (
    <LanguageLoaderProvider>
      <PageProvider>
        <Header />
        <div className="article">
          <main className="main">
            <CardGrid>
              <Card>Hi</Card>
              <Card>Hi</Card>
              <Card>Hi</Card>
              <Card>Hi</Card>
            </CardGrid>
          </main>
          <img src={castle} className="castle"></img>
          <Footer />
        </div>
      </PageProvider>
    </LanguageLoaderProvider>
  );
}

export default App;
