import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import styles from '../../styles/Treatments.module.css';
import TreatmentCreateForm from './TreatmentCreateForm';
import TreatmentEditForm from './TreatmentEditForm';


const ModalAddEditTreatment = (props) => {

  const { show, setShow, query, setQuery, form } = props

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
            Treatment
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {form === 'add' && <TreatmentCreateForm setShow={setShow} query={query} setQuery={setQuery} />}
          {form === 'edit' && <TreatmentEditForm setShow={setShow} query={query} setQuery={setQuery}/>}

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

export default ModalAddEditTreatment