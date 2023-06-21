import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import logo from '../assets/hair-icon-wine.png'
import styles from '../styles/DashboardNavBar.module.css';

import { NavLink, useHistory } from 'react-router-dom';
import { useSetCurrentUser } from '../contexts/CurrentUserContext';
import axios from 'axios';
import useToggleExpanded from "../hooks/useToggleExpanded";
import ModalComponent from "./ModalComponent";
import { Button } from "react-bootstrap";


const Navigation = () => {

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

    return (
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
                                Back to client view
                            </NavLink>

                        </Nav>
                        <Nav>
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