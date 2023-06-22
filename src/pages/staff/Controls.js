import React from 'react'
// bootstrap
import { Button, Container } from 'react-bootstrap';
// custom css
import styles from '../../styles/Controls.module.css';


const Controls = ({ setDisplay, }) => {

    const handleDisplay = (value) => {
        setDisplay(value)
    }
    return (
        <Container className={styles.ControlsContainer}>
            <Button
                className={styles.ControlsBtn}
                onClick={() => handleDisplay('calendar')}
            >
                <i className="far fa-calendar-alt" />
            </Button>
            <Button
                className={styles.ControlsBtn}
                onClick={() => handleDisplay('treatments')}
            >
                <i className="fas fa-th-list" />
            </Button>
            <Button
                className={styles.ControlsBtn}
                onClick={() => handleDisplay('clients')}
            >
                <i className="fas fa-user-friends" />
            </Button>
        </Container>
    )
}

export default Controls
