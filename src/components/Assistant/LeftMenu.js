import React, { useState, useEffect, useContext } from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, Avatar, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import EditIcon from '@mui/icons-material/Edit';
import HistoryIcon from '@mui/icons-material/History';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import axios from 'axios';
import {UserContext} from '../UserContext';

function LeftMenu({ onMenuClick }) {

  const { user } = useContext(UserContext);
  const [assitant, setAssitant] = useState({ nombre: '', apellido: '' });

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await axios.get(`https://api-sis324.onrender.com/assistants/${user.roleId}`);
        setAssitant(response.data);
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    };

    fetchPatient();
  }, [user.roleId]);

  return (
    <Box sx={{ width: 250, bgcolor: 'background.paper', boxShadow: 3, borderRadius: 3, height: '100vh' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
        <Avatar sx={{ width: 100, height: 100 }}>{assitant.nombre[0]}</Avatar>
        <Typography variant="h6" sx={{ mt: 2 }}>
          {assitant.nombre} {assitant.apellido}
        </Typography>
      </Box>
      <List>
        <ListItem button onClick={() => onMenuClick('main')}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Principal" />
        </ListItem>
        <ListItem button onClick={() => onMenuClick('appointment_schedule')}>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <ListItemText primary="Programar Citas" />
        </ListItem>
        <ListItem button onClick={() => onMenuClick('medic-history')}>
          <ListItemIcon>
            <HistoryIcon />
          </ListItemIcon>
          <ListItemText primary="Historial de Médicos" />
        </ListItem>
        <ListItem button onClick={() => onMenuClick('report')}>
          <ListItemIcon>
            <ReceiptIcon />
          </ListItemIcon>
          <ListItemText primary="Informes" />
        </ListItem>
        <ListItem button onClick={() => onMenuClick('logout')}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Cerrar Sesión" />
        </ListItem>
      </List>
    </Box>
  );
}

export default LeftMenu;


