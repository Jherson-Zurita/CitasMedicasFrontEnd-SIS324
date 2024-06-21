import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Paper } from '@mui/material';

function Receipt() {
  const [receiptData, setReceiptData] = useState({
    date: '',
    recipient: '',
    amount: '',
    description: '',
    notes: '',
  });

  const handleChange = (e) => {
    setReceiptData({
      ...receiptData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <Box>
      <Typography variant="h4" mb={2}>
        Generar Informe/Recibo
      </Typography>
      <Paper sx={{ padding: 2, marginBottom: 2 }}>
        <Typography variant="h6">Detalles del Recibo</Typography>
        <TextField
          fullWidth
          label="Fecha"
          type="date"
          name="date"
          value={receiptData.date}
          onChange={handleChange}
          sx={{ mt: 2 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          fullWidth
          label="Destinatario"
          name="recipient"
          value={receiptData.recipient}
          onChange={handleChange}
          sx={{ mt: 2 }}
        />
        <TextField
          fullWidth
          label="Monto"
          type="number"
          name="amount"
          value={receiptData.amount}
          onChange={handleChange}
          sx={{ mt: 2 }}
        />
        <TextField
          fullWidth
          label="Descripción"
          name="description"
          value={receiptData.description}
          onChange={handleChange}
          multiline
          rows={4}
          sx={{ mt: 2 }}
        />
        <TextField
          fullWidth
          label="Notas"
          name="notes"
          value={receiptData.notes}
          onChange={handleChange}
          multiline
          rows={2}
          sx={{ mt: 2 }}
        />
        <Button variant="contained" color="primary" onClick={handlePrint} sx={{ mt: 2 }}>
          Imprimir
        </Button>
      </Paper>
      <Typography variant="h6" mt={2}>
        Vista Previa del Recibo
      </Typography>
      <Paper id="receipt" sx={{ padding: 2, marginTop: 2 }}>
        <Typography variant="h6">Recibo</Typography>
        <Typography>Fecha: {receiptData.date}</Typography>
        <Typography>Destinatario: {receiptData.recipient}</Typography>
        <Typography>Monto: {receiptData.amount}</Typography>
        <Typography>Descripción: {receiptData.description}</Typography>
        <Typography>Notas: {receiptData.notes}</Typography>
      </Paper>
    </Box>
  );
}

export default Receipt;
