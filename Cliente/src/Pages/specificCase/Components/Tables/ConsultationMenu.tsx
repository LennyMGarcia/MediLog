import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModalAlert from "../../../../Common/Modals/ModalAlert";
import { Visibility } from "@mui/icons-material";

export default function ConsultationMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [openModal, setOpenModal] = React.useState(false);

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
          onClick={handleClose}
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
          setOpenModal(false);
        }}
      />
    </>
  );
}
