import React from 'react';

//import '../styles/styles.css';

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value'
> & {
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
  /** Слот для иконки справа */
  afterSlot?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ value, onChange, afterSlot, style, ...props }: InputProps, ref) => {
    var styles2 = {};
    if (afterSlot) {
      //убрать правый border, добавить справа div, в центр div запихнуть
      if (!style) style = {};
      style['borderRightWidth'] = '0px';
      styles2 = {
        borderLeftWidth: '0px',
        width: 'auto',
        display: 'inline-block',
        height: '52px',
        verticalAlign: 'top',
      };
    }

    return (
      <>
        <input
          type="text"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          ref={ref}
          style={style}
          {...props}
        />
        {afterSlot && (
          <div style={styles2}>
            <div style={{ marginTop: '16px', marginRight: '5px' }}>
              {afterSlot}
            </div>
          </div>
        )}
      </>
    );
  }
);

export default Input;
