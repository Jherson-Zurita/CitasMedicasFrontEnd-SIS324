import React from 'react';
import { Box } from '@mui/material';
import Main from './actions/main';
import AppointmentEdit from './actions/AppointmentEdit';
import PatientHistory from './actions/PatientHistory';
import Logout from './actions/Logout';

function MainContent({ currentView }) {
  const renderView = () => {
    switch (currentView) {
      case 'main':
        return <Main />;
      case 'appointment_edit':
        return <AppointmentEdit />;
      case 'pacient-history':
        return <PatientHistory />;
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

