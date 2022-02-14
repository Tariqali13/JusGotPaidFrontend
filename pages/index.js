import React from 'react';
import LandingPage from '@/components/landing-page';
import { http_req } from '@/utils/http';
import { baseURL } from '@/constants/env';

const Home = props => {
  return <LandingPage {...props} />;
};

export async function getServerSideProps() {
  const eventRes = await http_req(
    // eslint-disable-next-line max-len
    `${baseURL}/v1/event?page_no=1&records_per_page=8&passed_events=false`,
    'get',
  );
  const eventsResp = eventRes;
  return {
    props: {
      allRes: {
        eventsResp,
      },
    },
  };
}

export default Home;
