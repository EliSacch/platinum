import React from 'react'
import ClientsList from './ClientsList'

const DashboardDisplay = ({display,}) => {

  return (
    <div>
      {display==='calendar' && <p>Calendar</p>}
      {display==='treatments' && <p>Treatments</p>}
      {display==='clients' && <ClientsList />}
    </div>
  )
}

export default DashboardDisplay
