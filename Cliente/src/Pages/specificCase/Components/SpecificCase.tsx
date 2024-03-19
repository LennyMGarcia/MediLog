
import Accordion from "@mui/material/Accordion/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary/AccordionSummary";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from "@mui/material/Box/Box";
import Grid from "@mui/material/Grid/Grid";

import Typography from "@mui/material/Typography/Typography";
import Avatar from '@mui/material/Avatar';
import { useParams } from 'react-router-dom';
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import ProfileList from "../../Profile/Components/ProfileList/ProfileList";
import ListFormater from "../../Profile/Components/ProfileList/ListFormater";
import Modal from "@mui/material/Modal/Modal";
import Button from "@mui/material/Button/Button";
import Tabs from "@mui/material/Tabs/Tabs";
import Tab from "@mui/material/Tab/Tab";
import { Form, Formik } from "formik";

import PhoneIcon from '@mui/icons-material/Phone';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import PaidIcon from '@mui/icons-material/Paid';

import BasicProfileForm from "../../Profile/Components/forms/BasicProfileForm";
import ContactProfileForm from "../../Profile/Components/forms/ContactProfileForm";
import FinancialProfileForm from "../../Profile/Components/forms/FinancialProfileForm";
import useDataRegisterStore, { getAllRegisterData } from "../../Register/ZustandRegisterManagement";

import profileStyle from "../style/profileStyle.module.css"
import Swal from "sweetalert2";

import dayjs from "dayjs";
import ConsultationTable, { Badge } from "./Tables/consultationTable";


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

const SpecificCase: React.FC = () => {

  return (
    <Box sx={{ backgroundColor: "#E9ECEF", height: "auto", padding:"0 0 10rem 0", width: "100vw" }}>
      <Box
        sx={{
          backgroundColor: "#fff",
          width: "100vw",
          height: "10vh",
          boxShadow: 1,
          padding: "1px",
          display:'flex',
          justifyContent:"space-between",
          alignItems:"center",
          
        }}
      >
        <Typography variant="h5" sx={{ margin: "0.7rem", marginLeft: "5rem" }}>
            Nombre del caso
        </Typography>
        <Box sx={{marginRight:"3rem"}}><Badge bg={"#28AAE1"} tipo={"open"} /></Box>
        
      </Box>
     
       <Box sx={{width:"90vw", height:"auto",background:"white", margin:"4rem 4rem 0 4rem", padding:"2rem 0 2rem", boxShadow:1}}>
        <Typography variant="h6" sx={{padding:"0 2rem 2rem 1rem"}}>Informacion del caso</Typography>
            <ProfileList dataList={[
                  { name: "Paciente", data:  'Lenny' },
                  { name: "Especialista", data: 'Ben Junior', },
                  { name: "Estado", data: "activo", },
                  { name: "Categoria", data: "consulta", },
                  { name: "Descripcion", data: "Se metio algo en el, ese pana e raro bi, la creta", },
                  { name: "Seguimiento", data: "no pudimos sacarlo, ay dio", },
                  { name: "Tipo de sangre", data: "a", },
                  { name: "Padecimiento", data: <ListFormater formatData={["a", "a"]} /> },
                  { name: "Alergias", data: <ListFormater formatData={["a", "a"]} /> },
                  { name: "Familiares", data: <ListFormater formatData={["a", "a"]} /> },
                ]} />
            
       </Box>

       <Box sx={{width:"90vw", height:"100vh",background:"white", margin:"1rem 4rem 0 4rem", boxShadow:1}}>
           
            <ConsultationTable type={"all"}/>
       </Box>
          
        
    </Box>
  );

};

export default SpecificCase;

