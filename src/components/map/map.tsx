// when the package is downloaded
import styles from "./map.module.css";
import { MapContainer, TileLayer, Marker, Popup, CircleMarker, Polygon, Pane, Circle, Tooltip} from 'react-leaflet'

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
    const final: [number, number] = [10,10];
    const potato: [number, number] = [10,10];
    var merge = 1;
    return(
      //map container adjust from ./map.modules.css
      <MapContainer center={final} zoom={13} className={styles.map}>
        <TileLayer
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        /**ALL MARKERS HAVE A POPUP
         single point marker*/
         <Marker position={final}>
           <Tooltip offset={[0,-10]} direction = "center" permanent className = {styles.number_icon}>
             {merge}
           </Tooltip>
         </Marker>
        <Marker position={marker}>
          <Popup>
            marker :D <br /> Easily customizable.
          </Popup>
        </Marker>

        /**circle marker (DOES NOT CHANGE SIZE DESPITE ZOOM)*/
        <CircleMarker
          center = {circle}
          pathOptions = {{color: 'red'}}
          radius = {20}>
          <Popup>
            circle :D <br /> Easily customizable.
          </Popup>
        </CircleMarker>

        /**lots of coordinates to highligt area probably wont get used*/
        <Polygon
          pathOptions={{ color: 'purple' }}
          positions={polygon}>
          <Popup>
            marker :D <br /> Easily customizable.
          </Popup>
        </Polygon>

        <Pane name="custom" style={{ zIndex: 100 }}>
          <Circle center={[50.5, 30.5]} radius={200} />
        </Pane>

        <Circle center={[50.5, 40.5]} radius={200} pathOptions={{ color: 'blue' }} />

      </MapContainer>
    );
  };

/**
	const trd = [63.41, 10.41];

	const map = L.map('map', {
		center: [40, 0],
		zoom: 1
	});

	const positron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attribution">CARTO</a>'
	}).addTo(map);

	const marker = L.marker(trd).addTo(map);

	const pane = map.getPane('markerPane');

	const paneCorner = document.createElement('div');
	paneCorner.style.width = '12px';
	paneCorner.style.height = '12px';
	paneCorner.style.borderTop = '2px red solid';
	paneCorner.style.borderLeft = '2px red solid';

	pane.appendChild(paneCorner);

	marker._icon.style.border = '1px solid blue';

	const crsMarker = L.marker(map.unproject([0, 0]), {
		icon: L.divIcon({
			className: 'crsMarker',
			iconAnchor: [0, 0]
		})
	}).addTo(map);


	const markerOffsetLine = L.polyline([[0, 0], [0, 0]], {color: 'skyblue'}).addTo(map);
	const iconOffsetLine = L.polyline([[0, 0], [0, 0]], {color: 'blue'}).addTo(map);

	function info() {
		const pixelOrigin = map.getPixelOrigin();
		const markerPixelCoords = map.project(trd, map.getZoom());
		const markerAnchor = marker.options.icon.options.iconAnchor;
		const markerOffset = L.DomUtil.getPosition(marker._icon);

		document.getElementById('info').innerHTML =
			'<div style="color: green">CRS origin: 0,0</div>' +
			`<div style="color: red">px origin: &Delta;${pixelOrigin.x},${pixelOrigin.y}</div>` +
			`<div style="color: blue">marker px coords:${markerPixelCoords.x.toFixed(2)},${markerPixelCoords.y.toFixed(2)}</div>` +
			`<div style="color: blue">marker anchor: &Delta;${markerAnchor[0]},${markerAnchor[1]}</div>` +
			`<div style="color: skyblue">marker pane offset: &Delta;${markerOffset.x},${markerOffset.y}</div>`;

		markerOffsetLine.setLatLngs([map.unproject(pixelOrigin), map.unproject(pixelOrigin.add(markerOffset))]);
		iconOffsetLine.setLatLngs([map.unproject(pixelOrigin.add(markerOffset)), map.unproject(pixelOrigin.add(markerOffset).subtract(markerAnchor))]);
	}

	map.on('load move moveend zoomend viewreset', info);

	info();
*/
