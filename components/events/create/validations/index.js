import * as Yup from 'yup';

export const validateAddEventForm = Yup.object().shape({
  influencer_id: Yup.string().required('Influencer ID is mandatory'),
  event_name: Yup.string().required('Event Name is mandatory'),
  event_type: Yup.string().required('Event Type is mandatory'),
  event_location: Yup.string().required('Event Location is Mandatory'),
  event_date: Yup.string().required('Event Date is mandatory'),
  no_of_tickets: Yup.number()
    .positive('No of Tickets should be greater then 0')
    .typeError('No of Tickets must be a number')
    .required('No of Tickets is mandatory'),
  ticket_price: Yup.number()
    .positive('Ticket Price should be greater then 0')
    .typeError('Ticket Price must be a number')
    .required('Ticker Price is mandatory'),
});
