import React from 'react';
import { AppBar, Toolbar, Typography, InputBase, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function TopBar() {
  return (
    <AppBar position="static" sx={{ boxShadow: 3 }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" noWrap component="div">
            Assitant Dashboard
          </Typography>
        </Box>
        <Box sx={{ position: 'relative', borderRadius: 1, bgcolor: 'background.paper', mr: 2 }}>
          <Box sx={{ padding: 1, position: 'absolute', display: 'flex', alignItems: 'center' }}>
            <SearchIcon />
          </Box>
          <InputBase
            placeholder="Buscar…"
            sx={{ ml: 4, width: '100%' }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
