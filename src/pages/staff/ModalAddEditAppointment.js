// bootstrap
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// custom components
import StaffAppointmentCreateForm from './StaffAppointmentCreateForm';
import StaffAppointmentEditForm from './StaffAppointmentEditForm';
// custom css
import styles from '../../styles/AppointmentsList.module.css';


const ModalAddEditAppointment = (props) => {

  const { show, setShow, query, setQuery, form, editId} = props

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
          <Modal.Title>
            {form === 'add' && "Add "}
            {form === 'edit' && "Edit "}
            Appointment
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {form === 'add' && <StaffAppointmentCreateForm setShow={setShow} query={query} setQuery={setQuery} />}
          {form === 'edit' && <StaffAppointmentEditForm setShow={setShow} query={query} setQuery={setQuery} editId={editId}/>}

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

export default ModalAddEditAppointment