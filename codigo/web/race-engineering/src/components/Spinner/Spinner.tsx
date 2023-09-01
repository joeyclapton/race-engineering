import Image from "next/image";
import React from "react";

import spinner from "../images/spinner.gif";
import styles from "../styles/style.module.css";

const Spinner = () => {
  return (
    <>
      <Image className={styles["img"]} src={spinner} alt="loading..." />
    </>
  );
};

export default Spinner;
