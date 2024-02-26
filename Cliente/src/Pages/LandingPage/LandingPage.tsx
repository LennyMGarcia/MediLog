import { Avatar, Box, Button, Grid, Typography } from "@mui/material";
import consultaPicture from "/assets/Pictures/ConsultaMedica.jpg";
import { Link } from "react-router-dom";

export default function LandingPage() {
  const founder = [
    {
      name: "Julio Sierra",
      img: "/",
      job: "",
      descripcion: "",
    },
    {
      name: "Lenny Garcia",
      img: "/",
      job: "",
      descripcion: "",
    },
    {
      name: "JBen Junior",
      img: "/",
      job: "",
      descripcion: "",
    },
  ];

  return (
    <Grid container sx={{ padding: "16px 35px" }} gap={3}>
      <Grid
        container
        item
        xs={12}
        border={"1px solid gray"}
        borderRadius={5}
        padding={3}
      >
        <Grid item xs={6}>
          <img
            src={consultaPicture}
            alt="Consulta Medica"
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </Grid>

        <Grid item container xs={6} spacing={1}>
          <Grid item xs={12} display={"flex"} alignItems={"flex-end"}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              Unete a nosotros y obten el control total de los registros de tus
              casos medicos
            </Typography>
          </Grid>

          <Grid
            item
            container
            xs={12}
            // display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            spacing={1}
            // padding={"10px"}
          >
            <Grid item xs={3}>
              <Button
                variant={"outlined"}
                sx={{
                  textTransform: "capitalize",
                }}
              >
                Iniciar Sesion
              </Button>
            </Grid>

            <Grid item xs={5}>
              <Typography
                variant="body1"
                sx={{
                  fontSize: "18px",
                }}
              >
                No tienes cuenta? <Link to={"/"}>Crear una</Link>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* <Grid>
        <Box></Box>
      </Grid> */}

      <Grid
        item
        container
        xs={12}
        border={"1px solid gray"}
        borderRadius={5}
        padding={3}
        gap={2}
      >
        <Grid item xs={12}>
          <Typography variant="h5">Testimonios</Typography>
        </Grid>

        <Grid item container xs={12}>
          <Grid
            item
            xs={2}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            gap={"5px"}
          >
            <Avatar sx={{ width: 100, height: 100 }} />
            <Typography>María Pérez</Typography>
          </Grid>

          <Grid item xs={10} border={"1px solid #000"} padding={"10px"}>
            <Typography>
              Como paciente con múltiples condiciones médicas, siempre he
              luchado por mantenerme al tanto de mis registros médicos. Con la
              aplicación, finalmente siento que tengo el control total. Puedo
              acceder fácilmente a mis historiales, realizar un seguimiento de
              mis citas y compartir información importante con mis médicos de
              manera rápida y segura. ¡Esta aplicación ha simplificado
              enormemente mi vida y me ha dado tranquilidad!
            </Typography>
          </Grid>
        </Grid>

        <Grid item container xs={12}>
          <Grid item xs={10} border={"1px solid #000"} padding={"10px"}>
            <Typography>
              Como médico de atención primaria, la aplicación ha transformado
              completamente la forma en que gestiono los registros de mis
              pacientes. Ahora puedo acceder rápidamente a los historiales
              médicos de mis pacientes durante las consultas, lo que me permite
              brindar un mejor cuidado personalizado. Además, la capacidad de
              recibir actualizaciones en tiempo real sobre la salud de mis
              pacientes ha mejorado significativamente mi eficiencia y capacidad
              para tomar decisiones informadas. ¡Esta aplicación es realmente
              revolucionaria para la práctica médica!
            </Typography>
          </Grid>
          <Grid
            item
            xs={2}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            gap={"5px"}
          >
            <Avatar sx={{ width: 100, height: 100 }} />
            <Typography>Juan García</Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid
        item
        container
        xs={12}
        border={"1px solid gray"}
        borderRadius={5}
        padding={3}
        gap={2}
      >
        <Typography variant="h5">Sobre nosotros</Typography>

        <Grid>
          <Typography textAlign={"justify"}>
            En SatoruScript nos dedicamos al desarrollo de soluciones
            tecnológicas innovadoras en el campo de la salud. Nuestro principal
            objetivo es mejorar la calidad de vida de las personas
            proporcionando herramientas eficientes y accesibles para el
            registro, suscripción, seguimiento y consulta de casos médicos.
            <br />
            <br />
            Con un enfoque centrado en la excelencia y la atención al detalle,
            trabajamos en estrecha colaboración con profesionales de la salud
            para diseñar y desarrollar sistemas robustos y fiables que
            satisfagan las necesidades específicas de nuestros clientes.
            <br />
            <br />
            Nuestro equipo está formado por expertos en diversas disciplinas,
            incluyendo programación, diseño de interfaz de usuario, seguridad
            informática y medicina. Nos apasiona lo que hacemos y nos
            comprometemos a ofrecer soluciones de alta calidad que marquen la
            diferencia en el ámbito de la salud digital.
            <br />
            <br />
            En SatoruScript, estamos comprometidos con la innovación, la
            integridad y la satisfacción del cliente. Trabajamos arduamente para
            superar las expectativas y crear un impacto positivo en la vida de
            las personas a través de la tecnología.
            <br />
            <br />
            ¡Gracias por elegirnos como tu socio tecnológico en el cuidado de la
            salud!
          </Typography>
        </Grid>
        <Grid>
          <Typography>Fundadores</Typography>
          <Grid>
            <Box>
              {founder.map((p, idx) => {
                return (
                  <Grid key={idx}>
                    <Box>{p.name}</Box>
                  </Grid>
                );
              })}
            </Box>
          </Grid>
        </Grid>
      </Grid>

      <Grid
        item
        container
        xs={12}
        border={"1px solid gray"}
        borderRadius={5}
        padding={3}
        gap={2}
      >
        <Typography>Contactanos</Typography>

        <Grid>
          <Box>
            En SatoruScript, nos especializamos en el desarrollo de soluciones
            tecnológicas para la salud. Nuestro enfoque se centra en el diseño y
            desarrollo de sistemas eficientes para el registro, suscripción,
            seguimiento y consulta de casos médicos. Contáctanos:
            <br />
            <br />
            Teléfono: +1 (809) 123-4567 (República Dominicana)
            <br />
            <br />
            Correo electrónico: info@satoruscript.com
            <br />
            <br />
            Dirección: Calle Ficticia #123, Ciudad Ficticia, República
            Dominicana
            <br />
            <br />
            ¡Gracias por confiar en nosotros para tus necesidades tecnológicas
            en el ámbito de la salud!
          </Box>
        </Grid>
        <Grid>
          <Box></Box>
        </Grid>
      </Grid>
    </Grid>
  );
}
