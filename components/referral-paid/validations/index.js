import * as Yup from 'yup';

export const validatePayForm = Yup.object().shape({
  amount_type: Yup.string().required('Amount Type is mandatory'),
  manual_amount: Yup.number().when('amount_type', {
    is: 'manual_amount',
    then: Yup.number()
      .positive('Positive value is allowed')
      .min(1, 'Amount should be greater then zero')
      .required('Manual Amount is mandatory'),
  }),
});
