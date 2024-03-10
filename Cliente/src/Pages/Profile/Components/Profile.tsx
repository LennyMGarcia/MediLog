
import Accordion from "@mui/material/Accordion/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary/AccordionSummary";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from "@mui/material/Box/Box";
import Grid from "@mui/material/Grid/Grid";

import Typography from "@mui/material/Typography/Typography";
import Avatar from '@mui/material/Avatar';
import { useParams } from 'react-router-dom';
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import ProfileList from "./ProfileList/ProfileList";
import ListFormater from "./ProfileList/ListFormater";
import Modal from "@mui/material/Modal/Modal";
import Button from "@mui/material/Button/Button";
import Tabs from "@mui/material/Tabs/Tabs";
import Tab from "@mui/material/Tab/Tab";
import { Form, Formik } from "formik";

import PhoneIcon from '@mui/icons-material/Phone';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import PaidIcon from '@mui/icons-material/Paid';

import BasicProfileForm from "./forms/BasicProfileForm";
import ContactProfileForm from "./forms/ContactProfileForm";
import FinancialProfileForm from "./forms/FinancialProfileForm";
import useDataRegisterStore from "../../Register/ZustandRegisterManagement";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "auto",
  height: "auto",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface IPatientProfileData {
  tipo: string,
  nombre: any | null,
  apellido: any | null,
  fecha_nacimiento: any | null,
  documento_identidad: any | null,
  sexo: any | null,
  correo: any | null,
  direccion: any | null,
  telefono: any | null,
  tipo_sangre: any | null,
  padecimientos: any | any[] | null,
  alergias: string[],
  familiares: string[],
  metodo_pago: string,
  datos_financieros: any | null,
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



const Profile: React.FC = () => {

  const { setRegisterData, getRegisterData } = useDataRegisterStore();

  const [id, setId] = useState<string | undefined>('0');

  const generateSlug = useCallback((profileData: IPatientProfileData | ISpecialistProfileData) => {
    const { nombre, apellido } = profileData;
    const slug = `${nombre}${apellido}`;
    return slug;
  }, [])

  function getIdFromName(name: string, profiles: Record<any, IPatientProfileData | ISpecialistProfileData | undefined>): string | undefined {
    for (const [id, profile] of Object.entries(profiles)) {
      if (profile && profile.nombre === name) {
        return id;
      }
    }
    return undefined; 
  }


  const getFakeProfileData = useCallback((
    idOrNameObj: { idOrName: string; name: string },
    profiles: Record<any, IPatientProfileData | ISpecialistProfileData | undefined>
  ): IPatientProfileData | ISpecialistProfileData | undefined =>{
    const { idOrName, name } = idOrNameObj;
  
    if (!idOrName) {
      return undefined;
    }
  
    if (profiles[idOrName]) {
      return profiles[idOrName];
    }

    if (name === "") {
      return profiles[idOrName];
    }
  
    const profileValues = Object.values(profiles);
    let profile = profileValues.find(profile => `${profile?.nombre}${profile?.apellido}` === name);


    if (!profile && name === "") {
      profile = profiles[idOrName];
    }
  
    return profile;
  }, [])
  
  const profilesObject: Record<string, IPatientProfileData | ISpecialistProfileData> = {
    '1': {
      tipo: "Paciente",
      nombre: getRegisterData("nombre") ,
      apellido: getRegisterData("apellido"),
      fecha_nacimiento: getRegisterData("fecha_nacimiento"),
      documento_identidad: getRegisterData("documento_identidad"),
      sexo: getRegisterData("sexo"),
      correo: getRegisterData("correo"),
      direccion: getRegisterData("direccion"),
      telefono: getRegisterData("telefono"),
      tipo_sangre: 'O+',
      padecimientos: getRegisterData("padecimientos"),
      alergias: ["mujeres", "cafe", "Mi prima"],
      familiares: ["BenJunior", "maikol", "jose Jimenez"],
      metodo_pago: "Tarjeta de Debito",
      datos_financieros: getRegisterData("datos_financieros"),

    },
    '3': {
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


  const { idOrName } = useParams<{ idOrName: string }>();
  const fetchedData: any = getFakeProfileData({ idOrName: idOrName || "", name: idOrName || "" }, profilesObject);

  useEffect(() => {
    if (fetchedData) {
      const profileId = getIdFromName(fetchedData?.nombre, profilesObject);
      setId(profileId);
    }
  }, []);

  const [modalOpen, setModalOpen] = React.useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  const [tabValue, setTabValue] = React.useState('one');

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };
  

  const navigate = useNavigate();
  const [profileData, setProfileData] = useState<IPatientProfileData | ISpecialistProfileData | undefined>()

  useEffect(() => {
    if (idOrName) {
      const fetchedProfileData = getFakeProfileData({ idOrName: idOrName || "", name: idOrName || "" }, profilesObject);;

      if (!fetchedProfileData) {
        console.log('No se encontró el perfil');
        navigate('/404');
        return;
      }

      setProfileData(fetchedProfileData);

      const slug = generateSlug(fetchedProfileData);
      if(slug == ''){
        navigate(`/profile/${idOrName}`);
        return
      }
      navigate(`/profile/${slug}`);
    }
  }, [idOrName, navigate]);


  if (!profileData) {
    return <div>Cargando...</div>; //shadow
  }

  const initialValues = {
    tabValue: "one", //valores de ej
    field1: "",
    field2: "",
    field3: "",
    padecimientos: [""],
    alergias: [""],
    familiares: [""],
    nombre: "",
  };

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
                  { name: "Nombre", data: profilesObject[id as keyof typeof profilesObject]?.nombre || '' },
                  { name: "Apellido", data: profilesObject[id as keyof typeof profilesObject]?.apellido || '', },
                  { name: "Fecha de nacimiento", data: profilesObject[id as keyof typeof profilesObject]?.fecha_nacimiento, },
                  { name: "Documento de indentidad", data: (profilesObject[id as keyof typeof profilesObject] as IPatientProfileData).documento_identidad, },
                  { name: "Sexo", data: profilesObject[id as keyof typeof profilesObject]?.sexo, },
                  { name: "Correo", data: profilesObject[id as keyof typeof profilesObject]?.correo, },
                  { name: "Tipo de sangre", data: (profilesObject[id as keyof typeof profilesObject] as IPatientProfileData).tipo_sangre, },
                  { name: "Padecimiento", data: <ListFormater formatData={(profilesObject[id as keyof typeof profilesObject] as IPatientProfileData).padecimientos} /> },
                  { name: "Alergias", data: <ListFormater formatData={(profilesObject[id as keyof typeof profilesObject] as IPatientProfileData).alergias} /> },
                  { name: "Familiares", data: <ListFormater isNavigate={true} formatData={(profilesObject[id as keyof typeof profilesObject] as IPatientProfileData).familiares} /> },
                ]} />
                :
                <ProfileList dataList={[
                  { name: "Nombre", data: profilesObject[id as keyof typeof profilesObject]?.nombre, },
                  { name: "Apellido", data: profilesObject[id as keyof typeof profilesObject]?.apellido, },
                  { name: "Fecha de nacimiento", data: profilesObject[id as keyof typeof profilesObject]?.fecha_nacimiento, },
                  { name: "Sexo", data: profilesObject[id as keyof typeof profilesObject]?.sexo, },
                  { name: "Especialidad", data: (profilesObject[id as keyof typeof profilesObject] as ISpecialistProfileData).especialidad },
                ]} />
              }
            </AccordionDetails>
          </Accordion>

          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              id="Informacion_contacto"
            >
              Informacion de contacto
            </AccordionSummary>
            <AccordionDetails>
              <ProfileList dataList={[
                { name: "Correo", data: profilesObject[id as keyof typeof profilesObject]?.correo, },
                { name: "Direccion", data: profilesObject[id as keyof typeof profilesObject]?.direccion, },
                { name: "Telefono", data: profilesObject[id as keyof typeof profilesObject]?.telefono, },
              ]} />
            </AccordionDetails>
          </Accordion>

          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              id="Informacion_financiera"
            >
              Informacion financiera
            </AccordionSummary>
            <AccordionDetails>
              <ProfileList dataList={[
                { name: "Metodo de pago", data: profilesObject[id as keyof typeof profilesObject]?.metodo_pago, },
                { name: "Codigo de tarjeta", data: profilesObject[id as keyof typeof profilesObject]?.datos_financieros, },
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
          <Box sx={{
            marginTop: "1rem",
            marginLeft: "-3rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}>
            {/*EDITAR*/}
            <Button variant="contained" onClick={handleModalOpen} sx={{ width: "12rem", backgroundColor: "#52b69a" }}>Editar</Button>
            <Modal
              keepMounted
              open={modalOpen}
              onClose={handleModalClose}
            >
              <Box sx={style} >
                <Box sx={{ width: '100%', typography: 'body1' }}>
                  <Box sx={{ width: '100%', height: "100%" }}>
                    <Formik
                      initialValues={{ initialValues }}
                      onSubmit={() => console.log("adios")}
                    >
                      {({ handleSubmit }) => (
                        <Form onSubmit={handleSubmit}>
                          <Tabs
                            value={tabValue}
                            onChange={handleTabChange}
                            variant="fullWidth"
                            sx={{
                              '& .MuiTabs-indicator': {
                                backgroundColor: ' #52b69a',
                              },
                              '& .MuiTab-root': {
                                color: '#168aad',
                                '&.Mui-selected': {
                                  color: ' #52b69a',
                                },
                                '&:hover': {
                                  color: '#34a0a4',
                                },
                              },
                            }}
                          >
                            <Tab icon={<PersonPinIcon />} value="one" label="basico" />
                            <Tab icon={<PhoneIcon />} value="two" label="Contacto" />
                            <Tab icon={<PaidIcon />} value="three" label="MonetariO" />
                          </Tabs>
                          <Box sx={{
                            maxHeight: '60vh',
                            overflowY: 'scroll',
                            '&::-webkit-scrollbar': {
                              width: '0.5em',
                            },
                            '&::-webkit-scrollbar-thumb': {
                              backgroundColor: '#52b69a',
                              borderRadius: '4px',
                            },
                          }}>
                            <Box hidden={tabValue !== "one"}>
                              <BasicProfileForm type={userType} profileValues={profilesObject[id as keyof typeof profilesObject] || {}} />
                            </Box>

                            <Box role="tabpanel" hidden={tabValue !== "two"}>
                              <ContactProfileForm profileValues={profilesObject[id as keyof typeof profilesObject] || {}} />
                            </Box>

                            <Box role="tabpanel" hidden={tabValue !== "three"}>
                              <FinancialProfileForm profileValues={profilesObject[id as keyof typeof profilesObject] || {}} />
                            </Box>

                          </Box>
                          {/*ENVIAR INFORMACION*/}
                          <Button sx={{ mt: "0.5rem", backgroundColor: "#52b69a" }}
                            fullWidth

                            variant="contained"
                            type="submit"
                          >
                            Miami me lo confirmo
                          </Button>
                        </Form>
                      )}
                    </Formik>
                  </Box>
                </Box>
              </Box>
            </Modal>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );

};

export default Profile;
