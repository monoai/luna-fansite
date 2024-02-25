import classnames from "classnames";

//imported styles and locations (later add icons)
import styles from "./map.module.css";
import { instances } from "./locations";

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

L.Marker.prototype.options.icon = L.icon({
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
//delete up to here to check if defaults are working

// for (var object of instances) {
//   object.log();
// }
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

  const [markers, setMarkers] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const tempMarkers: JSX.Element[] = [];
    instances.forEach((object) => {
      tempMarkers.push(
        <Marker
          position={[object.coords[0], object.coords[1]]}
          eventHandlers={{
            click: () => {
              setOverlayInfo({
                username: object.user_name,
                message: object.message,
                open: true,
              });
            },
          }}
        >
          <Tooltip
            offset={[15, -40]}
            direction="center"
            permanent
            className={styles.numberIcon}
          ></Tooltip>
        </Marker>,
      );
    });
    setMarkers(tempMarkers);
    // Todo: markers should be a prop and this should depend on that
  }, []);

  return (
    <div>
      <div className={styles.float_boundaries}>
        <Overlay {...overlayInfo} />
      </div>
      <MapContainer
        ref={(m) =>
          props.innerRef?.(m!, (info) =>
            setOverlayInfo({ ...info, open: true }),
          )
        }
        className={styles.map}
        zoom={1.5}
        center={[30, 0]}
        zoomSnap={0.5}
        maxZoom={9}
        minZoom={1.5}
        maxBounds={[
          [-1000, -Infinity],
          [1000, Infinity],
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

        {/*everything here is clustered*/}
        <MarkerClusterGroup maxClusterRadius={50}>{markers}</MarkerClusterGroup>
        <MyComponent
          closeOverlay={() => setOverlayInfo((v) => ({ ...v, open: false }))}
        />
      </MapContainer>
    </div>
  );
};
