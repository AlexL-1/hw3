import * as React from 'react';
import { IconProps } from '../Icon';

const CheckIcon: React.FC<IconProps> = (props: IconProps) => {
  let strokeColor: string = '#518581';
  if (props.color == 'accent') strokeColor = '#518581';
  if (props.color == 'primary') strokeColor = 'black';
  if (props.color == 'secondary') strokeColor = '#AFADB5';

  return (
    <svg viewBox="0 0 24 24" width="24" height="24" {...props}>
      <path
        d="M4 11.6129L9.87755 18L20 7"
        stroke={strokeColor}
        strokeWidth="2"
        fill="none"
      />
    </svg>
  );
};
export default CheckIcon;
