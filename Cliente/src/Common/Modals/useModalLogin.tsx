import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IconButton, InputAdornment, TextField } from "@mui/material";
// import { useModal } from "../hooks/useModal";
import { useState } from "react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";
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
  const [open, setOpen] = useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const ModalLogin = () => {
    const [showPassword, setshowPassword] = useState(false);
    const [email, setEmail] = useState("");

    const [password, setPasswords] = useState("");

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
            {/* <Box
              sx={{
                display: "flex",
                gap: "10px",
                borderRadius: "100px",
                padding: "16px",
                backgroundColor: "#F4F9EC",
                width: "60px",
              }}
            >
              <img src={lockGreen} />
            </Box> */}

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
                backgroundColor: "#52B69A",
                borderRadius: "8px",
                padding: "14px 24px",
                fontFamily: "Arial",
                fontWeight: "400",
                fontSize: "16px",
                color: "#FFFFFF",
                textTransform: "capitalize",
                ":hover": {
                  backgroundColor: "#52B69A",
                },
                boxShadow: "none",
              }}
              onClick={() => {
                handleClose();
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
                color="#168AAD"
                onClick={() => {
                  handleClose();
                }}
                style={{
                  textDecoration: "none",
                  color: "#168AAD",
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
