import React from 'react';
import Loader from '../Loader';

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
  /*const styles = {
    height: '52px',
    backgroundColor: '#518581',
    border: 'none',
    color: 'white',
    fontSize: '18px',
    paddingLeft: '20px',
    paddingRight: '20px',
  };*/

  if (loading) {
    //у такой кнопки не должно быть hover

    let { className, disabled, ...otherProps } = props;

    if (className != '') className += ' withloader';
    else className = 'withloader';

    if (!disabled) className += ' fakeDisabled';

    return (
      //надо узнать, есть ли в props className  добавить туда наш

      <button type="button" {...otherProps} className={className} disabled>
        <Loader size="s" className="loaderwhite" />
        {children}
      </button>
    );
  }

  return (
    <button type="button" {...props}>
      {children}
    </button>
  );
};

export default Button;
