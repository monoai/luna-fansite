import { UserPost } from "./posts";
import defaultPfp from "./img/default_pfp.png";

let img_root =
  process.env.PUBLIC_URL + process.env.REACT_APP_USER_ASSETS_PATH + "/img";

export function getAttachmentThumbnail(post: UserPost, attachmentIx: number) {
  return img_root + "/" + post.id + "/" + attachmentIx + ".thumb.jpg";
}

export function getAttachment(post: UserPost, attachmentIx: number) {
  return img_root + "/" + post.id + "/" + attachmentIx + ".jpg";
}

export function getPfp(post: UserPost) {
  if (post.has_profile_photo) {
    return img_root + "/" + post.id + "/pfp.jpg";
  } else {
    return defaultPfp;
  }
}
