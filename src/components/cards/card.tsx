// import * as React from "react";
import { UserPost } from "../../posts";
import styles from "./card.module.css";
import React, { useRef, useEffect } from "react";
import ModalImage from "react-modal-image";
import {
  getAttachment,
  getAttachmentThumbnail,
  getPfp,
} from "../../postAssets";

type CardProps = {
  // innerRef?: (
  //   item: HTMLElement,
  // ) => void;
  post: UserPost;
  onClick: () => void;
};

function attachmentsSection(post: UserPost) {
  if (post.num_attachments == 0) {
    return null;
  }

  let images = [];
  for (let ix = 0; ix < post.num_attachments; ix++) {
    let attachment_thumb = (
      <ModalImage
        loading="lazy"
        className={styles.attachment}
        small={getAttachmentThumbnail(post, ix)}
        large={getAttachment(post, ix)}
        hideDownload={true}
        alt={post.discord_or_nickname!}
      />
    );
    images.push(attachment_thumb);
  }

  return <div className={styles.attachments}>{images}</div>;
}

export const Card = React.forwardRef(
  (props: CardProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    let locationLabel = null;

    if (props.post.location) {
      locationLabel = (
        <div>
          <div style={{ display: "inline-block" }}>
            {props.post.location!.name}
          </div>
          <button onClick={props.onClick} className={styles.map_button}>
            Map
          </button>
        </div>
      );
    }

    let xButton = null;
    if (props.post.x_id) {
      xButton = (
        <a
          className={styles.x_link}
          href={"https://www.twitter.com/" + props.post.x_id}
        >
          {props.post.x_id}
        </a>
      );
    }

    let detailsSection = null;
    if (locationLabel != null) {
      detailsSection = (
        <div className={styles.user_details}>
          {locationLabel!}
          {xButton}
        </div>
      );
    } else if (xButton != null) {
      detailsSection = <div style={{ textAlign: "right" }}>{xButton}</div>;
    }

    return (
      <div ref={ref} className={styles.card}>
        <img className={styles.pfp} src={getPfp(props.post)} />

        <div className={styles.container}>
          <div className={styles.nickname}>
            {props.post.discord_or_nickname}
          </div>

          {detailsSection}

          <p className={styles.message}>{props.post.message}</p>

          {attachmentsSection(props.post)}
        </div>
      </div>
    );
  },
);
