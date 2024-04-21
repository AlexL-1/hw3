import React from "react";
import Loader from "../Loader";
import styles from "./Button.module.scss";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Состояние загрузки */
  loading?: boolean;
  /** Текст кнопки */
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  loading,
  children,
  ...props
}: ButtonProps) => {
  let classNameString = styles.button;
  let { className, disabled, ...otherProps } = props;

  if (loading) {
    //у такой кнопки не должно быть hover

    classNameString = styles.withloader;

    if (!disabled) classNameString = styles.fakeDisabled;

    return (
      //надо узнать, есть ли в props className  добавить туда наш

      <button
        type="button"
        className={classNameString}
        {...otherProps}
        disabled
      >
        <Loader size="s" className="loaderwhite" />
        {children}
      </button>
    );
  }

  return (
    <button
      type="button"
      className={classNameString}
      {...otherProps}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
