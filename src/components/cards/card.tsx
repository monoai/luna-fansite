import * as React from "react";
import styles from "./card.module.css";

export const Card = (props: React.PropsWithChildren<{}>) => (
  <div className={styles.card}>{props.children}</div>
);
