import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box/Box';
//import WebStoriesIcon from '@mui/icons-material/WebStories';
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import SettingsIcon from "@mui/icons-material/Settings";
import Button from "@mui/material/Button/Button";
import Divider from "@mui/material/Divider/Divider";
import { useNavigate } from "react-router";
import WestIcon from "@mui/icons-material/West";
import Swal from "sweetalert2";
import SweetAlertDAStyle from "../../../Profile/style/profileStyle.module.css";
import usePlanStore from "../../stateManagement/planStateManagement";
import { useMediaQuery } from "@mui/material";
import useTheme from "@mui/material/styles/useTheme";
import useUserStore from '../../../../Common/Utils/setUserSession';
import axios from 'axios';
import getBackendConnectionString from '../../../../Common/Utils/getBackendString';
import getHTTPTextError from "../../../../Common/snackbars/HttpErrorText";
import BannerSnackbar from "../../../../Common/snackbars/BannerSnackBar";
import { globalTheme } from '../../../../theme/globalTheme';
interface Option {
  value: string;
  label: string;
  subLabel: string;
  color: string;
  price: string | number;
}

interface RadioCardProps {
  options: Option[];
  currentPlan: string;
}

const ChangePlan: React.FC = () => {


  const { authenticated } = useUserStore();
  const { getUser } = useUserStore();

  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'));
  const navigate = useNavigate();

  // Condicion que verifica si hay un usuario conectado, en caso de que no, impide acceso a esa ruta
  useEffect(() => {
    if (!authenticated()) {
      navigate('/');
      return;
    }
    return;

  })

  //Solo tienes que buscar estos dos valores, uno que indica si es paciente o especilista para cargar el options
  //Otro para el tipo de plan, asi sale la etiqueta Plan Actual -- GRACIAS XD
  //  let type: string = "Paciente"
  //let plan: string = "Basico"

  // Condicion que verifica si hay un usuario conectado para asi saber cual es el plan de este usuario
  let type: string = authenticated() ? getUser().tipo : 'Paciente';
  let plan: string = authenticated() ? getUser().plan : 'Basico';

  const options: Option[] = type == "Paciente" ?
    [
      { value: 'Basico', label: 'Basico', price: 0, subLabel: "Plan con los requerimientos esenciales, sin ventajas anadidas", color: globalTheme.palette.primary.main },
      { value: 'Familiar', label: 'Familiar', price: 1000, subLabel: "Plan escalable, costumizable, con opciones avanzadas y para toda la familia", color: "#34a0a4" },
      { value: 'Paciente', label: 'Paciente', price: 600, subLabel: "Plan  escalable y costumizable para un solo usuario", color: "#d9ed92" },
    ]
    : [
      {
        value: "Independiente",
        label: "Independiente",
        price: 3000,
        subLabel:
          "Plan con los requerimientos necesarios para un doctor independiente",
        color: globalTheme.palette.primary.main,
      },
      {
        value: "Hospitales",
        label: "Hospitales",
        price: 7000,
        subLabel:
          "Plan escalable, costumizable, con opciones avanzadas para Hospitales y clinicas",
        color: "#34a0a4",
      },
      {
        value: "Especialistas",
        label: "Especialistas",
        price: 5000,
        subLabel:
          "Plan  escalable, costumizable y con muchas ventajas anadidas ideal para los especialistas",
        color: "#d9ed92",
      },
    ];

  return (
    <Box
      sx={{
        backgroundColor: globalTheme.palette.background.main,
        width: "100vw",
        height: "160vh",
        padding: "1px",
      }}
    >
      <Box
        sx={{
          backgroundColor: globalTheme.palette.background.secondary,
          width: "100vw",
          height: "10vh",
          boxShadow: 1,
          padding: "1px",
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
        }}
      >
        <Button
          onClick={() => navigate("/settings")}
          sx={{
            color: globalTheme.palette.primary.main,
            "&:hover": {
              backgroundColor: "#ffeffe",
              color: "#34a0a4",
            },
          }}
        >
          <WestIcon sx={{ margin: "0.7rem", marginLeft: "3rem" }}></WestIcon>
        </Button>
        <Typography
          variant="h5"
          sx={{ margin: "0.7rem", marginLeft: "0.5rem" }}
        >
          Cambiar Plan
        </Typography>
      </Box>

      <Box
        sx={{
          backgroundColor: globalTheme.palette.background.secondary,
          width: isMediumScreen ? "20vw" : "65vw",
          height: "5vh",
          boxShadow: 1,
          margin: isMediumScreen ? "3rem 0 0 3rem" : "3rem 0 0 0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderStartStartRadius: "1rem",
          borderTopRightRadius: "1rem",
        }}
      >
        <SettingsIcon
          sx={{
            color: "gray",
            width: "1rem",
            height: "1rem",
            paddingRight: "0.5rem",
          }}
        />
        <Typography variant="subtitle1" sx={{ color: "gray" }}>
          configuracion / cambiar plan
        </Typography>
      </Box>

      <Box sx={{
        backgroundColor: globalTheme.palette.background.secondary,
        width: isMediumScreen ? "90vw" : "100vw",
        height: "100vh",
        boxShadow: 1,
        marginLeft: isMediumScreen ? "3rem" : 0
      }}>

        <Typography variant="h6" sx={{ padding: "2rem 0 0.5rem 3rem" }}>Configuracion de Plan</Typography>
        <Typography variant="subtitle2" sx={{ padding: "0 0 1rem 3rem", color: "gray" }}>Cambia la configuracion y el tipo de plan</Typography>
        <Divider variant="middle" sx={{ margin: "0 2rem" }} />

        <Typography variant="subtitle1" sx={{ padding: "1rem 0 0 3rem" }}>Plan</Typography>
        <Typography variant="subtitle2" sx={{ padding: "0 0 1rem 3rem", color: "gray" }}>Cambia la configuracion de tu plan</Typography>

        {/*Componente de Plan*/}
        <RadioCard options={options} currentPlan={plan} />
      </Box>
    </Box >
  );
};

const RadioCard: React.FC<RadioCardProps> = ({ options, currentPlan }) => {

  const [open, setOpen] = useState<boolean>(false);
  const [statusCode, setStatusCode] = useState<string | number>('');
  const [message, setMessage] = useState<string>('');

  const { authenticated } = useUserStore();
  const { getUser } = useUserStore();
  const { updateUser } = useUserStore();

  const id = authenticated() ? getUser().id : null;

  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'));

  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  //zustand para plan
  const { getPlanData, setPlanData } = usePlanStore();

  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
    setPlanData("plan", value);
  };

  const change_product = async (id: number, plan: string) => {
    if (!id) return;

    const results = await axios.put(getBackendConnectionString(`usuarios/${id}`), {//usuarios
      plan: plan,
    }).then((response) => {
      console.log(response);
      if (response.status === 200 || response.status === 201) {
        updateUser(plan);
        return true;
      }
      setStatusCode(response.status);
      setMessage(() => {
        return getHTTPTextError(response.status);
      });
      return false;
    }).catch(error => {
      const error_msj = error?.response?.data?.message;
      console.log(error);
      console.log(error_msj);
      setStatusCode(error.response.status);
      setMessage(() => {
        return getHTTPTextError(error.response.status);
      });
      setOpen(true);
      return false;
    });

    return results;
  }
  return (
    <div>
      {options.map((option) => (
        <Card
          key={option.value}
          onClick={() => {
            handleOptionChange(option.value)
            //AQUI EL CONSOLE LOG
            console.log(getPlanData("plan"))

          }}

          sx={{ margin: isMediumScreen ? "1rem 0 0 3rem" : "1rem 0 0 1rem", paddingLeft: "0.5rem", display: "flex", justifyContent: "left", alignItems: "center", cursor: 'pointer', marginBottom: 1, borderRadius: "1rem", border: selectedOption === option.value ? `2px solid ${globalTheme.palette.primary.main}` : '2px solid #e9ecef', width: isMediumScreen ? "60vw" : "88vw", height: "5rem" }}
        >   <Box sx={{ backgroundColor: option.color != ("" || null || undefined) ? option.color : globalTheme.palette.background.main, borderRadius: "50%", width: "3.3rem", height: "3rem", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <ViewInArIcon></ViewInArIcon>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography variant="h6">{option.label == currentPlan ? `Plan ${option.label} - $${option.price} - plan actual` : `Plan ${option.label} - $${option.price} `}</Typography>
              <Typography variant="subtitle2" color="text.secondary" component="div">
                {option.subLabel}
              </Typography>
            </CardContent>
          </Box>

        </Card>
      ))}

      <Button sx={{ mt: "1rem", marginLeft: isMediumScreen ? "5rem" : "2rem", backgroundColor: globalTheme.palette.primary.main, "&:hover": { backgroundColor: "#34a0a4" } }}

        variant="contained"
        type="submit"
        //disabled={!isValid}
        onClick={() => {
          Swal.fire({
            title: '¿Estás seguro?',
            text: `Si procede con esta accion cambiaras tu plan y los privilegios que ofrecen`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: globalTheme.palette.primary.main,
            cancelButtonColor: '#d33',
            confirmButtonText: 'Acepto',
            cancelButtonText: 'Cancelar',
            customClass: {
              container: SweetAlertDAStyle.sweetAlertContainer,
            },
            allowOutsideClick: () => !Swal.isLoading(),
            allowEscapeKey: () => !Swal.isLoading(),
            allowEnterKey: () => !Swal.isLoading(),
            stopKeydownPropagation: false,

          }).then((result) => {
            if (result.isConfirmed) {
              if (selectedOption !== currentPlan) {
                change_product(id, getPlanData('plan')).then(results => {
                  if (results) {
                    Swal.fire({
                      title: 'Se ha actualizado el plan',
                      text: 'El plan se ha cambiado de forma exitosa.',
                      icon: 'success',
                      customClass: {
                        container: SweetAlertDAStyle.sweetAlertContainer,
                      }
                    });
                  } else {
                    Swal.fire({
                      title: 'Hubo un problema',
                      text: 'El plan no pudo actualizarse.',
                      icon: 'warning',
                      customClass: {
                        container: SweetAlertDAStyle.sweetAlertContainer,
                      }
                    });
                  }
                })
              } else {
                Swal.fire({
                  title: 'Hubo un problema',
                  text: 'El plan no pudo actualizarse o has elegido el mismo plan que tenias',
                  icon: 'warning',
                  customClass: {
                    container: SweetAlertDAStyle.sweetAlertContainer,
                  }
                });
              }
            }
          })
        }}
      >
        Confirmar
      </Button>
      <BannerSnackbar status={statusCode} message={message} isOpen={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export default ChangePlan;
