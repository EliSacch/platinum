import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import React, { useState } from 'react'

import styles from '../../styles/ModalClientDetail.module.css';
import ClientNotesForm from './ClientNotesForm';


const ModalClientDetail = (props) => {

  const [showEditNotes, setShowEditNotes] = useState(false);

  const {
    id, name, owner, 
    appointments_count, has_appointments_today,
    show, setShow } = props;

  const [notes, setNotes] = useState(props.notes)

  const handleClose = () => setShow(false);

  const handleEditNotes = () => {
    setShowEditNotes(!showEditNotes);
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
            <hr />
            <li className={styles.Notes}>

              {showEditNotes && <>
                Notes: {notes}
                <span
                  onClick={handleEditNotes}
                  aria-label="edit"
                >
                  <i className="fas fa-edit" />
                </span>
              </>}
              {!showEditNotes && <ClientNotesForm
                id={id}
                setNotes={setNotes}
                showEditNotes={showEditNotes}
                setShowEditNotes={setShowEditNotes}
              />
              }
            </li>
          </ul>

        </Modal.Body>
        <Modal.Footer>
          <Button className={styles.ModalBtn} onClick={handleClose}>
            Close
          </Button>

        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalClientDetail