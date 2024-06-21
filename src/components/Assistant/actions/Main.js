import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import Appointment from '../../../models/Appointment';

function Main() {
  const [appointments, setAppointments] = useState([]);
  const [dailyData, setDailyData] = useState(null);
  const [monthlyData, setMonthlyData] = useState(null);
  const [yearlyData, setYearlyData] = useState(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('https://api-sis324.onrender.com/appointments');
      setAppointments(response.data);
      generateChartData(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const generateChartData = (appointments) => {
    const dailyCounts = {};
    const monthlyCounts = {};
    const yearlyCounts = {};

    appointments.forEach((appointment) => {
      const appointmentDate = new Date(appointment.date);
      const day = appointmentDate.toISOString().split('T')[0];
      const month = appointmentDate.getMonth() + 1;
      const year = appointmentDate.getFullYear();

      dailyCounts[day] = (dailyCounts[day] || 0) + 1;
      monthlyCounts[month] = (monthlyCounts[month] || 0) + 1;
      yearlyCounts[year] = (yearlyCounts[year] || 0) + 1;
    });

    setDailyData({
      labels: Object.keys(dailyCounts),
      datasets: [
        {
          label: 'Citas por Día',
          data: Object.values(dailyCounts),
          backgroundColor: 'rgba(75,192,192,0.6)',
        },
      ],
    });

    setMonthlyData({
      labels: Object.keys(monthlyCounts),
      datasets: [
        {
          label: 'Citas por Mes',
          data: Object.values(monthlyCounts),
          backgroundColor: 'rgba(153,102,255,0.6)',
        },
      ],
    });

    setYearlyData({
      labels: Object.keys(yearlyCounts),
      datasets: [
        {
          label: 'Citas por Año',
          data: Object.values(yearlyCounts),
          backgroundColor: 'rgba(255,159,64,0.6)',
        },
      ],
    });
  };

  return (
    <Box>
      <Typography variant="h4">Dashboard de Citas</Typography>
      <Box>
        <Typography variant="h6">Citas por Día</Typography>
        {dailyData ? <Bar data={dailyData} /> : <Typography variant="body2">Cargando datos...</Typography>}
      </Box>
      <Box mt={4}>
        <Typography variant="h6">Citas por Mes</Typography>
        {monthlyData ? <Bar data={monthlyData} /> : <Typography variant="body2">Cargando datos...</Typography>}
      </Box>
      <Box mt={4}>
        <Typography variant="h6">Citas por Año</Typography>
        {yearlyData ? <Bar data={yearlyData} /> : <Typography variant="body2">Cargando datos...</Typography>}
      </Box>
    </Box>
  );
}

export default Main;


