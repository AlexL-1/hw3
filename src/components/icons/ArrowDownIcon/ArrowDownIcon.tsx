import * as React from "react";
import { IconProps } from "../Icon";
import styles from "../Icon/Icon.module.scss";

const ArrowDownIcon: React.FC<IconProps> = ({
  className,
  color,
}: IconProps) => {
  let newClassName: string = styles.icon + " " + color + " " + className;

  return (
    <svg
      width="24"
      height="24"
      viewBox="-12 -16 24 24"
      className={newClassName}
    >
      <path d="M-9,-8 L0,0 L9,-8" strokeWidth="2" fill="none" />
    </svg>
  );
};

export default ArrowDownIcon;
