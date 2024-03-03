import { Avatar, Box, Button, Grid, Typography } from "@mui/material";
import consultaPicture from "/assets/Pictures/ConsultaMedica.jpg";
import { Link } from "react-router-dom";

export default function LandingPage() {
  // const founder = [
  //   {
  //     name: "Julio Sierra",
  //     img: "/",
  //     job: "Ingeniero en Sistmas",
  //     descripcion: "Experimentado, meticuloso, innovador",
  //   },
  //   {
  //     name: "Lenny Garcia",
  //     img: "/",
  //     job: "Ingeniero en Sistmas",
  //     descripcion: "Apasionado, orientado a resultados, escalable",
  //   },
  //   {
  //     name: "Ben Junior",
  //     img: "/",
  //     job: "Ingeniero en Sistmas",
  //     descripcion: "Estratégico, líder, centrado en el usuario",
  //   },
  // ];

  const founder = [
    {
      name: "Julio Sierra",
      img: "https://www.themoviedb.org/person/73968-henry-cavill/images/profiles",
      job: "Luchador por la igualdad para todos",
      descripcion: "Buena persona, liberal, apoya a todo ser discriminado",
    },
    {
      name: "Lenny Garcia",
      img: "https://www.mtholyoke.edu/~nunez20y/worldpolitics/who%20was%20rafael%20leonidas%20trujillo.html",
      job: "Machito blanco opresor",
      descripcion: "clasista, machista, Racista",
    },
    {
      name: "Ben Junior",
      img: "http://shimenpun.wordpress.com/2013/03/07/adolf-hitler/",
      job: "nigga",
      descripcion: "Racista, machsita, facista",
    },
  ];

  const planes = [
    {
      name: "Basico",
      costo: "Gratis",
      beneficios: [
        "Acceso basico a informacion personal",
        "Anuncios incorporados",
        "Actualizaciones periódicas sobre temas de salud",
      ],
    },
    {
      name: "Paciente",
      costo: "600",
      beneficios: [
        "Informacion acerca de centros medicos",
        "Informacion acerca de servicios cubiertos",
        "Registro de todos los casos medicos",
      ],
    },
    {
      name: "Familiar",
      costo: "2000",
      beneficios: [
        "Status de procemientos en tiempo real",
        "Cuenta para hasta 5 personas",
        "Registro de todos los casos medicos en conjunto",
      ],
    },
    {
      name: "Doctores",
      costo: "1200",
      beneficios: [
        "Disponibilidad para creacion de casos",
        "Registro de casos de pacientes",
        "Poder ver historial de casos de pacientes",
      ],
    },
    {
      name: "Centro Medicos",
      costo: "10000",
      beneficios: [
        "Cuenta para hasta 10 medicos",
        "Reportes Personalizados",
        "Soporte Prioritario",
      ],
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
      gap={7}
      bgcolor={"#E9ECEF"}
    >
      <Grid
        container
        item
        xs={12}
        // border={"1px solid gray"}
        borderRadius={5}
        // padding={3}
        // spacing={1}
        bgcolor={"#184E77"}
        columnSpacing={2}
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
              color={"#E9ECEF"}
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
              color={"#E9ECEF"}
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
            <Grid item xs={3} justifyContent={"center"}>
              <Button
                variant={"outlined"}
                sx={{
                  textTransform: "capitalize",
                  color: "#E9ECEF",
                }}
              >
                Iniciar Sesion
              </Button>
            </Grid>

            <Grid item xs={5} textAlign={"center"}>
              <Typography
                variant="body1"
                color={"#E9ECEF"}
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

      <Grid item container xs={12} spacing={2}>
        <Grid item xs={12}>
          <Typography
            variant="h5"
            fontSize={20}
            textAlign={"center"}
            fontWeight={700}
            color={"#8A898E"}
          >
            Planes
          </Typography>
          <Typography
            fontSize={52}
            fontWeight={700}
            color={"#0B1B35"}
            textAlign={"center"}
          >
            Nuestros planes y servicios
          </Typography>
        </Grid>
        <Grid
          item
          container
          // spacing={2}
          xs={12}
          justifyContent={"space-around"}
          direction={"row"}
          gap={2}
          // rowGap={5}
          // columnGap={1}
        >
          {planes.map((plan, idx) => {
            return (
              <Grid
                item
                container
                key={idx}
                bgcolor={"#FFFFFF"}
                borderRadius={"28px"}
                xs={3}
                // height={"408px"}
                // spacing={1}
                justifyContent={"center"}
                padding={2}
                gap={3}
                sx={{
                  boxShadow:
                    "0px 12.521552085876465px 10.017241477966309px 0px rgba(0,0,0,0.09)",
                }}
              >
                <Grid item xs={12} textAlign={"center"}>
                  <Typography fontWeight={700} fontSize={36} color={"#000000"}>
                    {plan.name}
                  </Typography>
                  <Typography
                    fontWeight={700}
                    fontSize={20}
                    color={"#15143966"}
                  >
                    {plan.costo == "Gratis"
                      ? plan.costo
                      : `RD$${plan.costo}/mes`}
                  </Typography>
                </Grid>

                <Grid item xs={12} spacing={"12px"}>
                  <ul
                    style={{
                      // listStyleType: "none",
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    {plan.beneficios.map((benefit, idx) => {
                      return (
                        <li key={idx}>
                          <Typography fontWeight={400} fontSize={16}>
                            {benefit}
                          </Typography>
                        </li>
                      );
                    })}
                  </ul>
                </Grid>
                <Button
                  variant="contained"
                  sx={{
                    height: "35px",

                    fielset: {
                      borderRadius: "10px",
                    },
                  }}
                >
                  Mas informacion
                </Button>
              </Grid>
            );
          })}
        </Grid>
      </Grid>

      <Grid
        item
        container
        xs={12}
        // border={"1px solid gray"}
        borderRadius={5}
        padding={3}
        gap={1}
        bgcolor={"#184E77"}
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
            // color={"#0B1B35"}
            color={"#CDCAD9"}
          >
            La Empresa
          </Typography>
          <Typography
            textAlign={"center"}
            fontWeight={400}
            fontSize={16}
            color={"#E9ECEF"}
          >
            SatoruScript desarrolla soluciones tecnológicas innovadoras para la
            salud, enfocadas en mejorar la calidad de vida. Trabajamos con
            profesionales de la salud para crear sistemas fiables y
            personalizados. Nuestro equipo multidisciplinario se esfuerza por
            superar expectativas y generar un impacto positivo en la salud
            digital. ¡Gracias por confiar en nosotros!
          </Typography>
        </Grid>

        <Grid item container xs={12} spacing={3}>
          <Grid item xs={12}>
            <Typography color={"#E9ECEF"}>Conoce a nuestro equipo:</Typography>
          </Grid>
          <Grid item container xs={12} spacing={2}>
            {founder.map((found, idx) => {
              return (
                <Grid
                  key={idx}
                  xs={4}
                  display={"flex"}
                  flexDirection={"column"}
                  alignItems={"center"}
                  gap={"20px"}
                  // border={"1px solid #15143966"}
                >
                  {/* <Grid item xs={12}> */}
                  <Avatar
                    src={found.img}
                    sx={{
                      width: "90px",
                      height: "90px",
                    }}
                  />
                  <Grid xs={12}>
                    <Typography
                      textAlign={"center"}
                      fontSize={22}
                      fontWeight={700}
                      // color={"E9ECEF"}
                      color={"#E9ECEF"}
                    >
                      {found.name}
                    </Typography>
                    {/* <Typography
                    textAlign={"center"}
                    fontSize={18}
                    color={"#15143966"}
                    fontWeight={400}
                  >
                    {found.descripcion}
                  </Typography> */}
                    <Typography
                      textAlign={"center"}
                      fontSize={14}
                      // color={"#15143966"}
                      color={"#CDCAD9"}
                      fontWeight={400}
                    >
                      {found.job}
                    </Typography>
                  </Grid>
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
            color={"#0B1B35"}
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
            color={"#0B1B35"}
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
