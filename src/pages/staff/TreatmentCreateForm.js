import React, {useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

import styles from "../../styles/Treatments.module.css";
import { axiosReq } from "../../api/axiosDefaults"
import { Alert } from "react-bootstrap";

function TreatmentCreateForm() {

    const [treatmentData, setTreatmentData] = useState({
        title: "",
        description: "",
        price: 0,
    });

    const { title, description, price } = treatmentData;

    const [errors, setErrors] = useState({});

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();

        formData.append("title", title);
        formData.append("description", description);
        formData.append("price", price);

        try {
            await axiosReq.post("/treatments/", formData);
            console.log('added');
        } catch (err) {
            setErrors(err.response?.data);
        }
    };

    const handleChange = (event) => {
        setTreatmentData({
            ...treatmentData,
            [event.target.name]: event.target.value,
        });
    };


    const textFields = (
        <div className="text-center">

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