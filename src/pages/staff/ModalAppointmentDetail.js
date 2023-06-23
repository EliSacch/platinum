import React from 'react';
// bootstrap
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// custom css
import styles from '../../styles/CalendarComponent.module.css';


const ModalAppointmentDetail = (props) => {

  const {
    owner, client_name, date,
    time, end_time, treatment, notes,
    show, setShow, convertTime } = props;

    const handleClose = () => setShow(false);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className={styles.ModalAppointmentDetail}
      >
        <Modal.Header closeButton>
          <Modal.Title>Appointment Details</Modal.Title>
        </Modal.Header>
  
        <Modal.Body>
          <ul>
            {owner && <li>Client: {owner}</li> }
            {client_name && <li>Name: {client_name}</li>}
            {treatment && <li>Treatment: {treatment}</li> }
            {date && <li>Date: {date}</li> }
            {time && <li>Time: {convertTime(time)} - {convertTime(end_time)}</li> }
            {notes && <li>Notes: {notes}</li> }

          </ul>

        </Modal.Body>
        <Modal.Footer>
          {/* Close the modal */}
          <Button className={styles.ModalBtn} onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalAppointmentDetail