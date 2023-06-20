import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import logo from '../assets/hair-icon-wine.png'
import styles from '../styles/Navigation.module.css';

import { NavLink, useHistory } from 'react-router-dom';
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';
import axios from 'axios';
import useToggleExpanded from "../hooks/useToggleExpanded";
import ModalComponent from "./ModalComponent";
import { Button } from "react-bootstrap";


const Navigation = () => {

  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const history = useHistory();

  // To display the sign out modal
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const { expanded, setExpanded, ref } = useToggleExpanded();

  const handleSignOut = async (event) => {
    event.preventDefault();

    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
      handleClose();
      history.push('/');

    } catch (err) {
      console.log(err);
    }
  };

  const profileLink = (
    <>
      <NavLink
        exact
        className={styles.NavLink}
        activeClassName={styles.Active}
        to={`/profile`}
      >
        Profile
      </NavLink>
      <Button
        exact
        className={styles.NavButton}
        onClick={handleShow}
      >
        Sing out
      </Button>
    </>

  );

  const staffOnlyLinks = (
    <>
      <NavLink
        exact
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/dashboard"
      >
        Staff Dashboard
      </NavLink>
    </>
  );

  const loggedInLinks = (
    <>
      <NavLink
        exact
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/my-appointments"
      >
        My appointments
      </NavLink>
    </>
  );
  <>{currentUser?.username}</>;
  const loggedOutLinks = (
    <>
      <NavLink
        exact
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/signin"
      >
        Sign in
      </NavLink>
      <NavLink
        exact
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/signup"
      >
        Sign up
      </NavLink>
    </>
  );


  return (
    <>
      <Navbar
        expand="lg"
        fixed="top"
        className={styles.NavBar}
        expanded={expanded}
      >
        <Container>
          <NavLink className={styles.NavLink} to="/">
            <Navbar.Brand className={styles.AppLogo}>
              <img src={logo} alt="logo" />
              Platinum
            </Navbar.Brand>
          </NavLink>

          <Navbar.Toggle
            ref={ref}
            aria-controls="navbarScroll"
            className={styles.MenuToggler}
            onClick={() => setExpanded(!expanded)}
          >
            <i className="fas fa-bars"></i>
          </Navbar.Toggle>
          <Navbar.Collapse id="navbarScroll">

            <Nav className="me-auto">

              <NavLink
                exact
                className={styles.NavLink}
                activeClassName={styles.Active}
                to="/">
                Home
              </NavLink>

              {currentUser ? loggedInLinks : loggedOutLinks}

            </Nav>
            <Nav>
              {currentUser && currentUser.is_staff && staffOnlyLinks}
              {currentUser && profileLink}
            </Nav>

          </Navbar.Collapse>
        </Container>
      </Navbar>
      <ModalComponent
        heading="Sign out"
        message="Do you want to sign out?"
        setShow={setShow}
        action={handleSignOut}
        show={show}
      />
    </>
  )
}

export default Navigation