import React from 'react';
// custom componenets
import ClientsList from './ClientsList';
import TreatmentsList from './TreatmentsList';

const DashboardDisplay = ({display,}) => {

  return (
    <div>
      {display==='calendar' && <p>Calendar</p>}
      {display==='treatments' && <TreatmentsList />}
      {display==='clients' && <ClientsList />}
    </div>
  )
}

export default DashboardDisplay
