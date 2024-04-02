import styles from "./App.module.css";
import shuffle from "lodash.shuffle";
import { Header, CollapsibleHeader } from "./components/header/header";
import { Map as WorldMap } from "./components/map/map";
import { CardGrid } from "./components/cards/card_grid";
import { Footer } from "./components/footer/footer";
import { fetchPosts, UserPost } from "./posts";
import L from "leaflet";
import { useEffect, useRef, useState, useContext } from "react";
import {
  LayoutType,
  LayoutContext,
  getLayoutType,
} from "./components/providers/layout";

const query = new URLSearchParams(document.location.search);
const fixedOrder = query.get("fixed") != null;

export default function App() {
  const mapRef: React.MutableRefObject<L.Map | undefined> = useRef(undefined);

  let cardRefs = new Map<string, React.RefObject<HTMLDivElement>>();

  const [posts, setPosts] = useState<UserPost[]>([]);

  useEffect(() => {
    fetchPosts((posts: UserPost[]) => {
      if (!fixedOrder) {
        posts = shuffle(posts);
      }

      setPosts(posts);
    });
  }, []);

  const orientation = useContext(LayoutContext);

  let cards = <CardGrid posts={posts} cardRefs={cardRefs} mapRef={mapRef} />;

  let map = (
    <WorldMap
      posts={posts}
      cardRefs={cardRefs}
      innerRef={(m) => {
        mapRef.current = m;
      }}
    />
  );

  switch (getLayoutType(orientation)) {
    case LayoutType.Portrait: {
      return (
        <>
          <CollapsibleHeader>{map}</CollapsibleHeader>
          {cards}
          <Footer />
        </>
      );
    }
    case LayoutType.Landscape: {
      return (
        <>
          <Header />
          <div className={styles.main}>
            <div className={styles.mainLeft}>
              {map}
              <Footer />
            </div>
            {cards}
          </div>
        </>
      );
    }
    case LayoutType.UnusableLandscape: {
      return (
        <>
          <Header />
          <div className={styles.rotateHint}></div>
          <Footer />
        </>
      );
    }
  }
}
