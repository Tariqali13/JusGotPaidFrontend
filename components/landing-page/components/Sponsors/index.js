// @flow
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Wrapper, TextWrapper, HeadingOur, HeadingSponsors } from './style';

const Sponsors = () => {
  return (
    <Wrapper>
      <TextWrapper>
        <HeadingOur>Our </HeadingOur>
        <HeadingSponsors>Sponsors</HeadingSponsors>
      </TextWrapper>
    </Wrapper>
  );
};
export { Sponsors };
