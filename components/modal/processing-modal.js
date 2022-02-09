import React from 'react';
import {Modal, Spinner} from "react-bootstrap";

const ProcessingModal = () => {
  return (
    <Modal
      centered={true}
      isOpen={true}
      className="modal-danger"
      contentClassName="bg-gradient-info"
      onClick={() => {}}
    >
      <div className=" modal-header">
        <h6 className=" modal-title" id="modal-title-notification">
          Attention
        </h6>
      </div>
      <div className=" modal-body">
        <div className=" py-3 text-center">
          <h4 className=" heading mt-4"><Spinner size="lg" /></h4>
          <h4 className=" heading mt-4">Please Wait!</h4>
          <p>
           We are processing things.
          </p>
        </div>
      </div>
    </Modal>
  );
};

export { ProcessingModal };
