import React, { useEffect, useState } from "react";
import dateFormat from "dateformat";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

import styles from "../../styles/AppointmentsCreateEditForm.module.css";
import axios from "axios";
import { axiosReq } from "../../api/axiosDefaults"
import { Alert } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";

function AppointmentsEditForm({ message, }) {

    const [appointmentData, setAppointmentData] = useState({
        treatment: "Consultation",
        date: "",
        time: 900,
        notes: "",
    });

    const { treatment, date, time, notes } = appointmentData;

    const [errors, setErrors] = useState({});
    const history = useHistory();
    const { id } = useParams();

    const [treatments, setTreatments] = useState({ results: [] });

    useEffect(() => {
        /**
         * This functions retrieves the active treatments
         */
        const fetchTreatments = async () => {
            try {
                const { data } = await axiosReq.get('/treatments/');
                setTreatments(data);
  
            } catch (err) {
                console.log(err);
            }
        };

        const initializeForm = async () => {
            try {
                const { data } = await axiosReq.get(`/my-appointments/${id}/`);
                const { treatment, date, time, notes, is_owner } = data;
                is_owner ? setAppointmentData(
                    { treatment, date, time, notes }
                ) : history.push('/');
                
            } catch (err) {
                console.log(err);
            }
        };
        fetchTreatments();
        initializeForm();
    }, [history, id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.put(`/my-appointments/${id}/`, appointmentData, date);
            history.push(`/my-appointments/${id}/`);
        } catch (err) {
            setErrors(err.response?.data);
        }
    };

    const handleChange = (event) => {
        setAppointmentData({
            ...appointmentData,
            [event.target.name]: event.target.value,
        });
    };


    const textFields = (
        <div className="text-center">
            <Form.Group className={styles.Input} controlId="treatment">
                <Form.Label className={styles.SelectInputLabel}>Treatment</Form.Label>
                <Form.Control
                    as="select"
                    name="treatment"
                    value={treatment}
                    onChange={handleChange}
                >
                    {treatments.results.map((t, i) => (
                        <option 
                        key={i}
                        value={t.title}>
                            {t.title}
                        </option>
                    )
                    )}
                </Form.Control>
            </Form.Group>
            {errors.treatment?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}
            <Form.Group className={styles.Input} controlId="date">
                <Form.Label className={styles.SelectInputLabel}>Date</Form.Label>
                <Form.Control
                    type="date"
                    name="date"
                    value={date}
                    onChange={handleChange}
                />
            </Form.Group>
            {errors.date?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}

            <Form.Group className={styles.Input} controlId="time">
                <Form.Label className={styles.SelectInputLabel}>Time</Form.Label>
                <Form.Control
                    as="select"
                    name="time"
                    value={time}
                    onChange={handleChange}
                >
                    <option value="900">9:00</option>
                    <option value="1000">10:00</option>
                    <option value="1100">11:00</option>
                    <option value="1200">12:00</option>
                </Form.Control>
            </Form.Group>
            {errors.time?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}

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


            <Button
                className={styles.FormBtn}
                onClick={() => history.goBack()}
            >
                cancel
            </Button>
            <Button className={styles.FormBtn} type="submit">
                Save
            </Button>
            {errors.non_field_errors?.map((message, idx) => (
              <Alert key={idx} variant="warning" className="mt-3">
                {message}
              </Alert>
            ))}
        </div>
    );

    return (
        <section className={styles.OffsetTop}>
            <h1>Edit your appointment</h1>
            {treatments.results.length ? (
                <Form
                    onSubmit={handleSubmit}
                    className={styles.Form}
                >
                    <Container>{textFields}</Container>
                </Form>
            ) : (
                <p>{message}</p>
            )}

        </section>
    );
}

export default AppointmentsEditForm;