import styles from "./map.module.css";

//downloaded packages link
import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  AttributionControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

import React, { useContext } from "react";

//leaflet defaults broke on me somehow.... this is completely unesssary unless its broken like me
import L, { Icon } from "leaflet";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
import { UserPost } from "../../posts";
import { getPfp } from "../../postAssets";

import { isPortrait, LayoutContext } from "../providers/layout";

L.Marker.prototype.options.icon = L.icon({
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

type MapProps = {
  posts: UserPost[];
  cardRefs: Map<string, React.RefObject<HTMLDivElement>>;
  innerRef?: (map: L.Map) => void;
  containerWidth: number;
  containerHeight: number;
};

function createMarkers(
  props: MapProps,
  mapRef: React.MutableRefObject<L.Map | null>,
  isPortrait: boolean,
) {
  return props.posts
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
          // draggable
          position={[post.location!.lat, post.location!.long]}
          eventHandlers={{
            // dragend: (x) => console.log(post.id, x.target._latlng.lat + ',',  x.target._latlng.lng ),
            click: () => {
              const cardDiv = props.cardRefs.get(post.id)!.current!;

              let container = isPortrait ? window : cardDiv.parentElement!;

              container.scrollTo({
                top:
                  cardDiv.offsetTop -
                  cardDiv.parentElement!.offsetTop +
                  (isPortrait ? 150 : -110),
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
            {post.nickname}
          </Tooltip>
        </Marker>
      );
    });
}

export const Map = (props: MapProps) => {
  const mapRef: React.MutableRefObject<L.Map | null> = React.useRef(null);
  const { orientation, width } = useContext(LayoutContext) || {};

  return (
    <MapContainer
      ref={(m) => {
        props.innerRef?.(m!);
        mapRef.current = m;
        const newZoom = Math.log2(Math.max(width || window.innerWidth) / 256);
        if (m && m?.getZoom() < newZoom) {
          m.setZoom(newZoom);
          m.setMinZoom(newZoom);
        }
      }}
      className={[
        styles.map,
        isPortrait(orientation || null) ? styles.header : styles.standalone,
      ].join(" ")}
      zoom={1}
      maxBoundsViscosity={1}
      center={[30, 0]}
      zoomSnap={0.1}
      maxZoom={7}
      minZoom={Math.log2(Math.max(width || window.innerWidth) / 256)}
      maxBounds={[
        [-1000, -Infinity],
        [1200, Infinity],
      ]}
      attributionControl={false}
      inertia={true}
      inertiaDeceleration={4000}
      worldCopyJump={true}
      boundsOptions={{ animate: false }}
      whenReady={() => {
        setTimeout(() => {
          if (mapRef.current) {
            mapRef.current!.invalidateSize();
          }
        }, 100);
      }}
    >
      <AttributionControl position="bottomright" prefix={false} />
      <TileLayer
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
        {createMarkers(props, mapRef, isPortrait(orientation))}
    </MapContainer>
  );
};
