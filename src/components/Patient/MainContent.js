import React from 'react';
import { Box } from '@mui/material';
import Main from './actions/main';
import NewAppointment from './actions/NewAppointment';
import AppointmentHistory from './actions/AppointmentHistory';
import Notifications from './actions/Notifications';
import MedicalRecords from './actions/MedicalRecords';
import Logout from './actions/Logout';

function MainContent({ currentView }) {
  const renderView = () => {
    switch (currentView) {
      case 'main':
        return <Main />;
      case 'new-appointment':
        return <NewAppointment />;
      case 'appointment-history':
        return <AppointmentHistory />;
      case 'notifications':
          return <Notifications />;
      case 'medical-records':
          return <MedicalRecords />;
      case 'logout':
          return <Logout />;
      default:
        return <Box>Principal Content</Box>;
    }
  };

  return (
    <Box sx={{ p: 2, flexGrow: 1 }}>
      {renderView()}
    </Box>
  );
}

export default MainContent;
