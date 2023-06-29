import { FormState } from '../Types/FormState';

export const validation = (state: FormState): FormState => {
  const errors = {
    email: '',
    password: '',
    confirmPassword: '',
  };

  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

  if (state.email === '') {
    errors.email = 'Email should not be empty';
  } else if (!email_pattern.test(state.email)) {
    errors.email = 'Invalid email';
  }

  if (state.password === '') {
    errors.password = 'Password should not be empty';
  } else if (!password_pattern.test(state.password)) {
    errors.password = 'Password should have at least 1 capital and small letters and a number';
  }

  if (state.confirmPassword === '' || state.confirmPassword !== state.password) {
    errors.confirmPassword = 'Passwords aren`t matching';
  }

  /* eslint-disable-next-line */
  console.log('v', errors);

  return errors;
};
