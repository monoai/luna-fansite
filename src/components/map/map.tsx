import styles from "./map.module.css";

//downloaded packages link
import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  AttributionControl,
  useMap,
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
            // dragend: (x) =>
            //   console.log(
            //     post.id,
            //     x.target._latlng.lat + ",",
            //     x.target._latlng.lng,
            //   ),
            click: () => {
              const cardDiv = props.cardRefs.get(post.id)!.current!;

              let container = isPortrait ? window : cardDiv.parentElement!;

              container.scrollTo({
                top:
                  cardDiv.offsetTop -
                  cardDiv.parentElement!.offsetTop +
                  (isPortrait ? 150 : -30),
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

function ZoomSetter() {
  const map = useMap();

  let rect = map.getContainer().getBoundingClientRect();

  let newZoom = 0.0;
  if (rect.height > 250) {
    newZoom = Math.log2(Math.max(rect.width, rect.height) / 250);
  }

  map.setMinZoom(newZoom);
  map.setZoom(newZoom);

  return null;
}

export const Map = (props: MapProps) => {
  const mapRef: React.MutableRefObject<L.Map | null> = React.useRef(null);
  const orientation = useContext(LayoutContext);

  return (
    <MapContainer
      ref={(m) => {
        props.innerRef?.(m!);
        mapRef.current = m;
      }}
      className={[
        styles.map,
        isPortrait(orientation) ? styles.header : styles.standalone,
      ].join(" ")}
      zoom={1}
      center={[20, 20]}
      zoomSnap={0.1}
      maxZoom={7}
      maxBoundsViscosity={1}
      maxBounds={[
        [-90, -1000],
        [90, 1000],
      ]}
      attributionControl={false}
      inertia={true}
      inertiaDeceleration={4000}
      worldCopyJump={true}
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
      <ZoomSetter></ZoomSetter>
    </MapContainer>
  );
};
