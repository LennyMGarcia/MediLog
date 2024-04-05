import React from 'react';
import { Typography, Container, Button } from '@mui/material';
import { Link } from 'react-router-dom'; // Asegúrate de tener instalado react-router-dom si estás utilizando rutas en tu app
import useUserStore from '../Common/Utils/setUserSession';

const NotFoundPage = () => {
  const { authenticated } = useUserStore();
  const { getUser } = useUserStore();
  const logged = authenticated() ? getUser().id : undefined;
  const [redirectLink, setRedirectLink] = React.useState(logged ? '/dashboard' : '/');
  const [redirectLocation, setRedirectLocation] = React.useState(logged ? 'Página de Dashboard' : 'Página de Inicio');

  return (
    <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '50px' }}>
      <Typography variant="h1" gutterBottom>
        404
      </Typography>
      <Typography variant="h4" gutterBottom>
        Página No Encontrada
      </Typography>
      <Typography variant="body1" gutterBottom>
        Lo sentimos, La página que estás buscando no existe.
      </Typography>
      <Button variant="contained" component={Link} to={redirectLink} color="primary">
        Ir a la {redirectLocation}
      </Button>
    </Container>
  );
};

export default NotFoundPage;
