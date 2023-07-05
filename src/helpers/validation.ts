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

  if (pass.trim() === '') {
    setDirty(true);
    setMessage('Password should not be empty');
  } else if (!PASS_REF.test(pass)) {
    setDirty(true);
    setMessage('Should have capital, small letters and a number');
  }
};

export const emailValidate = (
  emailData: string,
  setDirty: (value: boolean) => void,
  setMessage: (value: string) => void,
) => {
  const EMAIL_REF = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailData.trim() === '') {
    setDirty(true);
    setMessage('Email should not be empty');
  } else if (!EMAIL_REF.test(emailData)) {
    setDirty(true);
    setMessage('Email is not valid');
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
