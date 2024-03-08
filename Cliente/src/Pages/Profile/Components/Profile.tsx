
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
import Modal from "@mui/material/Modal/Modal";
import Button from "@mui/material/Button/Button";
import Tabs from "@mui/material/Tabs/Tabs";
import Tab from "@mui/material/Tab/Tab";
import { ErrorMessage, Field, FieldArray, FieldProps, Form, Formik } from "formik";

import PhoneIcon from '@mui/icons-material/Phone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import ProfileControl from "./forms-control/ProfileControl";
import BoxRowWrapper from "../../../Common/Wrappers/BoxRowWrapper";
import TextField from "@mui/material/TextField/TextField";
import FormHelperText from "@mui/material/FormHelperText/FormHelperText";

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
    const fetchedProfileData = getFakeProfileData(idOrName, profilesObject);

    if (!fetchedProfileData) {
      console.log('No se encontró el perfil');
      navigate('/404');
      return;
    }

    const handleSubmit = () => {
      console.log("hola")
    };

    setProfileData(fetchedProfileData);

    if (fetchedProfileData) {
      const slug = generateSlug(fetchedProfileData);
      navigate(`/profile/${slug}`);
    }
  }, [idOrName, navigate]);

  if (!profileData) {
    return <div>Cargando...</div>;
  }

  const initialValues = {
    tabValue: "one", //valores de ej
    field1: "",
    field2: "",
    field3: "",
    arrayValues: [""],
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
                  { name: "Nombre", data: profileData.nombre, },
                  { name: "Apellido", data: profileData.apellido, },
                  { name: "Fecha de nacimiento", data: profileData.fecha_nacimiento, },
                  { name: "Documento de indentidad", data: (profileData as IPatientProfileData).documento_identidad, },
                  { name: "Sexo", data: profileData.sexo, },
                  { name: "Correo", data: profileData.correo, },
                  { name: "Tipo de sangre", data: (profileData as IPatientProfileData).tipo_sangre, },
                  { name: "Padecimiento", data: <ListFormater formatData={(profileData as IPatientProfileData).padecimientos} /> },
                  { name: "Alergias", data: <ListFormater formatData={(profileData as IPatientProfileData).alergias} /> },
                  { name: "Familiares", data: <ListFormater isNavigate={true} formatData={(profileData as IPatientProfileData).familiares} /> },
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
          <Box sx={{
            marginTop: "1rem",
            marginLeft: "-3rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}>
            <Button variant="contained" onClick={handleModalOpen} sx={{ width: "12rem" }}>Editar</Button>
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
                            <Tab icon={<PhoneIcon />} value="one" label="basico" />
                            <Tab icon={<FavoriteIcon />} value="two" label="Contacto" />
                            <Tab icon={<PersonPinIcon />} value="three" label="MonetariO" />
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

                              <BoxRowWrapper  >
                                <ProfileControl
                                  control="input"
                                  label="Nombre"
                                  name="nombre"
                                  placeholder=" Escriba su nombre"
                                />
                                <ProfileControl
                                  control="input"
                                  label="Apellido"
                                  name="apellido"
                                  placeholder="Escriba su apellido"
                                />
                              </BoxRowWrapper>

                              <Box>
                                <ProfileControl
                                  control="select"
                                  label="Sexo"
                                  name="sexo"
                                  selectObject={[
                                    { key: "Hombre", value: "m" },
                                    { key: "Mujer", value: "f" },

                                  ]}
                                />
                              </Box>

                              <Box>
                                <ProfileControl
                                control="date"
                                label="Fecha de nacimiento"
                                name="fecha_nacimiento" />
                              </Box>

                              {userType == "Paciente" ?
                                <Box>
                                  <ProfileControl
                                    control="input"
                                    label="Cedula"
                                    name="documento_identidad"
                                    placeholder="Escriba su cedula"
                                  />

                                  <ProfileControl
                                    control="input"
                                    label="Tipo de sangre" //select
                                    name="tipo_sangre"
                                    placeholder="Escriba su cedula"
                                  />

                                  <Box>
                                    <Accordion defaultExpanded>
                                      <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        id="Informacion_basica"
                                      >
                                        Padecimientos
                                      </AccordionSummary>
                                      <AccordionDetails>
                                        <FieldArray name='arrayValues'>
                                          {fieldArrayProps => {
                                            const { push, remove, form } = fieldArrayProps
                                            const { values } = form
                                            const arrayValues = values.arrayValues || []

                                            return (
                                              <Box>
                                                {arrayValues.map((_: any, index: any) => (
                                                  <Box key={index}>
                                                    <Field name={`arrayValues[${index}]`} >
                                                      {({ field, form }: FieldProps) => (
                                                        <React.Fragment>
                                                          <TextField
                                                            id={"padecimientos"}
                                                            placeholder={"Padecimientos" /*placeHolder ? `${placeHolder}` : ""*/}
                                                            variant="outlined"
                                                            color="primary"
                                                            fullWidth
                                                            value={field.value || ""}
                                                            /* onChange={(e) => {
                                                               field.onChange(e);
                                                               handleChange(e);
                                                             }}*/
                                                            error={Boolean(form.errors["padecimientos"] && form.touched["padecimientos"])}
                                                            //{...rest}
                                                            sx={{
                                                              '& .MuiInputBase-root': { //elementos que tienen textfield le aplica el heigth
                                                                height: 'auto',
                                                              },
                                                              mt: index ==  0 ?"-1rem" : "0.5rem "
                                                            }}
                                                          />
                                                          <ErrorMessage name={"padecimientos"}>
                                                            {(msg) => (
                                                              <FormHelperText style={{ color: 'red' }}>{msg}</FormHelperText>
                                                            )}
                                                          </ErrorMessage>
                                                        </React.Fragment>
                                                      )}
                                                    </Field>
                                                    {index > 0 && (
                                                      <Button variant="contained" sx={{
                                                        backgroundColor: " #52b69a",
                                                        height: "1rem",
                                                        width: '1rem',
                                                        '&:hover': {
                                                          backgroundColor: "#34a0a4"
                                                        }
                                                      }} type='button' onClick={() => remove(index)}>
                                                        -
                                                      </Button>
                                                    )}
                                                  </Box>
                                                ))}
                                                <Button sx={{
                                                  backgroundColor: " #52b69a",
                                                  height: "1rem",
                                                  width: '1rem',
                                                  '&:hover': {
                                                    backgroundColor: "#34a0a4"
                                                  }
                                                }} variant="contained" type='button' onClick={() => push('')}>
                                                  +
                                                </Button>
                                              </Box>
                                            )
                                          }}
                                        </FieldArray>
                                      </AccordionDetails>
                                    </Accordion>
                                  </Box>
                                </Box>
                                : userType == "Especialista" ?
                                  <Box>
                                    <ProfileControl
                                      control="input"
                                      label="Especialidad"
                                      name="especialidad"
                                      placeholder="Escriba su especialidad"
                                    />
                                  </Box>
                                  : <Box></Box>
                              }

                            </Box>
                            <Box role="tabpanel" hidden={tabValue !== "two"}>
                              <Box>
                                <ProfileControl
                                  control="input"
                                  label="Telefono (opcional)"
                                  name="telefono"
                                  type="number"
                                  placeholder="Escriba su telefono" />
                              </Box>
                              <Box>
                                <ProfileControl
                                  control="input"
                                  label="Correo"
                                  name="correo"
                                  placeholder="Escriba su correo" />
                              </Box>
                              <Box>
                                <ProfileControl
                                  control="input"
                                  label="Direccion"
                                  name="direccion"
                                  placeholder="Escriba su direccion"
                                  multiline
                                  rows={4} />
                              </Box>
                            </Box>

                            <Box role="tabpanel" hidden={tabValue !== "three"}>
                              <BoxRowWrapper>
                                <ProfileControl
                                  control="input"
                                  label="Monto"
                                  name="monto"
                                  disabled
                                />
                                <ProfileControl
                                  control="input"
                                  label="Categoria"
                                  name="categoria"
                                  disabled
                                />
                              </BoxRowWrapper>

                              <Box>
                                <ProfileControl
                                  control="select"
                                  label="Metodo de pago"
                                  name="metodo_pago"
                                  selectObject={[
                                    { key: "Tarjeta de credito", value: "Tarjeta de Credito" },
                                    { key: "Tarjeta de debito", value: "Tarjeta de Debito" },
                                  ]}
                                />
                              </Box>
                              <BoxRowWrapper>
                                <ProfileControl
                                  control="input"
                                  label="Tarjeta de credito "
                                  name="datos_financieros"
                                  placeholder="Escriba su tarjeta"
                                />

                                <ProfileControl
                                  control="input"
                                  label="CVV"
                                  name="cvv"
                                  placeholder="Escriba su cvv"
                                />
                              </BoxRowWrapper>

                              <Box>
                                <ProfileControl
                                  control="date"
                                  label="Fecha de expiracion"
                                  name="fecha_expiracion" />
                              </Box>
                              <Box>
                                <ProfileControl
                                  control="input"
                                  label="Descripcion"
                                  name="descripcion"
                                  multiline
                                  rows={4}
                                  placeholder="Escriba su descripcion" />
                              </Box>

                            </Box>
                          </Box>
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
