// @flow
import React from 'react';
import Link from 'next/link';
import { companySideNav } from '@/constants/secure-template-company';
import { useRouter } from 'next/router';

const CompanySideBar = () => {
  const router = useRouter();
  return (
    <ul
      className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
      id="accordionSidebar"
    >
      <Link href="/" as="/">
        <a
          className="sidebar-brand
         d-flex align-items-center justify-content-center"
        >
          {/* <div className="sidebar-brand-icon rotate-n-15"> */}
          {/*  <i className="fas fa-laugh-wink"></i> */}
          {/* </div> */}
          <div className="sidebar-brand-text mx-3">Social Event Influencer</div>
        </a>
      </Link>
      <br />
      <br />
      <br />
      {companySideNav &&
        companySideNav.map((menu, index) => (
          <React.Fragment key={index}>
            <hr className="sidebar-divider my-0" />
            <li
              className={`nav-item ${router.pathname === menu.href &&
                'active'}`}
            >
              <Link href={menu.href}>
                <a className="nav-link">
                  <i className="fas fa-fw fa-tachometer-alt"></i>
                  <span>{menu.name}</span>
                </a>
              </Link>
            </li>
            <hr className="sidebar-divider" />
          </React.Fragment>
        ))}
    </ul>
  );
};
export { CompanySideBar };
