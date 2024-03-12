
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
import useDataRegisterStore, { getAllRegisterData } from "../../Register/ZustandRegisterManagement";

import profileStyle from "../style/profileStyle.module.css"
import Swal from "sweetalert2";
import mergedPatientSchema from "../Utils/yup-schema/yupProfilePatientSchema";
import dayjs from "dayjs";
import mergedSpecialistSchema from "../Utils/yup-schema/yupProfileSpecialistSchema";

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
  alergias: any | any[] | null,
  familiares: any | any[] | null,
  metodo_pago: any | null,
  datos_financieros: any | null,
  cvv: any | null,
  fecha_expiracion: any | null,
  descripcion: any | null,
  categoria: any | null,
  precio: any | null,
}

const patientProfileDataObject: IPatientProfileData = {
  tipo: '',
  nombre: null,
  apellido: null,
  fecha_nacimiento: null,
  documento_identidad: null,
  sexo: null,
  correo: null,
  direccion: null,
  telefono: null,
  tipo_sangre: null,
  padecimientos: null,
  alergias: [],
  familiares: [],
  metodo_pago: '',
  datos_financieros: null,
  cvv: null,
  fecha_expiracion: null,
  descripcion: null,
  categoria: null,
  precio: null,
};

interface ISpecialistProfileData {
  tipo: any | null,
  nombre: any | null,
  apellido: any | null,
  fecha_nacimiento: any | null,
  sexo: any | null,
  correo: any | null,
  direccion: any | null,
  telefono: any | null,
  especialidad: any | null,
  metodo_pago: any | null,
  datos_financieros: any | null,
  cvv: any | null,
  fecha_expiracion: any | null,
  descripcion: any | null,
  categoria: any | null,
  precio: any | null,
}

const specialistProfileDataObject: ISpecialistProfileData = {
  tipo: null,
  nombre: null,
  apellido: null,
  fecha_nacimiento: null,
  sexo: null,
  correo: null,
  direccion: null,
  telefono: null,
  especialidad: null,
  metodo_pago: null,
  datos_financieros: null,
  cvv: null,
  fecha_expiracion: null,
  descripcion: null,
  categoria: null,
  precio: null,
}

const Profile: React.FC = () => {

  const { getRegisterData } = useDataRegisterStore();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState<IPatientProfileData | ISpecialistProfileData | undefined>()
  const [id, setId] = useState<string | undefined>('0');
  const { idOrName } = useParams<{ idOrName: string }>();

  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  const [tabValue, setTabValue] = useState('one');

  function mapDataToProfileObject(data: any): Record<string, IPatientProfileData | ISpecialistProfileData | undefined> | undefined {
    const patientKeys = Object.keys(patientProfileDataObject);
    const specialistKeys = Object.keys(specialistProfileDataObject);

    const isPatient = patientKeys.every(key => Object.keys(data).includes(key));
    const isSpecialist = specialistKeys.every(key => Object.keys(data).includes(key));

    if (!isPatient && !isSpecialist) {
      console.log("El objeto proporcionado no coincide con ninguna estructura conocida.");
      return undefined;
    }

    const mappedObject: IPatientProfileData | ISpecialistProfileData | any = {} as IPatientProfileData | ISpecialistProfileData;

    Object.entries(data).forEach(([key, value]) => {
      mappedObject[key] = value;
    });

    if (isPatient) {
      mappedObject.tipo = "Paciente";
    } else if (isSpecialist) {
      mappedObject.tipo = "Especialista";
    }

    const id = data.id;
    if (!id) {
      console.log("No se encontró un ID en el objeto proporcionado.");
      return undefined;
    }

    const profilesObject: Record<string, IPatientProfileData | ISpecialistProfileData> = {};
    profilesObject[id] = mappedObject;

    return profilesObject;
  }

  const patientData = {
    id: "1",
    tipo: "Paciente",
    nombre: "Lenny",
    apellido: 'Garcia',
    fecha_nacimiento: "01-01-2001",
    documento_identidad: "12345678911",
    sexo: "f",
    correo: "Lenny@gmail.com",
    direccion: "Manzan 9",
    telefono: "18096572014",
    tipo_sangre: 'A+',
    padecimientos: ["Migrana", "Espamos involuntarios", "Apne"],
    alergias: ["Polen", "Agua", "Flores"],
    familiares: ["BenJunior", "maikol", "jose Jimenez"],
    metodo_pago: "Tarjeta de debito",
    datos_financieros: "1234567891234567",
    cvv: "1234",
    fecha_expiracion: "01-01-2014",
    descripcion: "Buen producto",
    categoria: "Basico",
    precio: 0,
  };

  const specialistData= {
    id:"2",
    tipo: "Especialista",
    nombre: "Ben Junior",
    apellido: "Dourlouis",
    fecha_nacimiento: "01-01-2001",
    sexo: "m",
    correo: "Ben@gmail.com",
    direccion: "Villa mella",
    telefono: "18096572014",
    especialidad: "ginecologo",
    metodo_pago: "Tarjeta de debito",
    datos_financieros: "1234567891234567",
    cvv: "4358",
    fecha_expiracion: "01-05-2030",
    descripcion: "Amor y paz",
    categoria: "Hospitales",
    precio: 5000,
  }
  
  //cambia a uno de los dos objetos para probar
  const profilesObject: Record<string, IPatientProfileData | ISpecialistProfileData | undefined> | undefined = mapDataToProfileObject(patientData);
  console.log(profilesObject);

  const generateSlug = useCallback((profileData: IPatientProfileData | ISpecialistProfileData) => {
    const { nombre, apellido } = profileData;
    const slug = `${nombre}${apellido}`;
    return slug;
  }, [])

  function getIdFromName(name: string, profiles: Record<any, IPatientProfileData | ISpecialistProfileData | undefined> | undefined): string | undefined {

    if (profiles == undefined) {
      return undefined
    }

    for (const [id, profile] of Object.entries(profiles)) {
      if (profile && profile.nombre === name) {
        return id;
      }
    }
    return undefined;
  }

  const getFakeProfileData = useCallback((
    idOrNameObj: { idOrName: string; name: string },
    profiles: Record<any, IPatientProfileData | ISpecialistProfileData | undefined> | undefined
  ): IPatientProfileData | ISpecialistProfileData | undefined => {
    const { idOrName, name } = idOrNameObj;

    if (profiles == undefined) {
      return undefined
    }

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

  const fetchedData: any = getFakeProfileData({ idOrName: idOrName || "", name: idOrName || "" }, profilesObject);

  useEffect(() => {
    if (fetchedData) {
      const profileId = getIdFromName(fetchedData?.nombre, profilesObject);
      setId(profileId);
    }
  }, []);


  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

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
      if (slug == '') {
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
    tabValue: "one",
    field1: "",
    field2: "",
    field3: "",
    tipo: "",
    nombre: '',
    apellido: '',
    fecha_nacimiento: '',
    documento_identidad: '',
    sexo: '',
    correo: '',
    direccion: '',
    telefono: '',
    tipo_sangre: '',
    padecimientos: [''],
    alergias: [''],
    familiares: [''],
    metodo_pago: "Tarjeta de Debito",
    datos_financieros: '',
  };

  const userType: string = profileData.tipo;
  console.log(getAllRegisterData())

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
                  { name: "Nombre", data: profilesObject && profilesObject[id as keyof typeof profilesObject]?.nombre || '' },
                  { name: "Apellido", data: profilesObject && profilesObject[id as keyof typeof profilesObject]?.apellido || '', },
                  { name: "Fecha de nacimiento", data: profilesObject && profilesObject[id as keyof typeof profilesObject]?.fecha_nacimiento, },
                  { name: "Documento de indentidad", data: profilesObject && (profilesObject[id as keyof typeof profilesObject] as IPatientProfileData).documento_identidad, },
                  { name: "Sexo", data: profilesObject && profilesObject[id as keyof typeof profilesObject]?.sexo, },
                  { name: "Correo", data: profilesObject && profilesObject[id as keyof typeof profilesObject]?.correo, },
                  { name: "Tipo de sangre", data: profilesObject && (profilesObject[id as keyof typeof profilesObject] as IPatientProfileData).tipo_sangre, },
                  { name: "Padecimiento", data: <ListFormater formatData={profilesObject && (profilesObject[id as keyof typeof profilesObject] as IPatientProfileData).padecimientos} /> },
                  { name: "Alergias", data: <ListFormater formatData={profilesObject && (profilesObject[id as keyof typeof profilesObject] as IPatientProfileData).alergias} /> },
                  { name: "Familiares", data: <ListFormater isNavigate={true} formatData={profilesObject && (profilesObject[id as keyof typeof profilesObject] as IPatientProfileData).familiares} /> },
                ]} />
                :
                <ProfileList dataList={[
                  { name: "Nombre", data: profilesObject && profilesObject[id as keyof typeof profilesObject]?.nombre, },
                  { name: "Apellido", data: profilesObject && profilesObject[id as keyof typeof profilesObject]?.apellido, },
                  { name: "Fecha de nacimiento", data: profilesObject && profilesObject[id as keyof typeof profilesObject]?.fecha_nacimiento, },
                  { name: "Sexo", data: profilesObject && profilesObject[id as keyof typeof profilesObject]?.sexo, },
                  { name: "Especialidad", data: profilesObject && (profilesObject[id as keyof typeof profilesObject] as ISpecialistProfileData).especialidad },
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
                { name: "Correo", data: profilesObject && profilesObject[id as keyof typeof profilesObject]?.correo, },
                { name: "Direccion", data: profilesObject && profilesObject[id as keyof typeof profilesObject]?.direccion, },
                { name: "Telefono", data: profilesObject && profilesObject[id as keyof typeof profilesObject]?.telefono, },
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
                { name: "Metodo de pago", data: profilesObject && profilesObject[id as keyof typeof profilesObject]?.metodo_pago, },
                { name: "Codigo de tarjeta", data: profilesObject && profilesObject[id as keyof typeof profilesObject]?.datos_financieros, },
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
                      validationSchema={userType == "Paciente" ? mergedPatientSchema : mergedSpecialistSchema}
                      onSubmit={() => console.log("adios")}
                    >
                      {({ handleSubmit, isValid }) => (
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
                              <BasicProfileForm type={userType} profileValues={profilesObject && profilesObject[id as keyof typeof profilesObject] || {}} />
                            </Box>

                            <Box role="tabpanel" hidden={tabValue !== "two"}>
                              <ContactProfileForm profileValues={profilesObject && profilesObject[id as keyof typeof profilesObject] || {}} />
                            </Box>

                            <Box role="tabpanel" hidden={tabValue !== "three"}>
                              <FinancialProfileForm profileValues={profilesObject && profilesObject[id as keyof typeof profilesObject] || {}} />
                            </Box>

                          </Box>
                          {/*ENVIAR INFORMACION*/}
                          <Button sx={{ mt: "0.5rem", backgroundColor: "#52b69a" }}
                            fullWidth
                            variant="contained"
                            type="submit"
                            //disabled={!isValid}
                            onClick={() => {
                              Swal.fire({
                                title: '¿Estás seguro?',
                                text: `Esta acción cambiara todos tus datos`,
                                icon: 'question',
                                showCancelButton: true,
                                confirmButtonColor: '#52b69a',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Aplicar cambios',
                                cancelButtonText: 'Cancelar',
                                customClass: {
                                  container: profileStyle.sweetAlertContainer,
                                },
                                allowOutsideClick: () => !Swal.isLoading(),
                                allowEscapeKey: () => !Swal.isLoading(),
                                allowEnterKey: () => !Swal.isLoading(),
                                stopKeydownPropagation: false,

                              }).then((result) => {
                                if (result.isConfirmed && isValid) {
                                  //mandame la funcion aqui >:V
                                  handleModalClose()
                                  Swal.fire({
                                    title: 'Aplicado con exito',
                                    text: 'Todos los datos han sido editados.',
                                    icon: 'success',
                                    customClass: {
                                      container: profileStyle.sweetAlertContainer,
                                    }
                                  });
                                }
                                else if (!isValid) {
                                  Swal.fire({
                                    title: 'No se aplicaron cambios',
                                    text: 'Hay datos invalidados dentro del formulario',
                                    icon: 'warning',
                                    customClass: {
                                      container: profileStyle.sweetAlertContainer,
                                    }
                                  });
                                }
                              })
                            }}
                          >
                            Aplicar cambios
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

/*const profilesObject: Record<string, IPatientProfileData | ISpecialistProfileData> = {
   '1': {
     tipo: "Paciente",
     nombre: "lenny",
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
     //pasarlo como se veria en la base de datos, se complicaria hacer un algoritmo, buscar datos del mock, o hacer esa estructura con los datos del mock, un mapper para que se vea asi
   },
   
 };

console.log(profilesObject)*/
