import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import React from 'react'

import styles from '../styles/ModalComponent.module.css'


const ModalClientDetail = (props) => {

  const {
    name, owner, notes,
    appointments_count, has_appointments_today,
    show, setShow } = props;


  const handleClose = () => setShow(false);

  const handleEditNotes = () => {
    console.log('edit')
  }

  return (
    <>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Client Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            <li>Name: {name}</li>
            <li>Username: {owner}</li>
            <li>Appointments: {appointments_count}</li>
            <li>Today: {has_appointments_today}</li>
            <li>Is staff member: {owner.id}</li>
            <hr />
            <li className={styles.Notes}>
              Notes: {notes}
              <span
                onClick={handleEditNotes}
                aria-label="edit"
              >
                <i className="fas fa-edit"
                />
              </span>
            </li>
          </ul>

        </Modal.Body>
        <Modal.Footer>
          <Button className={styles.CloseModalBtn} onClick={handleClose}>
            Close
          </Button>

        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalClientDetail