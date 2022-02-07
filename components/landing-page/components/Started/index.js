// @flow
import React from 'react';
import { Wrapper, TextWrapper, HeadingOur, HeadingSponsors, TextOverLay, BackgroundImage, HeadingRed, HeadingWrapper, HeadingWhite, RedBox, BoxText, LabelInfo, WhiteButton, RedButton } from './style';
import { Container, Row, Col } from 'react-bootstrap';

const Started = () => {
  return (
    <Wrapper>
        <BackgroundImage>
            <TextOverLay>
                <HeadingWrapper>
                    <HeadingRed>SHARE </HeadingRed>
                    <HeadingWhite> THE </HeadingWhite>
                    <HeadingRed> VIBE </HeadingRed>
                </HeadingWrapper>
                <Container>
                    <Row>
                        <Col md={{ span: 2, offset: 2 }} sm={{ span: 2, offset: 2 }} xs={{ span: 3 }} >
                            <RedBox>
                                <BoxText>
                                    384
                                </BoxText>
                                <LabelInfo>DAYS</LabelInfo>
                            </RedBox>
                        </Col>
                        <Col md={{ span: 2}} sm={{ span: 2}} xs={{ span: 3 }}>
                            <RedBox>
                                <BoxText>
                                    20
                                </BoxText>
                                <LabelInfo>HRS</LabelInfo>
                            </RedBox>
                        </Col>
                        <Col md={{ span: 2 }} sm={{ span: 2}} xs={{ span: 3 }}>
                            <RedBox>
                                <BoxText>
                                    37
                                </BoxText>
                                <LabelInfo>MINS</LabelInfo>
                            </RedBox>
                        </Col>
                        <Col md={{ span: 2 }} sm={{ span: 2}} xs={{ span: 3 }}>
                            <RedBox>
                                <BoxText>
                                    50
                                </BoxText>
                                <LabelInfo>SEC</LabelInfo>
                            </RedBox>
                        </Col>
                    </Row>
                </Container>
                <br/>
                <br/>
                <br/>
                <Container>
                    <Row>
                        <Col md={{ span: 3, offset: 3 }}  sm={{ span: 5, offset: 1 }}  xs={{ span: 5, offset: 1 }}><WhiteButton>VIEW EVENT</WhiteButton></Col>
                        <Col md={{ span: 3 }} sm={{ span: 5}}  xs={{ span: 5}}><RedButton>BUY TICKET</RedButton></Col>
                    </Row>
                </Container>
            </TextOverLay>
        </BackgroundImage>
    </Wrapper>
  );
};
export { Started };
