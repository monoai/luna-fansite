import * as React from "react";
import styles from "./nav_item.module.css";

export const NavItem = (props: React.PropsWithChildren<{}>) => (
  <span className={styles.navItem}>{props.children}</span>
);
