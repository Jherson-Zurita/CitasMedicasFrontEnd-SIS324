import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, Switch, Grid, Link as MuiLink, TextField, Button, Typography, Box } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import bgImage from '../assets/images/fondo.jpg';
import { UserContext } from '../components/UserContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('https://api-sis324.onrender.com/users');
      const users = response.data;
      const authenticatedUser = users.find(user => user.email === email && user.password === password);

      if (authenticatedUser) {
        setUser(authenticatedUser); // Store the authenticated user in context
        if (authenticatedUser.role === 'admin') {
          navigate('/admin');
        } else if (authenticatedUser.role === 'doctor') {
          navigate('/doctor');
        } else if (authenticatedUser.role === 'patient') {
          navigate('/patient');
        } else if (authenticatedUser.role === 'assistant') {
          navigate('/assistant');
        } else {
          alert('Rol de usuario desconocido');
        }
      } else {
        alert('Usuario o contraseña incorrectos');
      }
    } catch (error) {
      console.error('Error durante la autenticación', error);
      alert('Error durante la autenticación');
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover' }}
    >
      <Card sx={{ p: 3, width: '100%', maxWidth: 300 }}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          textAlign="center"
          mb={2}
        >
          <Typography variant="h4" fontWeight="medium" color="primary" mb={2}>
            Sign in
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <MuiLink href="#">
                <FacebookIcon color="primary" />
              </MuiLink>
            </Grid>
            <Grid item>
              <MuiLink href="#">
                <GitHubIcon color="primary" />
              </MuiLink>
            </Grid>
            <Grid item>
              <MuiLink href="#">
                <GoogleIcon color="primary" />
              </MuiLink>
            </Grid>
          </Grid>
        </Box>
        <form onSubmit={handleSubmit}>
          <Box mb={2}>
            <TextField
              type="email"
              label="Email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Box>
          <Box mb={2}>
            <TextField
              type="password"
              label="Password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Box>
          <Box display="flex" alignItems="center" mb={2}>
            <Switch checked={rememberMe} onChange={handleSetRememberMe} />
            <Typography
              variant="body2"
              color="textSecondary"
              onClick={handleSetRememberMe}
              sx={{ cursor: 'pointer', ml: 1 }}
            >
              Remember me
            </Typography>
          </Box>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Sign in
          </Button>
        </form>
        <Box mt={3} textAlign="center">
          <Typography variant="body2" color="textSecondary">
            Don't have an account?{' '}
          </Typography>
        </Box>
      </Card>
    </Box>
  );
}

export default Login;





