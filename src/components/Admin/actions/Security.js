import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import axios from 'axios';

function Security() {
  const [selectedRole, setSelectedRole] = useState('');
  const [rolesData, setRolesData] = useState([]);
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const [openAddRole, setOpenAddRole] = useState(false);
  const [newRole, setNewRole] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    // Cargar roles y usuarios al inicio
    fetchRoles();
    fetchUsers();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await axios.get('https://api-sis324.onrender.com/users');
      setRolesData(response.data);
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://api-sis324.onrender.com/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleOpenChangePassword = (user) => {
    setSelectedUser(user);
    setOpenChangePassword(true);
  };

  const handleCloseChangePassword = () => {
    setSelectedUser(null);
    setOpenChangePassword(false);
  };

  const handleOpenAddRole = () => {
    setOpenAddRole(true);
  };

  const handleCloseAddRole = () => {
    setOpenAddRole(false);
  };

  const handleAddRole = async () => {
    try {
      // Agregar nuevo rol
      const response = await axios.post('https://api-sis324.onrender.com/users', {
        name: newRole,
      });
      setRolesData([...rolesData, response.data]);
      setNewRole('');
      handleCloseAddRole();
    } catch (error) {
      console.error('Error adding role:', error);
    }
  };

  const handleChangePassword = async () => {
    try {
      // Cambiar contraseña
      await axios.put(`https://api-sis324.onrender.com/users/${selectedUser.id}`, {
        password: newPassword,
      });
      setNewPassword('');
      handleCloseChangePassword();
    } catch (error) {
      console.error('Error changing password:', error);
    }
  };

  return (
    <Box>
      <Typography variant="h4" mb={4}>
        Security Management
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6">Manage Roles</Typography>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>Role</InputLabel>
              <Select value={selectedRole} onChange={handleRoleChange}>
                {rolesData.map((role) => (
                  <MenuItem key={role.id} value={role.name}>
                    {role.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleOpenAddRole}>
              Add New Role
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6">Change Password</Typography>
            <TableContainer component={Paper} sx={{ mt: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell align="center">
                        <Button variant="contained" color="secondary" onClick={() => handleOpenChangePassword(user)}>
                          Change Password
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Dialog for adding new role */}
      <Dialog open={openAddRole} onClose={handleCloseAddRole}>
        <DialogTitle>Add New Role</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the name of the new role.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Role Name"
            fullWidth
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddRole} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddRole} color="primary">
            Add Role
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for changing password */}
      <Dialog open={openChangePassword} onClose={handleCloseChangePassword}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter a new password for {selectedUser?.name}.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="New Password"
            type="password"
            fullWidth
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseChangePassword} color="primary">
            Cancel
          </Button>
          <Button onClick={handleChangePassword} color="primary">
            Change Password
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Security;

