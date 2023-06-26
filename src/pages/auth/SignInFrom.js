import React, { useState } from "react";
import axios from "axios";
// context
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";
// router dom
import { Link, useHistory } from "react-router-dom";
// image
import image from "../../assets/yellow.jpg";
// bootsrap
import {
  Form,
  Button,
  Image,
  Col,
  Row,
  Container,
  Alert,
} from "react-bootstrap";
// custom css 
import styles from "../../styles/SignInUpForm.module.css";
// to redirect the user based on the auth status
import { useRedirect } from "../../hooks/useRedirect";
import { setTokenTimestamp } from "../../utils/utils";


const SignInForm = () => {
  const setCurrentUser = useSetCurrentUser();
  // to redirect the user if already logged in
  useRedirect("loggedIn");

  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });
  const { username, password } = signInData;

  const [errors, setErrors] = useState({});
  const history = useHistory();

  /**
   * This runs when the user submits the login form
   * @param {submit} event 
   */
  const handleSubmit = async (event) => {
    // prevent the default behaviour, so that we can make the request first
    event.preventDefault();

    try {
      // if the axios request is successful, we se the current user
      const { data } = await axios.post("/dj-rest-auth/login/", signInData);
      setCurrentUser(data.user);
      setTokenTimestamp(data);
      history.goBack();
    } catch (err) {
      // otherwise we set the errors
      setErrors(err.response?.data);
    }
  };

  /**
   * On change function for controlled forms
   * @param {change} event 
   */
  const handleChange = (event) => {
    setSignInData({
      ...signInData,
      [event.target.name]: event.target.value,
    });
  };


  return (
    <Row className={styles.OffsetTop}>
      <Col className="my-auto py-2 p-md-2" md={6}>
        <Container className="p-4">
          <h1>Sign in</h1>

          {/* Text field for the username */}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username">
              <Form.Label className="d-none">username</Form.Label>
              <Form.Control
                className={styles.Input}
                type="text"
                placeholder="Username"
                name="username"
                value={username}
                onChange={handleChange}
                autoComplete="true"
              />
            </Form.Group>
            {errors.username?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            {/* Password field for the password, so that it is not dusplayed */}
            <Form.Group controlId="password">
              <Form.Label className="d-none">Password</Form.Label>
              <Form.Control
                className={styles.Input}
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleChange}
                autoComplete="true"
              />
            </Form.Group>
            {errors.password?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}

            {/* Form action buttons */}
            <Button
              className={styles.SignInUpBtn}
              type="submit"
            >
              Sign in
            </Button>
            {errors.non_field_errors?.map((message, idx) => (
              <Alert key={idx} variant="warning" className="mt-3">
                {message}
              </Alert>
            ))}
          </Form>
        </Container>

        {/* Link to signup page if user doe not have an account */}
        <Container className="mt-3">
          <Link to="/signup">
            Don't have an account? <span>Sign up</span>
          </Link>
        </Container>
      </Col>
      <Col
        md={6}
        className="my-auto d-none d-md-block p-2"
      >
        <Image src={image} alt="Blond hair on yellow background" />
      </Col>
    </Row>
  );
};

export default SignInForm;