import React, { useState } from 'react';
import styles from '../../styles/Dashboard.module.css';

import DashboardNavBar from '../../components/DashboardNavBar';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { useHistory } from 'react-router-dom';
import DashboardDisplay from './DashboardDisplay';
import Controls from './Controls';


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
