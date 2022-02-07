// @flow
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Wrapper } from './style';

const Vidoes = () => {
  return (
    <Wrapper>
        <Container fluid>
            <Row>
                <Col className="h_iframe" style={{'padding': '0'}}>
                    <iframe frameBorder="0" allowFullScreen src="https://www.youtube.com/embed/guntcsvtKKc?autoplay=0&fs=1&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start=0&end=0&origin=http://youtubeembedcode.com">
                    </iframe>
                </Col>
                <Col className="h_iframe" style={{'padding': '0'}}>
                    <iframe frameBorder="0" allowFullScreen src="https://www.youtube.com/embed/DX4dW5HEJpY?autoplay=0&fs=1&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start=0&end=0&origin=http://youtubeembedcode.com">
                    </iframe>
                </Col>
                <Col className="h_iframe" style={{'padding-left': '0'}}>
                    <iframe frameBorder="0" allowFullScreen src="https://www.youtube.com/embed/e3dKD8wb2XU?autoplay=0&fs=1&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start=0&end=0&origin=http://youtubeembedcode.com">
                    </iframe>
                </Col>
            </Row>
        </Container>
    </Wrapper>
  );
};
export { Vidoes };
