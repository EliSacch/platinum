import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
// router
import { useHistory } from "react-router-dom";
// context
import { useCurrentUser } from "../../contexts/CurrentUserContext";
// custom function to calculate time slots
import calculateTimeSlots from "../../utils/calculateTimeSlots";
// bootstrap
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { Alert } from "react-bootstrap";
// custom css
import styles from "../../styles/AppointmentsCreateEditForm.module.css";


function AppointmentsCreateForm({ message, homepage }) {

    const [appointmentData, setAppointmentData] = useState({
        treatment: "Consultation",
        date: "",
        time: 900,
        notes: "",
    });

    const { treatment, date, time, notes } = appointmentData;

    // get the current user
    const currentUser = useCurrentUser();

    const [errors, setErrors] = useState({});
    const history = useHistory();

    // set the treatments that will be displayed
    const [treatments, setTreatments] = useState({ results: [] });

    useEffect(() => {
        /**
         * This functions retrieves the active treatments,
         * so that they can be displayed in the form.
         */
        const fetchTreatments = async () => {
            try {
                const { data } = await axiosReq.get('/treatments/');
                setTreatments(data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchTreatments();
    }, []);

    /**
     * When the user submits the create appointment form,
     * the backend validates the data entered.
     * If there are no errors in the form submitted,
     * a new appointment instance is added to the database.
     * @param {submit} event 
     */
    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();

        formData.append("treatment", treatment);
        formData.append("date", date);
        formData.append("time", time);
        formData.append("notes", notes);

        try {
            await axiosReq.post("/my-appointments/", formData);
            history.push("/my-appointments/");
        } catch (err) {
            setErrors(err.response?.data);
        }
    };

    /**
     * Set the handleChange function for controlled form
     * @param {change} event 
     */
    const handleChange = (event) => {
        setAppointmentData({
            ...appointmentData,
            [event.target.name]: event.target.value,
        });
    };


    const textFields = (
        <div className="text-center">
            {/* Treatments is a select form that takes the active treatments as options */}
            <Form.Group className={styles.Input} controlId="treatment">
                <Form.Label className={styles.SelectInputLabel}>Treatment</Form.Label>
                <Form.Control
                    as="select"
                    name="treatment"
                    value={treatment}
                    onChange={handleChange}
                >
                    {
                        /* If the current user is a staff memeber
                            we filter the results, to show only the active
                            treatments */
                        currentUser.is_staff ? (
                            treatments.results.filter(
                                res => res.is_active===true
                            ).map((t, i) => (
                                <option
                                    key={i}
                                    value={t.title}>
                                    {t.title}
                                </option>
                                )
                            )
                        ) : (
                            /* If the current user is not a staff memeber
                            we don't filter the results, 
                            since they can only see active treatments anyway */
                            treatments.results.map((t, i) => (
                                <option
                                    key={i}
                                    value={t.title}>
                                    {t.title}
                                </option>
                                )
                            )
                        )
                    }
                </Form.Control>
            </Form.Group>
            {errors.treatment?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}

            {/* Date picker to select the appointment date */}
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

            {/* Select form to pick the appointment time.
             Users can select from slots of 30 minutes */}
            <Form.Group className={styles.Input} controlId="time">
                <Form.Label className={styles.SelectInputLabel}>Time</Form.Label>
                <Form.Control
                    as="select"
                    name="time"
                    value={time}
                    onChange={handleChange}
                >
                    {
                        // Get the array of option and display an <option> element for each one
                        calculateTimeSlots(900, 1700, 850).map(option => (
                            <option value={option.value} key={option.value}>{option.label}</option>
                        ))
                    }
                </Form.Control>
            </Form.Group>
            {errors.time?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}

            {/* Text area input to add notes to the appointment*/}
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

            {/* Form action buttons */}
            {
                // In the homepage we do not display the cancel button
                !homepage &&
                <Button
                    className={styles.FormBtn}
                    onClick={() => history.goBack()}
                >
                    cancel
                </Button>
            }
            <Button className={styles.FormBtn} type="submit">
                Book
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
            <h1>Make an appointment</h1>
            {/* If there an active treatment that can be booked online
            we show the form, otherwise the user is told that 
            the online booking is not available */}
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

export default AppointmentsCreateForm;