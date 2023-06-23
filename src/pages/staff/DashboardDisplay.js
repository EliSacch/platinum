import React from 'react';
// custom componenets
import ClientsList from './ClientsList';
import TreatmentsList from './TreatmentsList';
import AppointmentsList from './AppointmentsList';
import CalendarComponenet from './CalendarComponenet';

const DashboardDisplay = ({display,}) => {

  return (
    <div>
      {display==='calendar' && <CalendarComponenet />}
      {display==='appointments' && <AppointmentsList />}
      {display==='treatments' && <TreatmentsList />}
      {display==='clients' && <ClientsList />}
    </div>
  )
}

export default DashboardDisplay
