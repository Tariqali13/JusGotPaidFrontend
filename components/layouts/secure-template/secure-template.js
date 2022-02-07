// @flow
import React, { useEffect } from 'react';
import NProgress from 'nprogress';
import Router from 'next/router';
import { getLocalStorageValues } from '@/constants/local-storage';
import SecureHead from './secure-head';
import { SideBar, Footer } from './components';

type Props = {
  children: any,
};

const SecureTemplate = (props: Props) => {
  const { children } = props;
  // const { user_auth_token, user_role } = getLocalStorageValues();
  const { user_auth_token } = getLocalStorageValues();
  Router.onRouteChangeStart = () => {
    NProgress.start();
  };
  Router.onRouteChangeComplete = () => {
    NProgress.done();
  };
  Router.onRouteChangeError = () => {
    NProgress.done();
  };
  useEffect(() => {
    // if (!user_auth_token || user_role === 'Patron') {
    if (!user_auth_token) {
      Router.push('/', '/');
    }
  }, [user_auth_token]);
  return (
    <React.Fragment>
      <SecureHead />
      <div id="wrapper">
        <SideBar />
        <div id="content-wrapper" className="d-flex flex-column">
          {children}
          <Footer />
        </div>
      </div>
    </React.Fragment>
  );
};
export default SecureTemplate;
