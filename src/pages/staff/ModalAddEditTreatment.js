// bootstrap
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// custom components
import TreatmentCreateForm from './TreatmentCreateForm';
import TreatmentEditForm from './TreatmentEditForm';
// custom css
import styles from '../../styles/Treatments.module.css';


const ModalAddEditTreatment = (props) => {

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
            Treatment
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {form === 'add' && <TreatmentCreateForm setShow={setShow} query={query} setQuery={setQuery} />}
          {form === 'edit' && <TreatmentEditForm setShow={setShow} query={query} setQuery={setQuery} editId={editId}/>}

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