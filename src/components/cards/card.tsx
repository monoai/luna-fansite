import * as React from "react";
import styles from "./card.module.css";

export const Card = (props: React.PropsWithChildren<{}>) => (
  <div className={styles.card}>
  <h4>{props.children}</h4>
  <p className={styles.message}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed porta odio et commodo condimentum. Duis auctor diam sem, quis porta metus commodo ac. Donec volutpat tempor ante eget finibus. Donec id bibendum dui. Duis ligula sapien, porta at egestas eu, scelerisque sed diam. Ut cursus ligula ut luctus volutpat. Nam condimentum sed odio vel pretium. Mauris a egestas nibh, ac pellentesque felis. Quisque egestas massa sed odio eleifend, sit amet sodales tellus elementum. Cras egestas ante quis metus tempor, vel sodales ligula tincidunt.

  Sed auctor pharetra ex, non euismod lectus volutpat et. Vivamus arcu mi, malesuada et ullamcorper eu, semper quis sem. Sed laoreet turpis nisl, ut scelerisque nisl consequat eget. Maecenas euismod gravida aliquam. In ac augue finibus, sollicitudin neque ac, placerat ex. Fusce volutpat lacus ut nisi lacinia, sed molestie ex viverra. Aenean risus arcu, porta quis vestibulum ac, pellentesque nec quam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc sed blandit dolor. Ut odio mi, lobortis tempor venenatis sit amet, euismod ac mauris.
  </p>
  </div>
);
