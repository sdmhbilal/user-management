import * as React from 'react';
import { Modal } from '@mui/material';

const BasicModal = (props) => {
  const { modalToggle, handleClose, children } = props;

  return (
    <div>
      <Modal
        open={modalToggle}
        onClose={handleClose}
      >
        <div className="modal-component">
          {children}
        </div>
      </Modal>
    </div>
  );
};

export default BasicModal;
