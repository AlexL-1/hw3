import * as React from 'react';
import { IconProps } from '../Icon';

const ArrowDownIcon: React.FC<IconProps> = (props: IconProps) => {
  let strokeColor: string = '#518581';
  if (props.color == 'accent') strokeColor = '#518581';
  if (props.color == 'primary') strokeColor = 'black';
  if (props.color == 'secondary') strokeColor = '#AFADB5';

  return (
    <svg width="24" height="24" viewBox="-12 -16 24 24" {...props}>
      <path
        d="M-9,-8 L0,0 L9,-8"
        strokeWidth="2"
        stroke={strokeColor}
        fill="none"
      />
    </svg>
  );
};

export default ArrowDownIcon;
