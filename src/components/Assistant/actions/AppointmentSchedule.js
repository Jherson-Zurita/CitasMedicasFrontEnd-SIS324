import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, List, ListItem, ListItemText, Divider, Button, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import axios from 'axios';
import Appointment from '../../../models/Appointment';
import Doctor from '../../../models/Doctor';
import Patient from '../../../models/Patient';

function AppointmentSchedule() {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedPatient, setSelectedPatient] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [status, setStatus] = useState('');
  const [medicalInfo, setMedicalInfo] = useState('');

  useEffect(() => {
    fetchAppointments();
    fetchDoctors();
    fetchPatients();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('https://api-sis324.onrender.com/appointments');
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('https://api-sis324.onrender.com/doctors');
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
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

  const handleAppointmentClick = (appointment) => {
    setSelectedAppointment(appointment);
    setSelectedDoctor(appointment.doctorId);
    setSelectedPatient(appointment.patientId);
    setDate(appointment.date);
    setTime(appointment.time);
    setStatus(appointment.status);
    setMedicalInfo(appointment.medicalInfo);
  };

  const handleSave = async () => {
    try {
      if (selectedAppointment) {
        // Update existing appointment
        const updatedAppointment = {
          ...selectedAppointment,
          date,
          time,
          doctorId: selectedDoctor,
          patientId: selectedPatient,
          status,
          medicalInfo,
        };
        await axios.put(`https://api-sis324.onrender.com/appointments/${selectedAppointment.id}`, updatedAppointment);
        setAppointments(appointments.map((appt) => (appt.id === selectedAppointment.id ? updatedAppointment : appt)));
        alert('Cita actualizada correctamente');
      } else {
        // Create new appointment
        const newAppointment = {
          date,
          time,
          doctorId: selectedDoctor,
          clientId: selectedPatient,
          status,
          medicalInfo,
        };
        await axios.post('https://api-sis324.onrender.com/appointments', newAppointment);
        fetchAppointments(); // Re-fetch appointments to update the list
        alert('Nueva cita creada correctamente');
      }
      clearForm();
    } catch (error) {
      console.error('Error saving appointment:', error);
      alert('Error al guardar la cita');
    }
  };

  const handleClearForm = () => {
    clearForm();
  };

  const handleDelete = async () => {
    try {
      if (selectedAppointment) {
        await axios.delete(`https://api-sis324.onrender.com/appointments/${selectedAppointment.id}`);
        setAppointments(appointments.filter((appt) => appt.id !== selectedAppointment.id));
        alert('Cita eliminada correctamente');
        clearForm();
      }
    } catch (error) {
      console.error('Error deleting appointment:', error);
      alert('Error al eliminar la cita');
    }
  };

  const clearForm = () => {
    setSelectedAppointment(null);
    setSelectedDoctor('');
    setSelectedPatient('');
    setDate('');
    setTime('');
    setStatus('');
    setMedicalInfo('');
  };

  return (
    <Box>
      <Typography variant="h4">Gestión de Citas</Typography>
      <Box display="flex" mt={2}>
        <Box flex={1}>
          <Typography variant="h5">Lista de Citas</Typography>
          <List sx={{ maxHeight: 400, overflow: 'auto' }}>
            {appointments.map((appointment) => (
              <ListItem
                button
                key={appointment.id}
                onClick={() => handleAppointmentClick(appointment)}
                selected={selectedAppointment && selectedAppointment.id === appointment.id}
              >
                <ListItemText
                  primary={`${appointment.date} ${appointment.time}`}
                  secondary={`Doctor: ${doctors.find((doc) => doc.id === appointment.doctorId)?.nombre}`}
                />
              </ListItem>
            ))}
          </List>
        </Box>
        <Box ml={2} maxWidth={700}>
          <Typography variant="h5">Detalles de la Cita</Typography>
          <Card sx={{ mt: 2 }}>
            <CardContent>
              <FormControl fullWidth sx={{ mt: 1 }}>
                <InputLabel>Doctor</InputLabel>
                <Select
                  value={selectedDoctor}
                  onChange={(e) => setSelectedDoctor(e.target.value)}
                >
                  {doctors.map((doctor) => (
                    <MenuItem key={doctor.id} value={doctor.id}>
                      {doctor.nombre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel>Paciente</InputLabel>
                <Select
                  value={selectedPatient}
                  onChange={(e) => setSelectedPatient(e.target.value)}
                >
                  {patients.map((patient) => (
                    <MenuItem key={patient.id} value={patient.id}>
                      {`${patient.nombre} ${patient.apellido}`}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="Fecha"
                name="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                type="date"
                sx={{ mt: 2 }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                fullWidth
                label="Hora"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                type="time"
                sx={{ mt: 2 }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel>Estado</InputLabel>
                <Select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  {['Scheduled', 'Completed', 'Missed', 'Cancelled', 'Rescheduled'].map((status) => (
                    <MenuItem key={status} value={status}>
                      {status}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="Información Médica"
                value={medicalInfo}
                onChange={(e) => setMedicalInfo(e.target.value)}
                multiline
                rows={4}
                sx={{ mt: 2 }}
              />
              <Box display="flex" justifyContent="space-between" mt={2}>
                <Button variant="contained" color="primary" onClick={handleSave}>
                  Guardar
                </Button>
                <Button variant="contained" color="secondary" onClick={handleClearForm}>
                  Limpiar
                </Button>
                <Button variant="contained" color="error" onClick={handleDelete}>
                  Eliminar
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}

export default AppointmentSchedule;

