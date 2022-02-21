import React, { useState } from 'react';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'reactstrap';
import _get from 'lodash.get';
import Link from 'next/link';

type Props = {
  row: any,
  user_id: string,
  isAdmin: boolean,
  handleDelete: any,
  handleViewEvent: any,
};
const EventsActions = (props: Props) => {
  const { row, user_id, isAdmin, handleDelete, handleViewEvent } = props;
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);
  return (
    <Dropdown isOpen={open} toggle={toggle}>
      <DropdownToggle
        tag="div"
        className="text-center btn btn-outline-primary rounded-circle"
        style={{ width: '40px' }}
      >
        <i className="fas fa-ellipsis-v" />
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem
          className="text-center cursor-pointer icon-hover"
          onClick={() => handleViewEvent(_get(row, 'original'))}
        >
          <i className="fa fa-eye cursor-pointer icon-hover" />{' '}
          <span className="font-weight-bold ml-1">View</span>
        </DropdownItem>
        {isAdmin && (
          <Link href={`/admin/events/${_get(row, 'original._id')}/edit`}>
            <DropdownItem className="text-center cursor-pointer icon-hover">
              <i className="fa fa-edit cursor-pointer icon-hover " />
              <span className="font-weight-bold ml-1">Edit</span>
            </DropdownItem>
          </Link>
        )}
        {isAdmin && (
          <DropdownItem
            className="text-center cursor-pointer icon-hover"
            onClick={() => {
              handleDelete(row.original._id);
            }}
          >
            <i className="fa fa-trash cursor-pointer icon-hover" />
            <span className="font-weight-bold ml-1">Delete</span>
          </DropdownItem>
        )}
        <DropdownItem
          className="text-center cursor-pointer icon-hover"
          onClick={() =>
            window.open(
              `/influencer/${user_id}/event/${_get(row, 'original._id')}`,
              '_blank',
            )
          }
        >
          <i className="fa fa-link cursor-pointer icon-hover" />
          <span className="font-weight-bold ml-1">Open Link</span>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export { EventsActions };
