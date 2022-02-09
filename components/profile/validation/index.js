import * as Yup from 'yup';
import {phoneNumberRegex} from "@/constants/regex-constants";
import { PASSWORD_REGEX, PASSWORD_VALIDATION_MESSAGE }  from "@/constants/regex-constants";

export const validateEditProfileForm = Yup.object().shape({
  first_name: Yup.string().required('First Name is mandatory'),
  last_name: Yup.string().required('Last Name is mandatory'),
  email: Yup.string().required('Email Type is mandatory'),
  phone_number: Yup.string()
    .matches(phoneNumberRegex, 'Phone number must be number')
    .required('Phone Number is Mandatory'),
});

export const validateUpdatePassForm = Yup.object().shape({
  old_password: Yup.string()
    .required('Old Password is required')
    .matches(PASSWORD_REGEX, PASSWORD_VALIDATION_MESSAGE),
  password: Yup.string()
    .required('Password is required')
    .matches(PASSWORD_REGEX, PASSWORD_VALIDATION_MESSAGE),
  confirm_password: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password'), null], 'Password does not match'),
});
