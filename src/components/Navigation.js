import React, { useContext } from 'react';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import logo from '../assets/hair-icon-wine.png'
import styles from '../styles/Navigation.module.css';

import { NavLink } from 'react-router-dom';
import { useCurrentUser } from '../contexts/CurrentUserContext';


const Navigation = () => {

  const currentUser = useCurrentUser();

  const loggedInUser = <>{currentUser?.username}</>;

  const loggedOutUser = (
    <>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/signin">
        Sign in
      </NavLink>
      <NavLink
        to="/signup"
        className={styles.NavLink}
        activeClassName={styles.Active}>
        Sign up
      </NavLink>
    </>
  );

  return (
    <Navbar expand="md" fixed="top" className={styles.NavBar}>
      <Container>
        <NavLink className={styles.NavLink} to="/">
          <Navbar.Brand className={styles.AppLogo}>
            <img src={logo} alt="logo" />
            Platinum
          </Navbar.Brand>
        </NavLink>
        <Navbar.Toggle aria-controls="navbarScroll" className={styles.MenuToggler}><i class="fas fa-bars"></i></Navbar.Toggle>
        <Navbar.Collapse id="navbarScroll">
          
        <Nav className="ml-auto text-left">
            <NavLink
              exact
              className={styles.NavLink}
              activeClassName={styles.Active}
              to="/">
              Home
            </NavLink>

            {currentUser ? loggedInUser : loggedOutUser}

          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigation