import React from 'react';
import EditProfile from '@/components/profile/edit/edit-profile';
import SecureTemplate from '@/layout/secure-template';

const EditProfileMain = () => {
  return (
    <SecureTemplate>
      <EditProfile />
    </SecureTemplate>
  );
};
export default EditProfileMain;
