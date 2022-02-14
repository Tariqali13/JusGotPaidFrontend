// @flow
import React from 'react';
import MarketingTemplate from '@/layout/marketing-template';
import {
  Portfolio,
  Information,
  Sponsors,
  Vip,
  Vidoes,
  Events,
  Started,
} from './components';

const LandingPage = props => {
  return (
    <MarketingTemplate>
      <Started />
      <Events {...props} />
      <Vidoes />
      <Vip />
      <Portfolio />
      <Sponsors />
      <Information />
    </MarketingTemplate>
  );
};
export default LandingPage;
