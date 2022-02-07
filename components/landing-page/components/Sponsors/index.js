// @flow
import React from 'react';
import { Wrapper, TextWrapper, HeadingOur, HeadingSponsors } from './style';
import { Container, Row, Col } from 'react-bootstrap';

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
