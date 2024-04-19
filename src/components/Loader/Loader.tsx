import React from 'react';


import styles from "./Loader.module.scss";

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

  
  );
};

export default Loader;
