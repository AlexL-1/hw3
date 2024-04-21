import * as React from "react";
import { IconProps } from "../Icon";
import styles from "../Icon/Icon.module.scss";

const NextIcon: React.FC<IconProps> = ({ className, color }: IconProps) => {
  let newClassName: string = styles.icon + " " + color + " " + className;

  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={newClassName}
    >
      <path
        d="M11.88 26.5599L20.5733 17.8666C21.6 16.8399 21.6 15.1599 20.5733 14.1333L11.88 5.43994"
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
    </svg>
  );
};
export default NextIcon;
