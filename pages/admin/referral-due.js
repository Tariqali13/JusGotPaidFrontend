// @flow
import React from 'react';
import ReferralPaid from '@/components/referral-paid';
import SecureTemplate from '@/layout/secure-template';

const ReferralDueMain = () => {
  return (
    <SecureTemplate>
      <ReferralPaid is_due={true} />
    </SecureTemplate>
  );
};

export default ReferralDueMain;
