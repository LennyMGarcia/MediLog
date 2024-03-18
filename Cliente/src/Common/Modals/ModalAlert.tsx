import {
  CheckCircleOutline,
  ErrorOutline,
  WarningOutlined,
} from "@mui/icons-material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
// import ERRORICON from "../../../public/assets/erroricon.svg";
// import SUCCESSICON from "../../../public/assets/icons/successAlert.svg";
// import WARNINGICON from "../../../public/assets/icons/warningicon.svg";

// import "./Modal.css";
import { ReactNode } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  // boxShadow: 24,
  padding: "0px",
  p: 2,
  borderRadius: "16px",
};

type ModalProps = {
  type: "warning" | "success" | "error";
  title: string;
  description: ReactNode;
  haveTwoButtons?: "left" | "right" | "both";
  open: boolean;
  handleClose: () => void;
  handleOk?: () => void;
  handleFail?: () => void;
  btnOkMessage?: string;
  btnFailMessage?: string;
  notIcon?: boolean;
};

export default function ModalAlert({
  type,
  title,
  description,
  haveTwoButtons = "both",
  open,
  handleClose,
  handleOk,
  handleFail,
  btnOkMessage = "Aceptar",
  btnFailMessage,
  notIcon,
}: ModalProps) {
  return (
    <Modal
      open={open}
      onClose={(event, reason) => {
        if (reason !== "backdropClick") {
          handleClose();
        }
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        padding: "1px",
      }}
    >
      <Box sx={style}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "32px",
          }}
        >
          {notIcon != false &&
            (type == "error" ? (
              <ErrorOutline />
            ) : type === "success" ? (
              <CheckCircleOutline />
            ) : (
              <WarningOutlined
                color="warning"
                sx={{
                  height: "40px",
                  width: "40px",
                }}
              />
            ))}
          <h3
            style={{
              color: "#070708",
              fontSize: "18px",
              fontWeight: "700",
              lineHeight: "25.2px",
              marginBottom: "8px",
            }}
          >
            {title}
          </h3>
          <p
            style={{
              fontSize: "14px",
              fontWeight: "400",
              color: "#939497",
              lineHeight: "19.6px",
            }}
          >
            {description}
          </p>
        </Box>

        <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
          {(haveTwoButtons == "both" || haveTwoButtons == "left") && (
            <Button
              variant="contained"
              disableElevation
              sx={{
                height: "50px",
                width: haveTwoButtons == "left" ? "100%" : "185px",
                backgroundColor: "#F4F4F5",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "400",
                textTransform: "capitalize",
                lineHeight: "22.4px",
                color: "#111113",
                ":hover": {
                  backgroundColor: "#DEDEDF",
                },
              }}
              onClick={() => {
                handleFail && handleFail();
                handleClose();
              }}
            >
              {btnFailMessage || "Cancelar"}
            </Button>
          )}

          {(haveTwoButtons == "both" || haveTwoButtons == "right") && (
            <Button
              variant="contained"
              disableElevation
              sx={{
                height: "50px",
                width: haveTwoButtons == "right" ? "100%" : "185px",
                backgroundColor: type == "warning" ? "#E5D540" : "#8EBF43",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "400",
                textTransform: "capitalize",
                lineHeight: "22.4px",
                ":hover": {
                  backgroundColor: type == "warning" ? "#A3972D" : "#658830",
                },
              }}
              onClick={() => {
                handleOk && handleOk();
                handleClose();
                // navigate("/confirm_mail");
              }}
            >
              {btnOkMessage}
            </Button>
          )}
        </div>
      </Box>
    </Modal>
  );
}
