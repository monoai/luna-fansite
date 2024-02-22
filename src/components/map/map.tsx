//imported styles and locations (later add icons)
import styles from "./map.module.css";
import { coords, instances } from "../submissions/locations"

//downloaded packages link
import { MapContainer, TileLayer, Marker, Tooltip} from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-cluster'
import 'leaflet/dist/leaflet.css'

//leaflet defaults broke on me somehow.... this is completely unesssary unless its broken like me
import L from 'leaflet';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

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


export const Map = () => {

    //running for loop to generate all the coordinates
    //any suggestion to elimnate this variable for more effecient runtime?
    for (var object of instances) {
      object.log()
    }
    const markers = [];

    for (var object of instances) {
      markers.push(
        <Marker position={[object.coords[0],object.coords[1]]}>
          <Tooltip offset={[15,-40]} direction = "center" permanent className = {styles.numberIcon}>
          </Tooltip>
        </Marker>
        );
      };

    return(
      <MapContainer
          className={styles.map}
          zoom={1.5}
          center={[30,0]}
          zoomSnap = {0.5}
          maxZoom = {9}
          minZoom = {1.5}
          maxBounds	= {[[-1000,-Infinity],[1000, Infinity]]}
          inertia = {true}
          //(funny inertiaDeceleration = {1})
          inertiaDeceleration = {4000}
          worldCopyJump = {true}
          >
        <TileLayer
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        {/*everything here is clustered*/}
        <MarkerClusterGroup chunkedLoading>
         {markers}
        </MarkerClusterGroup>

      </MapContainer>
    );
  };
