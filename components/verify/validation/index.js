import * as Yup from 'yup';
import { phoneNumberRegex } from '@/constants/regex-constants';

export const validateVerifyCode = Yup.object().shape({
  code: Yup.string()
    .min(6)
    .max(6)
    .matches(phoneNumberRegex, 'Phone number must be number')
    .required('Phone Number is Mandatory'),
  phone_number: Yup.string().required('Phone number is mandatory'),
  user_id: Yup.string().required('User Id is mandatory'),
});
