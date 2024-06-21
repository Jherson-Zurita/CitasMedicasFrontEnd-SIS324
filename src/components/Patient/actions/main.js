import React, { useState, useEffect, useContext } from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Grid } from '@mui/material';
import axios from 'axios';
import {UserContext} from '../../UserContext';

function Main() {
  const [appointments, setAppointments] = useState([]);
  const { user } = useContext(UserContext);
  console.log("User :",user);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const appointmentsResponse = await axios.get('https://api-sis324.onrender.com/appointments');
        const appointmentsData = appointmentsResponse.data;

        // Filtrar citas según el roleId del paciente
        const patientAppointments = appointmentsData.filter(appointment => appointment.clientId === user.roleId);

        // Extract all doctor ids from patientAppointments
        const doctorIds = patientAppointments.map(appointment => appointment.doctorId);

        // Fetch doctors data
        const doctorsResponse = await axios.get('https://api-sis324.onrender.com/doctors', {
          params: {
            ids: doctorIds.join(',') // Comma separated list of doctor ids
          }
        });
        const doctorsData = doctorsResponse.data;

        // Merge doctor data into appointments
        const appointmentsWithDoctors = patientAppointments.map(appointment => {
          const doctor = doctorsData.find(doctor => doctor.id === appointment.doctorId);
          return {
            ...appointment,
            Doctor: doctor // Add doctor data to each appointment
          };
        });

        setAppointments(appointmentsWithDoctors);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, [user.roleId]);

  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2, backgroundImage: 'linear-gradient(45deg, #007BFF 30%, #0000FF 90%)', border: 0, borderRadius: 3, boxShadow: 3 }}>
            <Typography variant="h6" gutterBottom>
              Citas Programadas
            </Typography>
            <Box>
              {appointments.map((appointment) => (
                <Paper key={appointment.id} sx={{ mb: 2, p: 2 }}>
                  <Typography variant="body1">
                    {appointment.date} - {appointment.time}
                  </Typography>
                  <Typography variant="body2">
                    {appointment.Doctor && appointment.Doctor.nombre} - {appointment.Doctor && appointment.Doctor.especialidad}
                  </Typography>
                </Paper>
              ))}
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2, backgroundImage: 'linear-gradient(45deg, #40E0D0 30%, #00008B 90%)' }}>
            <Typography variant="h6" gutterBottom>
              Notificaciones y Recordatorios
            </Typography>
            {/* Tu código de notificaciones */}
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 2, backgroundImage: 'linear-gradient(45deg, #ADD8E6 30%, #00008B 90%)' }}>
            <Typography variant="h6" gutterBottom>
              Detalles de Citas Programadas
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Fecha</TableCell>
                    <TableCell>Hora</TableCell>
                    <TableCell>Doctor</TableCell>
                    <TableCell>Especialidad</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {appointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell>{appointment.date}</TableCell>
                      <TableCell>{appointment.time}</TableCell>
                      <TableCell>{appointment.Doctor && appointment.Doctor.nombre}</TableCell>
                      <TableCell>{appointment.Doctor && appointment.Doctor.especialidad}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Main;



