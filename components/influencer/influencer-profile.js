// @flow
import React from 'react';
import MarketingTemplate from '@/layout/marketing-template';

const InfluencerProfile = () => {
  return (
    <MarketingTemplate isColorNav={true}>
      <section className="page-section" id="contact">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <h2 className="mt-0">Influencer Profile</h2>
              <hr className="divider my-4" />
              <p className="text-muted mb-5">
                Detail about Influencer and all it's events
              </p>
            </div>
          </div>
        </div>
      </section>
    </MarketingTemplate>
  );
};
export default InfluencerProfile;
