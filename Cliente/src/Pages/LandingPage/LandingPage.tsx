import { Avatar, Button, Grid, Typography } from "@mui/material";
import consultaPicture from "/assets/Pictures/ConsultaMedica.jpg";
import { useNavigate } from "react-router-dom";
import AccordionNormal from "./Components/Accordion";
import useModalLogin from "../../Common/Modals/useModalLogin";
import IconAndLabel from "/assets/Pictures/IconAndLabelFix.png";
import useUserStore from "../../Common/Utils/setUserSession";
import { globalTheme } from "../../theme/globalTheme";

export default function LandingPage() {
  // Esta comentado para tener una vision de prueba con el otro mientras tanto
  // const founder = [
  //   {
  //     name: "Julio Sierra",
  //     img: "/",
  //     job: "Ingeniero en Sistmas",
  //     descripcion: "Estratégico, líder, centrado en el usuario",
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
  //     descripcion: "Experimentado, meticuloso, innovador",
  //   },
  // ];

  // Son los fundadores fake pero dejalo ahi para tenerlo de prueba mientras tanto
  const founder = [
    {
      name: "Julio Sierra",
      img: "https://3.bp.blogspot.com/-hMbPYAMGY_g/WIABi1l7qKI/AAAAAAABFIQ/VRjdLZaUJeo7cclHGo2Jbu9aziR-qwfFQCLcB/s1600/hipolito-mejia.jpg",
      job: "Luchador por la igualdad para todos",
      descripcion: "Buena persona, liberal, apoya a todo ser discriminado",
    },
    {
      name: "Lenny Garcia",
      img: "https://familiabateyera.com/wp-content/uploads/trujillo-1.jpg",
      job: "Machito blanco opresor",
      descripcion: "clasista, machista, Racista",
    },
    {
      name: "Ben Junior",
      img: "http://www.elmatero.net/imagenes/w640/PeaGomez.jpg",
      job: "nigga",
      descripcion: "Racista, machsita, facista",
    },
  ];

  // Los planes disponibles, OBVIO
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
      name: "Premiun",
      costo: "600",
      beneficios: [
        "Acceso Básico a Información Personal",
        "Informacion acerca de centros medicos",
        "Informacion acerca de servicios cubiertos",
        "Registro de todos los casos medicos",
        "Acceso a aplicación móvil y web. ",
      ],
    },
    {
      name: "Familiar",
      costo: "1000",
      beneficios: [
        "Status de procemientos en tiempo real",
        "Cuenta para hasta 5 personas",
        "Registro de todos los casos medicos en conjunto",
      ],
    },
    {
      name: "Especialistas",
      costo: "5000",
      beneficios: [
        "Disponibilidad para creacion de casos",
        "Registro de casos de pacientes",
        "Poder ver historial de casos de pacientes",
        "Acceso a 250 TB de memoria",
      ],
    },
    {
      name: "Hospitales",
      costo: "30000",
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
      img: "https://celebmafia.com/wp-content/uploads/2021/08/scarlett-johansson-photoshoot-for-plugged-2017-8.jpg",
      description:
        "¡Esta aplicación ha cambiado mi vida! Ahora puedo acceder fácilmente a mi historial médico y compartirlo con mis doctores en cualquier momento. Gracias a este sistema, he mejorado la comunicación con mi equipo médico y he recibido un mejor seguimiento de mi salud. ¡Altamente recomendado!",
    },
    {
      name: "Dr. Rodríguez",
      img: "https://vnews24.it/wp-content/uploads/2014/02/Dr-House.jpg",
      description:
        "Como médico, siempre busco herramientas que me ayuden a brindar una atención de calidad a mis pacientes. Esta aplicación es una herramienta invaluable en mi práctica diaria. Me permite mantener un registro completo de los casos de mis pacientes, acceder a información relevante de manera rápida y colaborar de manera efectiva con otros profesionales de la salud. Estoy impresionado por su facilidad de uso y su impacto positivo en la atención médica.",
    },
    {
      name: "Juan",
      img: "https://image.tmdb.org/t/p/original/h8bn6ybR5Hu58UGJGwb66nrOagV.jpg",
      description:
        "Desde que empecé a usar esta aplicación, me siento más empoderado en mi cuidado de la salud. Puedo registrar mis síntomas, llevar un seguimiento de mis citas médicas y recibir recordatorios importantes, todo en un solo lugar. Además, la capacidad de comunicarme directamente con mi médico ha hecho que la atención médica sea mucho más conveniente y eficiente. ¡No puedo imaginar mi vida sin esta aplicación!",
    },
    {
      name: "Dra. García",
      img: "https://www.thefamousbirthdays.com/photo/2020/04/gal_gadot_cropped_lighting_corrected_2b_2db45706_large.jpg",
      description:
        "Como médica, siempre estoy buscando formas de mejorar la experiencia de mis pacientes y la eficiencia de mi práctica. Esta aplicación ha sido una verdadera bendición en ambos aspectos. Me permite acceder fácilmente a los registros de mis pacientes, realizar un seguimiento de su progreso y proporcionarles un mejor cuidado personalizado.  ¡Recomendaría esta aplicación a cualquier profesional de la salud!",
    },
  ];

  const questions = [
    {
      ask: "¿Cómo puedo acceder a mi historial médico en línea?",
      answer:
        "Puede acceder a su historial médico en línea utilizando nuestro portal de pacientes. Para ello, inicie sesión con su nombre de usuario y contraseña proporcionados por nuestro centro médico.",
      expand: true,
    },
    {
      ask: "¿Qué debo hacer si olvidé mi contraseña para acceder al portal de pacientes?",
      answer:
        "Si olvidó su contraseña para acceder al portal de pacientes, puede utilizar la opción de 'Olvidé mi contraseña' en la página de inicio de sesión. Se le proporcionarán instrucciones para restablecer su contraseña.",
      expand: false,
    },
    {
      ask: "¿Cómo puedo programar una cita con mi médico?",
      answer:
        "Puede programar una cita con su médico llamando a nuestro centro médico o utilizando nuestro sistema en línea. Si prefiere programar en línea, inicie sesión en su cuenta de paciente y siga las instrucciones para programar una cita.",
    },
    {
      ask: "¿Cómo puedo recibir notificaciones sobre los resultados de mis pruebas médicas?",
      answer:
        "Puede optar por recibir notificaciones sobre los resultados de sus pruebas médicas a través de nuestro sistema de suscripción. Al suscribirse, recibirá notificaciones por correo electrónico o mensajes de texto cuando los resultados estén disponibles.",
      expand: false,
    },
    {
      ask: "¿Qué debo hacer si experimento un problema técnico al usar el sistema en línea?",
      answer:
        "Si experimenta algún problema técnico al usar nuestro sistema en línea, comuníquese con nuestro servicio de asistencia técnica al [número de teléfono] o envíe un correo electrónico a [dirección de correo electrónico]. Estaremos encantados de ayudarle a resolver cualquier problema que pueda tener.",
      expand: false,
    },
    {
      ask: "¿Cómo puedo actualizar mi información de contacto en el sistema?",
      answer:
        "Puede actualizar su información de contacto en el sistema iniciando sesión en su cuenta de paciente y navegando a la sección de 'Perfil' o 'Información personal'. Desde allí, podrá realizar cambios y guardar la información actualizada.",
      expand: false,
    },
    {
      ask: "¿Es seguro proporcionar información médica confidencial a través del sistema en línea?",
      answer:
        "Sí, nuestro sistema en línea cumple con rigurosas medidas de seguridad y privacidad de datos para proteger su información médica confidencial. Utilizamos encriptación de extremo a extremo y protocolos de seguridad avanzados para garantizar la protección de sus datos.",
      expand: false,
    },
    {
      ask: "¿Cómo puedo obtener una copia impresa de mi historial médico?",
      answer:
        "Puede solicitar una copia impresa de su historial médico en persona en nuestro centro médico o a través de nuestro servicio de asistencia al paciente. Por favor, proporcione una identificación válida al solicitar su copia impresa.",
      expand: false,
    },
  ];
  const { authenticated } = useUserStore();

  const navigate = useNavigate();
  const { ModalLogin, handleOpenModal } = useModalLogin();

  return (
    <>
      <Grid
        container
        sx={{ padding: "16px 35px" }}
        direction={"column"}
        // spacing={5}
        display={"flex"}
        gap={7}
        bgcolor={globalTheme.palette.background.main}
      >
        <Grid
          container
          item
          xs={12}
          // border={"1px solid gray"}
          borderRadius={5}
          // padding={3}
          // spacing={1}
          bgcolor={globalTheme.palette.FSH.main}
          columnSpacing={2}
        >
          <Grid item container xs={12} md={6} spacing={1}>
            <Grid
              item
              xs={12}
              display={"flex"}
              alignItems={"flex-end"}
              justifyContent={"flex-end"}
              flexDirection={"column"}
            >
              <Typography
                variant="h4"
                color={globalTheme.palette.background.main}
                sx={{
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                Unete a nosotros y obten el control total de los registros de
                tus casos medicos
              </Typography>

              <Typography
                variant="body1"
                color={globalTheme.palette.background.main}
                sx={{
                  fontWeight: "400",
                  textAlign: "center",
                }}
              >
                Con nuestra aplicación de registro de casos médicos, podrás
                mantener un seguimiento detallado de tu historial médico
                personal. Desde diagnósticos hasta tratamientos y seguimientos,
                nuestra plataforma intuitiva te permite acceder y actualizar tu
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
              // spacing={1}
              gap="20px"
              textAlign={"center"}
              // padding={"10px"}
            >
              {/* <Grid item xs={3} justifyContent={"flex-end"}> */}
              {!authenticated() && (
                <Button
                  variant={"contained"}
                  sx={{
                    textTransform: "capitalize",
                    color: globalTheme.palette.background.main,
                    bgcolor: globalTheme.palette.secondary.main,
                  }}
                  onClick={() => {
                    handleOpenModal();
                  }}
                >
                  Iniciar Sesion
                </Button>
              )}
              {/* </Grid> */}

              {/* <Grid item xs={5} textAlign={"center"}> */}
              <Typography
                variant="body1"
                color={globalTheme.palette.background.main}
                sx={{
                  fontSize: "18px",
                }}
              >
                No tienes cuenta?
                <Button
                  sx={{
                    color: globalTheme.palette.secondary.main,
                    fontSize: "18px",
                  }}
                  onClick={() => navigate("/register")}
                >
                  Create una cuenta
                </Button>
              </Typography>
              {/* </Grid> */}
            </Grid>
          </Grid>

          <Grid
            item
            xs={6}
            height={"400px"}
            // textAlign={"center"}
            // border={"0% 5% 5% 0%"}
            sx={{
              display: {
                xs: "none",
                md: "flex",
              },
            }}
          >
            <img
              src={consultaPicture}
              alt="Consulta Medica"
              style={{
                width: "101%",
                height: "100%",
                borderRadius: "0% 5% 5% 0%",
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
              id={"planes"}
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
                  bgcolor={globalTheme.palette.background.secondary}
                  borderRadius={"28px"}
                  xs={12}
                  sm={5}
                  md={3}
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
                    <Typography
                      fontWeight={700}
                      fontSize={36}
                      color={"#000000"}
                    >
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

                  <Grid item xs={12} gap={"12px"}>
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
          bgcolor={globalTheme.palette.FSH.main}
        >
          <Grid item xs={12} flexDirection={"column"}>
            <Typography
              variant="h5"
              textAlign={"center"}
              fontSize={20}
              fontWeight={700}
              color={"#D3D3D3"}
              id={"acercaDe"}
            >
              Sobre nosotros
            </Typography>
            <Typography
              textAlign={"center"}
              variant="h4"
              fontSize={52}
              fontWeight={700}
              // color={"#0B1B35"}
              color={globalTheme.palette.background.main}
            >
              La Empresa
            </Typography>
            <Typography
              textAlign={"center"}
              fontWeight={400}
              fontSize={18}
              color={globalTheme.palette.background.main}
            >
              SatoruScript desarrolla soluciones tecnológicas innovadoras para
              la salud, enfocadas en mejorar la calidad de vida. Trabajamos con
              profesionales de la salud para crear sistemas fiables y
              personalizados. Nuestro equipo multidisciplinario se esfuerza por
              superar expectativas y generar un impacto positivo en la salud
              digital. ¡Gracias por confiar en nosotros!
            </Typography>
          </Grid>

          <Grid item container xs={12} spacing={3}>
            <Grid item xs={12}>
              <Typography color={globalTheme.palette.background.main} fontSize={18}>
                Conoce a nuestro equipo:
              </Typography>
            </Grid>
            <Grid item container xs={12} spacing={2}>
              {founder.map((found, idx) => {
                return (
                  <Grid
                    key={idx}
                    item
                    // container
                    xs={12}
                    sm={4}
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
                    <Grid item xs={12}>
                      <Typography
                        textAlign={"center"}
                        fontSize={22}
                        fontWeight={700}
                        // color={"E9ECEF"}
                        color={globalTheme.palette.background.main}
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
              id={"testimonios"}
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

          <Grid
            item
            container
            xs={12}
            // spacing={2}
            rowGap={2}
            justifyContent={"space-between"}
          >
            {opiniones.map((op, idx) => {
              return (
                <Grid
                  item
                  container
                  xs={12}
                  sm={12}
                  md={5.9}
                  lg={5.9}
                  key={idx}
                  bgcolor={globalTheme.palette.background.secondary}
                  borderRadius={"28px"}
                  padding={2}
                  justifyContent={"space-between"}
                  sx={{
                    boxShadow:
                      "0px 12.521552085876465px 10.017241477966309px 0px rgba(0,0,0,0.09)",
                  }}
                >
                  <Grid
                    item
                    xs={12}
                    sm={2}
                    md={2}
                    justifyContent={{
                      xs: "center",
                      sm: "flex-end",
                    }}
                    margin={{
                      xs: "0px 40%",
                      sm: "0px",
                    }}
                  >
                    <Avatar
                      sx={{
                        width: "70px",
                        height: "70px",
                        justifyContent: {
                          xs: "center",
                          md: "flex-start",
                        },
                      }}
                      src={op.img}
                    />
                  </Grid>
                  <Grid item sm={10} md={9} lg={10} columnGap={1}>
                    <Typography
                      fontSize={15}
                      fontWeight={"500"}
                      textAlign={"justify"}
                    >
                      {op.description}
                    </Typography>
                    <Typography
                      fontSize={14}
                      fontWeight={700}
                      color={"#0B1B35"}
                    >
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

        <Grid item xs={12} bgcolor={globalTheme.palette.FSH.main} borderRadius={5} padding={4}>
          <Grid item xs={12}>
            <Typography
              variant="h5"
              textAlign={"center"}
              fontSize={20}
              fontWeight={700}
              color={"#D3D3D3"}
              id={"preguntas"}
            >
              Preguntas Frecuentes
            </Typography>
            <Typography
              textAlign={"center"}
              variant="h4"
              fontSize={52}
              fontWeight={700}
              color={globalTheme.palette.background.main}
            >
              Resuelve tus dudas
            </Typography>
          </Grid>
          <Grid item container xs={12} justifyContent={"space-around"}>
            <Grid item xs={12} md={5.9} columnGap={4}>
              {questions.map((question, index) => {
                if (index % 2 === 0) {
                  return (
                    <AccordionNormal
                      question={question.ask}
                      answer={question.answer}
                      key={index}
                      defaultExpanded={question.expand}
                    />
                  );
                }
              })}
            </Grid>
            <Grid item xs={12} md={5.9} rowGap={4}>
              {questions.map((question, index) => {
                if (index % 2 !== 0) {
                  return (
                    <AccordionNormal
                      question={question.ask}
                      answer={question.answer}
                      key={index}
                      defaultExpanded={question.expand}
                    />
                  );
                }
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
              id={"contactarnos"}
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
            <Grid item xs={12}>
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
              container
              xs={12}
              // height="450"
              // display={"flex"}
              // flexDirection={"column"}
              // justifyContent={"space-around"}
            >
              <Grid item xs={12} md={6} textAlign={"center"} height={"auto"}>
                <img
                  src={IconAndLabel}
                  style={{
                    marginTop: "20px",
                    width: "75%",
                    height: "80%",
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Grid item xs={12}>
                  <Typography variant="h5" fontSize={25} color={"#8A898E"}>
                    Teléfono:
                  </Typography>
                  <Typography variant="body1" fontSize={20} color={"#0B1B35"}>
                    +1 (809) 123-4567
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h5" fontSize={25} color={"#8A898E"}>
                    Correo electrónico:
                  </Typography>
                  <Typography variant="body1" fontSize={20} color={"#0B1B35"}>
                    info@satoruscript.com
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h5" fontSize={25} color={"#8A898E"}>
                    Dirección:
                  </Typography>
                  <Typography variant="body1" fontSize={20} color={"#0B1B35"}>
                    Calle Ficticia #123, Ciudad Ficticia, República Dominicana
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/* <Grid item xs={12}>
          <Typography textAlign={"center"}>
            ¡Gracias por confiar en nosotros para tus necesidades tecnológicas
            en el ámbito de la salud!
          </Typography>
        </Grid> */}
        </Grid>
      </Grid>
      <ModalLogin />
    </>
  );
}
