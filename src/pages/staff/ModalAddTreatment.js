import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import styles from '../../styles/Treatments.module.css';
import TreatmentCreateForm from './TreatmentCreateForm';


const ModalAddTreatment = ({show, setShow}) => {

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
          <Modal.Title>New Treatment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TreatmentCreateForm />
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

export default ModalAddTreatment