import { Box, Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import StarIcon from "@mui/icons-material/StarBorder";
import Typography from "@mui/material/Typography";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { styled } from "@mui/system";


const tiers = [
  {
    title: "Basico",
    price: "0",
    description: [
      "Acceso basico a informacion personal",
    ],
    buttonText: "Sign up for free",
  },
  {
    title: "Familiar",
    subheader: "Mas popular",
    position:"middle",
    price: "1000",
    description: [
      "Status de procemientos en tiempo real",
      "Cuenta para hasta 5 personas",
      "No anuncios",
    ],
    buttonText: "Get started",
  },
  {
    title: "Paciente",
    price: "600",
    description: [
      "Info acerca de centros medicos",
      "Info acerca de servicios cubiertos",
      "No anuncios",
    ],
    buttonText: "Contact us",
  },
];

const PricingList = styled("ul")({
    margin: 0,
    padding: 0,
    listStyle: "none",
  });
  
export default function PricingForm() {
  return (
    <Container maxWidth="md" component="main">
      <Grid container spacing={2} alignItems="flex-end">
        {tiers.map((tier) => (
          <Grid
            item
            key={tier.title}
            xs={12}
            sm={tier.title === "Enterprise" ? 12 : 6}
            md={4}
          >
            <Card sx={{
                  backgroundColor: tier.position == "middle" ? "#52b69a" : "white",
                  boxShadow: tier.position == 'middle' ? "4px 4px" : 3,
                  border: tier.position == 'middle' ? "2px black solid" : "none",
                  borderRadius: "2vh",
                  minHeight: tier.position == "middle" ? "60vh" : "50vh",
                  width:"15rem",  display: 'flex', flexDirection: 'column', height: '100%' 
                }}>
              <CardHeader
                title={tier.title}
                subheader={tier.subheader}
                titleTypographyProps={{ align: "center" }}
                action={tier.title === "Pro" ? <StarIcon /> : null}
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
                     <CheckCircleOutlineIcon sx={{color:"blue", fontSize:"1rem"}}/> {line}
                    </Typography>
                  ))}
                </PricingList>
              </CardContent>
              <Box sx={{ flexGrow: 1 }} />

  <CardActions  sx={{ width:"13rem", alignSelf: 'center' }}>
                <Button fullWidth variant='contained'
                 sx={{background: tier.position == 'middle'? "#168aad" : "#52b69a"}}>
                  {tier.buttonText}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}