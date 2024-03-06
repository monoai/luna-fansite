import "./App.css";
import { Header } from "./components/header/header";
import { Map as WorldMap } from "./components/map/map";
import { CardGrid } from "./components/cards/card_grid";
import { Card } from "./components/cards/card";
import { Footer } from "./components/footer/footer";
import { LanguageLoaderProvider } from "./components/language_selector";
import { fetchPosts, UserPost } from "./posts";
import L from "leaflet";
import { createRef, useEffect, useRef, useState } from "react";

export default function App() {
  const map: React.MutableRefObject<L.Map | undefined> = useRef(undefined);
  const container: React.MutableRefObject<HTMLElement | null> = useRef(null);

  let cardRefs = new Map<number, React.RefObject<HTMLDivElement>>();

  const [posts, setPosts] = useState<UserPost[]>([]);

  useEffect(() => {
    fetchPosts((posts: UserPost[]) => {
      setPosts(posts);
    });
  }, []);

  return (
    <LanguageLoaderProvider>
      <Header />
      <main className="main" ref={(c) => (container.current = c)}>
        <WorldMap
          posts={posts}
          cardRefs={cardRefs}
          innerRef={(m) => {
            map.current = m;
            // TODO: This should probably come from a provider
            // openOverlay.current = o;
          }}
        />
        <CardGrid>
          {posts.map((post, i) => {
            const cardRef = createRef<HTMLDivElement>();

            cardRefs.set(post.id, cardRef);

            return (
              <Card
                ref={cardRef}
                key={"card" + i}
                post={post}
                onClick={() => {
                  container?.current?.scrollIntoView({
                    behavior: "smooth",
                  });

                  if (post.location) {
                    let location = post.location!;
                    map.current?.flyTo([location.lat, location.long], 5);
                  }
                }}
              />
            );
          })}
        </CardGrid>
      </main>
      <Footer />
    </LanguageLoaderProvider>
  );
}
