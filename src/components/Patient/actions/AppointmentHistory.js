import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from 'axios';

function AppointmentHistory() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('https://api-sis324.onrender.com/appointments');
        const appointmentsData = response.data;

        // Extract all doctor ids from appointments
        const doctorIds = appointmentsData.map(appointment => appointment.doctorId);

        // Fetch doctors data
        const doctorsResponse = await axios.get('https://api-sis324.onrender.com/doctors', {
          params: {
            ids: doctorIds.join(',') // Comma separated list of doctor ids
          }
        });
        const doctorsData = doctorsResponse.data;

        // Merge doctor data into appointments
        const appointmentsWithDoctors = appointmentsData.map(appointment => {
          const doctor = doctorsData.find(doctor => doctor.id === appointment.doctorId);
          return {
            ...appointment,
            doctor: doctor // Add doctor data to each appointment
          };
        });

        setAppointments(appointmentsWithDoctors);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Historial de Citas
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Fecha</TableCell>
              <TableCell>Hora</TableCell>
              <TableCell>Doctor</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Información Médica</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell>{appointment.date}</TableCell>
                <TableCell>{appointment.time}</TableCell>
                <TableCell>{appointment.doctor && appointment.doctor.nombre}</TableCell>
                <TableCell>{appointment.status}</TableCell>
                <TableCell>{appointment.medicalInfo}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default AppointmentHistory;


