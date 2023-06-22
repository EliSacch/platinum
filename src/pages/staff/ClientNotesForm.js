import React, { useEffect, useState } from 'react';
import { axiosReq } from '../../api/axiosDefaults';
// bootstrap
import { Alert, Button, Form } from 'react-bootstrap';
// custom components
import Asset from '../../components/Asset';
// custom css
import styles from '../../styles/ModalClientDetail.module.css';


const ClientNotesForm = (
  { id, notes, setNotes, showEditNotes, setShowEditNotes }
) => {
  // initialize the notes
  const [clientData, setClientData] = useState(
    { notes: notes }
  );

  const [errors, setErrors] = useState({});
  const [hasLoaded, setHasLoaded] = useState(false);

  // listen to changes in the input field
  const handleChange = (event) => {
    setClientData({
      ...clientData,
      [event.target.name]: event.target.value,
    });
  };

  // Initialize the form with the current notes from the backend
  useEffect(() => {
    const initializeForm = async () => {
      try {
        const { data } = await axiosReq.get(`/clients/${id}/`);
        setClientData(data)
        setHasLoaded(true)
      } catch (err) {
        setErrors(err);
      }
    };
    setHasLoaded(false)
    initializeForm();
  }, [id, setShowEditNotes]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("notes", clientData.notes);

    try {
      setHasLoaded(false);
      await axiosReq.put(`/clients/${id}/`, formData);
      setNotes(clientData.notes);
      setShowEditNotes(!showEditNotes);
      setHasLoaded(true);
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    hasLoaded ? (
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="notes" className={styles.Input}>
          <Form.Label className={styles.SelectInputLabel}>Notes</Form.Label>
          <Form.Control
            as="textarea" rows={5}
            type="text"
            placeholder="notes"
            name="notes"
            value={clientData.notes}
            onChange={handleChange}
          />
        </Form.Group>
        {errors.notes?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}

        <Button className={styles.FormBtn} type="submit">
          <i className="fas fa-save" />
        </Button>

      </Form>
    ) : (
      <Asset spinner />
    )
  )
}

export default ClientNotesForm

