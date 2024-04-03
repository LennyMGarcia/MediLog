import { Grid, Typography, Button } from "@mui/material";
import React, { useState } from "react";
import TablaCasos from "./Components/TablaCasos";
import TabsTable from "./Components/TabsTable";
import Modal from "@mui/material/Modal/Modal";
import Box from "@mui/material/Box/Box";
import { Form, Formik } from "formik";
import CreateCaseForm from "../specificCase/Components/forms/CreateCaseForn";
import yupCreateCaseSchema from "../specificCase/Utils/yup-schema/yupCreateCaseSchema";
import axios from "axios";
import getBackendConnectionString from "../../Common/Utils/getBackendString";
import Swal from "sweetalert2";
import useCreateDataStore, { getAllCreateData } from "../specificCase/StateManagement/ZustandCreateCaseManagement";
import profileStyle from "../Profile/style/profileStyle.module.css";
import useUserStore from "../../Common/Utils/setUserSession";
import LinearProgress from "@mui/material";
import getHTTPTextError from "../../Common/snackbars/HttpErrorText";
import BannerSnackbar from "../../Common/snackbars/BannerSnackBar";
import { globalTheme } from "../../theme/globalTheme";

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

export default function CasosTerceros() {

    const [open, setOpen] = useState<boolean>(false);
    const [statusCode, setStatusCode] = useState<string | number>('');
    const [message, setMessage] = useState<string>('');

    const { authenticated } = useUserStore();
    const { getUser } = useUserStore();
    const loading = useUserStore(state => state.loading);
    const user_id = authenticated() ? getUser().member_id : null;

    const [caseInfoModalOpen, setCaseInfoModalOpen] = useState(false);
    const handleCaseInfoModalOpen = () => setCaseInfoModalOpen(true);
    const handleCaseInfoModalClose = () => setCaseInfoModalOpen(false);

    const { setCreateData, getCreateData } = useCreateDataStore()

    //Funccion que se encarga de buscar el record en la base de datos
    const createRecordInDB = async (data: any) => {
        const result = await axios.post(getBackendConnectionString(`casos`), data,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then(response => {
            console.log(response);
            if (response.status === 200 || response.status === 201) {
                return true;
            }
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
    }

    //Funccion que se modificar record a la base de datos
    const createSubmitHandler = async () => {

        const data = getAllCreateData();
        const payload = {
            descripcion: data?.descripcion || 'Sin Descripcion',
            especialistas_id: data?.especialistas_id || user_id,
            pacientes_id: data?.pacientes_id,
            consultas: data?.consultas || null,
            cirugias: data?.cirugias || null,
            categoria: data?.categoria || null,
            estado: data?.estado || 'Suspendido',
            seguimiento: data?.seguimiento || ''
        }
        const result = await createRecordInDB(payload);
        return result;

    }
    const caseInitialValues = {
        descripcion: "",
        paciente: "",
        especialista: [""],
        consultas: [""],
        cirugias: [""],
        estado: "",
        categoria: "",
        seguimiento: "",
    };

    return (
        <Grid
            container
            padding={"30px 24px"}
            gap={4}
            direction={"column"}
            sx={{
                height: "100%",
            }}
        >
            <Grid item container xs={12} justifyContent={"space-between"}>
                <Typography variant="h5" fontSize={40} sx={{color:globalTheme.font.primary.main}}>
                    Casos Terceros
                </Typography>
            </Grid>
            <Grid
                item
                xs={12}
                sx={{
                    borderRadius: "16px",
                    backgroundColor: globalTheme.palette.background.secondary,
                    boxShadow: "0px 12px 24px -4px #919EAB1F",
                    width: "100%",
                }}
            >
                {/* Componente de tablas y tabs */}
                <TabsTable type='CasosTerceros' />
            </Grid>
            <BannerSnackbar status={statusCode} message={message} isOpen={open} onClose={() => setOpen(false)} />
        </Grid>
    );
}

/**  */