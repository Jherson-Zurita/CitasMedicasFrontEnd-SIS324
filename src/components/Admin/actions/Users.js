import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Button,
  Tabs,
  Tab,
  Paper,
  Grid,
  Card,
  CardContent,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

// Cambiar el estado inicial a vacío
const initialUsers = {
  Patient: [],
  Doctor: [],
  Assistant: [],
};

function Users() {
  const [userType, setUserType] = useState('Patient');
  const [users, setUsers] = useState(initialUsers);
  const [selectedUser, setSelectedUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    especialidad: '',
    fechanacimiento: '',
    direccion: '',
    idHistoryMedic: '',
  });

  useEffect(() => {
    // Cargar datos de usuarios desde la API
    const fetchData = async () => {
      try {
        const patientsResponse = await axios.get('https://api-sis324.onrender.com/patients');
        const doctorsResponse = await axios.get('https://api-sis324.onrender.com/doctors');
        const assistantsResponse = await axios.get('https://api-sis324.onrender.com/assistants');
        setUsers({
          Patient: patientsResponse.data,
          Doctor: doctorsResponse.data,
          Assistant: assistantsResponse.data,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleTabChange = (event, newValue) => {
    setUserType(newValue);
    setSelectedUser(null);
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handleEditUser = async () => {
    try {
      await axios.put(`https://api-sis324.onrender.com/${userType.toLowerCase()}s/${selectedUser.id}`, selectedUser);
      setUsers((prevState) => ({
        ...prevState,
        [userType]: prevState[userType].map((user) => (user.id === selectedUser.id ? selectedUser : user)),
      }));
      setSelectedUser(null);
    } catch (error) {
      console.error('Error editing user:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`https://api-sis324.onrender.com/${userType.toLowerCase()}s/${userId}`);
      setUsers((prevState) => ({
        ...prevState,
        [userType]: prevState[userType].filter((user) => user.id !== userId),
      }));
      setSelectedUser(null);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddUser = async () => {
    try {
        // Primero, agregamos el usuario a la tabla correspondiente (patients, doctors, assistants)
        let newUserDetails = {
            nombre: newUser.nombre,
            apellido: newUser.apellido,
            email: newUser.email,
            telefono: newUser.telefono,
            especialidad: newUser.especialidad,
            fechanacimiento: newUser.fechanacimiento,
            direccion: newUser.direccion,
            idHistoryMedic: newUser.idHistoryMedic,
        };

        let newUserResponse;
        if (userType === 'Doctor') {
            newUserResponse = await axios.post('https://api-sis324.onrender.com/doctors', newUserDetails);
        } else if (userType === 'Patient') {
            newUserResponse = await axios.post('https://api-sis324.onrender.com/patients', newUserDetails);
        } else if (userType === 'Assistant') {
            newUserResponse = await axios.post('https://api-sis324.onrender.com/assistants', newUserDetails);
        }

        // Obtener el id del usuario creado en la tabla correspondiente
        const userId = newUserResponse.data.id;

        // Luego, agregamos el usuario a la tabla Users
        const userResponse = await axios.post('https://api-sis324.onrender.com/users', {
            email: newUser.email,
            password: 'defaultPassword', // Puedes establecer una contraseña predeterminada aquí
            role: userType.toLowerCase(),
            roleId: userId,
        });

        // Actualizar el estado local con el nuevo usuario
        setUsers((prevState) => ({
            ...prevState,
            [userType]: [...prevState[userType], newUserDetails],
        }));

        // Limpiar el formulario y cerrar el diálogo
        setNewUser({
            nombre: '',
            apellido: '',
            email: '',
            telefono: '',
            especialidad: '',
            fechanacimiento: '',
            direccion: '',
            idHistoryMedic: '',
        });
        handleClose();
    } catch (error) {
        console.error('Error adding user:', error);
    }
};   

  return (
    <Box>
      <Typography variant="h4" mb={4}>
        Manage Users
      </Typography>
      <Tabs value={userType} onChange={handleTabChange} centered>
        <Tab label="Patients" value="Patient" />
        <Tab label="Doctors" value="Doctor" />
        <Tab label="Assistants" value="Assistant" />
      </Tabs>
      <Grid container spacing={4} mt={2}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6">{userType}s</Typography>
            {users[userType].map((user) => (
              <Card
                key={user.id}
                sx={{ mt: 2, cursor: 'pointer' }}
                onClick={() => handleUserClick(user)}
              >
                <CardContent>
                  <Typography variant="body1">{user.nombre} {user.apellido}</Typography>
                  <Typography variant="body2">{user.email}</Typography>
                </CardContent>
              </Card>
            ))}
            <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleOpen}>
              Add New {userType}
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          {selectedUser && (
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h6">Edit {userType}</Typography>
              <TextField
                fullWidth
                label="Name"
                value={selectedUser.nombre}
                onChange={(e) => setSelectedUser({ ...selectedUser, nombre: e.target.value })}
                sx={{ mt: 2 }}
              />
              <TextField
                fullWidth
                label="Last Name"
                value={selectedUser.apellido}
                onChange={(e) => setSelectedUser({ ...selectedUser, apellido: e.target.value })}
                sx={{ mt: 2 }}
              />
              <TextField
                fullWidth
                label="Email"
                value={selectedUser.email}
                onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                sx={{ mt: 2 }}
              />
              <TextField
                fullWidth
                label="Phone"
                value={selectedUser.telefono}
                onChange={(e) => setSelectedUser({ ...selectedUser, telefono: e.target.value })}
                sx={{ mt: 2 }}
              />
              {userType === 'Doctor' && (
                <TextField
                  fullWidth
                  label="Specialty"
                  value={selectedUser.especialidad}
                  onChange={(e) => setSelectedUser({ ...selectedUser, especialidad: e.target.value })}
                  sx={{ mt: 2 }}
                />
              )}
              {userType === 'Patient' && (
                <>
                  <TextField
                    fullWidth
                    label="Date of Birth"
                    value={selectedUser.fechanacimiento}
                    onChange={(e) => setSelectedUser({ ...selectedUser, fechanacimiento: e.target.value })}
                    sx={{ mt: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Address"
                    value={selectedUser.direccion}
                    onChange={(e) => setSelectedUser({ ...selectedUser, direccion: e.target.value })}
                    sx={{ mt: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Medical History ID"
                    value={selectedUser.idHistoryMedic}
                    onChange={(e) => setSelectedUser({ ...selectedUser, idHistoryMedic: e.target.value })}
                    sx={{ mt: 2 }}
                  />
                </>
              )}
              <Box mt={2}>
                <Button variant="contained" color="primary" onClick={handleEditUser}>
                  Save Changes
                </Button>
                <Button variant="contained" color="secondary" onClick={() => handleDeleteUser(selectedUser.id)} sx={{ ml: 2 }}>
                  Delete {userType}
                </Button>
              </Box>
            </Paper>
          )}
        </Grid>
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New {userType}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill in the details of the new {userType}.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            value={newUser.nombre}
            onChange={(e) => setNewUser({ ...newUser, nombre: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Last Name"
            fullWidth
            value={newUser.apellido}
            onChange={(e) => setNewUser({ ...newUser, apellido: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Email"
            fullWidth
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Phone"
            fullWidth
            value={newUser.telefono}
            onChange={(e) => setNewUser({ ...newUser, telefono: e.target.value })}
          />
          {userType === 'Doctor' && (
            <TextField
              margin="dense"
              label="Specialty"
              fullWidth
              value={newUser.especialidad}
              onChange={(e) => setNewUser({ ...newUser, especialidad: e.target.value })}
            />
          )}
          {userType === 'Patient' && (
            <>
              <TextField
                margin="dense"
                label="Date of Birth"
                fullWidth
                value={newUser.fechanacimiento}
                onChange={(e) => setNewUser({ ...newUser, fechanacimiento: e.target.value })}
              />
              <TextField
                margin="dense"
                label="Address"
                fullWidth
                value={newUser.direccion}
                onChange={(e) => setNewUser({ ...newUser, direccion: e.target.value })}
              />
              <TextField
                margin="dense"
                label="Medical History ID"
                fullWidth
                value={newUser.idHistoryMedic}
                onChange={(e) => setNewUser({ ...newUser, idHistoryMedic: e.target.value })}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddUser} color="primary">
            Add {userType}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Users;
