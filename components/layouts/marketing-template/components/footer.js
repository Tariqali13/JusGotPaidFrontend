// @flow
import React from 'react';
import { FooterWrapper, CopyRights } from './style';

const Footer = () => {
  return (
    <FooterWrapper className="py-5">
      <div className="container">
        <CopyRights>&copy; 2021 All Rights Reserved.</CopyRights>
      </div>
    </FooterWrapper>
  );
};
export { Footer };
