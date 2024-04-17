import React from 'react';

export type LoaderProps = {
  /** Размер */
  size?: 's' | 'm' | 'l';
  /** Дополнительный класс */
  className?: string;
};

const Loader: React.FC<LoaderProps> = ({ size, className }: LoaderProps) => {
  if (!size) size = 'l';

  return (
    <div className={className || 'loader-' + size}></div>

    /*
    <svg
      className={className}
      viewBox="-35 -35 70 70"
      width={svgWidth}
      height={svgWidth}
      style={{ marginLeft: '10px' }}
    >
      <path
        d="m30,0 a30,30 0 1 0 -30,30"
        fill="none"
        stroke-width="6"
        stroke="black"
        transform="rotate(-13)"
      />
    </svg>*/
  );
};

export default Loader;
