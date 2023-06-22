import React, { useEffect, useState } from 'react'
import styles from '../styles/Footer.module.css'
import { Container } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'

function Footer() {

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
    
  return (
    // The footer is displayed only when hide is false
    !hide &&
    <footer className={styles.Footer}>

        <Container className={styles.FooterContainer}>
        <div id="contact">
            <h3>Contact us</h3>
            <ul>
                <li>Phone: <a href="tel:000-123-4567">+000 123 4567</a></li>
                <li>Email: <a href="mailto:platinum@info.com">platinum@info.com</a></li>
                <li>Address: 58, Via marina vecchia, Massa, 54100, Italy</li>
            </ul>
        </div>

        <div>
            <h3>Social</h3>
            <ul className={styles.Social}>
            <li>
                
                <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
                <i className="fab fa-facebook"></i>
                </a>
            </li>
            <li>
                <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
                <i className="fab fa-instagram"></i>
                </a>
            </li>
            </ul>
        </div>
        
        <div>
            <h3>Opening Hours</h3>
            <table>
                <tbody>
                    <tr>
                        <td>Tuesday</td>
                        <td>- 9am to 5pm</td>
                    </tr>
                    <tr>
                        <td>Wednesday</td>
                        <td>- 9am to 5pm</td>
                    </tr>
                    <tr>
                        <td>Thursday</td>
                        <td>- 9am to 5pm</td>
                    </tr>
                    <tr>
                        <td>Friday</td>
                        <td>- 9am to 5pm</td>
                    </tr>
                    <tr>
                        <td>Saturday</td>
                        <td>- 9am to 5pm</td>
                    </tr>
                    <tr>
                        <td>Sunday - Monday</td>
                        <td>- CLOSED</td>
                    </tr>
                </tbody>
            </table>
        </div>
        </Container>

    </footer>
  )
}

export default Footer
