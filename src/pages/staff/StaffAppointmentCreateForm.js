import React, { useEffect, useRef, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
// bootstrap
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { Alert } from "react-bootstrap";
// custom componenets
import Asset from "../../components/Asset";
// custom css
import styles from "../../styles/AppointmentsList.module.css";


function StaffAppointmentCreateForm({ setShow, query, setQuery }) {

    const [appointmentData, setAppointmentData] = useState({
        owner: "",
        client_name: "",
        date: "",
        time: 900,
        treatment: "Consultation",
        notes: "",
    });

    const { owner, client_name, date, time, treatment, notes } = appointmentData;

    // set the clients that will be displayed as options to select
    const [clients, setClients] = useState({ results: [] });
    // set the treatments that will be displayed as options to select
    const [treatments, setTreatments] = useState({ results: [] });

    // Set the minimum and max time
    const min_time = 900;
    const max_time = 1700;
    const offset = 850;
    // determine the range
    const range = (max_time - min_time) / 50;

    const selectOptions = (range) => {
        // get the range
        const options = [...Array(range).keys()];

        // create a new array from the range, to get the valid time values in the range
        const slots = options.map(option => offset + ((option + 1) * 50));
        const labels = [];
        for (let slot of slots) {
            let label = slot % 100 === 0 ? (
                `${slot / 100}:00`
            ) : (
                `${(slot - (slot % 100)) / 100}:30`
            );
            labels.push(label);
        }

        // create the final choices to display, based on the slots
        const choices = slots.map((slot, i) => (
            { value: slot, label: labels[i] }
        ));
        return choices
    };

    const [errors, setErrors] = useState({});
    const [hasLoaded, setHasLoaded] = useState(true);

    /**
     * When the create appointment form is submitted, the data
     * is validated in the backend. If the data is valid,
     * the new appointment is added to the database and the
     * query is refreshed so that it appears in the list already
     * @param {submit} event 
     */
    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();

        formData.append("owner", owner);
        formData.append("client_name", client_name);
        formData.append("date", date);
        formData.append("time", time);
        formData.append("treatment", treatment);
        formData.append("notes", notes);

        try {
            setHasLoaded(false)
            await axiosReq.post("/appointments/", formData);
            setShow(false);
            /* To refresh the query we make sure that 
            we set it to something different than it's initial value */
            query === "" ? query = " " : query = "";
            setQuery(query);
            setHasLoaded(true);
        } catch (err) {
            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
            }
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

    useEffect(() => {
        /**
         * This functions retrieves the clients,
         * so that they can be displayed in the form.
         */
        const fetchClients = async () => {
            try {
                const { data } = await axiosReq.get('/clients/');
                setClients(data);

            } catch (err) {
                console.log(err, 'from fetchClients');
            }
        };
        /**
         * This functions retrieves the active treatments,
         * so that they can be displayed in the form.
         */
        const fetchTreatments = async () => {
            try {
                const { data } = await axiosReq.get('/treatments/');
                setTreatments(data);
            } catch (err) {
                console.log(err, 'from fetchTreatment');
            }
        };
        fetchClients();
        fetchTreatments();
    }, [setClients])

    const textFields = (
        <div className="text-center">
            {/* client is a select form that takes the clients as options */}
            <Form.Group className={styles.Input} controlId="owner">
                <Form.Label className={styles.SelectInputLabel}>Client</Form.Label>
                <Form.Control
                    as="select"
                    name="owner"
                    value={owner}
                    onChange={handleChange}
                >
                    <option key={-1} value={null}> ----- </option>
                    {
                        clients.results.map((c, i) => (
                            <option
                                key={i}
                                value={c.owner}>
                                {c.owner}
                            </option>
                        )
                        )
                    }
                </Form.Control>
            </Form.Group>
            {errors.owner?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}

            {/* Text area form to enter the client_name 
            (mandatory only if the selected owner is null) */}
            <Form.Group controlId="client_name" className={styles.Input}>
                <Form.Label className={styles.InputLabel}>Client name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="enter the client name"
                    name="client_name"
                    value={client_name}
                    onChange={handleChange}
                />
            </Form.Group>
            {errors.client_name?.map((message, idx) => (
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
                        selectOptions(range).map(option => (
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

            {/* treatment is a select form that takes the treatments as options */}
            <Form.Group className={styles.Input} controlId="treatment">
                <Form.Label className={styles.SelectInputLabel}>Treatment</Form.Label>
                <Form.Control
                    as="select"
                    name="treatment"
                    value={treatment}
                    onChange={handleChange}
                >
                    {
                        // filter the result to get only active treatments
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
                    }
                </Form.Control>
            </Form.Group>
            {errors.treatment?.map((message, idx) => (
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
            <Button className={styles.AddNewBtn} type="submit">
                create
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
            {
                hasLoaded ? (
                    <Form
                        onSubmit={handleSubmit}
                        className={styles.Form}
                    >
                        <Container>{textFields}</Container>
                    </Form>
                ) : (
                    <Asset spinner />
                )
            }
        </section>
    );
}

export default StaffAppointmentCreateForm;