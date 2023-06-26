import React, { useState, useEffect, useRef } from "react";
import { axiosReq } from "../../api/axiosDefaults";
// router
import { useHistory, useParams } from "react-router-dom";
//context
import {
    useCurrentUser,
    useSetCurrentUser,
} from "../../contexts/CurrentUserContext";
// bootstrap
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
// custom componenets
import Asset from "../../components/Asset";
//custom css
import styles from "../../styles/Profile.module.css";


const ProfileEditForm = () => {
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();
    const { id } = useParams();
    const history = useHistory();
    const imageFile = useRef();

    const [profileData, setProfileData] = useState({
        name: "",
        image: "",
    });
    const { name, image } = profileData;

    const [errors, setErrors] = useState({});
    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
        const handleMount = async () => {
            if (currentUser?.profile_id?.toString() === id) {
                try {
                    const { data } = await axiosReq.get(`/profiles/${id}/`);
                    const { name, image } = data;
                    setProfileData({ name, image });
                    setHasLoaded(true);
                } catch (err) {
                    console.log(err);
                    history.push("/");
                }
            } else {
                history.push("/");
            }
        };

        setHasLoaded(false);
        handleMount();
    }, [currentUser, history, id]);

    const handleChange = (event) => {
        setProfileData({
            ...profileData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setHasLoaded(false);
        const formData = new FormData();
        formData.append("name", name);

        if (imageFile?.current?.files[0]) {
            formData.append("image", imageFile?.current?.files[0]);
        }

        try {
            const { data } = await axiosReq.put(`/profiles/${id}/`, formData);
            setCurrentUser((currentUser) => ({
                ...currentUser,
                profile_image: data.image,
            }));
            history.goBack();
        } catch (err) {
            console.log(err);
            setErrors(err.response?.data);
            setHasLoaded(true);
        }
    };

    const textFields = (
        <>
            <Form.Group className={styles.Input} controlId="name">
                <Form.Label className={styles.Label}>Change Display Name</Form.Label>
                <Form.Control
                    value={name}
                    onChange={handleChange}
                    name="name"
                />
            </Form.Group>

            {errors?.content?.map((message, idx) => (
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
                save
            </Button>
        </>
    );

    return (
        <section className={styles.OffsetTop}>
            {hasLoaded ? (
                <Form onSubmit={handleSubmit} className={styles.Form}>
                    <Container>
                        <Form.Group>
                            {image && (
                                <figure>
                                    <Image src={image} className={styles.Preview} />
                                </figure>
                            )}
                            {errors?.image?.map((message, idx) => (
                                <Alert variant="warning" key={idx}>
                                    {message}
                                </Alert>
                            ))}
                            <Form.File
                                id="image-upload"
                                ref={imageFile}
                                accept="image/*"
                                onChange={(e) => {
                                    if (e.target.files.length) {
                                        setProfileData({
                                            ...profileData,
                                            image: URL.createObjectURL(e.target.files[0]),
                                        });
                                    }
                                }}
                            />
                        </Form.Group>
                        <div>{textFields}</div>
                    </Container>
                </Form>
            ) : (
                <Asset spinner />
            )}
        </section>
    );
};

export default ProfileEditForm;