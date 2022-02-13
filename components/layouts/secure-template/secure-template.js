// @flow
import React, { useEffect } from 'react';
import NProgress from 'nprogress';
import { getLocalStorageValues } from '@/constants/local-storage';
import SecureHead from './secure-head';
import { SideBar, Footer } from './components';
import { GET_USER_BY_ID } from './queries';
import Router, { useRouter } from "next/router";
import { removeLocalStorageCred } from '@/utils/local-storage';
import TemplateContext from './context';
import _get from 'lodash.get';
import { useQuery } from "react-query";
import reactQueryConfig from "@/constants/react-query-config";

type Props = {
  children: any,
};

const SecureTemplate = (props: Props) => {
  const { children } = props;
  const router = useRouter();
  const { pathname } = router;
  const TemplateProvider = TemplateContext.Provider;
  // const { user_auth_token, user_role } = getLocalStorageValues();
  const { user_auth_token, user_id } = getLocalStorageValues();
  const isEnabled = typeof user_id === "string";
  console.log("user_id", user_id)
  const {
    data: userData,
    refetch: refetchUserData,
    isLoading: isLoadingUserData,
  } = useQuery(['GET_USER_BY_ID',  { userId: user_id }], GET_USER_BY_ID, {
    ...reactQueryConfig,
    enabled: isEnabled,
    onError: async () => {
      await removeLocalStorageCred();
      Router.push('/login', '/login', { shallow: true });
    },
  });
  console.log("userData", userData);
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
    <TemplateProvider
      value={{
        userData: _get(userData, 'data', {}),
        refetchUserData: refetchUserData,
        isLoadingUserData: isLoadingUserData,
      }}
    >
      <SecureHead />
      <div id="wrapper">
        <SideBar />
        <div id="content-wrapper" className="d-flex flex-column">
          {children}
          {/*<Footer />*/}
        </div>
      </div>
    </TemplateProvider>
  );
};
export default SecureTemplate;
