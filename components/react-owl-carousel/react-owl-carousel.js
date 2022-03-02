import React, { useEffect, useState } from 'react';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
export let ActiveOwlCarousel: any;

type Props = {
  children: any,
  items: number,
  center: boolean,
  autoplay: boolean,
  mouseDrag: boolean,
  responsive: any,
  startPosition: number,
  handleSelect: any,
}
const ReactOwlCarousel = (props: Props) => {
  const {
    children,
    items = 3,
    center = true,
    autoplay = false,
    mouseDrag = false,
    responsive,
    startPosition = 0,
    handleSelect,
  } = props;
  const [showReactOwlCarousel, setShowReactOwlCarousel] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // eslint-disable-next-line global-require,no-undef
      ActiveOwlCarousel = require('react-owl-carousel');
      setShowReactOwlCarousel(true);
    }
  }, []);
  return (
    <React.Fragment>
      {showReactOwlCarousel ? (
        <ActiveOwlCarousel loop margin={10} nav className="owl-theme">
          {children}
        </ActiveOwlCarousel>
      ) : null}
    </React.Fragment>
  );
};

export default ReactOwlCarousel;
