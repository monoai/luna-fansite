// represents one row in the JSON input
type UserPostData = [
  string, // 0: id
  string, // 1: message
  string, // 2: discord_or_nickname
  string | null, // 3: x_id
  string | null, // 4: location name
  number | null, // 5: latitude
  number | null, // 6: longitude
  boolean, // 7: has_profile_photo
  number, // 8: num_attachments
];

export interface UserLocation {
  name: string;
  lat: number;
  long: number;
}

// used in the application
export interface UserPost {
  id: string;
  message: string;
  discord_or_nickname: string | null;
  x_id: string | null;
  location: UserLocation | null;
  has_profile_photo: boolean;
  num_attachments: number;
}

export async function fetchPosts(callback: (posts: UserPost[]) => void) {
  let response = await fetch(process.env.PUBLIC_URL + "/user/posts.json");
  let items = (await response.json()) as UserPostData[];

  let posts = items.map((row) => {
    let location =
      row[4] != null && row[5] != null && row[6] != null
        ? { name: row[4]!, lat: row[5]!, long: row[6]! }
        : null;

    return {
      id: row[0],
      message: row[1],
      discord_or_nickname: row[2],
      x_id: row[3],
      location: location,
      has_profile_photo: row[7],
      num_attachments: row[8],
    };
  });

  callback(posts);
}
