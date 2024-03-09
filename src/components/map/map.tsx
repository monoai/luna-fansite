//imported styles and locations (later add icons)
import styles from "./map.module.css";

//downloaded packages link
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";

//leaflet defaults broke on me somehow.... this is completely unesssary unless its broken like me
import L, { Icon } from "leaflet";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
import { UserPost } from "../../posts";
import { getPfp } from "../../postAssets";

L.Marker.prototype.options.icon = L.icon({
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export const Map = (props: {
  posts: UserPost[];
  cardRefs: Map<string, React.RefObject<HTMLDivElement>>;
  innerRef?: (map: L.Map) => void;
}) => {
  let markers = props.posts
    .filter((post) => post.location != null)
    .map((post: UserPost, i) => {
      const icon = new Icon({
        iconUrl: getPfp(post),
        iconSize: [35, 35],
        iconAnchor: [17, 17],
        className: styles.map_icon,
      });
      return (
        <Marker
          key={i}
          icon={icon}
          position={[post.location!.lat, post.location!.long]}
          eventHandlers={{
            click: () => {
              const cardDiv = props.cardRefs.get(post.id)!.current!;
              // cardDiv.parentElement!.scroll(0, rect.top + 80);
              cardDiv.scrollIntoView({
                behavior: "smooth",
              });
            },
          }}
        >
          <Tooltip
            offset={[0, -22]}
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
      ref={(m) => props.innerRef?.(m!)}
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
