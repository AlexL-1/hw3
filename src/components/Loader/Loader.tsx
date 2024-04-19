import React from "react";

import styles from "./Loader.module.scss";

export type LoaderProps = {
  /** Размер */
  size?: "s" | "m" | "l";
  /** Дополнительный класс */
  className?: string;
};

const Loader: React.FC<LoaderProps> = ({ size, className }: LoaderProps) => {
  if (!size) size = "s";

  let classNameString: string = styles.loader + " " + size;
  if (className) classNameString += " " + className;

  return <div className={classNameString}></div>;
};

export default Loader;
