import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { TurnedIn, Visibility } from "@mui/icons-material";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import ModalAlert from "../../../../Common/Modals/ModalAlert";
import getBackendConnectionString from "../../../../Common/Utils/getBackendString";

export default function ProfileTableMenu({ id }: any) {
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

  const destroyMediaFromDB = async () => {
    const success = await axios.delete(getBackendConnectionString(`casos/${id}`)).then(res => {
      console.log(res);
      if (res.status === 200 || res.status === 201) {
        return true;
      }
      return false;
    }).catch(error => {
      console.log(error);
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
            //handleClose
            navigate(`/cases/${id}`);
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
        title="¿Esta seguro que quiere borrar este caso?"
        description="Al pulsar aceptar, este carro sera borrado de manera permanente, y no podra ser recuperado a futuro, ¿Deseas continuar a futuro?"
        type="warning"
        open={openModal}
        handleClose={() => {
          destroyMediaFromDB().then(success => {
            if (!success) return false;
            setOpenModal(false);
            return true;
          }).finally(() => {
            window.location.reload();
          })
        }}
      />
    </>
  );
}