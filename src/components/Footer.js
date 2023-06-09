import React from 'react'
import styles from '../styles/Footer.module.css'
import { Container } from 'react-bootstrap'

function Footer() {
  return (
    <footer className={styles.Footer}>

        <Container className={styles.FooterContainer}>
        <div>
            <h3>Contact us</h3>
            <ul>
                <li>Phone: +353 123 4567</li>
                <li>Email: platinum@info.com</li>
                <li>Address: 58, Via marina vecchia, Massa, 54100, Italy</li>
            </ul>
        </div>

        <div>
            <h3>Social</h3>
            <ul>
                <li>Facebook</li>
                <li>Instagram</li>
            </ul>
        </div>
        
        <div>
            <h3>Opening Hours</h3>
            <table>
                <tr>
                    <td>Tuesday</td>
                    <td>- 9am to 6pm</td>
                </tr>
                <tr>
                    <td>Wednesday</td>
                    <td>- 9am to 6pm</td>
                </tr>
                <tr>
                    <td>Thursday</td>
                    <td>- 9am to 6pm</td>
                </tr>
                <tr>
                    <td>Friday</td>
                    <td>- 9am to 6pm</td>
                </tr>
                <tr>
                    <td>Saturday</td>
                    <td>- 9am to 6pm</td>
                </tr>
                <tr>
                    <td>Sunday - Monday</td>
                    <td>- CLOSED</td>
                </tr>
            </table>
        </div>
        </Container>

    </footer>
  )
}

export default Footer
