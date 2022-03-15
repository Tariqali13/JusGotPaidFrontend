// @flow
import React, { useEffect } from 'react';
import NProgress from 'nprogress';
import { getLocalStorageValues } from '@/constants/local-storage';
import Router, { useRouter } from 'next/router';
import { removeLocalStorageCred } from '@/utils/local-storage';
import _get from 'lodash.get';
import { useQuery } from 'react-query';
import reactQueryConfig from '@/constants/react-query-config';
import SearchHeader from '@/components/search-header';
import TemplateContext from './context';
import { GET_USER_BY_ID } from './queries';
import { SideBar } from './components';
import SecureHead from './secure-head';

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
  const isEnabled = typeof user_id === 'string';
  const {
    data: userData,
    refetch: refetchUserData,
    isLoading: isLoadingUserData,
  } = useQuery(['GET_USER_BY_ID', { userId: user_id }], GET_USER_BY_ID, {
    ...reactQueryConfig,
    enabled: isEnabled,
    onSuccess: async res => {
      const routesForUsers = [
        '/admin/dashboard',
        '/admin/events',
        '/admin/sales',
        '/admin/referral-users',
      ];
      if (
        user_auth_token &&
        _get(res, 'data.role') === 'User' &&
        !routesForUsers.includes(pathname)
      ) {
        Router.push('/admin/dashboard', '/admin/dashboard');
      }
      if (!user_auth_token) {
        await removeLocalStorageCred();
        Router.push('/', '/');
      }
    },
    onError: async () => {
      await removeLocalStorageCred();
      Router.push('/login', '/login', { shallow: true });
    },
  });
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
    <TemplateProvider
      value={{
        userData: _get(userData, 'data', {}),
        refetchUserData,
        isLoadingUserData,
      }}
    >
      <SecureHead />
      <div id="wrapper">
        <SideBar />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <SearchHeader
              userData={_get(userData, 'data', {})}
              refetchUserData={refetchUserData}
            />
            {children}
          </div>
          {/* <Footer /> */}
        </div>
      </div>
    </TemplateProvider>
  );
};
export default SecureTemplate;
