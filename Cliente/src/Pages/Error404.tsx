import React from 'react';
import { Typography, Container, Button } from '@mui/material';
import { Link } from 'react-router-dom'; // Asegúrate de tener instalado react-router-dom si estás utilizando rutas en tu app

const NotFoundPage = () => {
  return (
    <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '50px' }}>
      <Typography variant="h1" gutterBottom>
        404
      </Typography>
      <Typography variant="h4" gutterBottom>
        Página no encontrada
      </Typography>
      <Typography variant="body1" gutterBottom>
        Lo sentimos, la página que estás buscando no existe.
      </Typography>
      <Button variant="contained" component={Link} to="/" color="primary">
        Ir a la página de inicio
      </Button>
    </Container>
  );
};

export default NotFoundPage;
