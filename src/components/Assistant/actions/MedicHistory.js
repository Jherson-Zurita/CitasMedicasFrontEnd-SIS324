import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Card, CardContent, List, ListItem, ListItemText, Button, TextField } from '@mui/material';
import Doctor from '../../../models/Doctor';

const initialDoctor = new Doctor(null, '', '', '', '', '');

function MedicHistory() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(initialDoctor);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('https://api-sis324.onrender.com/doctors');
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const handleDoctorClick = (doctor) => {
    setSelectedDoctor(doctor);
  };

  const handleSave = async () => {
    try {
      if (selectedDoctor.id) {
        // Update existing doctor
        await axios.put(`https://api-sis324.onrender.com/doctors/${selectedDoctor.id}`, selectedDoctor);
        const updatedDoctors = doctors.map((doc) => (doc.id === selectedDoctor.id ? selectedDoctor : doc));
        setDoctors(updatedDoctors);
        alert('Doctor updated successfully');
      } else {
        // Create new doctor
        const response = await axios.post('https://api-sis324.onrender.com/doctors', selectedDoctor);
        const newDoctor = response.data;
        setDoctors([...doctors, newDoctor]);
        alert('New doctor created successfully');
      }
      clearForm();
    } catch (error) {
      console.error('Error saving doctor:', error);
    }
  };

  const handleDelete = async () => {
    try {
      if (selectedDoctor.id) {
        await axios.delete(`https://api-sis324.onrender.com/doctors/${selectedDoctor.id}`);
        const updatedDoctors = doctors.filter((doc) => doc.id !== selectedDoctor.id);
        setDoctors(updatedDoctors);
        alert('Doctor deleted successfully');
        clearForm();
      }
    } catch (error) {
      console.error('Error deleting doctor:', error);
    }
  };

  const clearForm = () => {
    setSelectedDoctor(initialDoctor);
  };

  return (
    <Box>
      <Typography variant="h4">Historial de Médicos</Typography>
      <Box display="flex" mt={2}>
        <Box flex={1} minWidth={200}>
          <Typography variant="h5">Lista de Médicos</Typography>
          <List sx={{ maxHeight: 400, overflow: 'auto' }}>
            {doctors.map((doctor) => (
              <ListItem
                button
                key={doctor.id}
                onClick={() => handleDoctorClick(doctor)}
                selected={selectedDoctor.id === doctor.id}
              >
                <ListItemText primary={`${doctor.nombre}`} secondary={`${doctor.especialidad}`} />
              </ListItem>
            ))}
          </List>
        </Box>
        <Box ml={2} maxWidth={700}>
          <Typography variant="h5">Detalles del Médico</Typography>
          <Card sx={{ mt: 2 }}>
            <CardContent>
              <TextField
                fullWidth
                label="Nombre"
                value={selectedDoctor.nombre}
                onChange={(e) => setSelectedDoctor({ ...selectedDoctor, nombre: e.target.value })}
                sx={{ mt: 2 }}
              />
              <TextField
                fullWidth
                label="Apellido"
                value={selectedDoctor.apellido}
                onChange={(e) => setSelectedDoctor({ ...selectedDoctor, apellido: e.target.value })}
                sx={{ mt: 2 }}
              />
              <TextField
                fullWidth
                label="Especialidad"
                value={selectedDoctor.especialidad}
                onChange={(e) => setSelectedDoctor({ ...selectedDoctor, especialidad: e.target.value })}
                sx={{ mt: 2 }}
              />
              <TextField
                fullWidth
                label="Teléfono"
                value={selectedDoctor.telefono}
                onChange={(e) => setSelectedDoctor({ ...selectedDoctor, telefono: e.target.value })}
                sx={{ mt: 2 }}
              />
              <TextField
                fullWidth
                label="Email"
                value={selectedDoctor.email}
                onChange={(e) => setSelectedDoctor({ ...selectedDoctor, email: e.target.value })}
                sx={{ mt: 2 }}
              />
              <Box display="flex" justifyContent="space-between" mt={2}>
                <Button variant="contained" color="primary" onClick={handleSave}>
                  Guardar
                </Button>
                <Button variant="contained" color="secondary" onClick={clearForm}>
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

export default MedicHistory;

