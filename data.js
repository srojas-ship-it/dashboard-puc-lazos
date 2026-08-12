/**
 * data.js
 * -----------------------------------------------------------------------
 * Fuente de datos del Dashboard de Estabilidad Operativa PUC (Programa Lazos).
 *
 * Contenido extraído de "REPORTE-PROGRAM LAZOS.xlsx" (hojas "Backlog
 * incidencias y mejoras", "Laboratorios" y "Encuestas Fuerza de Ventas").
 *
 * En una futura iteración este archivo se sustituye por una carga:
 *   fetch('data/hallazgos.json')
 *   fetch('data/encuesta.json')
 *   fetch('data/laboratorios.json')
 * generada a partir del Excel mediante un script de conversión.
 * La forma (shape) de los objetos NO cambia entre data.js y el JSON final,
 * por eso la migración es de una sola línea en script.js.
 * -----------------------------------------------------------------------
 */

// ---- Metadatos del encabezado / configuración del reporte ----
const META = {
  fechaActualizacion: "2026-08-10",   // se refleja en el encabezado ("Actualizado: ...")
  version: "PUC v4.1.0",              // se refleja en el encabezado
  // Fecha de la Mesa Operativa anterior: cualquier hallazgo Liberado con
  // fechaSolucion posterior a esta fecha se marca automáticamente como
  // "Nueva Liberación" en Puntos Relevantes. Actualizar en cada ciclo.
  fechaCorteAnterior: "2026-08-03"
};

// ---- Catálogos (Diccionario de Datos V2) ----
const CATALOGOS = {
  flujo: ["Enrolamiento", "Apertura de Cuenta", "Entrega TDD", "Inversiones", "Inversión Digital", "Transferencias", "Notificaciones", "Visualización de productos"],
  medioReporte: ["Laboratorio BP", "Laboratorio CH", "Correo", "Slack", "Reunión Líderes", "Punto Conecta"],
  // "Backlog": definido pero sin iniciar actividades — va entre Desarrollo y Análisis.
  estatus: ["Liberado", "Pruebas", "Desarrollo", "Backlog", "Análisis", "Definición de Negocio"],
  clasificacion: ["Incidencia", "Mejora"],
  criticidad: ["Bloqueante", "No Bloqueante"]
};

// ---- Hallazgos (Vista General) ----
// descripcion: resumen corto (se usa en tabla/tarjetas). descripcionCompleta y
// observaciones: texto extendido de la Descripción y Observaciones del Excel,
// se muestran en el panel de detalle al hacer clic en una fila de la tabla.
const HALLAZGOS = [
  {
    "id": 1,
    "medio": "Laboratorio BP",
    "flujo": "Enrolamiento",
    "casos": 4,
    "clasificacion": "Incidencia",
    "criticidad": "Bloqueante",
    "descripcion": "No llegaron códigos OTP en el flujo de enrolamiento:",
    "descripcionCompleta": "No llegaron códigos OTP en el flujo de enrolamiento: \nDurante el laboratorio de banca patrimonial se reportaron 4 casos donde los clientes no recibieron sus códigos OTP.",
    "observaciones": "Dependencia\n* 9/Jul en espera de evidencias del proveedor de la entrega al carrier\n* 9/Jul se escalan pod a 3 réplicas",
    "responsable": "Juan David Agudelo",
    "estatus": "Liberado",
    "fechaReporte": "2026-07-08",
    "fechaSolucion": "2026-07-09"
  },
  {
    "id": 2,
    "medio": "Laboratorio BP",
    "flujo": "Apertura de Cuenta",
    "casos": 1,
    "clasificacion": "Incidencia",
    "criticidad": "Bloqueante",
    "descripcion": "Al momento de capturar RFC muestra error de conexción:",
    "descripcionCompleta": "Al momento de capturar RFC muestra error de conexción: \n1) Este error detuvo al cliente en el flujo por que no permitía avanzar.",
    "observaciones": "* 9/Jul se anexa en la HU, la evidencia de los problemas de conexión del dispositivo (red del dispositivo) y no se ha localizado los eventos de amplitud del intento fallido por RFC. Para este último KAREN DE JESUS RAMIREZ USCANGA que tienes más experiencia en amplitud nos puedes apoyar por favor\n* En la sesión se llega un acuerdo que si se presenta en otros laboratorios poder retomar el caso.",
    "responsable": "Juan David Agudelo",
    "estatus": "Liberado",
    "fechaReporte": "2026-07-08",
    "fechaSolucion": "2026-07-09"
  },
  {
    "id": 3,
    "medio": "Laboratorio CH",
    "flujo": "Enrolamiento",
    "casos": 1,
    "clasificacion": "Incidencia",
    "criticidad": "No Bloqueante",
    "descripcion": "No permite acceder ingresando contraseña:",
    "descripcionCompleta": "No permite acceder ingresando contraseña: \nAl acceder por primera vez el usuario ingresa desde nuevo flujo de acceso directo y actualiza contraseña pero no logra acceder.",
    "observaciones": "* 10/Jul se libera a PROD\n* 9/Jul al cierre del día se entra a funcionales",
    "responsable": "Cristian Rodríguez Hernández",
    "estatus": "Liberado",
    "fechaReporte": "2026-07-05",
    "fechaSolucion": "2026-07-10"
  },
  {
    "id": 4,
    "medio": "Laboratorio CH",
    "flujo": "Entrega TDD",
    "casos": 2,
    "clasificacion": "Incidencia",
    "criticidad": "Bloqueante",
    "descripcion": "Solicitud de tarjeta código de error \"XFF4H\".",
    "descripcionCompleta": "Solicitud de tarjeta código de error \"XFF4H\". \nAl solicitar tarjeta física por primera vez y el cliente confirma datos de entrega detona error XFF4H",
    "observaciones": "* 10/Jul se libera a PROD\n* 09/Jul resuelto y está en pruebas actuales de la N4",
    "responsable": "Juan David Agudelo",
    "estatus": "Liberado",
    "fechaReporte": "2026-07-07",
    "fechaSolucion": "2026-07-10"
  },
  {
    "id": 5,
    "medio": "Laboratorio BP",
    "flujo": "Entrega TDD",
    "casos": 1,
    "clasificacion": "Incidencia",
    "criticidad": "Bloqueante",
    "descripcion": "Solicitud de tarjeta código de error \"DLL08\".",
    "descripcionCompleta": "Solicitud de tarjeta código de error \"DLL08\". \nAl solicitar tarjeta física por primera vez y el cliente confirma datos de entrega detona error DLL08.",
    "observaciones": "* 10/Jul se libera a PROD\n* 9/Jul ese encuentra en pruebas funcionales actualmente para la N4",
    "responsable": "Juan David Agudelo",
    "estatus": "Liberado",
    "fechaReporte": "2026-07-08",
    "fechaSolucion": "2026-07-10"
  },
  {
    "id": 6,
    "medio": "Laboratorio BP",
    "flujo": "Entrega TDD",
    "casos": 1,
    "clasificacion": "Incidencia",
    "criticidad": "Bloqueante",
    "descripcion": "Solicitud de tarjeta código de error \"C0B4S\".",
    "descripcionCompleta": "Solicitud de tarjeta código de error \"C0B4S\". \nAl solicitar tarjeta física por primera vez y el cliente confirma datos de entrega detona error: C0B4S.",
    "observaciones": "* 10/Jul se libera a PROD\n* 9/Jul ese encuentra en pruebas funcionales actualmente para la N4",
    "responsable": "Juan David Agudelo",
    "estatus": "Liberado",
    "fechaReporte": "2026-07-08",
    "fechaSolucion": "2026-07-10"
  },
  {
    "id": 7,
    "medio": "Correo",
    "flujo": "Enrolamiento",
    "casos": 1,
    "clasificacion": "Incidencia",
    "criticidad": "Bloqueante",
    "descripcion": "Al momento de ingresar a la aplicación detona código de error (5VXBU).",
    "descripcionCompleta": "Al momento de ingresar a la aplicación detona código de error (5VXBU).\nSe reporta código código de error 5VXBU por atención a clientes para algunos clientes al ingresar en la aplicación.",
    "observaciones": "* 9/Jul se liberó un ajuste que impedía generar el núcleo cliente y ajuste masivo de los que no tienen\n*15/jul se reporta nuevos tickets de soporte: SOPOR_CAV25_718, SOPOR_CAV25_719, SOPOR_CAV25_720\n*15Jul Se identica que siguen llegando consulta de cliente desde CRM sin nucelo del cliente, el equipo de CRM esta trabajando en conjunto con Integraciones para dar una solucion,\n*16Jul CRM Se confirma fecha de solución por TI 20/07/2026\n*17 jul Se confirma liberación del caso por CRM.",
    "responsable": "Juan David Agudelo",
    "estatus": "Liberado",
    "fechaReporte": "Primer reporte:\n07/07/2026\nReincidencia: \n15/07/2026",
    "fechaSolucion": "2026-07-17"
  },
  {
    "id": 8,
    "medio": "Laboratorio CH",
    "flujo": "Apertura de Cuenta",
    "casos": 3,
    "clasificacion": "Incidencia",
    "criticidad": "No Bloqueante",
    "descripcion": "1) Al momento de realizar videograbación no se habilita el botón \"continuar\" para capturar rostro",
    "descripcionCompleta": "1) Al momento de realizar videograbación no se habilita el botón \"continuar\" para capturar rostro",
    "observaciones": "Dependencia\n* 08/Jul karalundi reporta que no ve problemas, sin embargo, se puede cerrar este issue y se encuentra en proceso de pruebas el proveedor Incode \nSe levanta hallazgo 07 jul a las 19:40\n*CH indica que el colaborador realizara proceso desde otro dispositivo, en espera de resultado",
    "responsable": "Juan David Agudelo",
    "estatus": "Liberado",
    "fechaReporte": "2026-07-06",
    "fechaSolucion": "2026-07-10"
  },
  {
    "id": 9,
    "medio": "Punto Conecta",
    "flujo": "Apertura de Cuenta",
    "casos": 2,
    "clasificacion": "Incidencia",
    "criticidad": "Bloqueante",
    "descripcion": "Pantalla se queda en blanco (Red inestable - Captura INE/Biométricos)",
    "descripcionCompleta": "Pantalla se queda en blanco (Red inestable - Captura INE/Biométricos)\nAl momento de ingresar al flujo de captura del INE o Biométrico la pantalla en casos especificos queda en \"Blanco\"\n\nAnálisis: Se detectaa son casos excepcionales porr una red \"inestable\". Se definen modales para informar al cliente que valide que tenga una red estable y reintente el proceso.",
    "observaciones": "*14/Jul para la curp AOQA950528HDFCNR02 se escalo el caso con el proveedor.\n*15/Jul de acuerdo al proveedor no se encontraron flujos de trabajo para los cuatro casos fallidos reportados y se escalaron de nuevo al proveedor.\n*15/Jul para la curp MACJ970920HSLRLN03 se relizaron pruebas cuando el cliente captura la INE (pantalla se pone en blanco), temas de wifi a datos mobiles,\n*16/Jul Se validaron los casos de biometrico no exitosos con proveedor, nos indican que los flujo fueron abiertos y no se encontro interaccion al cargar el workflow. estamos en análisis para controlar el caso\n*17/Jul De acuerdo a definicion tecnica, se implementara un control para gestionar los casos en los que el workflow no cargan correctamente, fecha de entraga a QA miercoles 22\n*22/Jul El dia de hoy se va a estar entregando en ambiente de QA para realizar pruebas\n*Se libera con la nueva versión el 03 de agosto para no impactar proyecto en curso NPS",
    "responsable": "Juan David Agudelo",
    "estatus": "Liberado",
    "fechaReporte": "2026-07-09",
    "fechaSolucion": "2026-08-03"
  },
  {
    "id": 10,
    "medio": "Punto Conecta",
    "flujo": "Apertura de Cuenta",
    "casos": 1,
    "clasificacion": "Incidencia",
    "criticidad": "Bloqueante",
    "descripcion": "RFC Registrado por otro cliente:",
    "descripcionCompleta": "RFC Registrado por otro cliente:\nAl momento de realizar flujo de apertura y contestar cuestionario de personas vulnerables el usuario no logra avanzar. \n\nAnálisis: El cliente que esta realizando apertura de cuenta ingresa un RFC que ya estaba registrado por otro cliente. Se informará con el objetivo que se atienda a tráves de línea de atención para actualizar sus datos, conforme los protocolos operativos definidos.",
    "observaciones": "*Al momento de actualizar el cliente en CRM se identifica que el rfc ya esta asociado a otro numero de cliente, se esta definiedo la solucion que sera implementada para controlar el escenario.\n*Se confirma que el día 16 de julio al finalizar el día quedaría solventado en espera de pruebas validadores funcionales.\n*16/Jul Por parte del equipo se libero el ajuste en QA y relizaron las pruebas, actualmente se encuentra en pruebas funcionales.\n*22/Jul Se encuentra en ambiente de pruebas y se integraria en la proxima liberacion \n*Se libera con la nueva versión el 03 de agosto para no impactar proyecto en curso NPS\n*29/Jul Diana Torres Rodriguez se lleva el seguimiento con el CAI con el fin de validar protocolo para estos casos",
    "responsable": "Juan David Agudelo",
    "estatus": "Liberado",
    "fechaReporte": "2026-07-09",
    "fechaSolucion": "2026-08-03"
  },
  {
    "id": 11,
    "medio": "Laboratorio BP",
    "flujo": "Apertura de Cuenta",
    "casos": 1,
    "clasificacion": "Incidencia",
    "criticidad": "No Bloqueante",
    "descripcion": "Tipo de fuente grande (Biométricos y videograbación)",
    "descripcionCompleta": "Tipo de fuente grande (Biométricos y videograbación)\nAl tener un tipo de fuente grande en el dispositivo no se visualiza la acción de \"continuar\" en los puntos de:\n- Videograbación\n- Caputura biométrico\n\nEl cliente puede reducir tamaño de fuente para \"avanzar\" desde su dispositivo. Pero se busca solución ráiz con el proveedor.",
    "observaciones": "* 9/Jul se escala con el proveedor karalundi, sin embargo, ya se encuentra en pruebas la implementación con Incode y se les sugiere repetir ese escenario con letra grande en el dispositivo samsung\n* 14/Jul karalundi reporta que está en revisión y el proveedor esta trabajando en una solucion para solucionar el tamaño de la fuente.\n*  16/Jul Se tuvo una reunion con el proveedor, tiene la corrección lista el día 17/06/2026, En cuanto el proveedor lo comunique se realizan pruebas. \n* 17/Jul Se realizaron las pruebas, aparece el boton pero ahora el texto se superpone, se escalo de nuevo al proveedor.\n* 22/Jul El proveedor nos compartio una solucion para implementar desde la aplicacion, ya se realizo la implementacion y se tiene en ambiente de pruebas \n*Se libera con la nueva versión el 03 de agosto para no impactar proyecto en curso NPS\n*29/Jul: Se tendrá solución en BETA el día 03 de agosto pero estan pendientes pruebas de validadores funcionales en BETA producción y aprobación en tiendas.\n*07 Agosto: Continua versión 4.1.0 en revisión por parte de tiendas de IOS. \n*10 Agosto: Se confirma liberación y masificación en tiendas (PlayStore y AppStore).",
    "responsable": "Juan David Agudelo",
    "estatus": "Liberado",
    "fechaReporte": "2026-07-08",
    "fechaSolucion": "2026-08-10"
  },
  {
    "id": 12,
    "medio": "Reunión Líderes",
    "flujo": "Entrega TDD",
    "casos": 1,
    "clasificacion": "Incidencia",
    "criticidad": "No Bloqueante",
    "descripcion": "Clientes no pueden modificar Colonia de entrega en reposición \"TDD\":",
    "descripcionCompleta": "Clientes no pueden modificar Colonia de entrega en reposición \"TDD\":\nAl ingresar al formulario de entrega de tdd y tener mi dirección registrada. Al querer cambiarla y seleccionar otra colonia no permite a los clientes ajustarla.",
    "observaciones": "*29/Jul: Se tendrá solución en BETA el día 03 de agosto pero estan pendientes pruebas de validadores funcionales en BETA producción y aprobación en tiendas.\n*07 Agosto: Continua versión 4.1.0 en revisión por parte de tiendas de IOS. \n*10 Agosto: Se confirma liberación y masificación en tiendas (PlayStore y AppStore).",
    "responsable": "Cristian Rodríguez Hernández",
    "estatus": "Liberado",
    "fechaReporte": "2026-07-28",
    "fechaSolucion": "2026-08-10"
  },
  {
    "id": 13,
    "medio": "Slack",
    "flujo": "Enrolamiento",
    "casos": 8,
    "clasificacion": "Incidencia",
    "criticidad": "Bloqueante",
    "descripcion": "Al momento de ingresar a la aplicación detona código de error (5VXBU).",
    "descripcionCompleta": "Al momento de ingresar a la aplicación detona código de error (5VXBU).\nSe reporta código código de error 5VXBU por atención a clientes para algunos clientes al ingresar en la aplicación.\nSe detecta que son clientes que en CRM no tienen número de cliente. Esto deriva de las cargas masivas que son de promotores que se convierten a su vez a clientes",
    "observaciones": "*03 de agosto se confirma que el equipo de CRM esta realizando 2 monitoreos diarios. \n*03 de agosto se confirma que la liberación se hace en la semana del 03 - 07 de agosto \n*07 de agosto se confirma liberación del caso",
    "responsable": "Juan Antonio García Herrera",
    "estatus": "Liberado",
    "fechaReporte": "2026-07-15",
    "fechaSolucion": "2026-08-06"
  },
  {
    "id": 14,
    "medio": "Slack",
    "flujo": "Transferencias",
    "casos": 2,
    "clasificacion": "Incidencia",
    "criticidad": "Bloqueante",
    "descripcion": "Al momento de transferir muestra código de error (40KXP):",
    "descripcionCompleta": "Al momento de transferir muestra código de error (40KXP):\nSe identifica que es un tema relacionado a la generación de token de VU",
    "observaciones": "*03 de agosto se confirma con Haydee que el equipo detecto mejoras y se atenderán dentro del sprint en curso (03 - 21 de agosto)\n*Se revisan mejoras para generar el token en el momento de la transacción y se encuentra en desarrollo.",
    "responsable": "Juan David Agudelo",
    "estatus": "Desarrollo",
    "fechaReporte": "2026-07-30",
    "fechaSolucion": "03/08/2026 al 21/08/2026"
  },
  {
    "id": 15,
    "medio": "Slack",
    "flujo": "Enrolamiento",
    "casos": 107,
    "clasificacion": "Incidencia",
    "criticidad": "Bloqueante",
    "descripcion": "Se detectan nuevos códigos de error a partir de la liberación de la versión 4.1.0:",
    "descripcionCompleta": "Se detectan nuevos códigos de error a partir de la liberación de la versión 4.1.0: \nS8SBS , NOOSP , 1BTBT, D7OLI",
    "observaciones": "",
    "responsable": "Juan David Agudelo",
    "estatus": "Análisis",
    "fechaReporte": "2026-08-11",
    "fechaSolucion": "03/08/2026 al 21/08/2026"
  },
  {
    "id": 16,
    "medio": "Slack",
    "flujo": "Enrolamiento",
    "casos": 3,
    "clasificacion": "Incidencia",
    "criticidad": "Bloqueante",
    "descripcion": "Al momento de crear contraseña no logra avanzar el cliente (8DX0Q)",
    "descripcionCompleta": "Al momento de crear contraseña no logra avanzar el cliente (8DX0Q)",
    "observaciones": "",
    "responsable": "Juan David Agudelo",
    "estatus": "Análisis",
    "fechaReporte": "2026-08-10",
    "fechaSolucion": "03/08/2026 al 21/08/2026"
  },
  {
    "id": 17,
    "medio": "Slack",
    "flujo": "Apertura de Cuenta",
    "casos": 3,
    "clasificacion": "Incidencia",
    "criticidad": "Bloqueante",
    "descripcion": "Apertura de cuenta - clientes no logran avanzar en confirmación de datos",
    "descripcionCompleta": "Apertura de cuenta - clientes no logran avanzar en confirmación de datos",
    "observaciones": "",
    "responsable": "Juan David Agudelo",
    "estatus": "Análisis",
    "fechaReporte": "2026-08-10",
    "fechaSolucion": "03/08/2026 al 21/08/2026"
  },
  {
    "id": 18,
    "medio": "Reunión Líderes",
    "flujo": "Notificaciones",
    "casos": "N/A",
    "clasificacion": "Mejora",
    "criticidad": "No Bloqueante",
    "descripcion": "Eliminar mensaje \"Transferencias reflejadas al día siguiente\", mostrado de 2 pm - 8 am",
    "descripcionCompleta": "Eliminar mensaje \"Transferencias reflejadas al día siguiente\", mostrado de 2 pm - 8 am\n1) Se levanto la necesidad para actualizar el mensaje que notifica que despuiés de las 2 los movimientos se pueden ver un día habil siguiente",
    "observaciones": "*21/Jul: Se realizan ajustes en producción",
    "responsable": "Cristian Rodríguez Hernández / Juan David Agudelo",
    "estatus": "Liberado",
    "fechaReporte": "2026-07-15",
    "fechaSolucion": "2026-07-21"
  },
  {
    "id": 19,
    "medio": "Correo",
    "flujo": "Inversión Digital",
    "casos": "N/A",
    "clasificacion": "Mejora",
    "criticidad": "No Bloqueante",
    "descripcion": "Actualizar productos de inversiones clientes lazos - Nivel Azul",
    "descripcionCompleta": "Actualizar productos de inversiones clientes lazos - Nivel Azul\n1) Se notifica por Aura que es necesario actualizar los productos en inversiones digitales aplicables para clientes de nivel azul",
    "observaciones": "*29/Jul: Se tendrá solución en BETA el día 03 de agosto pero estan pendientes pruebas de validadores funcionales en BETA producción y aprobación en tiendas.\n*Adicionalmente se notifica a Aura Mirell Marron Arteaga que es necesario dar de alta en crm el producto 652",
    "responsable": "Cristian Rodríguez Hernández / Juan David Agudelo",
    "estatus": "Liberado",
    "fechaReporte": "06/0//2026",
    "fechaSolucion": "2026-08-03"
  },
  {
    "id": 20,
    "medio": "Correo",
    "flujo": "Apertura de Cuenta",
    "casos": "N/A",
    "clasificacion": "Mejora",
    "criticidad": "No Bloqueante",
    "descripcion": "Al finalizar flujo de apertura de cuenta y seleccionar \"entendido\" te lleva al inicio de sesión.",
    "descripcionCompleta": "Al finalizar flujo de apertura de cuenta y seleccionar \"entendido\" te lleva al inicio de sesión.\n1) Se identifico que al momento de concluir el flujo de apertura de cuenta, pantalla de felicidades y das clic en \"Entendido\" en la pantalla final no te manda al menú principal, siendo necesario ingresar nuevamente a la aplicación para visualizar tu cuenta creada.",
    "observaciones": "Conforme el análisis realizado se identifica que realizar el ajuste solicitado no es el mas recomendable, derivado a que el usuario esta realizando su proceso en una web embebida en el APP (pwa). \n\nPor temas de seguridad esto implicaría mantener una sesión activa durante 10 - 50 minutos que es lo que se puede tardar el flujo de apertura dependiendo el caso del cliente. \n\nEsto adicional a las pruebas de laboratorio revisamos y no es un tema que impacte realmente la experiencia, ya que el usuario solo debe iniciar sesión de nuevo para ver sus producto aperturado.",
    "responsable": "Cristian Rodríguez Hernández / Juan David Agudelo",
    "estatus": "Liberado",
    "fechaReporte": "06/0//2026",
    "fechaSolucion": "No aplica"
  },
  {
    "id": 21,
    "medio": "Correo",
    "flujo": "Inversiones",
    "casos": "N/A",
    "clasificacion": "Mejora",
    "criticidad": "No Bloqueante",
    "descripcion": "Botón \"regresar\" nativo de dispositivos de android cierrar el flujo de apertura y debe realizarse nuevamente login pa...",
    "descripcionCompleta": "Botón \"regresar\" nativo de dispositivos de android cierrar el flujo de apertura y debe realizarse nuevamente login para ingresar de nuevo.\n1) Durante el proceso de apertura, el botón \"regresar\" activa un comando que saca al usuario por completo de la aplicación y la cierra, esto deriva que el cliente deba a volver ingresar a la aplicación y reingresar en el flujo",
    "observaciones": "*29/Jul: Se tendrá solución en BETA el día 03 de agosto pero estan pendientes pruebas de validadores funcionales en BETA producción y aprobación en tiendas.\n*07 Agosto: Continua versión 4.1.0 en revisión por parte de tiendas de IOS. \n*10 Agosto: Se confirma liberación y masificación en tiendas (PlayStore y AppStore).",
    "responsable": "Cristian Rodríguez Hernández / Juan David Agudelo",
    "estatus": "Liberado",
    "fechaReporte": "2026-07-10",
    "fechaSolucion": "2026-08-10"
  },
  {
    "id": 22,
    "medio": "Reunión Líderes",
    "flujo": "Inversiones",
    "casos": "N/A",
    "clasificacion": "Mejora",
    "criticidad": "No Bloqueante",
    "descripcion": "Mensajes informativos para propuesta de valor CEDES",
    "descripcionCompleta": "Mensajes informativos para propuesta de valor CEDES\n1) Se notifica que la sección de inversiones digitales tiene mensajes que no hacen referencia a la propuesta de valor de productos CEDE",
    "observaciones": "*29/Jul: Se tendrá solución en BETA el día 03 de agosto pero estan pendientes pruebas de validadores funcionales en BETA producción y aprobación en tiendas.\n*07 Agosto: Continua versión 4.1.0 en revisión por parte de tiendas de IOS. \n*10 Agosto: Se confirma liberación y masificación en tiendas (PlayStore y AppStore).",
    "responsable": "Cristian Rodríguez Hernández / Juan David Agudelo",
    "estatus": "Liberado",
    "fechaReporte": "2026-07-24",
    "fechaSolucion": "2026-08-10"
  },
  {
    "id": 23,
    "medio": "Correo",
    "flujo": "Apertura de Cuenta",
    "casos": "100+",
    "clasificacion": "Mejora",
    "criticidad": "No Bloqueante",
    "descripcion": "Sección de beneficios (promociones) no es tan visible en el home de la aplicación al existir un espacio considerable ...",
    "descripcionCompleta": "Sección de beneficios (promociones) no es tan visible en el home de la aplicación al existir un espacio considerable para visualizar sección.\n1) Se notifico que la sección de promociones para incentivar el uso de la cuenta se encuentra al fondo de la pantalla principal (haciendo el scroll). Al no ser visible de primera impresión, se pierde una oportunidad inmediata de venta cruzada",
    "observaciones": "*29/Jul: Se tendrá solución en BETA el día 03 de agosto pero estan pendientes pruebas de validadores funcionales en BETA producción y aprobación en tiendas.\n*07 Agosto: Continua versión 4.1.0 en revisión por parte de tiendas de IOS. \n*10 Agosto: Se confirma liberación y masificación en tiendas (PlayStore y AppStore).",
    "responsable": "Cristian Rodríguez Hernández / Juan David Agudelo",
    "estatus": "Liberado",
    "fechaReporte": "06/0//2026",
    "fechaSolucion": "2026-08-10"
  },
  {
    "id": 24,
    "medio": "Reunión Líderes",
    "flujo": "Apertura de Cuenta",
    "casos": "N/A",
    "clasificacion": "Mejora",
    "criticidad": "No Bloqueante",
    "descripcion": "Clientes con cuentas N4 BKY no visualizan la sección para aperturar cuenta CSB.",
    "descripcionCompleta": "Clientes con cuentas N4 BKY no visualizan la sección para aperturar cuenta CSB.\n1) Se notifica que existen clientes que no logran aperturar cuenta por que en la aplicación no se muestra opción de apertura al tener una cuenta BKY",
    "observaciones": "*29 jul: Se integra mejora para evitar que los casos sucedan en producción",
    "responsable": "Cristian Rodríguez Hernández / Juan David Agudelo",
    "estatus": "Desarrollo",
    "fechaReporte": "2026-07-22",
    "fechaSolucion": "03/08/2026 al 21/08/2026"
  },
  {
    "id": 25,
    "medio": "Correo",
    "flujo": "Inversión Digital",
    "casos": "N/A",
    "clasificacion": "Mejora",
    "criticidad": "No Bloqueante",
    "descripcion": "Actualización de ISR en productos de inversión digital para todos los productos.",
    "descripcionCompleta": "Actualización de ISR en productos de inversión digital para todos los productos. \n1) Se identifica la necesidad por banca patrimonial de actualizar el ISR aplicable a todos los productos de inversión digital",
    "observaciones": "*04 de agosto el equipo de banca patrimonial confirma tasas de ISR mediante correo. \n*07 de agosto se confirma la actualización en el Core Bancario y el equipo de desarrollo de PUC realiza ajuste de cotizadores. Se sigue validando en ambiente de calidad derivado a que no se refleja en simuladores.",
    "responsable": "Cristian Rodríguez Hernández / Juan David Agudelo",
    "estatus": "Desarrollo",
    "fechaReporte": "2026-08-04",
    "fechaSolucion": "2026-08-12"
  },
  {
    "id": 26,
    "medio": "Correo",
    "flujo": "Entrega TDD",
    "casos": 1,
    "clasificacion": "Mejora",
    "criticidad": "No Bloqueante",
    "descripcion": "Realizar ajustes en cobros de reposición de entrega de tarjeta a domicilio a costo \"$0.00\"",
    "descripcionCompleta": "Realizar ajustes en cobros de reposición de entrega de tarjeta a domicilio a costo \"$0.00\"\n1) Se solicita a tráves de correo por parte de operaciones con el vobo de jurídico.",
    "observaciones": "*06 de agosto se integra historia de usuario y validación por el equipo. \n*07 de agosto se solicita confirmación al Core Bancario de la fecha de atención en calidad.",
    "responsable": "Jessica Isai Juarez Gomez\nCristian Antonio Rodriguez Hernandez",
    "estatus": "Desarrollo",
    "fechaReporte": "2026-08-06",
    "fechaSolucion": "03/08/2026 al 21/08/2026"
  },
  {
    "id": 27,
    "medio": "Correo",
    "flujo": "Apertura de Cuenta",
    "casos": "N/A",
    "clasificacion": "Mejora",
    "criticidad": "No Bloqueante",
    "descripcion": "Dependencia de uso de red fija para realizar flujo de apertura de cuenta.",
    "descripcionCompleta": "Dependencia de uso de red fija para realizar flujo de apertura de cuenta.\n1) Se identifico que existe una dependencia al momento de realizar el flujo de apertura de cuenta con el uso de una red wifi estable, con datos móviles, se notifica que no es posible concluir el proceso de forma exitosa.",
    "observaciones": "*06 de agosto se genera HU con el equipo técnico considerando las mejoras en latencia. Se atiende próximo sprint por la atención de incidencias prioritarias y temas de performance en la aplicación.",
    "responsable": "Cristian Rodríguez Hernández / Juan David Agudelo",
    "estatus": "Backlog",
    "fechaReporte": "06/0//2026",
    "fechaSolucion": "24/08/2926 al 11/09/2026"
  },
  {
    "id": 28,
    "medio": "Reunión Líderes",
    "flujo": "Visualización productos",
    "casos": "N/A",
    "clasificacion": "Mejora",
    "criticidad": "No Bloqueante",
    "descripcion": "Clientes no visualizan sus cuentas que tienen un estatus \"Bloqueada\"",
    "descripcionCompleta": "Clientes no visualizan sus cuentas que tienen un estatus \"Bloqueada\"\n1) Se levanto un ticket en slack derivado a que el cliente no visualizaba su cuenta: SOPOR_CAV25_717",
    "observaciones": "* Sesión de revisión con Aura (20/07/2026)\n*Pendiente información Banca Patrimonial, para crear mejora. \n*29 Jul: Banca patrimonial comparte estatus para poder a comenzar a revisar la mejora a implementar\nLeslie Chavez Santana Se lleva el seguimiento con los clientes que actualmente presentan este escenario",
    "responsable": "Cristian Rodríguez Hernández / Juan David Agudelo",
    "estatus": "Definición Negocio",
    "fechaReporte": "2026-07-14",
    "fechaSolucion": "03/08/2026 al 21/08/2026"
  }
];

// ---- Laboratorios (hoja "Laboratorios") ----
// No incluye el detalle de participantes (nombre, CURP, teléfono, etc.) por
// contener datos personales: se excluye intencionalmente de esta vista.
const LABORATORIOS = {
  participantesTotales: 22,
  jornadas: 3,
  usuariosPrueba: 19,
  completaronApertura: { n: 17, base: 19 },
  usuariosConIncidencia: { n: 8, base: 20 },
  ticketsGenerados: 4,
  patronesRecurrentes: [
    { patron: "Mensaje/SMS de enrolamiento no llega; se recibe hasta el 3er intento o por WhatsApp", ocurrencias: 6, modulo: "Notificaciones - Enrolamiento", criticidad: "Alta" },
    { patron: "Códigos de error al solicitar tarjeta de débito (XFF4H, X4FFH, DLL08)", ocurrencias: 3, modulo: "Apertura de cuenta - Solicitud TDD", criticidad: "Alta" },
    { patron: "Elementos de interfaz (barra de navegación / botones) se tapan en captura biométrica y videograbación", ocurrencias: 3, modulo: "UI - Biométrico / Videograbación", criticidad: "Media" },
    { patron: "Modal “Abre tu cuenta” se queda cargando o regresa al menú inicial", ocurrencias: 2, modulo: "Apertura de cuenta - Inicio de flujo", criticidad: "Alta" }
  ]
};

// ---- Encuesta Fuerza de Ventas ----
const ENCUESTA = {
  totalObservaciones: 22,
  porEje: [
    { eje: "Apertura N4 y Estabilidad PUC", total: 9 },
    { eje: "SPEI", total: 7 },
    { eje: "Servicio al Cliente", total: 3 },
    { eje: "Activación", total: 2 },
    { eje: "Gestión Comercial", total: 1 }
  ],
  observaciones: [
    { no: 1, rubro: "Entrega de Tarjetas", problematica: "No permite reposición de plástico de forma inmediata para disfrutar los beneficios Lazos.", eje: "Activación", estatus: "Completada", solucion: "La entrega de TDD contempla la asignación del plástico con beneficios MiChedraui." },
    { no: 2, rubro: "Entrega de Tarjetas", problematica: "Logística de entrega de tarjetas en centros de atención.", eje: "Activación", estatus: "Completada", solucion: "La entrega de TDD contempla la asignación del plástico con beneficios MiChedraui." },
    { no: 3, rubro: "PUC", problematica: "La fuerza de ventas no puede aperturar su cuenta Consubanco por tener cuenta Bankaya previa.", eje: "Apertura N4 y Estabilidad PUC", estatus: "En proceso", solucion: "Asignado para desarrollo en sprint 3, al 21 de agosto." },
    { no: 4, rubro: "PUC", problematica: "Incidentes técnicos cuando ya se tiene una cuenta Bankaya.", eje: "Apertura N4 y Estabilidad PUC", estatus: "En proceso", solucion: "Asignado para desarrollo en sprint 3, al 21 de agosto." },
    { no: 5, rubro: "PUC", problematica: "Que el proceso sea rápido, eficaz y sencillo al momento de realizar la apertura.", eje: "Apertura N4 y Estabilidad PUC", estatus: "En validación", solucion: "Mejoras establecidas en V4.0.0 y 4.0.1 (por liberar)." },
    { no: 6, rubro: "PUC", problematica: "Velocidad en el biométrico.", eje: "Apertura N4 y Estabilidad PUC", estatus: "En validación", solucion: "Mejoras establecidas en V4.0.0 y 4.0.1 (por liberar)." },
    { no: 7, rubro: "PUC", problematica: "Que no funcione la aplicación.", eje: "Apertura N4 y Estabilidad PUC", estatus: "En validación", solucion: "Mejoras establecidas en V4.0.0 y 4.0.1 (por liberar)." },
    { no: 8, rubro: "PUC", problematica: "Que funcione la aplicación.", eje: "Apertura N4 y Estabilidad PUC", estatus: "En validación", solucion: "Mejoras establecidas en V4.0.0 y 4.0.1 (por liberar)." },
    { no: 9, rubro: "PUC", problematica: "Incidencia al cargar identificaciones: la app no avanza.", eje: "Apertura N4 y Estabilidad PUC", estatus: "En validación", solucion: "Mejoras establecidas en V4.0.0 y 4.0.1 (por liberar)." },
    { no: 10, rubro: "PUC", problematica: "No puede ingresar a la app; marca error en lectura de INE.", eje: "Apertura N4 y Estabilidad PUC", estatus: "En validación", solucion: "Mejoras establecidas en V4.0.0 y 4.0.1 (por liberar)." },
    { no: 11, rubro: "PUC", problematica: "Intermitencias en la app con tiempo de resolución tardado.", eje: "Apertura N4 y Estabilidad PUC", estatus: "En proceso", solucion: "Asignado para desarrollo en sprint 3, al 21 de agosto." },
    { no: 12, rubro: "Pago comisiones", problematica: "Que no paguen en tiempo y forma.", eje: "Gestión Comercial", estatus: "En proceso", solucion: "Proceso establecido para pago de incentivos e insumo de tableros." },
    { no: 13, rubro: "Atención a Clientes", problematica: "No estar preparados con el soporte requerido ante cualquier situación de tarjetahabientes.", eje: "Servicio al Cliente", estatus: "Completada", solucion: "Definición y socialización del Modelo de Atención." },
    { no: 14, rubro: "Atención a Clientes", problematica: "Falta de equipo dedicado a atención de quejas y dudas; la línea no contesta.", eje: "Servicio al Cliente", estatus: "Completada", solucion: "Definición y socialización del Modelo de Atención." },
    { no: 15, rubro: "Atención a Clientes", problematica: "Desbloqueo de tarjeta.", eje: "Servicio al Cliente", estatus: "Completada", solucion: "Definición y socialización del Modelo de Atención." },
    { no: 16, rubro: "Transferencias", problematica: "Que se cumplan los tiempos comprometidos de dispersión.", eje: "SPEI", estatus: "En proceso", solucion: "Reconexión del SPEI." },
    { no: 17, rubro: "Transferencias", problematica: "Incidencia con los retiros a través de la app.", eje: "SPEI", estatus: "En proceso", solucion: "Reconexión del SPEI." },
    { no: 18, rubro: "Transferencias", problematica: "No se puede disponer de los recursos cuando se requiere.", eje: "SPEI", estatus: "En proceso", solucion: "Reconexión del SPEI." },
    { no: 19, rubro: "Transferencias", problematica: "La gente no puede disponer de sus recursos.", eje: "SPEI", estatus: "En proceso", solucion: "Reconexión del SPEI." },
    { no: 20, rubro: "Transferencias", problematica: "Las transferencias no se concluyen y no se regresa el dinero a la cuenta origen.", eje: "SPEI", estatus: "En proceso", solucion: "Reconexión del SPEI." },
    { no: 21, rubro: "Transferencias", problematica: "Operaciones que quedan pendientes o incompletas, generan desconfianza.", eje: "SPEI", estatus: "En proceso", solucion: "Reconexión del SPEI." },
    { no: 22, rubro: "Transferencias", problematica: "Limitante de monto y horarios.", eje: "SPEI", estatus: "En proceso", solucion: "Reconexión del SPEI." }
  ]
};
