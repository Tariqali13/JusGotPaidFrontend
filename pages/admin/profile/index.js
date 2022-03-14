import React from 'react';
import Profile from '@/components/profile';
import SecureTemplate from '@/layout/secure-template';

const ProfileMain = () => {
  return (
    <SecureTemplate>
      <Profile />
    </SecureTemplate>
  );
};
export default ProfileMain;
