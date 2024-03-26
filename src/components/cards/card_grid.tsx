import React, { createRef, useContext } from "react";
import styles from "./card_grid.module.css";
import { isPortrait, LayoutContext } from "../providers/layout";
import { UserPost } from "../../posts";
import { Card } from "./card";
import L from "leaflet";

type CardGridProps = {
  posts: UserPost[];
  cardRefs: Map<string, React.RefObject<HTMLDivElement>>;
  mapRef: React.MutableRefObject<L.Map | undefined>;
};

export const CardGrid = (props: CardGridProps) => {
  const orientation = useContext(LayoutContext);

  let posts = props.posts.map((post, i) => {
    const cardRef = createRef<HTMLDivElement>();

    props.cardRefs.set(post.id, cardRef);

    return (
      <Card
        ref={cardRef}
        key={"card" + i}
        post={post}
        onClick={() => {
          if (post.location) {
            let location = post.location!;
            props.mapRef.current?.flyTo([location.lat, location.long], 7);
          }
        }}
      />
    );
  });

  return (
    <div
      className={
        isPortrait(orientation) ? styles.cardGridPortrait : styles.cardGrid
      }
    >
      <div className={styles.promptBanner}></div>
      {posts}
    </div>
  );
};
