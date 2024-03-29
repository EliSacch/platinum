import React, { useEffect, useState } from "react";
import { axiosRes } from "../../api/axiosDefaults";
// router
import { useHistory, useParams } from "react-router-dom";
// context
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../../contexts/CurrentUserContext";
// bootstrap
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
// custom css
import styles from "../../styles/Profile.module.css";

const UsernameForm = () => {
  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState({});

  const history = useHistory();
  const { id } = useParams();

  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  useEffect(() => {
    if (currentUser?.profile_id?.toString() === id) {
      setUsername(currentUser.username);
    } else {
      history.push("/");
    }
  }, [currentUser, history, id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.put("/dj-rest-auth/user/", {
        username,
      });
      setCurrentUser((prevUser) => ({
        ...prevUser,
        username,
      }));
      history.goBack();
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (

        <Container className={styles.OffsetTop}>
          <h1>Change username</h1>
          <Form onSubmit={handleSubmit} className="my-2">
            <Form.Group>
              <Form.Label className={styles.Label}>New username</Form.Label>
              <Form.Control
                placeholder="username"
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </Form.Group>
            {errors?.username?.map((message, idx) => (
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
              className={styles.FormBtn}
              type="submit"
            >
              save
            </Button>
          </Form>
        </Container>
  );
};

export default UsernameForm;