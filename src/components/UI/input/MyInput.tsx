import React from 'react';
import classes from './MyInput.module.css';

type MyInputProps = {} & React.InputHTMLAttributes<HTMLInputElement>;

export const MyInput = React.forwardRef<HTMLInputElement, MyInputProps>((props, ref) => {
  return <input ref={ref} className={classes.myInput} {...props} />;
});
