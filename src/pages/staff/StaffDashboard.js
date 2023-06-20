import React from 'react';
import styles from '../../styles/Dashboard.module.css';

import DashboardNavBar from '../../components/DashboardNavBar';

function StaffDashboard() {
  return (
    <>
        <DashboardNavBar />
      <main className={styles.Main}>
        <h1>Dashboard</h1>
      </main>
    </>
  )
}

export default StaffDashboard
