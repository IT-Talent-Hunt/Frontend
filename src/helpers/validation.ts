// import { FormState } from '../Types/FormState';

// export const validation = (state: FormState): FormState => {
//   const errors = {
//     email: '',
//     password: '',
//     confirmPassword: '',
//   };

//   const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

//   if (state.email === '') {
//     errors.email = 'Email should not be empty';
//   } else if (!email_pattern.test(state.email)) {
//     errors.email = 'Invalid email';
//   }

//   if (state.password === '') {
//     errors.password = 'Password should not be empty';
//   } else if (!password_pattern.test(state.password)) {
//     errors.password = 'Password should have at least 1 capital and small letters and a number';
//   }

//   if (state.confirmPassword === '' || state.confirmPassword !== state.password) {
//     errors.confirmPassword = 'Passwords aren`t matching';
//   }

//   /* eslint-disable-next-line */
//   console.log('v', errors);

//   return errors;
// };

export const passwordValidate = (
  pass: string,
  setDirty: (value: boolean) => void,
  setMessage: (value: string) => void,
) => {
  const PASS_REF = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

  setDirty(true);

  if (pass.trim() === '') {
    setMessage('The "Password" field is required. Please enter your password.');
  } else if (pass.length < 8 || pass.length > 30) {
    setMessage('The password must be 8-30 symbols long and contain only a-z Latin letters and digits.');
  } else if (!PASS_REF.test(pass)) {
    setMessage('"Password" field should contain upper, lower case letter and digits');
  } else {
    setDirty(false);
  }
};

export const emailValidate = (
  emailData: string,
  setDirty: (value: boolean) => void,
  setMessage: (value: string) => void,
) => {
  const EMAIL_REF = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  setDirty(true);

  if (emailData.trim() === '') {
    setMessage('The "Email" field is required');
  } else if (emailData.length < 8 || emailData.length > 30) {
    setMessage('The email must be 8-30 symbols long and contain only a-z Latin letters and digits.');
  } else if (!EMAIL_REF.test(emailData)) {
    setMessage('Please ensure that your email address is correctly formatted');
  } else {
    setDirty(false);
  }
};

export const confirmPasswordValidate = (
  confirmPasswordData: string,
  passwordData: string,
  setDirty: (value: boolean) => void,
  setMessage: (value: string) => void,
) => {
  if (confirmPasswordData.trim() === '') {
    setDirty(true);
    setMessage('Password should not be empty');
  }

  if (confirmPasswordData !== passwordData) {
    setDirty(true);
    setMessage('Passwords aren`t matching');
  }
};

export const nameValidation = (
  nameData: string,
  nameType: string,
  setIsValueDirty: (value: boolean) => void,
  setValueMessage: (value: string) => void,
) => {
  const preparetedName = nameType[0].toUpperCase() + nameType.slice(1);

  if (nameType === 'position') {
    if (nameData.trim() === '') {
      setIsValueDirty(true);
      setValueMessage(`${preparetedName} should be selected`);
    }
  } else if (nameData.trim() !== '') {
    if (nameData[0] !== nameData[0].toUpperCase()) {
      setIsValueDirty(true);
      setValueMessage(`The ${nameType} should start with the upper case letter`);
    }
  } else {
    setIsValueDirty(true);
    setValueMessage(`${preparetedName} should not be empty`);
  }
};
