// @flow
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { sideNav } from '@/constants/secure-template';
import { companySideNav } from '@/constants/secure-template-company';
import { useRouter } from 'next/router';
import { getLocalStorageValues } from '@/constants/local-storage';

const SideBar = () => {
  const router = useRouter();

  const {
    user_is_verified,
    user_role,
    user_auth_token,
    profile_link,
  } = getLocalStorageValues();
  const isWindow = typeof window !== 'undefined';
  const [mobileView, setMobileView] = useState(false);
  const [openNav, setOpenNav] = useState(false);
  const [collapseNav, setCollapseNav] = useState({
    events: false,
    users: false,
    referrelFee: false,
  })
  useEffect(() => {
    if (isWindow) {
      window.onscroll = function() {
        if (window.pageYOffset > 50) {
          setMobileView(true);
        } else {
          setMobileView(false);
        }
      };
    }
  }, []);
console.log("router", router.pathname);
  return (
    <div>
      <div className="d-block d-sm-none">
        <ul
          className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
          id="accordionSidebar"
        >
          <Link href="/" as="/">
            <a
              className="sidebar-brand
         d-flex align-items-center justify-content-center"
            >
              <div className="sidebar-brand-text">Social Event Influencer</div>
            </a>
          </Link>
          <div className="text-center text-white mt-2">
            <span>Role:</span> <b>{user_role}</b>
          </div>
          <br />
          <br />
          <div className="max-nav-height">
            {user_role === 'Admin' &&
              companySideNav.map((menu, index) => (
                <React.Fragment key={index}>
                  <hr className="sidebar-divider my-0" />
                  <li
                    className={`nav-item ${router.pathname === menu.href &&
                      'active'}`}
                    title={menu.name}
                  >
                    <Link href={menu.href}>
                      <a className="nav-link" title={menu.name}>
                        <i className={`fas fa-fw ${menu.icon}`}></i>
                        {/* <span>{menu.name}</span> */}
                      </a>
                    </Link>
                  </li>
                  <hr className="sidebar-divider" />
                </React.Fragment>
              ))}

            {user_role !== 'Admin' &&
              sideNav.map((menu, index) => (
                <React.Fragment key={index}>
                  <hr className="sidebar-divider my-0" />
                  <li
                    className={`nav-item ${router.pathname === menu.href &&
                      'active'}`}
                    title={menu.name}
                  >
                    <Link href={menu.href} as={menu.as}>
                      <a className="nav-link">
                        <i className={`fas fa-fw ${menu.icon}`}></i>
                        {/* <span>{menu.name}</span> */}
                      </a>
                    </Link>
                  </li>
                  <hr className="sidebar-divider" />
                </React.Fragment>
              ))}
          </div>
        </ul>
      </div>

      <ul
        className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion d-none d-md-block"
        id="accordionSidebar"
      >
        <Link href="/" as="/">
          <a
            className="sidebar-brand
         d-flex align-items-center justify-content-center"
          >
            <div className="sidebar-brand-text">
              <img alt="logo" src="/img/Logo.png" width={125} />
            </div>
          </a>
        </Link>
        <div className="text-center text-white mt-2">
          Role: <b>{user_role}</b>
        </div>
        <br />
        <br />
        <div className="max-nav-height">
          {user_role === 'Admin' &&
            companySideNav.map((menu, index) => (
              <React.Fragment key={index}>
                <hr className="sidebar-divider my-0" />
                <li
                  className={`nav-item ${router.pathname === menu.href &&
                    'active'}`}
                >
                  <Link href={menu.href}>
                    <a className="nav-link">
                      <i className={`fas fa-fw ${menu.icon}`}></i>
                      <span>{menu.name}</span>
                    </a>
                  </Link>
                </li>
                <hr className="sidebar-divider" />
              </React.Fragment>
            ))}
          {user_role !== 'Admin' &&
            sideNav.map((menu, index) => (
              <React.Fragment key={index}>
                <hr className="sidebar-divider my-0" />
                <li
                  className={`nav-item ${router.pathname === menu.href &&
                    'active'}`}
                >
                  <Link href={menu.href} as={menu.as}>
                    <a className="nav-link">
                      <i className={`fas fa-fw ${menu.icon}`}></i>
                      <span>{menu.name}</span>
                    </a>
                  </Link>
                </li>
                <hr className="sidebar-divider" />
              </React.Fragment>
            ))}
        </div>
      </ul>
    </div>
  );
};

export { SideBar };
