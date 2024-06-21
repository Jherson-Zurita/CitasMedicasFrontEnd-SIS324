import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';

const fetchNotifications = async () => {
  // Simular llamada a la API
  const data = [
    { message: 'Su cita con Dr. Smith ha sido aprobada', date: '2023-06-01' },
    { message: 'Su cita con Dr. Johnson ha sido reprogramada', date: '2023-06-02' },
  ];
  return data;
};

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const loadNotifications = async () => {
      const notifications = await fetchNotifications();
      setNotifications(notifications);
    };

    loadNotifications();
  }, []);

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Notificaciones
      </Typography>
      <List>
        {notifications.map((notification, index) => (
          <ListItem key={index}>
            <ListItemText primary={notification.message} secondary={notification.date} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default Notifications;
