// @flow
import React from 'react';
import SecureTemplate from '@/layout/secure-template';
import SearchHeader from '@/components/search-header';
import { useQuery } from 'react-query';
import { GET_EVENTS_DATA } from '@/components/events/queries';
import { GET_REFERRAL_USERS } from '@/components/referral-users/queries';
import reactQueryConfig from '@/constants/react-query-config';
import { getLocalStorageValues } from '@/constants/local-storage';
import _get from 'lodash/get';
import { GET_SALES_DATA } from './queries';

const DashboardManager = () => {
  const { user_id, user_role, profile_link } = getLocalStorageValues();

  const { data: eventsData } = useQuery(
    ['EVENTS_DATA', { events_passed: false, all_events: false }],
    GET_EVENTS_DATA,
    {
      ...reactQueryConfig,
    },
  );

  const { data: salesData } = useQuery(
    ['SALES_DATA', { id: user_id }],
    GET_SALES_DATA,
    {
      ...reactQueryConfig,
    },
  );

  const { data: referralData } = useQuery(
    ['REFERRAL_DATA', { referralLink: profile_link }],
    GET_REFERRAL_USERS,
    {
      ...reactQueryConfig,
    },
  );

  const availableTickets = () => {
    let tickets = 0;
    for (const item of _get(eventsData, 'data', [])) {
      tickets += Number(item.no_of_tickets) - Number(item.no_of_tickets_sold);
    }
    return tickets;
  };

  const totalSales = () => {
    let sales = 0;
    if (user_role === 'Admin') {
      for (const sale of _get(salesData, 'data', [])) {
        sales += parseFloat(sale.admin_amount);
      }
      return parseFloat(sales).toFixed(2);
    }

    if (user_role === 'User') {
      for (const sale of _get(salesData, 'data', [])) {
        sales += parseFloat(sale.influencer_amount);
      }
      return parseFloat(sales).toFixed(2);
    }

    return parseFloat(sales).toFixed(2);
  };

  return (
    <SecureTemplate>
      <div className="container-fluid">
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
        </div>

        <div className="row">
          <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-xs-12 mb-4">
            <div className="card border-left-primary shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                      Total Current Events
                    </div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                      {_get(eventsData, 'data', []).length}
                    </div>
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-calendar fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-xs-12 mb-4">
            <div className="card border-left-success shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                      Earnings (Total)
                    </div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                      ${totalSales()}
                    </div>
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-xs-12 mb-4">
            <div className="card border-left-info shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                      Total Referral Users
                    </div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                      {_get(referralData, 'data', []).length}
                    </div>
                  </div>
                  <div className="col-auto">
                    {/* <i className="fas fa-dollar-sign fa-2x text-gray-300"></i> */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-xs-12 mb-4">
            <div className="card border-left-success shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                      Total Available Tickets
                    </div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                      {availableTickets()}
                    </div>
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SecureTemplate>
  );
};
export default DashboardManager;
