import "./App.css";
import { Header } from "./components/header/header";
import { Map } from "./components/map/map";
import { CardGrid } from "./components/cards/card_grid";
import { Card } from "./components/cards/card";
import castle from "./img/castle.png";
import { Footer } from "./components/footer/footer";
import { LanguageLoaderProvider } from "./components/language_selector";
import { instances } from "./components/map/locations";
import L from "leaflet";
import { useRef } from "react";

function App() {
  const map: React.MutableRefObject<L.Map | undefined> = useRef(undefined);
  const openOverlay: React.MutableRefObject<
    | ((opts: { name: string; message: string; username: string }) => void)
    | undefined
  > = useRef(undefined);
  const container: React.MutableRefObject<HTMLElement | null> = useRef(null);

  return (
    <LanguageLoaderProvider>
      <Header />
      <div className="article">
        <main className="main" ref={(c) => (container.current = c)}>
          <div className="map-list">
            <Map
              innerRef={(m, o) => {
                map.current = m;
                // TODO: This should probably come from a provider
                openOverlay.current = o;
              }}
            />
            <CardGrid>
              {instances.map((instance, i) => (
                <Card
                  key={i}
                  message={instance.message}
                  name={instance.user_name}
                  onClick={() => {
                    container?.current?.scrollIntoView({
                      behavior: "smooth",
                    });
                    map.current?.flyTo(instance.coords, 5);
                    openOverlay.current?.({
                      name: instance.user_name,
                      message: instance.message,
                      username: instance.user_name,
                    });
                  }}
                />
              ))}
            </CardGrid>
          </div>
        </main>
        <img src={castle} className="castle"></img>
        <Footer />
      </div>
    </LanguageLoaderProvider>
  );
}

export default App;
