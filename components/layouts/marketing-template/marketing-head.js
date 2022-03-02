// @flow
import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

const MarketingHead = () => {
  const router = useRouter();
  return (
    <Head>
      <title>Social Event Influencer</title>
      <link rel="icon" href="/favicon.ico" />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
      />
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js" />
      {router.pathname.includes('admin') === false && (
        <link rel="stylesheet" href="/css/marketing.css" />
      )}
    </Head>
  );
};
export default MarketingHead;
