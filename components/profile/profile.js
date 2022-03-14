import React, { useContext } from 'react';
import Link from 'next/link';
import TemplateContext from '@/layout/secure-template/context';
import _get from 'lodash.get';

const Profile = () => {
  const { userData, refetchUserData } = useContext(TemplateContext);
  return (
    <>
      <div className="container-fluid">
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 className="h3 mb-0 text-gray-800">Profile</h1>
        </div>
        <div className="mx-auto w-75 mt-5">
          <div className="card d-sm-flex align-items-center">
            {!_get(userData, 'image_id.file_url', '') && (
              <img
                className="my-3 card-img-top rounded-circle w-25"
                src="/img/avatar.png"
                alt="Card image cap"
              />
            )}
            {_get(userData, 'image_id.file_url', '') && (
              <img
                style={{ height: '150px' }}
                className="my-3 card-img-top rounded-circle w-25"
                src={_get(userData, 'image_id.file_url', '')}
                alt="Card image cap"
              />
            )}
            <div className="card-body">
              <table className="table  table-borderless">
                <tbody>
                  <tr>
                    <td>Name</td>
                    <td>
                      {_get(userData, 'first_name')}{' '}
                      {_get(userData, 'last_name')}
                    </td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>{_get(userData, 'email')}</td>
                  </tr>
                  <tr>
                    <td>Phone Number</td>
                    <td>{_get(userData, 'phone_number')}</td>
                  </tr>
                </tbody>
              </table>
              <Link href="/admin/profile/edit">
                <a className="btn btn-primary">Edit Profile</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Profile;
