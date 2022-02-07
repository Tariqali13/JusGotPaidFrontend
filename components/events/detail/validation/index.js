import * as Yup from 'yup';

export const validateBuyEventForm = Yup.object().shape({
  event_id: Yup.string().required('Event ID is mandatory'),
  user_id: Yup.string().required('User ID is mandatory'),
  referral_link: Yup.string(),
  tickets_buy: Yup.number()
    .positive('No of Tickets Purchase should be greater then 0')
    .typeError('No of Tickets Purchase must be a number')
    .required('No of Tickets Purchase is mandatory'),
  total_amount: Yup.number()
    .positive('Total amount should be greater then 0')
    .typeError('Total amount must be a number')
    .required('Total amount is mandatory'),
});
