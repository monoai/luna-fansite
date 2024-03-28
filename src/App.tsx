import styles from "./App.module.css";
import { Header, CollapsibleHeader } from "./components/header/header";
import { Map as WorldMap } from "./components/map/map";
import { CardGrid } from "./components/cards/card_grid";
import { Footer } from "./components/footer/footer";
import { fetchPosts, UserPost } from "./posts";
import L from "leaflet";
import { useEffect, useRef, useState, useContext } from "react";
import { isPortrait, LayoutContext } from "./components/providers/layout";

export default function App() {
  const mapRef: React.MutableRefObject<L.Map | undefined> = useRef(undefined);

  let cardRefs = new Map<string, React.RefObject<HTMLDivElement>>();

  const [posts, setPosts] = useState<UserPost[]>([]);

  useEffect(() => {
    fetchPosts((posts: UserPost[]) => {
      setPosts(posts);
    });
  }, []);

  const { orientation } = useContext(LayoutContext) || { orientation: null };

  let cards = <CardGrid posts={posts} cardRefs={cardRefs} mapRef={mapRef} />;

  return (
    <LayoutContext.Consumer>
      {(value) =>
        isPortrait(orientation) ? (
          <>
            <CollapsibleHeader>
              {
                <WorldMap
                  posts={posts}
                  containerHeight={value?.width || window.innerWidth}
                  containerWidth={value?.width || window.innerWidth}
                  cardRefs={cardRefs}
                  innerRef={(m) => {
                    mapRef.current = m;
                  }}
                />
              }
            </CollapsibleHeader>
            {cards}
            <Footer />
          </>
        ) : (
          <>
            <Header />
            <div className={styles.main}>
              <div className={styles.mainLeft}>
                {
                  <WorldMap
                    posts={posts}
                    containerHeight={value?.width || window.innerWidth}
                    containerWidth={value?.width || window.innerWidth}
                    cardRefs={cardRefs}
                    innerRef={(m) => {
                      mapRef.current = m;
                    }}
                  />
                }
                <Footer />
              </div>
              {cards}
            </div>
          </>
        )
      }
    </LayoutContext.Consumer>
  );
}
