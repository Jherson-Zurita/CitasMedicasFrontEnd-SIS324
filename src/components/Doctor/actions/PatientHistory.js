import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, List, ListItem, ListItemText, Divider, TextField, Button, IconButton } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';
import Patient from '../../../models/Patient';
import HistoryMedic from '../../../models/HistoryMedic';

function PatientHistory() {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patientHistory, setPatientHistory] = useState([]);
  const [selectedHistoryIndex, setSelectedHistoryIndex] = useState(0);
  const [newHistory, setNewHistory] = useState('');

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('https://api-sis324.onrender.com/patients');
        setPatients(response.data);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchPatients();
  }, []);

  const fetchPatientHistory = async (patientId) => {
    try {
      const response = await axios.get(`https://api-sis324.onrender.com/history-medics?idPatient=${patientId}`);
      setPatientHistory(response.data);
    } catch (error) {
      console.error('Error fetching patient history:', error);
    }
  };

  const handlePatientClick = (patient) => {
    setSelectedPatient(patient);
    setSelectedHistoryIndex(0);
    fetchPatientHistory(patient.id);
  };

  const handleNextHistory = () => {
    if (selectedPatient) {
      if (selectedHistoryIndex < patientHistory.length - 1) {
        setSelectedHistoryIndex(selectedHistoryIndex + 1);
      }
    }
  };

  const handlePreviousHistory = () => {
    if (selectedPatient && selectedHistoryIndex > 0) {
      setSelectedHistoryIndex(selectedHistoryIndex - 1);
    }
  };

  const handleAddHistory = async () => {
    if (selectedPatient && newHistory) {
      try {
        const response = await axios.post('https://api-sis324.onrender.com/history-medics', {
          idPatient: selectedPatient.id,
          notas: newHistory,
          fecha: new Date().toISOString().split('T')[0]
        });
        const newHistoryEntry = response.data;
        setPatientHistory([...patientHistory, newHistoryEntry]);
        setNewHistory('');
        setSelectedHistoryIndex(patientHistory.length);
      } catch (error) {
        console.error('Error adding patient history:', error);
      }
    }
  };

  const handleHistoryChange = (event) => {
    setNewHistory(event.target.value);
  };

  const currentHistory = selectedPatient ? patientHistory[selectedHistoryIndex] : null;

  return (
    <Box display="flex">
      <Box flex={1}>
        <Typography variant="h4">Historial de Pacientes</Typography>
        <List>
          {patients.map((patient) => (
            <ListItem button key={patient.id} onClick={() => handlePatientClick(patient)}>
              <ListItemText primary={`${patient.nombre} ${patient.apellido}`} secondary={patient.email} />
            </ListItem>
          ))}
        </List>
      </Box>
      <Box flex={2} ml={4}>
        {selectedPatient ? (
          <>
            <Typography variant="h5">{`Historial Médico de ${selectedPatient.nombre} ${selectedPatient.apellido}`}</Typography>
            {currentHistory && (
              <Card sx={{ mt: 2 }}>
                <CardContent>
                  <Typography variant="body1">{`Fecha: ${currentHistory.fecha}`}</Typography>
                  <Typography variant="body2">{currentHistory.notas}</Typography>
                </CardContent>
              </Card>
            )}
            <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
              <IconButton onClick={handlePreviousHistory} disabled={selectedHistoryIndex === 0}>
                <ArrowBackIcon />
              </IconButton>
              <Typography>{`Historial ${selectedHistoryIndex + 1} de ${patientHistory.length}`}</Typography>
              <IconButton onClick={handleNextHistory} disabled={selectedHistoryIndex === patientHistory.length - 1}>
                <ArrowForwardIcon />
              </IconButton>
            </Box>
            <Box mt={4}>
              <Typography variant="h6">Agregar Nuevo Historial Médico</Typography>
              <TextField
                fullWidth
                label="Notas"
                value={newHistory}
                onChange={handleHistoryChange}
                multiline
                rows={4}
                sx={{ mt: 2 }}
              />
              <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleAddHistory}>
                Agregar Historial
              </Button>
            </Box>
          </>
        ) : (
          <Typography variant="h5">Seleccione un paciente para ver su historial médico</Typography>
        )}
      </Box>
    </Box>
  );
}

export default PatientHistory;


