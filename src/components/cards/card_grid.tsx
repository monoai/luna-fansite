import * as React from "react";
import styles from "./card_grid.module.css";

export const CardGrid = (props: React.PropsWithChildren<{}>) => (
  <div className={styles.cardGrid}>{props.children}</div>
);
