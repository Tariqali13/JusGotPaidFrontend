import * as Yup from 'yup';
import { phoneNumberRegex } from '@/constants/regex-constants';
import { yupToFormErrors } from 'formik';

export const validateSignUpForm = Yup.object().shape({
  first_name: Yup.string().required('First Name is mandatory'),
  last_name: Yup.string().required('Last Name is mandatory'),
  phone_number: Yup.string()
    .matches(phoneNumberRegex, 'Phone number must be number')
    .required('Phone Number is Mandatory'),
  email: Yup.string()
    .email('Email must be valid email')
    .required('Email is mandatory'),
  referral_link: Yup.string(),
  // role: Yup.string().required('Role is mandatory'),
  // referral_link: Yup.string().when('role', {
  //   is: (role) => {return role === 'Influencer'},
  //   then: Yup.string().required("Influencer required referral link"),
  //   otherwise: Yup.string(),
  // }),
});
