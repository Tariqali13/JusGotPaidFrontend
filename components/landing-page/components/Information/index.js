// @flow
import React from 'react';
import { Wrapper } from './style';
import { Container, Row, Col } from 'react-bootstrap';

const Information = () => {
  return (
    <Wrapper>
      <Container>
        <Row>
          <Col md={{ span: 3 }} sm={{ span: 6 }} xs={{ span: 12 }}>
            <img className='landing-images' src="img/landing-page/image1.png"/>
          </Col>
          <Col md={{ span: 3 }} sm={{ span: 6 }} xs={{ span: 12 }}>
            <img className='landing-images' src="img/landing-page/image2.png"/>
          </Col>
          <Col md={{ span: 3 }} sm={{ span: 6 }} xs={{ span: 12 }}>
            <img className='landing-images' src="img/landing-page/image3.png"/>
          </Col>
          <Col md={{ span: 3 }} sm={{ span: 6 }} xs={{ span: 12 }}>
            <img className='landing-images' src="img/landing-page/image4.png"/>
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
};
export { Information };
