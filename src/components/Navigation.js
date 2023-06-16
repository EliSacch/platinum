import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import logo from '../assets/hair-icon-wine.png'
import styles from '../styles/Navigation.module.css';

import { NavLink } from 'react-router-dom';
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';
import axios from 'axios';
import useToggleExpanded from "../hooks/useToggleExpanded";


const Navigation = () => {

  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const {expanded, setExpanded, ref} = useToggleExpanded();

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
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
        to={`/profiles/${currentUser?.profile_id}`}
      >
        Profile
      </NavLink>
      <NavLink
        exact
        className={styles.NavLink}
        to="/" 
        onClick={handleSignOut}
        >
          Sing out
      </NavLink>
    </>

  );
  const loggedInIcons = (
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
  const loggedOutIcons = (
    <>
      <NavLink
        exact
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="signin"
      >
        Sign in
      </NavLink>
      <NavLink
        exact
        to="signup"
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        Sign up
      </NavLink>
    </>
  );


  return (
    <Navbar 
      expand="md"
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

            {currentUser ? loggedInIcons : loggedOutIcons}

          </Nav>
          <Nav>
          {currentUser && profileLink}
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigation