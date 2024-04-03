import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IconButton, InputAdornment, TextField } from "@mui/material";
// import { useModal } from "../hooks/useModal";
import { useState, useEffect } from "react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";
import getBackendConnectionString from "../Utils/getBackendString";
import axios from "axios";
import useUserStore from "../Utils/setUserSession";
import { useNavigate } from "react-router-dom";
import { globalTheme } from "../../theme/globalTheme";

// import lockGreen from "/assets/icons/lockGreen.svg";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: "32px",
  borderRadius: "16px",
};

type IProps = {
  ModalLogin: () => JSX.Element;
  handleOpenModal: () => void;
};

export default function useModalLogin(): IProps {
  const { authUser } = useUserStore();
  const { authenticated } = useUserStore();
  const { autopopulate } = useUserStore();
  const [logged, setLogged] = useState(false);

  const [open, setOpen] = useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();

  //Funccion que denega acceso al modal de login si el usuario esta loggeado
  useEffect(() => {
    setLogged(authenticated());
    if (logged) {
      return handleClose();
    }
    return;
  });

  const ModalLogin = () => {
    const [showPassword, setshowPassword] = useState(false);
    const [email, setEmail] = useState("");

    const [password, setPasswords] = useState("");
    const [errors, setErrors] = useState({
      email: "",
      password: "",
    });

    const validateForm = () => {
      let valid = true;
      const newErrors = {
        email: "",
        password: "",
      };
      var regex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
      // console.log(!regex.test(formData.email))

      // Validate email
      {
        email.length === 0
          ? ((valid = false), (newErrors.email = "Este campo es obligatorio"))
          : {};
      }
      {
        !regex.test(email) && email.length !== 0
          ? ((valid = false),
            (newErrors.email = "Esto no es un correo electronico valido"))
          : {};
      }

      // Validate password
      {
        password.length === 0
          ? ((valid = false),
            (newErrors.password = "Este campo es obligatorio"))
          : {};
      }
      {
        password.length <= 7 && password.length !== 0
          ? ((valid = false),
            (newErrors.password =
              "La contraseña debe tener minimo 8 caracteres"))
          : {};
      }

      //Condicion que verifica si los datos son validos y indica si el login fue exitoso(Cierra el Modal) o no (Muestra Error de Autenticacion)
      if (valid) {
        login_handler().then(({ logged, message }) => {
          if (!logged) {
            newErrors.email = message;
            newErrors.password = message;
            setErrors(newErrors);
          } else {
            //Condicion que  cierra el Modal y Redirecciona al Usuario a otra ruta, despues de un inicio de session exitosa
            handleClose();
            navigate("/dashboard"); // Redirige a esa ruta en caso de que el usuario se conecte exitosamente. Reemplazar con /dashboard
          }
        });

        return valid;
      }

      setErrors(newErrors);
      return valid;
    };

    const textFieldStyle = {
      color: "#CDCECF",
      fontFamily: "Arial",
      fontSize: "14px",
      fontWeight: "400",
      fieldset: {
        borderRadius: "8px",
        border: "1px solid #CDCECF",
      },

      ".css-14lo706": {
        maxWidth: "35%",
      },

      ".css-ctznay-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
        { borderColor: "#CDCECF" },

      "input::-ms-reveal": {
        display: "none",
      },
      "input::-ms-clear": {
        display: "none",
      },
      ".css-bnnwws-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
      {
        border: "1px solid #CDCECF",
      },
    };

    //Funccion que se encarga del algoritmo de Login e indica si las credenciales son correctas o no
    const login_handler = async (): Promise<any> => {
      const data = await axios.post(getBackendConnectionString('login'), {
        username: email,
        password: password,
      }, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }).then(async (response) => {
        if (response.status === 200 || response.status === 201) {
          const incomingUser = response.data?.user;
          console.log(response)
          console.log(incomingUser)
          authUser(incomingUser);
          await autopopulate();
          return { logged: true, message: response.statusText };
        } else {
          const error_msj = response.data?.message;
          console.log(response)
          console.log(error_msj)
          return { logged: false, message: error_msj };
        }
      }).catch(error => {
        const error_msj = error?.response?.data?.message;
        console.log(error)
        console.log(error_msj)
        return { logged: false, message: error_msj };
      });
      return data;
    }

    return (
      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              flexDirection: "column",
              justifyContent: "flex-start",
              gap: "16px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",

                gap: "8px",
                width: "100%",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Arial",
                  fontWeight: "700",
                  fontSize: "24px",
                  color: "#070708",
                  textAlign: "center",
                }}
              >
                Inicio de Sesion
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Arial",
                  fontWeight: "400",
                  fontSize: "14px",
                  color: "#939497",
                }}
              >
                Llene los campos para ingresar a tu cuenta.
              </Typography>
            </Box>
          </Box>

          <TextField
            label="Correo Electronico"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e: any) => {
              setEmail(e.target.value);
            }}
            sx={textFieldStyle}
            InputLabelProps={{
              sx: {
                color: "#68696B",
                fontFamily: "Arial",
                fontSize: "14px",
                fontWeight: "400",
                "&.Mui-focused": {
                  color: "#68696B",
                  fontFamily: "Arial",
                  fontSize: "14px",
                  fontWeight: "400",
                },
              },
            }}
            InputProps={{
              endAdornment: <PersonIcon />,
            }}
            helperText={errors.email}
            error={errors.email?.length != 0}
          />
          <TextField
            label="Nueva contraseña"
            variant="outlined"
            fullWidth
            type={!showPassword ? "password" : "text"}
            value={password}
            onChange={(e: any) => {
              setPasswords(e.target.value);
            }}
            sx={textFieldStyle}
            InputLabelProps={{
              sx: {
                color: "#68696B",
                fontFamily: "Arial",
                fontSize: "14px",
                fontWeight: "400",
                "&.Mui-focused": {
                  color: "#68696B",
                  fontFamily: "Arial",
                  fontSize: "14px",
                  fontWeight: "400",
                },
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => {
                      setshowPassword(!showPassword);
                    }}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            helperText={errors.password}
            error={errors.password?.length != 0}
          />

          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              gap: "16px",
            }}
          >
            <Button
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#F4F4F5",
                borderRadius: "8px",
                padding: "14px 24px",
                fontFamily: "Arial",
                fontWeight: "400",
                fontSize: "16px",
                color: "#111113",
                textTransform: "capitalize",
                ":hover": {
                  backgroundColor: "#DEDEDF",
                },
                boxShadow: "none",
              }}
              onClick={handleClose}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              fullWidth
              // disableElevation
              sx={{
                backgroundColor: globalTheme.palette.primary.main,
                borderRadius: "8px",
                padding: "14px 24px",
                fontFamily: "Arial",
                fontWeight: "400",
                fontSize: "16px",
                color: "#FFFFFF",
                textTransform: "capitalize",
                ":hover": {
                  backgroundColor: globalTheme.palette.primary.main,
                },
                boxShadow: "none",
              }}
              onClick={() => {
                validateForm()
              }}
            >
              Iniciar Sesion
            </Button>
          </Box>

          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              gap: "16px",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Arial",
                fontWeight: "400",
                fontSize: "14px",
                color: "#939497",
              }}
            >
              No tienes cuenta?{" "}
              <Link
                to={"/register"}
                color={globalTheme.palette.secondary.main}
                onClick={() => {
                  handleClose();
                }}
                style={{
                  textDecoration: "none",
                  color: globalTheme.palette.secondary.main,
                }}
              >
                Crea una
              </Link>
            </Typography>
          </Box>
        </Box>
      </Modal>
    );
  };

  return { ModalLogin, handleOpenModal };
}
