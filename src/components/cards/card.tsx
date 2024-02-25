import * as React from "react";
import styles from "./card.module.css";

type CardProps = {
  name: string;
  onClick: () => void;
  message: string;
};

export const Card = ({ name, onClick, message }: CardProps) => (
  <div className={styles.card}>
    <div style={{ display: "flex", alignItems: "center" }}>
      <h4>{name}</h4>
      <button
        onClick={onClick}
        style={{
          marginLeft: "auto",
          padding: "0.5rem",
          backgroundColor: "#cbf0f",
          boxShadow: "none",
          border: "1px solid #cbf0ff",
        }}
      >
        View
      </button>
    </div>
    <p className={styles.message}>{message}</p>
  </div>
);
