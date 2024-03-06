// import * as React from "react";
import { UserPost } from "../../posts";
import styles from "./card.module.css";
import React, { useRef, useEffect } from "react";
import defaultPfp from "./img/default_pfp.png";

type CardProps = {
  // innerRef?: (
  //   item: HTMLElement,
  // ) => void;
  post: UserPost;
  onClick: () => void;
};

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

    let img_root = process.env.PUBLIC_URL + "/user/img/";

    let pfp_src = props.post.has_profile_photo
      ? img_root + props.post.id.toString().padStart(3, "0") + ".pfp.jpg"
      : defaultPfp;

    let images = [];
    for (let i = 0; i < props.post.num_attachments; i++) {
      let img_path =
        img_root +
        props.post.id.toString().padStart(3, "0") +
        "." +
        (i + 1) +
        ".jpg";
      let attachment_thumb = (
        <img key={i} className={styles.attachment} src={img_path} />
      );
      images.push(attachment_thumb);
    }

    return (
      <div ref={ref} className={styles.card}>
        <img className={styles.pfp} src={pfp_src} />

        <div className={styles.container}>
          <div className={styles.nickname}>
            {props.post.id} {props.post.discord_or_nickname}
          </div>

          {detailsSection}

          <p className={styles.message}>{props.post.message}</p>

          {images}
        </div>
      </div>
    );
  },
);
