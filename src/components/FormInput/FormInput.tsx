import { FC } from 'react';
import styles from './FormInput.module.scss';

type Props = {
  label: string;
  errorMessage: string;
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
};

export const FormInput: FC<Props> = (props) => {
  const { label, errorMessage, inputProps } = props;
  // const { onChange, id } = inputProps;

  return (
    <label htmlFor="email" className={styles.label}>
      {label}
      <input {...inputProps} />
      <span className={styles.error}>{errorMessage}</span>
    </label>
  );
};
