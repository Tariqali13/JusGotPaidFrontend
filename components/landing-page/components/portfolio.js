// @flow

import React from 'react';

const Portfolio = () => {
  return (
    <div id="portfolio">
      <div className="container-fluid p-0">
        <div className="row no-gutters">
          <div className="col-lg-4 col-sm-4 col-xs-12">
            <a className="portfolio-box" href="#">
              <img
                className="img-fluid"
                src="img/portfolio/thumbnails/Img3.jpg"
                alt=""
              />
              <div className="portfolio-box-caption">
                <div className="project-category text-white-50">Events</div>
                <div className="project-name">VIP</div>
              </div>
            </a>
          </div>
          <div className="col-lg-4 col-sm-4 col-xs-12">
            <a className="portfolio-box" href="#">
              <img
                className="img-fluid"
                src="img/portfolio/thumbnails/Img2.jpg"
                alt=""
              />
              <div className="portfolio-box-caption">
                <div className="project-category text-white-50">Category</div>
                <div className="project-name">Project Name</div>
              </div>
            </a>
          </div>
          <div className="col-lg-4 col-sm-4 col-xs-12">
            <a className="portfolio-box" href="#">
              <img
                className="img-fluid"
                src="img/portfolio/thumbnails/Img1.jpg"
                alt=""
              />
              <div className="portfolio-box-caption p-3">
                <div className="project-category text-white-50">Category</div>
                <div className="project-name">Project Name</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export { Portfolio };
