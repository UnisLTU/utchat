import React from "react";
import styles from "../styles/Loader.module.css";

const Loader = () => {
  return (
    <div className={styles.wrapper}>
      <span className={`${styles.circle} ${styles.circle_1}`}></span>
      <span className={`${styles.circle} ${styles.circle_2}`}></span>
      <span className={`${styles.circle} ${styles.circle_3}`}></span>
      <span className={`${styles.circle} ${styles.circle_4}`}></span>
      <span className={`${styles.circle} ${styles.circle_5}`}></span>
    </div>
  );
};

export default Loader;
