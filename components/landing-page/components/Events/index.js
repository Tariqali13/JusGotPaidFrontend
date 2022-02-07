// @flow
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Wrapper, RowWrapper, HeadingOne, HeadingTwo, Event, Label, LabelValue } from './style';
import { useMutation } from 'react-query';
import { ALL_EVENTS } from './queries';

const Events = () => {
  const [allEvents, { setAllEvents }] = useMutation(ALL_EVENTS);
  return (
    <Wrapper className='events_background'>
        <Container fluid>
            <RowWrapper>
              <HeadingOne>Event </HeadingOne>
              <HeadingTwo>   SCHEDULE</HeadingTwo>
            </RowWrapper>
            <Row>
              <Col md={{ span: 3, offset: 3 }}>
                <Event>
                  <p><Label>Event Name: </Label><LabelValue>Test</LabelValue></p>
                  <p><Label>Event Type:</Label> <LabelValue>Party</LabelValue></p>
                  <p><Label>Event Date:</Label> <LabelValue>21/1/2022</LabelValue></p>
                  <p><Label>Event Location:</Label><LabelValue>Lahore</LabelValue></p>
                  <p><Label>Available Tickets:</Label><LabelValue>100</LabelValue></p>
                  <p><Label>Ticket Price:</Label><LabelValue>$ 100</LabelValue></p>
                </Event>
              </Col>
              <Col md={{ span: 3}}>
                <Event>
                  <p><Label>Event Name: </Label><LabelValue>Test</LabelValue></p>
                  <p><Label>Event Type:</Label> <LabelValue>Party</LabelValue></p>
                  <p><Label>Event Date:</Label> <LabelValue>21/1/2022</LabelValue></p>
                  <p><Label>Event Location:</Label><LabelValue>Lahore</LabelValue></p>
                  <p><Label>Available Tickets:</Label><LabelValue>100</LabelValue></p>
                  <p><Label>Ticket Price:</Label><LabelValue>$ 100</LabelValue></p>
                </Event>
              </Col>
            </Row>
        </Container>
    </Wrapper>
  );
};
export { Events };
