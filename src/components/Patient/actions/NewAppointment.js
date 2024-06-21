import React, { useState, useEffect, useContext } from 'react';
import { Box, Typography, Paper, TextField, Button, MenuItem } from '@mui/material';
import axios from 'axios';
import {UserContext} from '../../UserContext';

function NewAppointment() {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const [medicalInfo, setMedicalInfo] = useState('');
  const [doctors, setDoctors] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('https://api-sis324.onrender.com/doctors');
        setDoctors(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://api-sis324.onrender.com/appointments', {
        date,
        time,
        doctorId,
        status: 'Pending',
        medicalInfo,
        clientId: user.roleId, // Ensure patientId is correctly sent as clientId
      });
      console.log('New appointment created:', response.data);
  
      // Reset form
      setDate('');
      setTime('');
      setDoctorId('');
      setMedicalInfo('');
    } catch (error) {
      console.error('Error creating new appointment:', error);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Nueva Cita
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <TextField
            label="Fecha"
            type="date"
            fullWidth
            value={date}
            onChange={(e) => setDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Hora"
            type="time"
            fullWidth
            value={time}
            onChange={(e) => setTime(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Doctor"
            select
            fullWidth
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
            required
          >
            {doctors.map((doc) => (
              <MenuItem key={doc.id} value={doc.id}>
                {doc.nombre} - {doc.especialidad}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Box mb={2}>
          <TextField
            label="Información Médica"
            fullWidth
            multiline
            rows={4}
            value={medicalInfo}
            onChange={(e) => setMedicalInfo(e.target.value)}
          />
        </Box>
        <Button type="submit" variant="contained" color="primary">
          Reservar Cita
        </Button>
      </form>
    </Paper>
  );
}

export default NewAppointment;






