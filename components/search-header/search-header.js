// @flow
import React, { useState, useEffect } from 'react';
import { getLocalStorageValues } from '@/constants/local-storage';
import Router, { useRouter } from 'next/router';
import { appUrl } from '@/constants/index';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Message } from '@/components/alert/message';
import Link from 'next/link';
import _get from 'lodash.get';
import { useMutation } from 'react-query';
import { CONNECT_STRIPE, UPDATE_USER_STRIPE_DETAILS } from './queries';

type Props = {
  userData: any,
  refetchUserData: any,
};

const SearchHeader = (props: Props) => {
  const router = useRouter();
  const { userData, refetchUserData } = props;
  const { status, accountId } = router.query;
  const { user_email, user_id, profile_link } = getLocalStorageValues();
  const [userDropDown, setUserDropDown] = useState(false);
  const [
    updateUserDetail,
    { isLoading: isLoadingUserDetailUpdate },
  ] = useMutation(UPDATE_USER_STRIPE_DETAILS);
  const handleLogout = () => {
    localStorage.clear();
    Router.push('/', '/');
  };
  const isAdmin = _get(userData, 'role', 'User') === 'Admin';
  const [connectStripe, { isLoading }] = useMutation(CONNECT_STRIPE);
  const handleConnectStripe = async () => {
    await connectStripe(
      {
        clientCallbackUrl: `${appUrl}${router.pathname}?userId=${_get(
          userData,
          '_id',
        )}`,
      },
      {
        onSuccess: async res => {
          await refetchUserData();
          window.open(_get(res, 'data', ''), '_self');
        },
        onError: error => {
          Message.error(error, null);
        },
      },
    );
  };
  const handleUpdateUserDetail = async () => {
    await updateUserDetail(
      {
        id: _get(userData, '_id'),
        data: {
          account_id: accountId,
          is_stripe_connected: true,
        },
      },
      {
        onSuccess: async () => {
          Router.push(
            `${appUrl}${router.pathname}`,
            `${appUrl}${router.pathname}`,
          );
          await refetchUserData();
        },
        onError: error => {
          Message.error(error, null);
        },
      },
    );
  };
  useEffect(() => {
    if (
      status == 'true' &&
      accountId &&
      !_get(userData, 'is_stripe_connected') &&
      _get(userData, '_id')
    ) {
      handleUpdateUserDetail();
    }
  }, [status, accountId, _get(userData, '_id')]);
  return (
    <nav
      className="navbar navbar-expand
       navbar-light bg-white topbar
        mb-4 static-top shadow"
    >
      {/* <button
        id="sidebarToggleTop"
        className="btn btn-link d-md-none rounded-circle mr-3"
      >
        <i className="fa fa-bars"></i>
      </button>
      <form
        className="d-none
         d-sm-inline-block
         form-inline mr-auto
          ml-md-3 my-2 my-md-0
           mw-100 navbar-search"
      >
        <div className="input-group">
          <input
            type="text"
            className="form-control bg-light border-0 small"
            placeholder="Search for..."
            aria-label="Search"
            aria-describedby="basic-addon2"
          />
          <div className="input-group-append">
            <button className="btn btn-primary" type="button">
              <i className="fas fa-search fa-sm"></i>
            </button>
          </div>
        </div>
      </form> */}

      <ul className="navbar-nav ml-auto">
        {!_get(userData, 'is_stripe_connected', false) && (
          <li className="nav-item" onClick={handleConnectStripe}>
            <button className="btn btn-info ml-3 mt-4 btn-sm text-nowrap">
              Connect Stripe
            </button>
          </li>
        )}
        <li className="nav-item">
          <CopyToClipboard
            style={{ marginTop: '1rem' }}
            text={`${appUrl}/register/${profile_link}`}
            onCopy={() =>
              Message.success(null, {
                message: 'Profile Linked Copied',
              })
            }
          >
            <button className="btn btn-primary ml-3 mt-4 btn-sm text-nowrap">
              Copy Referral Link
            </button>
          </CopyToClipboard>
        </li>
        <div className="topbar-divider d-none d-sm-block"></div>
        <li className="nav-item dropdown no-arrow">
          <a
            className="nav-link dropdown-toggle"
            href="#"
            id="userDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            onClick={() => setUserDropDown(!userDropDown)}
          >
            <span className="mr-2 d-none d-lg-inline text-gray-600 small">
              {_get(userData, 'image_id.file_url') && (
                <img
                  alt="profile-image"
                  className="rounded-circle"
                  style={{ width: '40px' }}
                  src={_get(userData, 'image_id.file_url')}
                />
              )}
              {!_get(userData, 'image_id.file_url') && (
                <span>
                  {_get(userData, 'first_name')} {_get(userData, 'last_name')}
                </span>
              )}
            </span>
          </a>
          <div
            className={`dropdown-menu
             dropdown-menu-right shadow
              animated--grow-in ${userDropDown && 'show'}`}
            aria-labelledby="userDropdown"
          >
            <Link href="/admin/profile">
              <a className="dropdown-item">
                <i
                  className="fas fa-user
                 fa-sm fa-fw mr-2
                  text-gray-400"
                />
                Profile
              </a>
            </Link>
            <div className="dropdown-divider" />
            <a
              className="dropdown-item"
              href="#"
              data-toggle="modal"
              data-target="#logoutModal"
              onClick={handleLogout}
            >
              <i
                className="fas fa-sign-out-alt
                 fa-sm fa-fw mr-2
                  text-gray-400"
              />
              Logout
            </a>
          </div>
        </li>
      </ul>
    </nav>
  );
};
export default SearchHeader;
