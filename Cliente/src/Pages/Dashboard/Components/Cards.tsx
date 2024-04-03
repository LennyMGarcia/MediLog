import { Box, Typography } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { globalTheme } from "../../../theme/globalTheme";

type IProps = {
  type: "open" | "close" | "onProcess" | "suspend" | "delete";
  number: number;
};

export default function Cards({ type, number }: IProps) {
  const cards = {
    open: {
      name: "Casos Abiertos",
      icon: AssignmentIcon,
    },
    onProcess: {
      name: "Casos en Proceso",
      icon: AccessTimeIcon,
    },
    close: {
      name: "Casos Cerrados",
      icon: LockIcon,
    },
    suspend: {
      name: "Casos Suspendidos",
      icon: PauseCircleOutlineIcon,
    },
    delete: {
      name: "Casos Eliminados",
      icon: DeleteOutlineIcon,
    },
  };

  const IconComponent = cards[type].icon; // Obtener el componente de icono correspondiente

  return (
    <Box
      sx={{
        backgroundColor: globalTheme.palette.background.secondary,
        padding: "24px",
        gap: "24px",
        borderRadius: "8px",
        // width: "100%",
        display: "flex",
        flexDirection: "row",
        minWidth: "245px",
        // height: "110px",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#F4F9EC",
          padding: "16px",
          borderRadius: "8px",
          display: "grid",
          placeItems: "center",
          width: "62px",
          height: "62px",
        }}
      >
        <IconComponent />
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography
          sx={{
            fontFamily: "Arial",
            fontWeight: "700",
            fontSize: "32px",
            color: "#070708",
          }}
        >
          {number}
        </Typography>
        <Typography
          sx={{
            fontFamily: "Arial",
            fontWeight: "400",
            fontSize: "16px",
            color: "#939497",
            whiteSpace: "pre",
          }}
        >
          {cards[type].name}
        </Typography>
      </Box>
    </Box>
  );
}
