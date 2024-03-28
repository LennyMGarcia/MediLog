import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModalAlert from "../../../../Common/Modals/ModalAlert";
import { Visibility } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import getBackendConnectionString from "../../../../Common/Utils/getBackendString";
import { useState } from "react";
import BannerSnackbar from "../../../../Common/snackbars/BannerSnackBar";
import getHTTPTextError from "../../../../Common/snackbars/HttpErrorText";

export default function ConsultationMenu({ id, ruta }: any) {
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [statusCode, setStatusCode] = useState<string | number>('');
  const [message, setMessage] = useState<string>('');

  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [openModal, setOpenModal] = React.useState(false);

  //Funccion que se encarga de borrar Registro segun el ID;
  const destroyMediaFromDB = async () => {
    const destroy_route = ruta === 'consultation' ? 'consultas' : 'cirugias';
    const success = await axios.delete(getBackendConnectionString(`${destroy_route}/${id}`)).then(res => {
      console.log(res);
      if (res.status === 200 || res.status === 201) {
        return true;
      }
      return false;
    }).catch(error => {
      console.log(error);
      setStatusCode(error.response.status);
      setMessage(() => {
        return getHTTPTextError(error.response.status);
      });
      setOpenSnackbar(true);
      return false;
    })
    return success;
  }

  return (
    <>
      <IconButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => {
            navigate(`/cases/${ruta}/${id}`);
          }}
          sx={{
            gap: 1,
          }}
        >
          <Visibility />
          Ver Detalles
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            setOpenModal(true);

          }}
          sx={{
            gap: 1,
          }}
        >
          <DeleteIcon />
          Eliminar
        </MenuItem>
      </Menu>
      <ModalAlert
        title="¿Esta seguro que quiere borrar esta consulta?"
        description="Al pulsar aceptar, este carro sera borrado de manera permanente, y no podra ser recuperado a futuro, ¿Deseas continuar a futuro?"
        type="warning"
        open={openModal}
        handleClose={() => {
          destroyMediaFromDB().then(success => {
            if (!success) return;
            setOpenModal(false);

          }).finally(() => {
            window.location.reload();
          })
        }}
      />
      <BannerSnackbar status={statusCode} message={message} isOpen={openSnackbar} onClose={() => setOpenSnackbar(false)} />
    </>
  );
}
