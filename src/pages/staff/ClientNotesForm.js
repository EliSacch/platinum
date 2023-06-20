import React, { useEffect, useState } from 'react';
import { axiosReq } from '../../api/axiosDefaults';
import { Alert, Button, Form } from 'react-bootstrap';
import styles from '../../styles/ModalClientDetail.module.css';
import Asset from '../../components/Asset';

const ClientNotesForm = (
  { id, setNotes, showEditNotes, setShowEditNotes, }
  ) => {

  const [clientData, setClientData] = useState({
    notes: "",
  });

  const {notes} = clientData;

  const [errors, setErrors] = useState({});
  const [hasLoaded, setHasLoaded] = useState(false);

  const handleChange = (event) => {
    setClientData({
      ...clientData,
      [event.target.name]: event.target.value,
    });
  };

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
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("notes", notes);

    try {
        await axiosReq.put(`/clients/${id}/`, formData);
        setNotes(notes);
        setShowEditNotes(!showEditNotes);
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
          value={notes}
          onChange={handleChange}
        />
      </Form.Group>
      {errors.notes?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Button className={styles.FormBtn} type="submit">
        <i className="fas fa-save"/>
      </Button>

    </Form>
    ) : (
      <Asset spinner />
    )
  )
}

export default ClientNotesForm

