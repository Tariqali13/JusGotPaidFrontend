import * as Yup from 'yup';

export const validateLoginForm = Yup.object().shape({
  password: Yup.string().required('Password is mandatory'),
  email: Yup.string()
    .email('Email must be valid email')
    .required('Email is mandatory'),
});
