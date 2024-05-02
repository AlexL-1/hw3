import React from "react";

import styles from "./Loader.module.scss";
import classNames from "classnames";

export type LoaderProps = {
  size?: "s" | "m" | "l";
  className?: string;
};

const Loader: React.FC<LoaderProps> = ({
  size = "s",
  className,
}: LoaderProps) => {
  let classNameString: string = styles.loader;

  if (size === "s") classNameString += " " + styles.loader_s;
  else if (size === "l") classNameString += " " + styles.loader_l;
  else if (size === "m") classNameString += " " + styles.loader_m;

  if (className) classNameString += " " + className;

  return <div className={classNameString}></div>;
};

export default Loader;
