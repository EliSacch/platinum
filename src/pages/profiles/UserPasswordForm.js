import React, { useEffect, useState } from "react";
import { axiosRes } from "../../api/axiosDefaults";
// router
import { useHistory, useParams } from "react-router-dom";
// context
import { useCurrentUser } from "../../contexts/CurrentUserContext";
// bootstrap
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
// custom css
import styles from "../../styles/Profile.module.css";

const UserPasswordForm = () => {
  const history = useHistory();
  const { id } = useParams();
  const currentUser = useCurrentUser();

  const [userData, setUserData] = useState({
    new_password1: "",
    new_password2: "",
  });
  const { new_password1, new_password2 } = userData;

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    if (currentUser?.profile_id?.toString() !== id) {
      // redirect user if they are not the owner of this profile
      history.push("/");
    }
  }, [currentUser, history, id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.post("/dj-rest-auth/password/change/", userData);
      history.goBack();
    } catch (err) {
      console.log(err);
      setErrors(err.response?.data);
    }
  };

  return (
        <Container className={styles.OffsetTop}>
          <h1>Change your password</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label className={styles.Label}>New password</Form.Label>
              <Form.Control
                placeholder="new password"
                type="password"
                value={new_password1}
                onChange={handleChange}
                name="new_password1"
              />
            </Form.Group>
            {errors?.new_password1?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}
            <Form.Group>
              <Form.Label className={styles.Label}>Confirm password</Form.Label>
              <Form.Control
                placeholder="confirm new password"
                type="password"
                value={new_password2}
                onChange={handleChange}
                name="new_password2"
              />
            </Form.Group>
            {errors?.new_password2?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}
            <Button
              className={styles.FormBtn}
              onClick={() => history.goBack()}
            >
              cancel
            </Button>
            <Button
              type="submit"
              className={styles.FormBtn}
            >
              save
            </Button>
          </Form>
        </Container>
  );
};

export default UserPasswordForm;