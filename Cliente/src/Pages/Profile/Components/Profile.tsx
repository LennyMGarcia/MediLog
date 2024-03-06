
import Accordion from "@mui/material/Accordion/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary/AccordionSummary";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from "@mui/material/Box/Box";
import Grid from "@mui/material/Grid/Grid";

import Typography from "@mui/material/Typography/Typography";
import Avatar from '@mui/material/Avatar';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import ProfileList from "./ProfileList/ProfileList";

interface IProfileData {
  nombre: string,
  apellido: string,
  fecha_nacimiento: string,
  documento_identidad: string,
  correo: string,
  telefono: string,
  tipo_sangre: string,
}

function getFakeProfileData(idOrName: string = "1") {
  const profiles: Record<string, IProfileData | undefined> = {
    '1': {
      nombre: 'Lenny Manuel',
      apellido: 'Garcia',
      fecha_nacimiento: '27-05-2001',
      documento_identidad: '11987654321',
      correo: 'lenny@gmail.com',
      telefono: '18296572014',
      tipo_sangre: 'O+',
    },
    '2': {
      nombre: 'Ben',
      apellido: 'Dourlouis',
      fecha_nacimiento: '16-9-2001',
      documento_identidad: '12345678911',
      correo: 'ben@gmail.com',
      telefono: '18291041014',
      tipo_sangre: 'AB+',
    },
  };

  if (!idOrName) {
    return undefined; 
  }

  let profile = profiles[idOrName];
  if (profile) {
    return profile;
  }

  const profileValues = Object.values(profiles);
  profile = profileValues.find(profile => `${profile?.nombre}${profile?.apellido}` === idOrName);
  return profile;
}


function generateSlug(profileData: IProfileData) {
  const { nombre, apellido } = profileData;
  const slug = `${nombre}${apellido}`;
  return slug;
}

const Profile: React.FC = () => {


  const { idOrName } = useParams<{ idOrName: string }>();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState<IProfileData | undefined>();

  useEffect(() => {
    const fetchedProfileData = getFakeProfileData(idOrName);

    if (!fetchedProfileData) {
      console.log('No se encontró el perfil');
      navigate('/404'); 
      return;
    }

    setProfileData(fetchedProfileData);
  }, [idOrName]);

  useEffect(() => {
    if (profileData) {
      const slug = generateSlug(profileData);
      navigate(`/profile/${slug}`);
    }
  }, [profileData, navigate]);

  if (!profileData) {
    return <div>Cargando...</div>; 
  }

  return (
    <Box sx={{ backgroundColor: "#E9ECEF", minHeight: "86vh", width: "100vw" }}>
      <Typography sx={{ paddingTop: "2rem", paddingLeft: "5rem" }} variant="h5">Perfil</Typography>
      <Grid container spacing={2} sx={{ padding: "2rem", paddingTop: "1rem", paddingLeft: "5rem" }}>
        <Grid item md={9} sx={{ marginLeft: "auto", marginRight: "auto" }}>

          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              id="Informacion_basica"

            >
              Informacion basica
            </AccordionSummary>
            <AccordionDetails>
              <ProfileList dataList={[
                { name: "Nombre", data: profileData.nombre, },
                { name: "Apellido", data: profileData.apellido, },
                { name: "Fecha de nacimiento", data: profileData.fecha_nacimiento, },
                { name: "Documento de indentidad", data: profileData.documento_identidad, },
                { name: "Correo", data: profileData.correo, },
                { name: "Telefono", data: profileData.telefono, },
                { name: "Tipo de sangre", data: profileData.tipo_sangre, },
              ]} />
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
              <ProfileList dataList={[
                {
                  name: "Nombre", data: profileData.nombre,
                },
              ]} />
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
            <Typography sx={{ padding: "1rem" }} variant="body1">Foto de perfil</Typography>
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
