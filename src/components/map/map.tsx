import classnames from "classnames";

//imported styles and locations (later add icons)
import styles from "./map.module.css";

//downloaded packages link
import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  useMapEvents,
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import "leaflet/dist/leaflet.css";

//leaflet defaults broke on me somehow.... this is completely unesssary unless its broken like me
import L from "leaflet";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
import { useEffect, useState } from "react";
import { UserPost } from "../../posts";

L.Marker.prototype.options.icon = L.icon({
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const MyComponent = (props: { closeOverlay: () => void }) => {
  useMapEvents({
    click() {
      props.closeOverlay();
    },
  });
  return null;
};

var Overlay = (props: {
  message?: string;
  username?: string;
  image?: string;
  open: boolean;
}) => (
  <div
    className={classnames(
      styles.overlay_container,
      props.open && styles.overlay_open,
    )}
  >
    <h1>{props?.username}</h1>
    <p>{props?.message}</p>
    <div>{props.image && <img src={props.image} />}</div>
  </div>
);

type OverlayInfo = {
  open: boolean;
  message?: string;
  username?: string;
};

export const Map = (props: {
  posts: UserPost[];
  cardRefs: Map<number, React.RefObject<HTMLDivElement>>;
  innerRef?: (
    map: L.Map,
    openOverlay: (info: Omit<OverlayInfo, "open">) => void,
  ) => void;
}) => {
  const [overlayInfo, setOverlayInfo] = useState<{
    open: boolean;
    message?: string;
    username?: string;
  }>({ open: false });

  let markers = props.posts
    .filter((post) => post.location != null)
    .map((post: UserPost, i) => {
      return (
        <Marker
          key={i}
          position={[post.location!.lat, post.location!.long]}
          eventHandlers={{
            click: () => {
              let cardDiv = props.cardRefs.get(post.id)!.current!;
              let rect = cardDiv.getBoundingClientRect();
              // cardDiv.parentElement!.scroll(0, rect.top + 80);
              cardDiv.scrollIntoView({
                behavior: "smooth",
              });
            },
          }}
        >
          <Tooltip
            offset={[15, -40]}
            direction="center"
            permanent
            className={styles.numberIcon}
          >
            {post.discord_or_nickname}
          </Tooltip>
        </Marker>
      );
    });

  return (
    <MapContainer
      ref={(m) =>
        props.innerRef?.(m!, (info) => setOverlayInfo({ ...info, open: true }))
      }
      className={styles.map}
      zoom={1.5}
      center={[30, 0]}
      zoomSnap={0.5}
      maxZoom={10}
      minZoom={1}
      maxBounds={[
        [-1000, -Infinity],
        [1200, Infinity],
      ]}
      inertia={true}
      //(funny inertiaDeceleration = {1})
      inertiaDeceleration={4000}
      worldCopyJump={true}
    >
      <TileLayer
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      {markers}
    </MapContainer>
  );
};
