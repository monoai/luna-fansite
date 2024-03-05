// import styles from "./map.module.css";

// import { MapContainer, TileLayer, Marker, Tooltip} from 'react-leaflet'
import "leaflet/dist/leaflet.css";
//location export in the format of latling (-y,x)
export const coords: [number, number][] = [
  //temporary
  [11, 11],
  [15, 15],
  //end of temporary
];

class marker_details {
  message: string;
  user_name: string;
  coords: [number, number];
  file_path: string;

  // unreliable image input, most likely format first to export
  constructor(
    in_coords: [number, number],
    in_username: string = "Anonymous",
    in_message: string = "User message is unavailable",
    in_image = "",
  ) {
    this.file_path = in_image;
    this.user_name = in_username;
    this.message = in_message;
    this.coords = in_coords;
  }

  log() {
    console.log(
      this.user_name +
        ", " +
        this.message +
        ", " +
        this.coords +
        ", " +
        this.file_path,
    );
  }
}

const test_user = new marker_details([10, 10]);
const test_user_1 = new marker_details(
  [20, 20],
  "test_user",
  "hello world",
  "./file//path",
);
const hillo = new marker_details(
  [50, 50],
  "hillo",
  "Lunatan Sexy Adult Baby",
  "./file//path",
);

export var instances = [
  test_user,
  hillo,
  test_user_1,
  test_user_1,
  test_user_1,
  test_user_1,
  test_user_1,
  test_user_1,
];
