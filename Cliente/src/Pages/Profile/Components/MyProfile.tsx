
import Accordion from "@mui/material/Accordion/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary/AccordionSummary";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from "@mui/material/Box/Box";
import Grid from "@mui/material/Grid/Grid";
import { LinearProgress, CircularProgress } from "@mui/material";

import Typography from "@mui/material/Typography/Typography";
import Avatar from '@mui/material/Avatar';
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
import axios from "axios";
import getBackendConnectionString from "../../../Common/Utils/getBackendString";
import useUserStore from "../../../Common/Utils/setUserSession";
import getHTTPTextError from "../../../Common/snackbars/HttpErrorText";
import BannerSnackbar from "../../../Common/snackbars/BannerSnackBar";
import { globalTheme } from "../../../theme/globalTheme";

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

const MyProfile: React.FC = () => {

    const [open, setOpen] = useState<boolean>(false);
    const [statusCode, setStatusCode] = useState<string | number>('');
    const [message, setMessage] = useState<string>('');

    const { getUser } = useUserStore();
    const { authenticated } = useUserStore();
    const { toggleLoading } = useUserStore();
    const loading = useUserStore(state => state.loading);

    const { getRegisterData } = useDataRegisterStore();
    const navigate = useNavigate();
    const [profileData, setProfileData] = useState<IPatientProfileData | ISpecialistProfileData | undefined>()
    // const [id, setId] = useState<string | undefined>('0');
    const [userType, setUserType] = useState<string>(authenticated() ? getUser().tipo : '');
    const [ruta, setRuta] = useState<string>(getUser().tipo === 'Paciente' ? 'pacientes' : 'especialistas');
    const [idOrName, setIdOrName] = useState<string>(getUser().member_id);
    const [modalOpen, setModalOpen] = useState(false);
    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);
    const [tabValue, setTabValue] = useState('one');

    //var userType: string = profileData?.tipo || 'Paciente';

    //Funccion que se encarga del mapper de los datos entrantes para asi crear un objeto uniforme y fiel
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

    //Funccion que se encarga de buscar el record en la base de datos
    const getRecordFromDB = async (id: number | string | any) => {
        const result = await axios.get(getBackendConnectionString(`${ruta}/${id}`)
        ).then(response => {
            console.log(response);
            if (response.status === 200 || response.status === 201) {
                toggleLoading(false);
                return response.data;
            }
            setStatusCode(response.status);
            setMessage(() => {
                return getHTTPTextError(response.status);
            });
            return false;
        }
        ).catch(error => {
            console.log(error);
            setStatusCode(error.response.status);
            setMessage(() => {
                return getHTTPTextError(error.response.status);
            });
            setOpen(true);
            return false;
        });
        return result;
    }

    const editRecordFromDB = async (id: number | string | any, data: any) => {
        if (userType === 'Paciente') {
            const result = await axios.put(getBackendConnectionString(`${ruta}/${id}`), {
                nombre: data?.nombre,
                apellido: data?.apellido,
                fecha_nacimiento: data?.fecha_nacimiento,
                documento_identidad: data?.documento_identidad,
                sexo: data?.sexo,
                direccion: data?.direccion,
                telefono: data?.telefono,
                tipo_sangre: data?.tipo_sangre,
                padecimientos: data?.padecimientos && JSON.stringify(data?.padecimientos),
                alergias: data?.alergias && JSON.stringify(data?.alergias),
                familiares_id: data?.familiares && JSON.stringify(data?.familiares),
            },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            ).then(response => {
                console.log(response);
                if (response.status === 200 || response.status === 201) {
                    setUserType('Paciente');
                    toggleLoading(false);
                    return true;
                }
                setStatusCode(response.status);
                setMessage(() => {
                    return getHTTPTextError(response.status);
                });
                return false;
            }
            ).catch(error => {
                setStatusCode(error.response.status);
                setMessage(() => {
                    return getHTTPTextError(error.response.status);
                });
                setOpen(true);
                console.log(error);
                return false;
            });
            return result;
        } else {
            const result = await axios.put(getBackendConnectionString(`${ruta}/${id}`), {
                nombre: data?.nombre,
                apellido: data?.apellido,
                fecha_nacimiento: data?.fecha_nacimiento,
                sexo: data?.sexo,
                direccion: data?.direccion,
                telefono: data?.telefono,
                especialidad: data?.especialidad,
            },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            ).then(response => {
                console.log(response);
                if (response.status === 200 || response.status === 201) {
                    setUserType('Especialista');
                    toggleLoading(false);
                    return true;
                }
                setStatusCode(response.status);
                setMessage(() => {
                    return getHTTPTextError(response.status);
                });
                return false;
            }
            ).catch(error => {
                console.log(error);
                setStatusCode(error.response.status);
                setMessage(() => {
                    return getHTTPTextError(error.response.status);
                });
                setOpen(true);
                return false;
            });
            return result;
        }

    }

    const editSubmitHandler = async () => {

        const data = getAllRegisterData();
        const result = await editRecordFromDB(idOrName, data);
        return result;

    }

    //Funccion que impide acceso al perfil si no hay usuario conectado
    /*  useEffect(() => {
          if (!authenticated()) return navigate('/');
          return;
      });*/

    //Funccion que envia solicitud a base de datos para conseguir infomaciones del usuario conectado cada vez que se cambia el ID
    useEffect(() => {
        //  if (!userType) return navigate('/');
        if (userType === 'Paciente') {
            setRuta('pacientes'); //pacientes
        } else {
            setRuta('especialistas');
        }
        getRecordFromDB(idOrName).then((result) => {
            //Condicion que redirige al usuario si occurre un error
            //  if (!result) return navigate('/404');

            //Condicion que se encarga de Parsear los records almacenados en formato de ARRAY/JSON en la plataforma
            result.padecimientos = result.padecimientos ? JSON.parse(result?.padecimientos) : [''];
            result.alergias = result.alergias ? JSON.parse(result?.alergias) : [''];
            result.familiares = result.familiares ? JSON.parse(result?.familiares) : [''];
            result.fecha_nacimiento = result.fecha_nacimiento && dayjs(result.fecha_nacimiento).format('DD-MM-YYYY');
            result.fecha_expiracion = result.fecha_expiracion && dayjs(result.fecha_expiracion).format('DD-MM-YYYY');

            const profilesObject: Record<string, IPatientProfileData | ISpecialistProfileData | undefined> | undefined = mapDataToProfileObject(result);



            if (idOrName) {
                const fetchedProfileData = getFakeProfileData({ idOrName: idOrName || "", name: idOrName || "" }, profilesObject);;

                if (!fetchedProfileData) {
                    console.log('No se encontró el perfil');
                    //        navigate('/404');
                    return;
                }
                setProfileData(fetchedProfileData);

            }
        });

    }, [idOrName, navigate]);



    //Funccion que se encarga de coincidir la informacion entrante con el ID siguiendo el formato del Mapper
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


    //Funccion que se encarga de la gestion de los cambios que se hacen a la tabla de valores
    const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
        setTabValue(newValue);
        return event;
    };

    //Funccion que se encarga de la barra de LOADING
    if (!profileData) {
        return <CircularProgress />; //shadow
    }

    const initialValues = {
        tabValue: "one",
        field1: "",
        field2: "",
        field3: "",
        tipo: userType,
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

    console.log(getAllRegisterData());

    return (

        <Box sx={{ backgroundColor: globalTheme.palette.background.main, minHeight: "86vh", width: "100vw" }}>
            <Typography sx={{ paddingTop: "2rem", paddingLeft: "5rem" }} variant="h5">Perfil</Typography>
            {loading ? <LinearProgress /> :
                <Grid container spacing={2} sx={{ padding: "2rem", paddingTop: "1rem", paddingLeft: "5rem" }}>
                    <Grid item md={3} xs={12}>
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
                                <Avatar sx={{
                                    height: "10rem",
                                    width: "10rem",
                                    backgroundColor: globalTheme.palette.primary.main,
                                    fontSize: "5rem"
                                }}
                                    variant="square" >
                                    {profileData?.nombre.charAt(0) || ''}
                                </Avatar>
                            </Box>
                        </Box>
                        <Box sx={{
                            margin: "auto",
                            marginTop: "1rem",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            {/*EDITAR*/}
                            <Button variant="contained" onClick={handleModalOpen} sx={{ width: "12rem", backgroundColor: globalTheme.palette.primary.main, margin: "auto", marginLeft: "1.7rem" }}>Editar</Button>
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
                                                                    backgroundColor: globalTheme.palette.primary.main,
                                                                },
                                                                '& .MuiTab-root': {
                                                                    color: globalTheme.palette.secondary.main,
                                                                    '&.Mui-selected': {
                                                                        color: globalTheme.palette.primary.main,
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
                                                                backgroundColor: globalTheme.palette.primary.main,
                                                                borderRadius: '4px',
                                                            },
                                                        }}>
                                                            <Box hidden={tabValue !== "one"}>
                                                                <BasicProfileForm type={userType} profileValues={profileData || {}} />
                                                            </Box>

                                                            <Box role="tabpanel" hidden={tabValue !== "two"}>
                                                                <ContactProfileForm profileValues={profileData || {}} />
                                                            </Box>

                                                            <Box role="tabpanel" hidden={tabValue !== "three"}>
                                                                <FinancialProfileForm profileValues={profileData || {}} />
                                                            </Box>

                                                        </Box>
                                                        {/*ENVIAR INFORMACION*/}
                                                        <Button sx={{ mt: "0.5rem", backgroundColor: globalTheme.palette.primary.main }}
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
                                                                    confirmButtonColor: globalTheme.palette.primary.main,
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
                                                                        //mandame la funcion aqui >:V -- Muy util que dejaras este comentario, por eso no pase horas buscando
                                                                        editSubmitHandler().then(result => {
                                                                            if (result) {
                                                                                handleModalClose()
                                                                                Swal.fire({
                                                                                    title: 'Aplicado con exito',
                                                                                    text: 'Todos los datos han sido editados.',
                                                                                    icon: 'success',
                                                                                    customClass: {
                                                                                        container: profileStyle.sweetAlertContainer,
                                                                                    }
                                                                                });
                                                                            } else {
                                                                                Swal.fire({
                                                                                    title: 'No se aplicaron cambios',
                                                                                    text: 'Acceso Denegado',
                                                                                    icon: 'warning',
                                                                                    customClass: {
                                                                                        container: profileStyle.sweetAlertContainer,
                                                                                    }
                                                                                });
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

                    <Grid item md={9} xs={12} sx={{ marginLeft: "auto", marginRight: "auto" }}>
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
                                        { name: "Nombre", data: profileData?.nombre || '' },
                                        { name: "Apellido", data: profileData?.apellido || '', },
                                        { name: "Fecha de nacimiento", data: profileData?.fecha_nacimiento, },
                                        { name: "Documento de indentidad", data: (profileData as IPatientProfileData)?.documento_identidad, },
                                        { name: "Sexo", data: profileData?.sexo, },
                                        { name: "Correo", data: profileData?.correo, },
                                        { name: "Tipo de sangre", data: (profileData as IPatientProfileData)?.tipo_sangre, },
                                        { name: "Padecimiento", data: <ListFormater formatData={(profileData as IPatientProfileData)?.padecimientos} /> },
                                        { name: "Alergias", data: <ListFormater formatData={(profileData as IPatientProfileData)?.alergias} /> },
                                        { name: "Familiares", data: <ListFormater isNavigate={true} formatData={(profileData as IPatientProfileData)?.familiares} /> },
                                    ]} />
                                    :
                                    <ProfileList dataList={[
                                        { name: "Nombre", data: profileData?.nombre, },
                                        { name: "Apellido", data: profileData?.apellido, },
                                        { name: "Fecha de nacimiento", data: profileData?.fecha_nacimiento, },
                                        { name: "Sexo", data: profileData?.sexo, },
                                        { name: "Especialidad", data: (profileData as ISpecialistProfileData).especialidad },
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
                                    { name: "Correo", data: profileData?.correo, },
                                    { name: "Direccion", data: profileData?.direccion, },
                                    { name: "Telefono", data: profileData?.telefono, },
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
                                    { name: "Metodo de pago", data: profileData?.metodo_pago, },
                                    { name: "Codigo de tarjeta", data: profileData?.datos_financieros, },
                                ]} />
                            </AccordionDetails>
                        </Accordion>
                    </Grid>

                </Grid>}
            <BannerSnackbar status={statusCode} message={message} isOpen={open} onClose={() => setOpen(false)} />
        </Box>
    );

};

export default MyProfile;

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
//const fetchedData: any = getFakeProfileData({ idOrName: idOrName || "", name: idOrName || "" }, profilesObject);

/* useEffect(() => {
   if (fetchedData) {
     const profileId = getIdFromName(fetchedData?.nombre, profilesObject);
     setId(profileId);
   }
 }, []);*/
/*const patientData = {
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

 const specialistData = {
   id: "2",
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
 }*/

//cambia a uno de los dos objetos para probar
// const profilesObject: Record<string, IPatientProfileData | ISpecialistProfileData | undefined> | undefined = mapDataToProfileObject(patientData);
// console.log(profilesObject);

/* useEffect(() => {
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
 }, [idOrName, navigate]);*/
//Funccion que se encarga de generar el Slug del enlace
/* const generateSlug = useCallback((profileData: IPatientProfileData | ISpecialistProfileData) => {
     const { nombre, apellido } = profileData;
     const slug = `${nombre}${apellido}`;
     return slug;
 }, [])*/

//Funccion que se encarga de coincidir el nombre con el ID
/* function getIdFromName(name: string, profiles: Record<any, IPatientProfileData | ISpecialistProfileData | undefined> | undefined): string | undefined {
     if (profiles == undefined) {
         return undefined
     }
 
     for (const [id, profile] of Object.entries(profiles)) {
         if (profile && profile.nombre === name) {
             return id;
         }
     }
     return undefined;
 }*/

/*
                               const slug = generateSlug(fetchedProfileData);
                               const stateObj = { idOrName: idOrName };
                               if (slug == '') {
                                   //De esta manera el enlace se actualiza sin mandar otra solicitud a la base de
                                   window.history.pushState(stateObj, `${idOrName}`, `/profile/${idOrName}`);
                                   return id;
                               }
                               window.history.pushState(stateObj, `${slug}`, `/profile/${slug}`);*/

/* const fetchedData: any = getFakeProfileData({ idOrName: idOrName || "", name: idOrName || "" }, profilesObject);
if (fetchedData) {
const profileId = getIdFromName(fetchedData?.nombre, profilesObject);
setId(profileId);
 
}*/