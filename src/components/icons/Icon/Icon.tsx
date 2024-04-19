import * as React from "react";

export type IconProps = React.SVGAttributes<SVGElement> & {
  className?: string;
  color?: "primary" | "secondary" | "accent";
};

/*
const Icon: React.FC<React.PropsWithChildren<IconProps>> = ({
  _className,
  _color
}: IconProps) => null;

export default Icon;
*/
