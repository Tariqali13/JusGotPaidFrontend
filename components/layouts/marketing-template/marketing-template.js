// @flow
import React from 'react';
import NProgress from 'nprogress';
import Router from 'next/router';
import { Header, Footer, TopHeader } from './components';
import MarketingHead from './marketing-head';

type Props = {
  children: any,
  showMenu?: boolean,
};

const MarketingTemplate = (props: Props) => {
  const { children } = props;
  Router.onRouteChangeStart = () => {
    NProgress.start();
  };
  Router.onRouteChangeComplete = () => {
    NProgress.done();
  };
  Router.onRouteChangeError = () => {
    NProgress.done();
  };
  return (
    <React.Fragment>
      <MarketingHead />
      <Header {...props} />
      {children}
      <Footer />
    </React.Fragment>
  );
};

MarketingTemplate.defaultProps = {
  showMenu: true,
};

export default MarketingTemplate;
