import * as React from "react";
import "./card_grid.css";

export const CardGrid = (props: React.PropsWithChildren<{}>) => (
  <div className="cardGrid">{props.children}</div>
);
