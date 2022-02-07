// @flow
import React from 'react';

const GetStarted = () => {
  return (
    <section className="page-section bg-primary" id="about">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center">
            <h2 className="text-white mt-0">We've got what you need!</h2>
            <hr className="divider light my-4" />
            <p className="text-white-50 mb-4">
              Start Bootstrap has everything you need to get your new website up
              and running in no time! Choose one of our open source, free to
              download, and easy to use themes! No strings attached!
            </p>
            <a
              className="btn btn-light btn-xl js-scroll-trigger"
              href="#services"
            >
              Get Started!
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
export { GetStarted };
