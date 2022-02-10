import React from 'react';
import { Modal, ModalBody, ModalFooter, Button } from 'reactstrap';

type Props = {
  heading: string,
  children: any,
  modalOpen: boolean,
  setModalOpen: boolean,
  toggleModal: () => void,
  isCancelButton: boolean,
  handleCancelButton: () => void,
  cancelButtonText?: string,
  isConfirmButton: boolean,
  handleConfirmButton: () => void,
  confirmButtonText: string,
};

const ConfirmationModal = (props: Props) => {
  const {
    heading,
    children,
    modalOpen,
    toggleModal,
    cancelButtonText,
    handleCancelButton,
    confirmButtonText,
    handleConfirmButton,
    isCancelButton,
    isConfirmButton,
  } = props;
  return (
    <Modal toggle={toggleModal} isOpen={modalOpen} centered={true}>
      <div className=" modal-header">
        <h5 className=" modal-title" id="exampleModalLabel">
          {heading || ""}
        </h5>
        <button
          aria-label="Close"
          className=" close"
          type="button"
          onClick={toggleModal}
        >
          <span aria-hidden={true}>×</span>
        </button>
      </div>
      <ModalBody>{children}</ModalBody>
      <ModalFooter>
        {isCancelButton && (
          <Button
            color="secondary"
            type="button"
            onClick={handleCancelButton}
          >
            {cancelButtonText || "Cancel"}
          </Button>
        )}
        {isConfirmButton && (
          <Button color="primary" type="button" onClick={handleConfirmButton}>
            {confirmButtonText || "Confirm"}
          </Button>
        )}
      </ModalFooter>
    </Modal>
  );
};

export { ConfirmationModal };
