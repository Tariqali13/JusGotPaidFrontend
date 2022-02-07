// @flow
import React from 'react';
import SecureTemplate from '@/components/layouts/secure-template';
import SearchHeader from '@/components/search-header';
import { useTable } from 'react-table';
import { useQuery } from 'react-query';
import Router from 'next/router';
import { getLocalStorageValues } from '@/constants/local-storage';
import reactQueryConfig from '@/constants/react-query-config';
import ProgressLoader from '@/components/loaders/progress-loader';
import _get from 'lodash/get';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Message } from '@/components/alert/message';
import { GET_EVENTS_DATA } from './queries';

const columns = [
  {
    Header: 'Event Name',
    accessor: 'event_name', // accessor is the "key" in the data
  },
  {
    Header: 'Event Type',
    accessor: 'event_type',
  },
  {
    Header: 'Event Date',
    accessor: 'event_date',
  },
  {
    Header: 'Event Location',
    accessor: 'event_location',
  },
  {
    Header: 'Total Tickets',
    accessor: 'no_of_tickets',
  },
];
const influencerEvents = () => {
  return (
    <SearchHeader />
  );
};

export default influencerEvents;
