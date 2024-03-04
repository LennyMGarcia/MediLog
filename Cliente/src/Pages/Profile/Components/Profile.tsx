
import Accordion from "@mui/material/Accordion/Accordion";
import AccordionActions from "@mui/material/AccordionActions/AccordionActions";
import AccordionDetails from "@mui/material/AccordionDetails/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary/AccordionSummary";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from "@mui/material/Box/Box";
import Button from "@mui/material/Button/Button";
import Grid from "@mui/material/Grid/Grid";
import List from "@mui/material/List/List";
import ListItem from "@mui/material/ListItem/ListItem";
import Typography from "@mui/material/Typography/Typography";
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';

const Profile: React.FC = () => {

  return (
    <Box sx={{ backgroundColor: "#E9ECEF", minHeight: "86vh", width: "100vw" }}>
      <Typography sx={{paddingTop:"2rem", paddingLeft:"5rem"}} variant="h5">Perfil</Typography>
      <Grid container spacing={2} sx={{ padding: "2rem", paddingTop:"1rem", paddingLeft: "5rem" }}>
        <Grid item md={9} sx={{ marginLeft: "auto", marginRight: "auto" }}>

          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              id="Informacion_basica"

            >
              Informacion basica
            </AccordionSummary>
            <AccordionDetails>
              <List >
              <ListItem sx={{ marginTop: "-1rem" }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="subtitle2">Nombre:</Typography>
                    <Typography variant="body1"><strong>Lenny</strong></Typography>
                  </Box>
                </ListItem>
                <Divider component="li" />
                <ListItem >
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="subtitle2">Apellido:</Typography>
                    <Typography variant="body1"><strong>Garcia</strong></Typography>
                  </Box>
                </ListItem>
                <Divider component="li" />
                <ListItem >
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="subtitle2">Fecha de nacimiento:</Typography>
                    <Typography variant="body1"><strong>27-05-2001</strong></Typography>
                  </Box>
                </ListItem>
                <Divider component="li" />
                <ListItem >
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="subtitle2">Documento de indentidad:</Typography>
                    <Typography variant="body1"><strong>Para que quieres saber eso</strong></Typography>
                  </Box>
                </ListItem>
                <Divider component="li" />
                <ListItem >
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="subtitle2">Sexo:</Typography>
                    <Typography variant="body1"><strong></strong></Typography>
                  </Box>
                </ListItem>
                <Divider component="li" />
                <ListItem >
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="subtitle2">Correo:</Typography>
                    <Typography variant="body1"><strong>l@gmail.com</strong></Typography>
                  </Box>
                </ListItem>
                <Divider component="li" />
                <ListItem >
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="subtitle2">Direccion:</Typography>
                    <Typography variant="body1"><strong></strong></Typography>
                  </Box>
                  </ListItem>
                  <Divider component="li" />
                <ListItem >
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="subtitle2">Telefono:</Typography>
                    <Typography variant="body1"><strong>18296572014</strong></Typography>
                  </Box>
                </ListItem>
                  <Divider component="li" />
                <ListItem >
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="subtitle2">Tipo de sangre:</Typography>
                    <Typography variant="body1"><strong>O+</strong></Typography>
                  </Box>
                </ListItem>
                  <Divider component="li" />
                <ListItem >
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="subtitle2">Padecimiento:</Typography>
                    <Typography variant="body1"><strong></strong></Typography>
                  </Box>
                </ListItem>
                  <Divider component="li" />
                <ListItem >
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="subtitle2">Alergias:</Typography>
                    <Typography variant="body1"><strong></strong></Typography>
                  </Box>
                </ListItem>
                  <Divider component="li" />
                <ListItem >
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="subtitle2">Familiares:</Typography>
                    <Typography variant="body1"><strong></strong></Typography>
                  </Box>
                </ListItem>
               
              </List>
            </AccordionDetails>
          </Accordion>

          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="Informacion_contacto"
            >
              Informacion de contacto
            </AccordionSummary>
            <AccordionDetails>
              <List >
                <ListItem sx={{ marginTop: "-1rem" }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="subtitle2">Nombre:</Typography>
                    <Typography variant="body1"><strong>John Doe</strong></Typography>
                  </Box>
                </ListItem>
                <Divider component="li" />
                <ListItem >
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="subtitle2">Nombre:</Typography>
                    <Typography variant="body1"><strong>John Doe</strong></Typography>
                  </Box>
                </ListItem>
                <Divider component="li" />
                <ListItem >
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="subtitle2">Nombre:</Typography>
                    <Typography variant="body1"><strong>John Doe</strong></Typography>
                  </Box>
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>

          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="Informacion_financiera"
            >
              Informacion financiera
            </AccordionSummary>
            <AccordionDetails>
              <List >
                <ListItem sx={{ marginTop: "-1rem" }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="subtitle2">Nombre:</Typography>
                    <Typography variant="body1"><strong>John Doe</strong></Typography>
                  </Box>
                </ListItem>
                <Divider component="li" />
                <ListItem >
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="subtitle2">Nombre:</Typography>
                    <Typography variant="body1"><strong>John Doe</strong></Typography>
                  </Box>
                </ListItem>
                <Divider component="li" />
                <ListItem >
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="subtitle2">Nombre:</Typography>
                    <Typography variant="body1"><strong>John Doe</strong></Typography>
                  </Box>
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>

        </Grid>

        <Grid item md={3}>
          <Box sx={{
            backgroundColor: "white",
            width: "15rem",
            height: "16rem",
            boxShadow: 1,
            borderRadius: "1rem",

          }}>
            <Typography sx={{padding:"1rem"}} variant="body1">Foto de perfil</Typography>
            <Box sx={{

              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}>
              <Avatar sx={{ height: "10rem", width: "10rem" }} variant="square" />
            </Box>

          </Box>
        </Grid>
      </Grid>
    </Box>
  );

};

export default Profile;
