import React, { useState } from 'react';
import { Box, CssBaseline } from '@mui/material';
import LeftMenu from './LeftMenu';
import TopBar from './TopBar';
import MainContent from './MainContent';

function PatientDashboard() {
  const [currentView, setCurrentView] = useState('main');

  const handleMenuClick = (view) => {
    setCurrentView(view);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <LeftMenu onMenuClick={handleMenuClick} />
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <TopBar />
        <MainContent currentView={currentView} />
      </Box>
    </Box>
  );
}

export default PatientDashboard;



