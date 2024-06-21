import React, { useState, useEffect, useContext } from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, Avatar, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import GroupIcon from '@mui/icons-material/Group';
import SecurityIcon from '@mui/icons-material/Security';
import axios from 'axios';
import {UserContext} from '../UserContext';

function LeftMenu({ onMenuClick }) {

  const { user } = useContext(UserContext);
  const [admins, setAdmins] = useState({ nombre: '', apellido: '' });

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await axios.get(`https://api-sis324.onrender.com/admins/${user.roleId}`);
        setAdmins(response.data);
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    };

    fetchPatient();
  }, [user.roleId]);

  return (
    <Box sx={{ width: 250, bgcolor: 'background.paper', boxShadow: 3, borderRadius: 3, height: '100vh' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
        <Avatar sx={{ width: 100, height: 100 }}>{admins.nombre[0]}</Avatar>
        <Typography variant="h6" sx={{ mt: 2 }}>
          {admins.nombre} {admins.apellido}
        </Typography>
      </Box>
      <List>
        <ListItem button onClick={() => onMenuClick('main')}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Principal" />
        </ListItem>
        <ListItem button onClick={() => onMenuClick('users')}>
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText primary="Gestion de Usuarios" />
        </ListItem>
        <ListItem button onClick={() => onMenuClick('segurity')}>
          <ListItemIcon>
            <SecurityIcon />
          </ListItemIcon>
          <ListItemText primary="Security" />
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


