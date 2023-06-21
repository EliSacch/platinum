import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

import styles from "../../styles/Treatments.module.css";
import { axiosReq } from "../../api/axiosDefaults"
import { Alert } from "react-bootstrap";

function TreatmentCreateForm({ setShow, query, setQuery }) {

    const [treatmentData, setTreatmentData] = useState({
        title: "",
        description: "",
        price: 0,
        duration: 50,
        is_active: true,
    });

    const { title, description, price, duration, is_active } = treatmentData;

    // Set the minimum and max duration
    const min_duration = 50;
    const max_duration = 450;
    // determine the range
    const range = (max_duration - min_duration) / 50

    const selectOptions = (range) => {
        // get the range
        const options = [...Array(range).keys()];

        // create a new array from the range, to get the valid time values in the range
        const slots = options.map(option => (option + 1) * 50);
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
    }

    const [errors, setErrors] = useState({});

    /**
     * When the create treatment form is submitted, the data
     * is validated in the backend. If the data is valid,
     * the new treatment is added to the database and the
     * query is refreshed so that it appears in the list already
     * @param {submit} event 
     */
    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();

        formData.append("title", title);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("duration", duration);
        formData.append("is_active", is_active);

        try {
            await axiosReq.post("/treatments/", formData);
            setShow(false);
            /* To refresh the query we make sure that 
            we set it to something different than it's initial value */
            query === "" ? query = " " : query = ""
            setQuery(query);
        } catch (err) {
            setErrors(err.response?.data);
        }
    };

    /**
     * Set the handleChange function for controlled form
     * @param {change} event 
     */
    const handleChange = (event) => {
        setTreatmentData({
            ...treatmentData,
            [event.target.name]: event.target.value,
        });
    };


    const textFields = (
        <div className="text-center">
            {/* Text form to enter the treatment title */}
            <Form.Group controlId="title" className={styles.Input}>
                <Form.Label className={styles.InputLabel}>Title</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="title"
                    name="title"
                    value={title}
                    onChange={handleChange}
                />
            </Form.Group>
            {errors.title?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}

            {/* Text area form to enter the dreatment description (not mandatory) */}
            <Form.Group controlId="description" className={styles.Input}>
                <Form.Label className={styles.InputLabel}>Description</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="description"
                    name="description"
                    value={description}
                    onChange={handleChange}
                />
            </Form.Group>
            {errors.description?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}

            {/* Number field to enter the treatment price */}
            <Form.Group controlId="price" className={styles.Input}>
                <Form.Label className={styles.InputLabel}>Price</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="price"
                    name="price"
                    value={price}
                    onChange={handleChange}
                    min='0'
                />
            </Form.Group>
            {errors.price?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}

            {/* Select form to pick the treatment duration.
             Users can select from slots of 30 minutes */}
            <Form.Group className={styles.Input} controlId="duration">
                <Form.Label className={styles.InputLabel}>Duration</Form.Label>
                <Form.Control
                    as="select"
                    name="duration"
                    value={duration}
                    onChange={handleChange}
                >
                    {
                        // Get the array of option and display an <option> element for each one
                        selectOptions(range).map(option => (
                            <option value={option.value}>{option.label}</option>
                        ))
                    }
                </Form.Control>
            </Form.Group>
            {errors.duration?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}

            {/* Checkbox to set the treatment status is_active */}
            <Form.Check
                type="checkbox"
                label="Active"
                name="is_active"
                value={is_active}
                onChange={handleChange}
                className={styles.Checkbox}
            />
            {errors.is_active?.map((message, idx) => (
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
            <Form
                onSubmit={handleSubmit}
                className={styles.Form}
            >
                <Container>{textFields}</Container>
            </Form>
        </section>
    );
}

export default TreatmentCreateForm;