// when the package is downloaded
import styles from "./map.module.css";
import { MapContainer, TileLayer, Marker, Popup, Tooltip} from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-cluster'
import 'leaflet/dist/leaflet.css'

import L from 'leaflet';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

const defaultIcon = L.icon({
  iconUrl,
  shadowUrl,
});
L.Marker.prototype.options.icon = defaultIcon;

export const Map = () => {
    const markers: [number,number][] = [
      [10,10],
      [11,11],
      [15,15],
    ]
    // item positions
    // probably make a array with a struct for seperate countries so when displaying without map, it is organised by countries
    const view: [number, number] = [51.505, -0.09];
    const marker: [number, number] = [51.505, -0.09];
    var merge = 1;

    //running for loop to generate all the coordinates
    const return_format_markers = [];

    for (var val of markers) {
      console.log(val);
      return_format_markers.push(
        <Marker position={[val[0],val[1]]}>
          <Tooltip offset={[25,0]} direction = "center" permanent className = {styles.number_icon}>
            {merge}
          </Tooltip>
        </Marker>
        );
      };
    return(
      //map container adjust from ./map.modules.css
      <MapContainer center={[15,15]} zoom={13} className={styles.map}>
        <TileLayer
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <MarkerClusterGroup chunkedLoading>
         {return_format_markers}
        </MarkerClusterGroup>

        <Marker position={marker}>
          <Popup>
            marker :D <br /> Easily customizable.
          </Popup>
        </Marker>

      </MapContainer>
    );
  };
/*{(addressPoints as AdressPoint).map((address, index) => (
          <Marker
            key={index}
            position={[address[0], address[1]]}
            title={address[2]}
            icon={customIcon}
          ></Marker>
        ))}*/
