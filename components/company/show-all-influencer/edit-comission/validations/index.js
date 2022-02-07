import * as Yup from 'yup';

export const validateUpdateComissionForm = Yup.object().shape({
  // influencer_id: Yup.string().required('First Name is mandatory'),
  // admin_id: Yup.string().required('Last Name is mandatory'),
  comission: Yup.number().required('Last Name is mandatory'),
//   user_id: Yup.string().required('User ID is mandatory'),
//   tickets_buy: Yup.number()
//     .positive('No of Tickets Purchase should be greater then 0')
//     .typeError('No of Tickets Purchase must be a number')
//     .required('No of Tickets Purchase is mandatory'),
//   total_amount: Yup.number()
//     .positive('Total amount should be greater then 0')
//     .typeError('Total amount must be a number')
//     .required('Total amount is mandatory'),
});
