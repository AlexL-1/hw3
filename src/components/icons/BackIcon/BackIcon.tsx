import * as React from "react";
import { IconProps } from "../Icon";
import { styles } from "../Icon/Icon.module.scss";

const BackIcon: React.FC<IconProps> = (props: IconProps) => {
  let newClassName: string = {styles.icon} + " " + props.className;

  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className = {newClassName}
      {...props}
    >
      <path
        d="M20.1201 26.56L11.4268 17.8667C10.4001 16.84 10.4001 15.16 11.4268 14.1333L20.1201 5.44"
        stroke={strokeColor}
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
export default BackIcon;
