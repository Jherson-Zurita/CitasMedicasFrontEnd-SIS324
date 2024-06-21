import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Paper, Card, CardContent, Button } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Main() {
  const [userRegistrationsData, setUserRegistrationsData] = useState({
    labels: [],
    datasets: [
      {
        label: 'User Registrations',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  });

  const [recentActivities, setRecentActivities] = useState([]);

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  useEffect(() => {
    fetchUserRegistrations();
    fetchRecentActivities();
  }, []);

  const fetchUserRegistrations = async () => {
    try {
      const response = await axios.get('https://api-sis324.onrender.com/users');
      const userData = response.data;

      const labels = userData.map((user) => user.name);
      const data = userData.map((user) => user.registrations);

      setUserRegistrationsData({
        ...userRegistrationsData,
        labels: labels,
        datasets: [
          {
            ...userRegistrationsData.datasets[0],
            data: data,
          },
        ],
      });
    } catch (error) {
      console.error('Error fetching user registrations:', error);
    }
  };

  const fetchRecentActivities = async () => {
    try {
      // Assuming the recent activities are not provided by the API, placeholder message
      setRecentActivities(['No recent activities found']);
    } catch (error) {
      console.error('Error fetching recent activities:', error);
    }
  };

  return (
    <Box>
      <Typography variant="h4" mb={4}>
        Admin Dashboard
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6">User Registrations</Typography>
            <Bar data={userRegistrationsData} options={options} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6">System Health</Typography>
            {/* Placeholder for another chart or statistic */}
            <Box mt={2}>
              <Typography variant="body1">Everything is running smoothly.</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6">Recent Activity</Typography>
              <Box mt={2}>
                {recentActivities.map((activity, index) => (
                  <Typography key={index} variant="body1">{activity}</Typography>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Box mt={4} display="flex" justifyContent="flex-end">
        <Button variant="contained" color="primary">Generate Report</Button>
      </Box>
    </Box>
  );
}

export default Main;


