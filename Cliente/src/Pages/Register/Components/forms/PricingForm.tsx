import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import StarIcon from '@mui/icons-material/Star';
import Typography from "@mui/material/Typography";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import useDataRegisterStore from "../../ZustandRegisterManagement";
import React from "react";
import Box from "@mui/material/Box/Box";
import Button from "@mui/material/Button/Button";
import styled from "@mui/material/styles/styled";
import FormHelperText from "@mui/material/FormHelperText/FormHelperText";
import { ErrorMessage, Field, FieldProps, useFormikContext } from "formik";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery/useMediaQuery";

const tiers = [
  [
    {
      id: 1,
      title: "Basico",
      price: 0,
      description: [
        "Acceso basico a informacion personal",
      ],
      buttonText: "SELECCIONAR",
    },
    {
      id: 2,
      title: "Familiar",
      subheader: "Mas popular",
      position: "middle",
      price: 1000,
      description: [
        "Status de procemientos en tiempo real",
        "Cuenta para hasta 5 personas",
        "No anuncios",
      ],
      buttonText: "SELECCIONAR",
    },
    {
      id: 3,
      title: "Paciente",
      price: 600,
      description: [
        "Info acerca de centros medicos",
        "Info acerca de servicios cubiertos",
        "No anuncios",
      ],
      buttonText: "SELECCIONAR",
    }
  ],

  [
    {
      id: 4,
      title: "Independiente",
      price: 3000,
      description: [
        "Acceso basico a aplicaciones Web, Movil y Escritorio",
        " Acceso a 50TB de memoria"
      ],
      buttonText: "SELECCIONAR",
    },
    {
      id: 5,
      title: "Hospitales",
      subheader: "Mas popular",
      position: "middle",
      price: 7000,
      description: [
        "Todo incluido",
        " Acceso a 450TB de memoria",
        "Mantenimiento de base de datos"
      ],
      buttonText: "SELECCIONAR",
    },
    {
      id: 6,
      title: "Especialista",
      price: 5000,
      description: [
        "Todo incluido",
        " Acceso a 250TB de memoria",
        "Mantenimiento de base de datos"
      ],
      buttonText: "SELECCIONAR",
    },
  ]
];


const PricingList = styled("ul")({
  margin: 0,
  padding: 0,
  listStyle: "none",
});

export default function PricingForm() {
  const [selectedPlan, setSelectedPlan] = useState('');
  const formik = useFormikContext(); // obtener el contexto de Formik en vez de buscarlo desde arriba
  const { setRegisterData, getRegisterData } = useDataRegisterStore();
  const pricing = 'pricing';

  const tierIndex = getRegisterData('tipo') == "Paciente" ? 0 : 1

  useEffect(() => {
    const state = getRegisterData("categoria");
    if (!state) {
      setSelectedPlan('');
    }
    setSelectedPlan(String(state))
  }, [selectedPlan, setSelectedPlan, getRegisterData]);

  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <React.Fragment>
      <Box sx={{ textAlign: "center", mb: "0.5rem" }}><Typography variant={"h5"}>Selección de Planes</Typography></Box>
      <Field
        id={pricing}
        name={pricing}
      >
        {({ form }: FieldProps) => (
          <Container maxWidth="md" component="main">
            <Grid container spacing={2} alignItems="flex-end">
              {tiers[tierIndex].map((tier, index) => (
                <Grid
                  item
                  key={index}
                  xs={12}
                  sm={6}
                  md={4}
                >
                  <Box sx={{ paddingLeft: isMediumScreen ? "0.8rem" : "2.5rem" }}>
                    <Card sx={{
                      backgroundColor: tier.position === "middle" ? "#52b69a" : "white",
                      boxShadow: tier.position === 'middle' ? "4px 4px" : 3,
                      border: tier.position === 'middle' ? "2px black solid" : selectedPlan === tier.title ? "1px black solid" : "1px black",
                      borderColor: selectedPlan === tier.title ? "#168aad" : "inherit",
                      borderRadius: "2vh",
                      minHeight: tier.position === "middle" ? "60vh" : "50vh",
                      width: "14rem", display: 'flex', flexDirection: 'column', height: '100%'
                    }}>
                      <CardHeader
                        title={tier.title}
                        subheader={tier.subheader}
                        titleTypographyProps={{ align: "center" }}
                        action={selectedPlan === tier.title ? <StarIcon sx={{ color: "yellow", textShadow: 10 }} /> : null}
                        subheaderTypographyProps={{
                          align: "center",
                        }}
                      />
                      <CardContent>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "baseline",
                            mb: 2,
                          }}
                        >
                          <Typography component="h5" variant="h5" color="text.primary">
                            RD${tier.price}
                          </Typography>
                          <Typography variant="h6" color="text.secondary">
                            /me
                          </Typography>
                        </Box>
                        <PricingList>
                          {tier.description.map((line) => (
                            <Typography
                              component="li"
                              variant="subtitle1"
                              align="center"
                              key={line}
                            >
                              <CheckCircleOutlineIcon sx={{ color: "blue", fontSize: "1rem" }} /> {line}
                            </Typography>
                          ))}
                        </PricingList>
                      </CardContent>
                      <Box sx={{ flexGrow: 1 }} />
                      <CardActions sx={{ width: "13rem", alignSelf: 'center' }}>
                        <Button
                          fullWidth
                          variant='contained'
                          sx={{ background: tier.position === 'middle' ? "#168aad" : "#52b69a" }}
                          type="button"
                          onClick={() => {
                            console.log("Price clicked:", tier.price);
                            formik.setFieldValue(pricing, tier.title);

                            setRegisterData("plan", tier.id);
                            setRegisterData("precio", tier.price);
                            setRegisterData("monto", tier.price);
                            setRegisterData("categoria", tier.title);

                            setSelectedPlan(tier.title);
                          }}
                        >
                          {tier.buttonText}
                        </Button>
                      </CardActions>
                    </Card>
                  </Box>
                </Grid>
              ))}
            </Grid>
            {Boolean(form.errors[pricing] && form.touched[pricing]) && <ErrorMessage name={pricing} component={FormHelperText}></ErrorMessage>}
          </Container>
        )}
      </Field>
    </React.Fragment>
  );
}


