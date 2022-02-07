// @flow
import React from 'react';
import { ToastContainer } from 'react-toastify';
import { verifyUserToken } from '@/components/util/user-token_verify';
import 'react-phone-input-2/lib/style.css';
import 'react-toastify/dist/ReactToastify.css';

type Props = {
  Component: any,
  pageProps: any,
};

function MyApp(props: Props) {
  const { Component, pageProps } = props;
  verifyUserToken();
  return (
    <React.Fragment>
      <Component {...pageProps} />
      <ToastContainer />
    </React.Fragment>
  );
}

export default MyApp;
