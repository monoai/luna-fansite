// when the package is downloaded
import styles from "./map.module.css";
import { MapContainer, TileLayer, Marker, Popup, CircleMarker, Polygon} from 'react-leaflet'

export const Map = () => {

    // item positions
    // probably make a array with a struct for seperate countries so when displaying without map, it is organised by countries
    const view: [number, number] = [51.505, -0.09];
    const marker: [number, number] = [51.505, -0.09];
    const circle: [number, number] = [51.508, -0.11];
    const polygon: [number, number][]=[
        [51.51, -0.12],
        [51.51, -0.13],
        [51.53, -0.13]]
    return(
      //map container adjust from ./map.modules.css
      <MapContainer center={view} zoom={13} className={styles.map}>
        <TileLayer
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        //ALL MARKERS HAVE A POPUP
        // single point marker
        <Marker position={marker}>
          <Popup>
            marker :D <br /> Easily customizable.
          </Popup>
        </Marker>

        //circle marker (DOES NOT CHANGE SIZE DESPITE ZOOM)
        <CircleMarker
          center = {circle}
          pathOptions = {{color: 'red'}}
          radius = {20}>
          <Popup>
            circle :D <br /> Easily customizable.
          </Popup>
        </CircleMarker>

        //lots of coordinates to highligt area probably wont get used
        <Polygon
          pathOptions={{ color: 'purple' }}
          positions={polygon}>
          <Popup>
            marker :D <br /> Easily customizable.
          </Popup>
        </Polygon>

      </MapContainer>
    );
  };
