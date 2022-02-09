// @flow
import React, { useState } from 'react';
import { getLocalStorageValues } from '@/constants/local-storage';
import Router from 'next/router';
import { appUrl } from '@/constants/index';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Message } from '@/components/alert/message';
import Link from 'next/link';

const SearchHeader = () => {
  const { user_email, profile_link } = getLocalStorageValues();
  const [userDropDown, setUserDropDown] = useState(false);
  const handleLogout = () => {
    localStorage.clear();
    Router.push('/', '/');
  };
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
        <li className="nav-item">
            <CopyToClipboard
              style={{marginTop: '1rem'}}
              text={`${appUrl}/register/${profile_link}`}
              onCopy={() =>
                Message.success(null, {
                  message: 'Profile Linked Copied',
                })
              }>
              <button className="btn btn-primary ml-3 mt-4 btn-sm text-nowrap">Copy Referral Link</button>
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
            onClick={() => setUserDropDown(!userDropDown)} >
            <span className="mr-2 d-none d-lg-inline text-gray-600 small">
              {user_email || 'Admin'}
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
