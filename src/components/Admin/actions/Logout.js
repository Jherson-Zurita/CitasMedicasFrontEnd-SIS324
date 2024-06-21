import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Paper } from '@mui/material';

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    alert('Has cerrado sesión exitosamente.');
    navigate('/');
  }, [navigate]);

  return (
    <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
      <Typography variant="h6" gutterBottom>
        Cerrando Sesión...
      </Typography>
    </Paper>
  );
}

export default Logout;
