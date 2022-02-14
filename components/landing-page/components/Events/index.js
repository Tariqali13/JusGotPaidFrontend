// @flow
import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { GET_EVENTS_DATA } from '@/components/events/queries';
import reactQueryConfig from '@/constants/react-query-config';
import Pagination from '@/utils/pagination';
import _get from 'lodash.get';
import Link from 'next/link';

import AdminPagination from '@/components/pagination';
import ProgressLoader from '@/components/loaders/progress-loader';
import {
  Wrapper,
  RowWrapper,
  HeadingOne,
  HeadingTwo,
  Event,
  Label,
  LabelValue,
} from './style';

type Props = {
  allRes: {
    eventsResp: any,
  },
};
const Events = (props: Props) => {
  const { allRes } = props;
  const [eventParams, setEventParams] = useState({
    records_per_page: 8,
    page_no: 1,
    events_passed: false,
  });
  const [paginationData, setPaginationData] = useState({});
  const { data: eventsData, isLoading: isEventsDataLoading } = useQuery(
    ['EVENTS_DATA', eventParams],
    GET_EVENTS_DATA,
    {
      initialData: allRes?.eventsResp,
      ...reactQueryConfig,
      onSuccess: res => {
        // eslint-disable-next-line no-undef
        const { result } = Pagination(
          res.records_per_page,
          res.total_number_of_events,
          res.page_no,
          res.data.length,
        );
        return setPaginationData(result);
      },
      onError: () => {
        setPaginationData({});
      },
    },
  );

  const handleNext = page => {
    setEventParams({
      ...eventParams,
      page_no: parseInt(page),
    });
  };
  const handlePrevious = page => {
    setEventParams({
      ...eventParams,
      page_no: parseInt(page),
    });
  };
  const handlePageSelect = page => {
    setEventParams({
      ...eventParams,
      page_no: page,
    });
  };
  useEffect(() => {
    if (allRes?.eventsResp) {
      const eventRes = allRes?.eventsResp;
      const { result } = Pagination(
        eventRes.records_per_page,
        eventRes.total_number_of_events,
        eventRes.page_no,
        eventRes.data.length,
      );
      setPaginationData(result);
    }
  }, [allRes?.eventsResp]);
  return (
    <Wrapper className="events_background">
      <Container fluid>
        <RowWrapper>
          <HeadingOne>Event </HeadingOne>
          <HeadingTwo> SCHEDULE</HeadingTwo>
        </RowWrapper>
        <Row>
          {_get(eventsData, 'data', []).map((event, i) => (
            <Col md={3} key={i}>
              <div className="card event-card">
                <img
                  className="card-img-top w-100"
                  src={_get(
                    event,
                    'cover_image_id.file_url',
                    '/img/event-generic.jpg',
                  )}
                  alt="Card image cap"
                />
                <div className="card-body">
                  <p>
                    <Label>Event Name: </Label>
                    <LabelValue>{_get(event, 'event_name', '')}</LabelValue>
                  </p>
                  <p>
                    <Label>Event Type:</Label> <LabelValue>Party</LabelValue>
                  </p>
                  <p>
                    <Label>Event Date:</Label>{' '}
                    <LabelValue>21/1/2022</LabelValue>
                  </p>
                  <p>
                    <Label>Event Location:</Label>
                    <LabelValue>Lahore</LabelValue>
                  </p>
                  <p>
                    <Label>Available Tickets:</Label>
                    <LabelValue>100</LabelValue>
                  </p>
                  <p>
                    <Label>Ticket Price:</Label>
                    <LabelValue>$ 100</LabelValue>
                  </p>
                  <Link
                    href={`/influencer/${event.influencer_id}/event/${event._id}`}
                  >
                    <a className="btn btn-primary">Buy Ticket</a>
                  </Link>
                </div>
              </div>
            </Col>
          ))}
        </Row>
        <Row>
          <Col
            md={12}
            className="d-flex align-items-center justify-content-center"
          >
            <AdminPagination
              paginationData={paginationData}
              handlePageSelect={handlePageSelect}
              handlePrevious={handlePrevious}
              handleNext={handleNext}
            />
          </Col>
        </Row>
      </Container>
      {isEventsDataLoading && (
        <ProgressLoader isLoading={isEventsDataLoading} />
      )}
    </Wrapper>
  );
};
export { Events };
