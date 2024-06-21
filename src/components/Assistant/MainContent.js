import React from 'react';
import { Box } from '@mui/material';
import Logout from './actions/Logout';
import Main from './actions/Main';
import AppointmentSchedule from './actions/AppointmentSchedule';
import MedicHistory from './actions/MedicHistory';
import Receipt from './actions/Receipt';

function MainContent({ currentView }) {
  const renderView = () => {
    switch (currentView) {
      case 'main':
        return <Main />;
      case 'appointment_schedule':
        return <AppointmentSchedule />;
      case 'medic-history':
        return <MedicHistory />;
      case 'report':
        return <Receipt />;
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

