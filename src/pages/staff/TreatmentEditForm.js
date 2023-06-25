import React, { useRef, useState, useEffect } from "react";
import { axiosReq } from "../../api/axiosDefaults";
// custom function to calculate the time slots
import calculateTimeSlots from "../../utils/calculateTimeSlots";
// bootstrap
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { Alert } from "react-bootstrap";
// custom componenets
import Asset from '../../components/Asset';
// custom css
import styles from "../../styles/Treatments.module.css";


function TreatmentEditForm({ setShow, query, setQuery, editId }) {

    const [treatmentData, setTreatmentData] = useState({
        title: "",
        description: "",
        price: 0,
        duration: 50,
        image: "",
        is_active: false,
    });

    const { title, description, price, duration, image, is_active } = treatmentData;
    const imageInput = useRef(null);

    const [errors, setErrors] = useState({});
    const [hasLoaded, setHasLoaded] = useState(true);

    useEffect(() => {
        const initializeForm = async () => {
            try {
                /**
                 * We try to initialize the form with the treatment data.
                 */
                const { data } = await axiosReq.get(`/treatments/${editId}/`);
                const { title, description, price, duration, image, is_active } = data;
                setTreatmentData(
                    { title, description, price, duration, image, is_active }
                )
                setHasLoaded(true);
            } catch (err) {
                console.log(err);
                setHasLoaded(true);
            }
        };
        setHasLoaded(false);
        initializeForm();

        // This function is triggered by a change in id
    }, [editId]);

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
        formData.append("image", imageInput.current.files[0]);
        formData.append("is_active", is_active);

        try {
            setHasLoaded(false);
            await axiosReq.put(`/treatments/${editId}/`, formData);
            setShow(false);
            /* To refresh the query we make sure that 
            we set it to something different than it's initial value */
            query === "" ? query = " " : query = "";
            setQuery(query);
            setHasLoaded(true);
        } catch (err) {
            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
                setHasLoaded(true);
            }
        }
    };

    /**
     * Set the handleChange function for controlled form
     * @param {change} event 
     */
    const handleChange = (event) => {
        setTreatmentData({
            ...treatmentData,
            [event.target.name]:
                // for checkboxes we use the checked status instead of value
                event.target.type === 'checkbox'
                    ? event.target.checked
                    : event.target.value,
        });
    };

    /**
     * Set the handleChange function for controlled image upload field
     * @param {change} event 
     */
    const handleChangeImage = (event) => {
        if (event.target.files.length) {
            URL.revokeObjectURL(image);
            setTreatmentData({
                ...treatmentData,
                image: URL.createObjectURL(event.target.files[0]),
            });
        }
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
                        calculateTimeSlots(50, 450, 0).map(option => (
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

            {/* File upload component */}
            <Form.Group className={styles.FileInput} controlId="image">
                <Form.Label className={styles.InputLabel}>Image</Form.Label>
                <Form.File
                    accept="image/*"
                    onChange={handleChangeImage}
                    ref={imageInput}
                />
            </Form.Group>
            {errors.image?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}

            {/* Checkbox to set the treatment status is_active */}
            <Form.Group controlId="is_active">
                <Form.Check
                    type="checkbox"
                    label="Active"
                    name="is_active"
                    checked={is_active}
                    onChange={handleChange}
                    className={styles.Checkbox}
                />
            </Form.Group>
            {errors.is_active?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}

            {/* Form action buttons */}
            <Button className={styles.AddNewBtn} type="submit">
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
            {hasLoaded ? (
                <Form
                    onSubmit={handleSubmit}
                    className={styles.Form}
                >
                    <Container>{textFields}</Container>
                </Form>
            ) : (
                <Asset spinner />
            )}
        </section>
    );
}

export default TreatmentEditForm;