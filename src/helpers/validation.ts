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
  setIsSucces: (value: boolean) => void,
) => {
  const PASS_REF = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

  setDirty(true);
  setIsSucces(false);

  if (pass.trim() === '') {
    setMessage('The "Password" field is required. Please enter your password.');
  } else if (pass.length < 8 || pass.length > 30) {
    setMessage('The password must be 8-30 symbols long and contain only a-Z Latin letters and digits.');
  } else if (!PASS_REF.test(pass)) {
    setMessage('"Password" field should contain upper, lower case letter and digits');
  } else {
    setDirty(false);
    setIsSucces(true);
  }
};

export const emailValidate = (
  emailData: string,
  setDirty: (value: boolean) => void,
  setMessage: (value: string) => void,
  setIsSucces: (value: boolean) => void,

) => {
  const EMAIL_REF = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  setDirty(true);
  setIsSucces(false);

  if (emailData.trim() === '') {
    setMessage('The "Email" field is required. Please enter your password.');
  } else if (emailData.length < 8 || emailData.length > 30) {
    setMessage('The email must be 8-30 symbols long and contain only a-z Latin letters and digits.');
  } else if (!EMAIL_REF.test(emailData)) {
    setMessage('Please ensure that your email address is correctly formatted (e.g., example@example.com)');
  } else {
    setDirty(false);
    setIsSucces(true);
  }
};

export const confirmPasswordValidate = (
  confirmPasswordData: string,
  passwordData: string,
  setDirty: (value: boolean) => void,
  setMessage: (value: string) => void,
  setIsSucces: (value: boolean) => void,
) => {
  setDirty(true);
  setIsSucces(false);

  if (confirmPasswordData.trim() === '') {
    setMessage('The "Repeat password" field is required. Please enter your password.');
  } else if (confirmPasswordData.length < 8 || confirmPasswordData.length > 30) {
    setMessage('The password must be 8-30 symbols long and contain only a-Z Latin letters, digits, and special symbols.');
  } else if (confirmPasswordData !== passwordData) {
    setMessage('Passwords must match. Please verify that you entered the same password as before.');
  } else {
    setDirty(false);
    setIsSucces(true);
  }
};

export const textValidation = (
  textData: string,
  textType: string,
  setIsValueDirty: (value: boolean) => void,
  setValueMessage: (value: string) => void,
  setIsSucces: (value: boolean) => void,
  setValue?: (value: string) => void,
) => {
  const preparetedName = textType[0].toUpperCase() + textType.slice(1);

  if (setValue && textData.length) {
    const preparetedValue = textData[0].toUpperCase() + textData.slice(1);

    setValue(preparetedValue);
  }

  setIsValueDirty(true);
  setIsSucces(false);

  if (textData.trim() === '') {
    setValueMessage(`${preparetedName} should not empty`);
  } else {
    setIsValueDirty(false);
    setIsSucces(true);
  }
};

export const selectValidation = (
  textData: string,
  textType: string,
  setIsValueDirty: (value: boolean) => void,
  setValueMessage: (value: string) => void,
  setIsSuccess: (value: boolean) => void,
) => {
  const preparetedName = textType[0].toUpperCase() + textType.slice(1);

  setIsValueDirty(true);
  setIsSuccess(false);

  if (!textData) {
    setValueMessage(`${preparetedName} should be selected`);
  } else {
    setIsValueDirty(false);
    setIsSuccess(true);
  }
};
