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
      name: "Ben Junior",
      img: "/",
      job: "",
      descripcion: "",
    },
  ];

  const opiniones = [
    {
      name: "Maria",
      description:
        "¡Esta aplicación ha cambiado mi vida! Ahora puedo acceder fácilmente a mi historial médico y compartirlo con mis doctores en cualquier momento. Gracias a este sistema, he mejorado la comunicación con mi equipo médico y he recibido un mejor seguimiento de mi salud. ¡Altamente recomendado!",
    },
    {
      name: "Dr. Rodríguez",
      description:
        "Como médico, siempre busco herramientas que me ayuden a brindar una atención de calidad a mis pacientes. Esta aplicación es una herramienta invaluable en mi práctica diaria. Me permite mantener un registro completo de los casos de mis pacientes, acceder a información relevante de manera rápida y colaborar de manera efectiva con otros profesionales de la salud. Estoy impresionado por su facilidad de uso y su impacto positivo en la atención médica.",
    },
    {
      name: "Juan",
      description:
        "Desde que empecé a usar esta aplicación, me siento más empoderado en mi cuidado de la salud. Puedo registrar mis síntomas, llevar un seguimiento de mis citas médicas y recibir recordatorios importantes, todo en un solo lugar. Además, la capacidad de comunicarme directamente con mi médico ha hecho que la atención médica sea mucho más conveniente y eficiente. ¡No puedo imaginar mi vida sin esta aplicación!",
    },
    {
      name: "Dra. García",
      description:
        "Como médica, siempre estoy buscando formas de mejorar la experiencia de mis pacientes y la eficiencia de mi práctica. Esta aplicación ha sido una verdadera bendición en ambos aspectos. Me permite acceder fácilmente a los registros de mis pacientes, realizar un seguimiento de su progreso y proporcionarles un mejor cuidado personalizado.  ¡Recomendaría esta aplicación a cualquier profesional de la salud!",
    },
  ];

  return (
    <Grid
      container
      sx={{ padding: "16px 35px" }}
      direction={"column"}
      // spacing={5}
      display={"flex"}
      gap={"30px"}
      bgcolor={"#E9ECEF"}
    >
      <Grid
        container
        item
        xs={12}
        // border={"1px solid gray"}
        borderRadius={5}
        // padding={3}
        spacing={1}
      >
        <Grid item container xs={6} spacing={1}>
          <Grid
            item
            xs={12}
            display={"flex"}
            alignItems={"flex-end"}
            justifyContent={"flex-end"}
            direction={"column"}
          >
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

            <Typography
              variant="body1"
              sx={{
                fontWeight: "400",
                textAlign: "center",
              }}
            >
              Con nuestra aplicación de registro de casos médicos, podrás
              mantener un seguimiento detallado de tu historial médico personal.
              Desde diagnósticos hasta tratamientos y seguimientos, nuestra
              plataforma intuitiva te permite acceder y actualizar tu
              información de manera rápida y segura.
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

        <Grid item xs={6} height={"400px"}>
          <img
            src={consultaPicture}
            alt="Consulta Medica"
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </Grid>
      </Grid>

      <Grid></Grid>

      <Grid
        item
        container
        xs={12}
        // border={"1px solid gray"}
        borderRadius={5}
        padding={3}
        gap={2}
      >
        <Grid item xs={12} justifyContent={"center"}>
          <Typography
            variant="h5"
            textAlign={"center"}
            fontSize={20}
            fontWeight={700}
            color={"#8A898E"}
          >
            Testimonios
          </Typography>
          <Typography
            variant="h4"
            textAlign={"center"}
            fontSize={52}
            fontWeight={700}
          >
            Lo que los clientes dicen de nosotros!!
          </Typography>
        </Grid>

        <Grid item container xs={12} spacing={2}>
          {opiniones.map((op, idx) => {
            return (
              <Grid item container xs={6} key={idx}>
                <Grid item xs={2} justifyContent={"flex-end"}>
                  <Avatar sx={{ width: "70px", height: "70px" }} />
                </Grid>
                <Grid item xs={10}>
                  <Typography
                    fontSize={"16px"}
                    fontWeight={"500"}
                    textAlign={"justify"}
                  >
                    {op.description}
                  </Typography>
                  <Typography fontSize={14} fontWeight={700} color={"#0B1B35"}>
                    {op.name}
                  </Typography>
                </Grid>
              </Grid>
            );
          })}
        </Grid>

        {/* <Grid item container xs={12}>
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
        </Grid> */}
      </Grid>

      <Grid
        item
        container
        xs={12}
        // border={"1px solid gray"}
        borderRadius={5}
        padding={3}
        gap={2}
      >
        <Grid item xs={12} direction={"column"}>
          <Typography
            variant="h5"
            textAlign={"center"}
            fontSize={20}
            fontWeight={700}
            color={"#8A898E"}
          >
            Sobre nosotros
          </Typography>
          <Typography
            textAlign={"center"}
            variant="h4"
            fontSize={52}
            fontWeight={700}
          >
            La Empresa
          </Typography>
          <Typography textAlign={"center"} fontWeight={400} fontSize={16}>
            SatoruScript desarrolla soluciones tecnológicas innovadoras para la
            salud, enfocadas en mejorar la calidad de vida. Trabajamos con
            profesionales de la salud para crear sistemas fiables y
            personalizados. Nuestro equipo multidisciplinario se esfuerza por
            superar expectativas y generar un impacto positivo en la salud
            digital. ¡Gracias por confiar en nosotros!
          </Typography>
        </Grid>

        <Grid item container xs={12} spacing={1}>
          <Grid item xs={12}>
            <Typography>Conoce a nuestro equipo</Typography>
          </Grid>
          <Grid item container xs={12}>
            {founder.map((found, idx) => {
              return (
                <Grid
                  key={idx}
                  xs={4}
                  display={"flex"}
                  flexDirection={"column"}
                  alignItems={"center"}
                  gap={"20px"}
                >
                  {/* <Grid item xs={12}> */}
                  <Avatar
                    sx={{
                      width: "90px",
                      height: "90px",
                    }}
                  />
                  {/* </Grid> */}
                  <Typography textAlign={"center"}>{found.name}</Typography>
                  <Typography textAlign={"center"}>{found.job}</Typography>
                  <Typography textAlign={"center"}>
                    {found.descripcion}
                  </Typography>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>

      <Grid
        item
        container
        xs={12}
        // border={"1px solid gray"}
        borderRadius={5}
        padding={3}
        gap={2}
      >
        <Grid item xs={12}>
          <Typography
            variant="h5"
            textAlign={"center"}
            fontSize={20}
            fontWeight={700}
            color={"#8A898E"}
          >
            Contactanos
          </Typography>
          <Typography
            textAlign={"center"}
            variant="h4"
            fontSize={52}
            fontWeight={700}
          >
            Habla con nosotros
          </Typography>
        </Grid>
        <Grid item container xs={12} direction={"row"} spacing={2}>
          <Grid item xs={6}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1891.9739469285603!2d-69.83307074736764!3d18.486019273634536!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8eaf87b9d4dce0e5%3A0x1b4aea9871257623!2sCoral%20Mall!5e0!3m2!1ses-419!2sdo!4v1709088366981!5m2!1ses-419!2sdo"
              width="100%"
              height="450"
              // styles={{"border:0"}}
              loading="lazy"
            ></iframe>
          </Grid>

          <Grid
            item
            xs={6}
            height="450"
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"space-around"}
          >
            <div></div>
            <Typography>
              <b> Teléfono:</b> +1 (809) 123-4567
            </Typography>
            <Typography>
              <b>Correo electrónico:</b> info@satoruscript.com
            </Typography>
            <Typography>
              <b>Dirección: </b>
              Calle Ficticia #123, Ciudad Ficticia, República Dominicana
            </Typography>
            <div></div>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Typography textAlign={"center"}>
            ¡Gracias por confiar en nosotros para tus necesidades tecnológicas
            en el ámbito de la salud!
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
