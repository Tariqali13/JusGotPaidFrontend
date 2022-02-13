import React from 'react';
import SearchHeader from '@/components/search-header';
import Router from 'next/router';
import { Tabs, Tab } from 'react-bootstrap';
import { UpdatePassword, Profile } from '@/components/profile/edit/components';

const EditProfile = () => {
  return (
    <div id="content">
      <SearchHeader />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 col-sm-12">
            <h1 className="h3 mb-2 text-gray-800">
              <button className="btn btn-primary" onClick={() => Router.back()}>
                <i className="fas fa-arrow-left" />
              </button>{' '}
              Edit Profile
            </h1>
            <p className="mb-4">Proper information</p>
          </div>
        </div>
        <div className="card shadow mb-4 max-card-height">
          <div className="card-body">
            <Tabs
              defaultActiveKey="profile"
              id="uncontrolled-tab-example"
              className="mb-3"
            >
              <Tab eventKey="profile" title="Profile">
                <Profile />
              </Tab>
              <Tab eventKey="update_password" title="Update Password">
                <UpdatePassword />
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditProfile;
