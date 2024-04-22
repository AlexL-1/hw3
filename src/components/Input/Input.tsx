import React from "react";

import styles from "./Input.module.scss";

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "value"
> & {
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
  /** Слот для иконки справа */
  afterSlot?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ value, onChange, afterSlot, className, ...props }: InputProps, ref) => {
    let classNameString: string = styles.input;
    if (afterSlot) classNameString += " " + styles.inputLoading;

    return (
      <>
        <input
          type="text"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          ref={ref}
          className={classNameString}
          {...props}
        />
        {afterSlot && (
          <div>
            <div>{afterSlot}</div>
          </div>
        )}
      </>
    );
  }
);

export default Input;
