import classes from './MyButton.module.css';

type MyButtonProps = {
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const MyButton: React.FC<MyButtonProps> = ({ children, ...props }) => {
  return (
    <button {...props} className={classes.myBtn}>
      {children}
    </button>
  );
};
