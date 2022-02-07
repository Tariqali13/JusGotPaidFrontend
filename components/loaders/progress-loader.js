// @flow
import React from 'react';

type Props = {
  isLoading: boolean,
};

const ProgressLoader = (props: Props) => {
  const { isLoading } = props;
  return (
    <div
      className={`modal fade ${isLoading && 'show'}`}
      id="exampleModalCenter"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
      data-backdrop="false"
      data-keyboard="false"
      style={{ display: 'block' }}
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLongTitle">
              Almost Done
            </h5>
          </div>
          <div className="modal-body">
            <div className="spinner-border"/>
            <p>Please wait</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProgressLoader;
