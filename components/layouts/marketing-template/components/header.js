// @flow
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getLocalStorageValues } from '@/constants/local-storage';
import Router, { useRouter } from 'next/router';

type Props = {
  isColorNav: boolean,
  showMenu: boolean,
};

const Header = (props: Props) => {
  const { isColorNav, showMenu } = props;
  const {
    user_is_verified,
    user_role,
    user_auth_token,
    profile_link,
  } = getLocalStorageValues();
  const router = useRouter();
  const { eventId, influencerId } = router.query;
  const isWindow = typeof window !== 'undefined';
  const [mobileView, setMobileView] = useState(false);
  const [signUpDropDown, setSignUpDropDown] = useState(false);
  const [loginDropDown, setLoginDropDown] = useState(false);
  const [openNav, setOpenNav] = useState(false);
  useEffect(() => {
    if (isWindow) {
      window.onscroll = function() {
        if (window.pageYOffset > 50) {
          setMobileView(true);
        } else {
          setMobileView(true);
        }
      };
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem('user_phone_number');
    localStorage.removeItem('user_is_verified');
    localStorage.removeItem('user_email');
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_role');
    localStorage.removeItem('user_auth_token');
    localStorage.removeItem('profile_link');
    Router.push('/', '/');
  };

  return (
    <nav
      className={`navbar navbar-expand-lg
         navbar-light
          ${mobileView && 'navbar-scrolled'}
           ${isColorNav && 'nav-color-other'}`}
      id="mainNav"
    >
      <div className="container">
        <Link href="/" as="/">
          <a className="navbar-brand js-scroll-trigger">
            <img src="img/Logo.png" width={140}/>
          </a>
        </Link>
        <button
          className="navbar-toggler navbar-toggler-right"
          type="button"
          data-toggle="collapse"
          data-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span
            className="navbar-toggler-icon"
            onClick={() => setOpenNav(!openNav)}
          />
        </button>
        <div
          className={`collapse navbar-collapse ${openNav &&
            mobileView &&
            'show'}`}
          id="navbarResponsive"
        >
          <ul className="navbar-nav ml-auto my-2 my-lg-0">
            {showMenu && (
              <React.Fragment>
                      <li className="nav-item">
                        <a className="nav-link js-scroll-trigger" href="/">
                          Home
                        </a>
                      </li>
                {router.pathname.includes('login') === false &&
                  router.pathname.includes('register') === false && router.pathname.includes('verify-code') === false && (
                    <React.Fragment>
                      <li className="nav-item">
                        <a className="nav-link js-scroll-trigger" href="#about">
                          About
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link js-scroll-trigger"
                          href="#services"
                        >
                          Services
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link js-scroll-trigger"
                          href="#portfolio"
                        >
                          Portfolio
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link js-scroll-trigger"
                          href="#contact"
                        >
                          Contact
                        </a>
                      </li>
                    </React.Fragment>
                  )}
                {!user_auth_token && (
                  <li className="nav-item">
                    <Link href="/login" as="/login">
                      <a className="nav-link js-scroll-trigger">Login</a>
                    </Link>
                  </li>
                )}
                {!user_auth_token && (
                  <li className="nav-item">
                    <Link href="/register" as="/register">
                      <a className="nav-link js-scroll-trigger">Sign up</a>
                    </Link>
                  </li>
                )}
                {/* <li className="nav-item">
                <Link
                      href="/login"
                      as="/login"
                    >
                      <a className="nav-link js-scroll-trigger">
                        Login 
                      </a>
                    </Link>
                </li> */}
                {/* <li className="nav-item">
                <Link
                      href="/register"
                      as="/register"
                    >
                      <a
                        className="nav-link js-scroll-trigger"
                      >
                        Sign up
                      </a>
                    </Link>
                </li> */}
              </React.Fragment>
            )}
            {/* {(!user_auth_token || !user_is_verified) && (
              <React.Fragment>
                <li className="nav-item dropdown no-arrow">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="loginDropDown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    onClick={() => {
                      setLoginDropDown(!loginDropDown);
                      setSignUpDropDown(false);
                    }}
                  >
                    Log in
                  </a>
                  <div
                    className={`dropdown-menu
             dropdown-menu-right ${loginDropDown && 'show'}`}
                    aria-labelledby="loginDropDown"
                  >
                    <Link
                      href="/influencer/login-influencer"
                      as="/influencer/login-influencer"
                    >
                      <a className="nav-link" style={{ color: 'black' }}>
                        Login as influencer
                      </a>
                    </Link>
                    <div className="dropdown-divider"></div>
                    <Link href="/login" as="/login">
                      <a
                        className="nav-link js-scroll-trigger"
                        style={{ color: 'black' }}
                        onClick={() => {
                          if (eventId && influencerId) {
                            localStorage.setItem('event_id', eventId);
                            localStorage.setItem('influencer_id', influencerId);
                          }
                        }}
                      >
                        Login as Patron
                      </a>
                    </Link>
                  </div>
                </li>
                <li className="nav-item dropdown no-arrow">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="signUpDropDown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    onClick={() => {
                      setSignUpDropDown(!signUpDropDown);
                      setLoginDropDown(false);
                    }}
                  >
                    Sign up
                  </a>
                  <div
                    className={`dropdown-menu
             dropdown-menu-right ${signUpDropDown && 'show'}`}
                    aria-labelledby="signUpDropDown"
                  >
                    <Link
                      href="/influencer/register-influencer"
                      as="/influencer/register-influencer"
                    >
                      <a
                        className="nav-link js-scroll-trigger"
                        style={{ color: 'black' }}
                      >
                        Sign up as influencer
                      </a>
                    </Link>
                    <div className="dropdown-divider"></div>
                    <Link href="/register" as="/register">
                      <a
                        className="nav-link js-scroll-trigger"
                        style={{ color: 'black' }}
                        onClick={() => {
                          if (eventId && influencerId) {
                            localStorage.setItem('event_id', eventId);
                            localStorage.setItem('influencer_id', influencerId);
                          }
                        }}
                      >
                        Sign up as Patron
                      </a>
                    </Link>
                  </div>
                </li>
              </React.Fragment>
            )} */}
            {/* {user_auth_token && user_is_verified && user_role === 'Patron' && ( */}
            {user_auth_token && user_is_verified && (
              <li className="nav-item" style={{ cursor: 'pointer' }}>
                <a
                  className="nav-link js-scroll-trigger"
                  style={{ color: 'black' }}
                  onClick={handleLogout}
                >
                  Log out
                </a>
              </li>
            )}
            {/* {user_auth_token && user_is_verified && user_role === 'Influencer' && ( */}
            {user_auth_token && user_is_verified && (
              <li className="nav-item">
                <Link href="/admin/dashboard" as="/admin/dashboard">
                  <a
                    className="nav-link js-scroll-trigger"
                    style={{ color: 'black' }}
                  >
                    Dashboard
                  </a>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

Header.defaultsProps = {
  isColorNav: false,
};

export { Header };
