import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import logo from '../assets/hair-icon-wine.png'
import styles from '../styles/Navigation.module.css';

import { NavLink } from 'react-router-dom';
import { useCurrentUser } from '../contexts/CurrentUserContext';
import { NavDropdown } from 'react-bootstrap';


const Navigation = () => {

  const currentUser = useCurrentUser();
  const loggedInIcons = <>{currentUser?.username}</>;
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
          
        <Nav className="ml-auto text-left">

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

        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigation