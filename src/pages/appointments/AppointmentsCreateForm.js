import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

import styles from "../../styles/AppointmentsCreateEditForm.module.css";
import axios from "axios";
import { Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function AppointmentsCreateForm() {

    const [appointmentData, setAppointmentData] = useState({
        treatment: "",
        date: "",
        time: "",
        notes: "",
    });

    const { treatment, date, time, notes } = appointmentData;

    const [errors, setErrors] = useState({});
    const history = useHistory()

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const data = await axios.post("/my-appointments/", appointmentData);
            //setCurrentUser(data.user);
            history.push("/my-appointments/");
            console.log(data.value);
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
                    name="tratment"
                    value={treatment}
                    onChange={handleChange}
                >
                    <option value="Consultation">Consultation</option>
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
                create
            </Button>
        </div>
    );

    return (
        <section className={styles.OffsetTop}>
            <h1>Make an appointment</h1>
            <Form
                onSubmit={handleSubmit}
                className={styles.Form}
            >
                <Container>{textFields}</Container>
            </Form>
        </section>
    );
}

export default AppointmentsCreateForm;