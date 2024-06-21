import React, { useState, useEffect, useContext } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CalendarViewDayIcon from '@mui/icons-material/CalendarViewDay';
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';
import axios from 'axios';
import { UserContext } from '../../UserContext';
import './Calendar.css';

function Main() { 
  const [view, setView] = useState('day');
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('https://api-sis324.onrender.com/appointments');
        const doctorAppointments = response.data.filter(appointment => appointment.doctorId === user.roleId);
        setAppointments(doctorAppointments);
      } catch (error) {
        console.error('Error fetching appointments:', error);
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

    fetchAppointments();
    fetchPatients();
  }, [user.roleId]);

  const handleAppointmentClick = (appointment) => {
    navigate('/appointment_edit', { state: { appointment } });
  };

  const getAppointmentsByDate = (date) => {
    return appointments.filter((appointment) => {
      const appointmentDate = new Date(`${appointment.date}T${appointment.time}`);
      return (
        appointmentDate.getFullYear() === date.getFullYear() &&
        appointmentDate.getMonth() === date.getMonth() &&
        appointmentDate.getDate() === date.getDate()
      );
    });
  };

  const getClientName = (clientId) => {
    const client = patients.find((patient) => patient.id === clientId);
    return client ? `${client.nombre} ${client.apellido}` : `Client ID: ${clientId}`;
  };

  const getDayView = () => {
    const today = new Date();
    const appointmentsForToday = getAppointmentsByDate(today);

    return (
      <Box className="calendar-view day-view">
        {appointmentsForToday.map((appointment) => (
          <Box
            key={appointment.id}
            className="appointment"
            onClick={() => handleAppointmentClick(appointment)}
          >
            <Typography variant="body1">{`Paciente: ${getClientName(appointment.clientId)}`}</Typography>
            <Typography variant="body2">{appointment.medicalInfo}</Typography>
            <Typography variant="caption">{appointment.status}</Typography>
          </Box>
        ))}
      </Box>
    );
  };

  const getWeekView = () => {
    const today = new Date();
    const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const startOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
    const endOfWeek = new Date(startOfWeek.getTime() + 7 * 24 * 60 * 60 * 1000);

    const appointmentsForWeek = {};
    let currentDate = new Date(startOfWeek.getTime());
    while (currentDate < endOfWeek) {
      const appointmentsForDay = getAppointmentsByDate(currentDate);
      if (appointmentsForDay.length > 0) {
        appointmentsForWeek[currentDate.getDay()] = appointmentsForDay;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return (
      <Box className="calendar-view week-view">
        {daysOfWeek.map((dayOfWeek, index) => (
          <Box key={dayOfWeek} className="week-day">
            <Typography variant="body2" className="week-day-title">
              {dayOfWeek}
            </Typography>
            {appointmentsForWeek[index] &&
              appointmentsForWeek[index].map((appointment) => (
                <Box
                  key={appointment.id}
                  className="appointment"
                  onClick={() => handleAppointmentClick(appointment)}
                >
                  <Typography variant="body1">{`Paciente: ${getClientName(appointment.clientId)}`}</Typography>
                  <Typography variant="body2">{appointment.medicalInfo}</Typography>
                  <Typography variant="caption">{appointment.status}</Typography>
                </Box>
              ))}
          </Box>
        ))}
      </Box>
    );
  };

  const getMonthView = () => {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const appointmentsForMonth = [];

    let currentDate = new Date(startOfMonth.getTime());
    while (currentDate <= endOfMonth) {
      appointmentsForMonth.push(...getAppointmentsByDate(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return (
      <Box className="calendar-view month-view">
        <Typography variant="body2">{startOfMonth.toLocaleString('default', { month: 'long' })}</Typography>
        {appointmentsForMonth.map((appointment) => (
          <Box
            key={appointment.id}
            className="appointment"
            onClick={() => handleAppointmentClick(appointment)}
          >
            <Typography variant="body1">{`Paciente: ${getClientName(appointment.clientId)}`}</Typography>
            <Typography variant="body2">{appointment.medicalInfo}</Typography>
            <Typography variant="caption">{appointment.status}</Typography>
          </Box>
        ))}
      </Box>
    );
  };

  const getView = () => {
    switch (view) {
      case 'day':
        return getDayView();
      case 'week':
        return getWeekView();
      case 'month':
        return getMonthView();
      default:
        return getDayView();
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">Citas</Typography>
        <Box>
          <IconButton onClick={() => setView('day')}>
            <CalendarTodayIcon />
          </IconButton>
          <IconButton onClick={() => setView('week')}>
            <CalendarViewDayIcon />
          </IconButton>
          <IconButton onClick={() => setView('month')}>
            <CalendarViewMonthIcon />
          </IconButton>
        </Box>
      </Box>

      {getView()}
    </Box>
  );
}

export default Main;



