import React, { useEffect, useState } from 'react';
import { axiosReq } from '../../api/axiosDefaults';
import { Alert, Button, Form } from 'react-bootstrap';
import styles from '../../styles/ModalClientDetail.module.css';
import Asset from '../../components/Asset';

const ClientRoleForm = (
  { id, currentRole, setRole, showEditRole, setShowEditRole, }
  ) => {

    // initialize the client data with the current role
  const [clientData, setClientData] = useState(currentRole);

  const [errors, setErrors] = useState({});
  const [hasLoaded, setHasLoaded] = useState(false);

  // When the checkbox value changes we also change the clientData value
  const handleChange = (event) => {
    setClientData({
      ...clientData,
      [event.target.name]: event.target.checked,
    });
  };

  // To initialize the form we get the current role from the backend
  useEffect(() => {
    const initializeForm = async () => {
      try {
        const { data } = await axiosReq.get(`/set-staff-permission/${id}/`);
        setClientData(data)
        setHasLoaded(true)
      } catch (err) {
        setErrors(err);
      }
    };
    setHasLoaded(false)
    initializeForm();
  }, [id]);

  // When the user clicks ont eh save icon we try and submit the form
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("is_staff", clientData.is_staff);

    try {
        setHasLoaded(false);
        await axiosReq.put(`/set-staff-permission/${id}/`, formData);
        setRole(clientData.is_staff);
        setShowEditRole(!showEditRole);
        setHasLoaded(true);
    } catch (err) {
        setErrors(err.response?.data);
    }
};

  return (
    hasLoaded ? (
      <Form onSubmit={handleSubmit}>
      <Form.Group controlId="is_staff" className={styles.Input}>
        <Form.Check
          type="checkbox"
          name="is_staff"
          checked={clientData.is_staff}
          onChange={handleChange}
          label="Set user as staff member?"
        />
      </Form.Group>
      {errors.is_staff?.map((message, idx) => (
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

export default ClientRoleForm

