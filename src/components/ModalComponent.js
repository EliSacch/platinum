import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import React from 'react'

import styles from '../styles/ModalComponent.module.css'


function ModalComponent({heading, message, setShow, action, show}) {

  const handleClose = () => setShow(false);

  return (
    <>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          {heading && <Modal.Title>{heading}</Modal.Title>}
        </Modal.Header>
        {message && <Modal.Body>{message}</Modal.Body>}
        <Modal.Footer>
          <Button className={styles.CloseModalBtn} onClick={handleClose}>
            Close
          </Button>
          <Button className={styles.ModalBtn} onClick={action}>Confirm</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalComponent;