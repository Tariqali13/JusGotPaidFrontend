import * as Yup from 'yup';

export const validateForgetPassword = Yup.object().shape({
  email: Yup.string()
    .email('Email must be valid email')
    .required('Email is mandatory'),
});
