import _get from 'lodash/get';

// This function will return className has-error if field error exists
export const fieldValidate = (field, form) => {
  // console.log("Field Valide:: ", field);
  if (!form || !field) {
    return '';
  }
  const { touched, errors } = form;
  if (touched && _get(touched, field.name)) {
    if (errors[field.name]) {
      return 'is-invalid';
    }
    return '';
  }
  return '';
};

// This function will return boolean value if field error exists
export const fieldValidateBool = (field, form) => {
  // console.log("Form:: ");
  if (!form || !field) {
    return false;
  }
  const { touched, errors } = form;
  if (touched && _get(touched, field.name)) {
    if (errors[field.name]) {
      return true;
    }
    return false;
  }
  return false;
};
