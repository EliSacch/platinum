import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import logo from '../assets/hair-icon-wine.png'
import styles from '../styles/Navigation.module.css';

import { NavLink } from 'react-router-dom';
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';
import { NavDropdown } from 'react-bootstrap';
import axios from 'axios';


const Navigation = () => {

  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

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
        className={styles.NavLink}
        activeClassName={styles.Active}
        to={`/profiles/${currentUser?.profile_id}`}
      >
        Profile
      </NavLink>
      <NavLink
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
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/signin"
      >
        Sign in
      </NavLink>
      <NavLink
        to="/signup"
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
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
        
        <Navbar.Toggle aria-controls="navbarScroll" className={styles.MenuToggler}><i className="fas fa-bars"></i></Navbar.Toggle>
        <Navbar.Collapse id="navbarScroll">
          
        <Nav className="me-auto">

            <NavDropdown 
              title="Home" 
              id="navbarScrollingDropdown" 
              className={styles.NavDropdown}
              activeClassName={styles.Active}
            >
              <NavDropdown.Item 
                href="#about" 
                className={styles.DropItem} 
                activeClassName={styles.Active}
              >
                About
              </NavDropdown.Item>
              <NavDropdown.Item 
                href="#gallery" 
                className={styles.DropItem} 
                activeClassName={styles.Active}
              >
                Gallery
              </NavDropdown.Item>
              <NavDropdown.Item 
                href="#services" 
                className={styles.DropItem}
                activeClassName={styles.Active}
              >
                Services
              </NavDropdown.Item>
              <NavDropdown.Item 
                href="#book" 
                className={styles.DropItem}
                activeClassName={styles.Active}
              >
                Book
              </NavDropdown.Item>
              <NavDropdown.Item 
                href="#contact" 
                className={styles.DropItem}
                activeClassName={styles.Active}
              >
                Contact
                </NavDropdown.Item>
            </NavDropdown>

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