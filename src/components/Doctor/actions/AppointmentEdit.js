import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Card, CardContent, FormControl, InputLabel, Select, MenuItem, TextField, Button } from '@mui/material';
import { Schedule, CheckCircle, Error, Cancel, Refresh } from '@mui/icons-material';
import axios from 'axios';

const statusOptions = ['Scheduled', 'Completed', 'Missed', 'Cancelled', 'Rescheduled'];
const statusIcons = {
  Scheduled: Schedule,
  Completed: CheckCircle,
  Missed: Error,
  Cancelled: Cancel,
  Rescheduled: Refresh
};

function AppointmentEdit() {
  const location = useLocation();
  const navigate = useNavigate();
  const { appointment: passedAppointment } = location.state || {};

  const [appointment, setAppointment] = useState(passedAppointment || null);
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [status, setStatus] = useState(passedAppointment ? passedAppointment.status : '');
  const [medicalInfo, setMedicalInfo] = useState(passedAppointment ? passedAppointment.medicalInfo : '');
  const [client, setClient] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('https://api-sis324.onrender.com/appointments');
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    const fetchPatients = async () => {
      try {
        const response = await axios.get('https://api-sis324.onrender.com/patients');
        setPatients(response.data);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchAppointments();
    fetchPatients();

    if (passedAppointment) {
      fetchClient(passedAppointment.clientId);
    }
  }, [passedAppointment]);

  const fetchClient = async (clientId) => {
    try {
      const response = await axios.get(`https://api-sis324.onrender.com/patients/${clientId}`);
      setClient(response.data);
    } catch (error) {
      console.error('Error fetching client data:', error);
    }
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleMedicalInfoChange = (event) => {
    setMedicalInfo(event.target.value);
  };

  const handleSubmit = async () => {
    if (appointment) {
      const updatedAppointment = {
        ...appointment,
        status,
        medicalInfo
      };

      try {
        await axios.put(`https://api-sis324.onrender.com/appointments/${appointment.id}`, updatedAppointment);
        alert('Appointment status updated successfully');
        navigate(-1); // Navigate back after saving
      } catch (error) {
        console.error('Error updating appointment:', error);
      }
    }
  };

  const handleAppointmentClick = (appt) => {
    setAppointment(appt);
    setStatus(appt.status);
    setMedicalInfo(appt.medicalInfo);
    fetchClient(appt.clientId);
  };

  const getClientName = (clientId) => {
    const client = patients.find((patient) => patient.id === clientId);
    return client ? `${client.nombre} ${client.apellido}` : `Client ID: ${clientId}`;
  };

  if (appointment && client) {
    return (
      <Box>
        <Typography variant="h4">Editar Cita</Typography>
        <Card sx={{ mt: 2 }}>
          <CardContent>
            <Typography variant="h6">{`Cita con ${client.nombre} ${client.apellido}`}</Typography>
            <Typography variant="body1">{`Fecha: ${appointment.date}`}</Typography>
            <Typography variant="body1">{`Hora: ${appointment.time}`}</Typography>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>Estado</InputLabel>
              <Select value={status} onChange={handleStatusChange}>
                {statusOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Información Médica"
              value={medicalInfo}
              onChange={handleMedicalInfoChange}
              multiline
              rows={4}
              sx={{ mt: 2 }}
            />
            <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleSubmit}>
              Guardar Cambios
            </Button>
          </CardContent>
        </Card>
      </Box>
    );
  }

  const groupedAppointments = statusOptions.reduce((acc, status) => {
    acc[status] = appointments.filter((appt) => appt.status === status);
    return acc;
  }, {
    Scheduled: [],
    Completed: [],
    Missed: [],
    Cancelled: [],
    Rescheduled: []
  });

  return (
    <Box>
      <Typography variant="h4">Citas</Typography>
      {statusOptions.map((status) => (
        <Box key={status} sx={{ mt: 2 }}>
          <Typography variant="h6">{status}</Typography>
          {groupedAppointments[status].length > 0 ? (
            groupedAppointments[status].map((appt) => {
              const IconComponent = statusIcons[appt.status];
              return (
                <Card
                  key={appt.id}
                  sx={{ mt: 1, display: 'flex', alignItems: 'center' }}
                  onClick={() => handleAppointmentClick(appt)}
                >
                  <CardContent sx={{ flex: 1 }}>
                    <Typography variant="body1">{`Cita con ${getClientName(appt.clientId)}`}</Typography>
                    <Typography variant="body2">{`Fecha: ${appt.date}`}</Typography>
                    <Typography variant="body2">{`Hora: ${appt.time}`}</Typography>
                  </CardContent>
                  <IconComponent />
                </Card>
              );
            })
          ) : (
            <Typography variant="body2">No hay citas en esta categoría.</Typography>
          )}
        </Box>
      ))}
    </Box>
  );
}

export default AppointmentEdit;



