import * as React from "react";
import { IconProps } from "../Icon";
import styles from "../Icon/Icon.module.scss";

const CheckIcon: React.FC<IconProps> = ({ className, color }: IconProps) => {
  let newClassName: string = styles.icon + " " + color + " " + className;

  return (
    <svg viewBox="0 0 24 24" width="24" height="24" className={newClassName}>
      <path d="M4 11.6129L9.87755 18L20 7" strokeWidth="2" fill="none" />
    </svg>
  );
};
export default CheckIcon;
