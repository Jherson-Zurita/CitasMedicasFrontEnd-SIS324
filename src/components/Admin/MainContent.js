import React from 'react';
import { Box } from '@mui/material';
import Logout from './actions/Logout';
import Main from './actions/Main';
import Users from './actions/Users';
import Security from './actions/Security';

function MainContent({ currentView }) {
  const renderView = () => {
    switch (currentView) {
      case 'main':
        return <Main />;
      case 'users':
        return <Users />;
      case 'segurity':
        return <Security />;
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

