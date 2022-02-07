// @flow
import React from 'react';
import MarketingTemplate from '@/layout/marketing-template';
import {
  Header,
  Portfolio,
  Information,
  Sponsors,
  Vip,
  Vidoes,
  Events,
  Started
} from './components';

const LandingPage = () => {
  return (
    <MarketingTemplate>
      <Started />
      <Events/>
      <Vidoes/>
      <Vip/>
      <Portfolio />
      <Sponsors />
      <Information />
    </MarketingTemplate>
  );
};
export default LandingPage;
