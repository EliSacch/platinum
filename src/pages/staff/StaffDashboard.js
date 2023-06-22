import React, { useState } from 'react';
// router
import { useHistory } from 'react-router-dom';
// context
import { useCurrentUser } from '../../contexts/CurrentUserContext';
// custom componenets
import DashboardNavBar from '../../components/DashboardNavBar';
import DashboardDisplay from './DashboardDisplay';
import Controls from './Controls';
// custom css
import styles from '../../styles/Dashboard.module.css';


function StaffDashboard() {

  const [display, setDisplay] = useState('calendar');

  const currentUser = useCurrentUser();
  const history = useHistory();

  return (
    currentUser?.is_staff ? (
      <>
        <DashboardNavBar />
        <main className={styles.Main}>
          <h1>Hi, {currentUser.username}</h1>
          <Controls setDisplay={setDisplay}/>
          <DashboardDisplay display={display} />
        </main>
      </>
    ) : (
      history.push('/')
    )
  )
}

export default StaffDashboard
