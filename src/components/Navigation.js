import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import logo from '../assets/hair-icon-wine.png'
import styles from '../styles/Navigation.module.css';

import { NavLink } from 'react-router-dom';
import { useCurrentUser } from '../contexts/CurrentUserContext';


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
        <i className="fas fa-sign-in-alt"></i>Sign in
      </NavLink>
      <NavLink
        to="/signup"
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        <i className="fas fa-user-plus"></i>Sign up
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
            <NavLink
              exact
              className={styles.NavLink}
              activeClassName={styles.Active}
              to="/">
              Home
            </NavLink>

            {currentUser ? loggedInIcons : loggedOutIcons}

          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigation