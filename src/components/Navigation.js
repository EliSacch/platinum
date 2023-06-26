import React, { useEffect, useState } from "react";
import axios from 'axios';
// router
import { NavLink, useHistory, useLocation } from 'react-router-dom';
// context
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';
// custom hooks
import useToggleExpanded from "../hooks/useToggleExpanded";
// bootstrap
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button } from "react-bootstrap";
// logo
import logo from '../assets/hair-icon-wine.png';
// custom componenets
import ModalComponent from "./ModalComponent";
// custom css
import styles from '../styles/Navigation.module.css';
import { removeTokenTimestamp } from "../utils/utils";


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
      removeTokenTimestamp();
      handleClose();
      history.push('/');

    } catch (err) {
      console.log(err);
    }
  };

      /* Check the location */
      const location = useLocation();
      const [hide, setHide] = useState(false)
  
      useEffect(() => {
          /* If the location  is /dashboard, we hide set hide to true*/
          if (location.pathname === "/dashboard") {
              setHide(true);
          } else {
              setHide(false);
          }
      }, [location]);

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
    // This navbar is displayed only when hide is false
    !hide &&
    <>
      <Navbar
        expand="lg"
        fixed="top"
        className={styles.NavBar}
        expanded={expanded}
      >
        <Container>
          <NavLink exact className={styles.NavLink} to="/">
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