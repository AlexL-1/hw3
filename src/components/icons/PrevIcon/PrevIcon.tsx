import * as React from "react";
import { IconProps } from "../Icon";
import styles from "../Icon/Icon.module.scss";

const PrevIcon: React.FC<IconProps> = ({ className, color }: IconProps) => {
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
        d="M20.1201 26.56L11.4268 17.8667C10.4001 16.84 10.4001 15.16 11.4268 14.1333L20.1201 5.44"
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
    </svg>
  );
};
export default PrevIcon;
