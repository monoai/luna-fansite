import "./App.css";
import { Header } from "./components/header/header";
import { Map } from "./components/map/map";
import { CardGrid } from "./components/cards/card_grid";
import { Card } from "./components/cards/card";
import castle from "./img/castle.png";
import { Footer } from "./components/footer/footer";
import { LanguageLoaderProvider } from "./components/language_selector";

function App() {
  return (
    <LanguageLoaderProvider>
      <Header />
      <div className="article">
        <main className="main">
          <Map></Map>
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
    </LanguageLoaderProvider>
  );
}

export default App;
