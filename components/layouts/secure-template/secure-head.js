// @flow
import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

const SecureHead = () => {
  const router = useRouter();
  return (
    <Head>
      <title>Social Event Influencer</title>
      <link rel="icon" href="/favicon.ico" />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
      />
      {router.pathname.includes('admin') === true && (
        <link href="/css/admin.css" rel="stylesheet" />
      )}
      {router.pathname.includes('admin') === true && (
        <link href="/css/admin-table.css" rel="stylesheet" />
      )}
      {router.pathname.includes('admin') === true && (
        <link
          href="/fontawesome-free/css/all.min.css"
          rel="stylesheet"
          type="text/css"
        />
      )}
    </Head>
  );
};
export default SecureHead;
