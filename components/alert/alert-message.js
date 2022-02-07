import React from 'react';

type Props = {
  heading?: string,
  message: string,
};

const AlertMessage = (props: Props) => {
  const { heading, message } = props;
  return (
    <React.Fragment>
      <h4 className="fzl fwm">{heading}</h4>
      <p>{message}</p>
    </React.Fragment>
  );
};

export default AlertMessage;
