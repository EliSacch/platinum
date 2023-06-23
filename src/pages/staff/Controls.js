import React from 'react'
// bootstrap
import { Button, Container, OverlayTrigger, Tooltip } from 'react-bootstrap';
// custom css
import styles from '../../styles/Controls.module.css';


const Controls = ({ setDisplay, }) => {

    // Tootlips
    const calendarTooltip = <Tooltip id="calendar" placement="bottom">Calendar</Tooltip>
    const appointmentsTooltip = <Tooltip id="appintments" placement="bottom">Appointments</Tooltip>
    const treatmentsTooltip = <Tooltip id="treatments" placement="bottom">Manage treatments</Tooltip>
    const clientsTooltip = <Tooltip id="clients" placement="bottom">Manage clients</Tooltip>


    // when a button is clicked, the specific value is passed to the display
    const handleDisplay = (value) => {
        setDisplay(value)
    }

    return (
        <Container className={styles.ControlsContainer}>

            <OverlayTrigger placement='bottom' overlay={calendarTooltip}>
                <Button
                    className={styles.ControlsBtn}
                    onClick={() => handleDisplay('calendar')}
                >
                    <i className="far fa-calendar-alt" />
                </Button>
            </OverlayTrigger>

            <OverlayTrigger placement='bottom' overlay={appointmentsTooltip}>
                <Button
                    className={styles.ControlsBtn}
                    onClick={() => handleDisplay('appointments')}
                >
                    <i className="fas fa-th-list" />
                </Button>
            </OverlayTrigger>

            <OverlayTrigger placement='bottom' overlay={treatmentsTooltip}>
                <Button
                    className={styles.ControlsBtn}
                    onClick={() => handleDisplay('treatments')}
                >
                    <i className="fas fa-cog" />
                </Button>
            </OverlayTrigger>

            <OverlayTrigger placement='bottom' overlay={clientsTooltip}>
                <Button
                    className={styles.ControlsBtn}
                    onClick={() => handleDisplay('clients')}
                >
                    <i className="fas fa-user-friends" />
                </Button>
            </OverlayTrigger>
        </Container>
    )
}

export default Controls
