
import Accordion from "@mui/material/Accordion/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary/AccordionSummary";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from "@mui/material/Box/Box";
import Grid from "@mui/material/Grid/Grid";

import Typography from "@mui/material/Typography/Typography";
import Avatar from '@mui/material/Avatar';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import ProfileList from "./ProfileList/ProfileList";
import ListFormater from "./ProfileList/ListFormater";

interface IPatientProfileData {
  tipo: string,
  nombre: string,
  apellido: string,
  fecha_nacimiento: string,
  documento_identidad: string,
  sexo: string,
  correo: string,
  direccion: string,
  telefono: string,
  tipo_sangre: string,
  padecimientos: string[],
  alergias: string[],
  familiares: string[],
  metodo_pago: string,
  datos_financieros: string,
}

interface ISpecialistProfileData {
  tipo: string,
  nombre: string,
  apellido: string,
  fecha_nacimiento: string,
  sexo: string,
  correo: string,
  direccion: string,
  telefono: string,
  especialidad: string,
  metodo_pago: string,
  datos_financieros: string,
}



const profilesObject = {
  '1': {
    tipo: "Paciente",
    nombre: 'Lenny Manuel',
    apellido: 'Garcia',
    fecha_nacimiento: '27-05-2001',
    documento_identidad: '11987654321',
    sexo: "m",
    correo: 'lenny@gmail.com',
    direccion: "La casa de ben",
    telefono: '18296572014',
    tipo_sangre: 'O+',
    padecimientos: ["E-Coli", "Disfuncion Erectil"],
    alergias: ["mujeres", "cafe", "Mi prima"],
    familiares: ["BenJunior", "maikol", "jose Jimenez"],
    metodo_pago: "Tarjeta de Debito",
    datos_financieros: "1234567892222222",

  },
  '2': {
    tipo: "Especialista",
    nombre: "Ben",
    apellido: "Junior",
    fecha_nacimiento: "11-11-2011",
    sexo: "m",
    correo: "ben@gmail.com",
    direccion: "la casa de Julio",
    telefono: "8295455555",
    especialidad: "Ginecologo",
    metodo_pago: "Tarjeta de Credito",
    datos_financieros: "1234567891111111",
  },
};

function getFakeProfileData(idOrName: string = "1", profiles: Record<any, IPatientProfileData | ISpecialistProfileData | undefined>): IPatientProfileData | ISpecialistProfileData | undefined {

  if (!idOrName) {
    return undefined;
  }

  if (profiles[idOrName]) {
    return profiles[idOrName];
  }

  const profileValues = Object.values(profiles);
  const profile = profileValues.find(profile => `${profile?.nombre}${profile?.apellido}` === idOrName);
  return profile;
}

function generateSlug(profileData: IPatientProfileData | ISpecialistProfileData) {
  const { nombre, apellido } = profileData;
  const slug = `${nombre}${apellido}`;
  return slug;
}

const Profile: React.FC = () => {

  const { idOrName } = useParams<{ idOrName: string }>();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState<IPatientProfileData | ISpecialistProfileData | undefined>()

  useEffect(() => {
    const fetchedProfileData = getFakeProfileData(idOrName, profilesObject);

    if (!fetchedProfileData) {
      console.log('No se encontró el perfil');
      navigate('/404');
      return;
    }

    setProfileData(fetchedProfileData);

    if (fetchedProfileData) {
      const slug = generateSlug(fetchedProfileData);
      navigate(`/profile/${slug}`);
    }
  }, [idOrName, navigate]);

  if (!profileData) {
    return <div>Cargando...</div>;
  }

  const userType: string = profileData.tipo;

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
              {userType == "Paciente" ?
                <ProfileList dataList={[
                  { name: "Nombre", data: profileData.nombre, },
                  { name: "Apellido", data: profileData.apellido, },
                  { name: "Fecha de nacimiento", data: profileData.fecha_nacimiento, },
                  { name: "Documento de indentidad", data: (profileData as IPatientProfileData).documento_identidad, },
                  { name: "Sexo", data: profileData.sexo, },
                  { name: "Correo", data: profileData.correo, },
                  { name: "Tipo de sangre", data: (profileData as IPatientProfileData).tipo_sangre, },
                  { name: "Padecimiento", data: <ListFormater formatData={(profileData as IPatientProfileData).padecimientos}/> },
                  { name: "Alergias", data: <ListFormater formatData={(profileData as IPatientProfileData).alergias}/>},
                  { name: "Familiares", data: <ListFormater isNavigate={true} formatData={(profileData as IPatientProfileData).familiares}/> },
                ]} />
                :
                <ProfileList dataList={[
                  { name: "Nombre", data: profileData.nombre, },
                  { name: "Apellido", data: profileData.apellido, },
                  { name: "Fecha de nacimiento", data: profileData.fecha_nacimiento, },
                  { name: "Sexo", data: profileData.sexo, },
                  { name: "Especialidad", data: (profileData as ISpecialistProfileData).especialidad },
                ]} />
              }
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
                { name: "Correo", data: profileData.correo, },
                { name: "Direccion", data: profileData.direccion, },
                { name: "Telefono", data: profileData.telefono, },
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
              <ProfileList dataList={[
                { name: "Metodo de pago", data: profileData.metodo_pago, },
                { name: "Codigo de tarjeta", data: profileData.datos_financieros, },
              ]} />
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
