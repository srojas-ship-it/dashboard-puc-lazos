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
  { id: 1, medio: "Laboratorio BP", flujo: "Enrolamiento", casos: 4, clasificacion: "Incidencia", criticidad: "Bloqueante",
    descripcion: "No llegaron códigos OTP en el flujo de enrolamiento.",
    descripcionCompleta: "No llegaron códigos OTP en el flujo de enrolamiento. Durante el laboratorio de banca patrimonial se reportaron 4 casos donde los clientes no recibieron sus códigos OTP.",
    observaciones: "Dependencia del proveedor.\n* 9/Jul en espera de evidencias del proveedor de la entrega al carrier\n* 9/Jul se escalan POD a 3 réplicas",
    responsable: "Juan David Agudelo", estatus: "Liberado", fechaReporte: "2026-07-08", fechaSolucion: "2026-07-09" },

  { id: 2, medio: "Laboratorio BP", flujo: "Apertura de Cuenta", casos: 1, clasificacion: "Incidencia", criticidad: "Bloqueante",
    descripcion: "Error de conexión al capturar RFC.",
    descripcionCompleta: "Al momento de capturar RFC muestra error de conexión. Este error detuvo al cliente en el flujo porque no permitía avanzar.",
    observaciones: "* 9/Jul se anexa en la HU la evidencia de los problemas de conexión del dispositivo (red del dispositivo); no se han localizado los eventos de amplitud del intento fallido por RFC.\n* En la sesión se llega a un acuerdo: si se presenta en otros laboratorios, se retoma el caso.",
    responsable: "Juan David Agudelo", estatus: "Liberado", fechaReporte: "2026-07-08", fechaSolucion: "2026-07-09" },

  { id: 3, medio: "Laboratorio CH", flujo: "Enrolamiento", casos: 1, clasificacion: "Incidencia", criticidad: "No Bloqueante",
    descripcion: "No permite acceder ingresando contraseña.",
    descripcionCompleta: "No permite acceder ingresando contraseña. Al acceder por primera vez, el usuario ingresa desde el nuevo flujo de acceso directo y actualiza contraseña, pero no logra acceder.",
    observaciones: "* 9/Jul al cierre del día se entra a funcionales\n* 10/Jul se libera a PROD",
    responsable: "Cristian Rodríguez Hernández", estatus: "Liberado", fechaReporte: "2026-07-05", fechaSolucion: "2026-07-10" },

  { id: 4, medio: "Laboratorio CH", flujo: "Entrega TDD", casos: 2, clasificacion: "Incidencia", criticidad: "Bloqueante",
    descripcion: "Solicitud de tarjeta, código de error “XFF4H”.",
    descripcionCompleta: "Solicitud de tarjeta, código de error “XFF4H”. Al solicitar tarjeta física por primera vez y el cliente confirma datos de entrega, detona error XFF4H.",
    observaciones: "* 09/Jul resuelto y está en pruebas actuales de la N4\n* 10/Jul se libera a PROD",
    responsable: "Juan David Agudelo", estatus: "Liberado", fechaReporte: "2026-07-07", fechaSolucion: "2026-07-10" },

  { id: 5, medio: "Laboratorio BP", flujo: "Entrega TDD", casos: 1, clasificacion: "Incidencia", criticidad: "Bloqueante",
    descripcion: "Solicitud de tarjeta, código de error “DLL08”.",
    descripcionCompleta: "Solicitud de tarjeta, código de error “DLL08”. Al solicitar tarjeta física por primera vez y el cliente confirma datos de entrega, detona error DLL08.",
    observaciones: "* 9/Jul se encuentra en pruebas funcionales actualmente para la N4\n* 10/Jul se libera a PROD",
    responsable: "Juan David Agudelo", estatus: "Liberado", fechaReporte: "2026-07-08", fechaSolucion: "2026-07-10" },

  { id: 6, medio: "Laboratorio BP", flujo: "Entrega TDD", casos: 1, clasificacion: "Incidencia", criticidad: "Bloqueante",
    descripcion: "Solicitud de tarjeta, código de error “C0B4S”.",
    descripcionCompleta: "Solicitud de tarjeta, código de error “C0B4S”. Al solicitar tarjeta física por primera vez y el cliente confirma datos de entrega, detona error C0B4S.",
    observaciones: "* 9/Jul se encuentra en pruebas funcionales actualmente para la N4\n* 10/Jul se libera a PROD",
    responsable: "Juan David Agudelo", estatus: "Liberado", fechaReporte: "2026-07-08", fechaSolucion: "2026-07-10" },

  { id: 7, medio: "Correo", flujo: "Enrolamiento", casos: 1, clasificacion: "Incidencia", criticidad: "Bloqueante",
    descripcion: "Código de error “5VXBU” al ingresar a la aplicación.",
    descripcionCompleta: "Al momento de ingresar a la aplicación detona código de error (5VXBU). Se reporta por atención a clientes para algunos clientes al ingresar a la aplicación.",
    observaciones: "* 9/Jul se liberó un ajuste que impedía generar el núcleo cliente, y ajuste masivo de los que no tienen\n* 15/Jul se reportan nuevos tickets de soporte: SOPOR_CAV25_718, SOPOR_CAV25_719, SOPOR_CAV25_720\n* 15/Jul se identifica que siguen llegando consultas de clientes desde CRM sin núcleo del cliente; el equipo de CRM trabaja en conjunto con Integraciones para dar una solución\n* 16/Jul CRM confirma fecha de solución por TI: 20/07/2026\n* 17/Jul se confirma liberación del caso por CRM",
    responsable: "Juan David Agudelo", estatus: "Liberado", fechaReporte: "2026-07-07", fechaSolucion: "2026-07-17" },

  { id: 8, medio: "Laboratorio CH", flujo: "Apertura de Cuenta", casos: 3, clasificacion: "Incidencia", criticidad: "No Bloqueante",
    descripcion: "Botón “continuar” no se habilita en videograbación.",
    descripcionCompleta: "Al momento de realizar videograbación no se habilita el botón “continuar” para capturar rostro.",
    observaciones: "Dependencia del proveedor.\n* Hallazgo levantado el 7/Jul a las 19:40\n* 8/Jul se reporta que no se ven problemas; se puede cerrar el issue y se encuentra en proceso de pruebas con el proveedor Incode\n* CH indica que el colaborador realizará el proceso desde otro dispositivo, en espera de resultado",
    responsable: "Juan David Agudelo", estatus: "Liberado", fechaReporte: "2026-07-06", fechaSolucion: "2026-07-10" },

  { id: 9, medio: "Punto Conecta", flujo: "Apertura de Cuenta", casos: 2, clasificacion: "Incidencia", criticidad: "Bloqueante",
    descripcion: "Pantalla en blanco por red inestable (captura INE/biométricos).",
    descripcionCompleta: "Pantalla se queda en blanco (red inestable) al ingresar al flujo de captura del INE o biométrico, en casos específicos. Análisis: son casos excepcionales por red inestable; se definen modales para informar al cliente que valide su red y reintente el proceso.",
    observaciones: "* 14/Jul se escala el caso con el proveedor\n* 15/Jul de acuerdo al proveedor no se encontraron flujos de trabajo para los casos fallidos reportados; se escalan de nuevo\n* 16/Jul se validan los casos de biométrico no exitosos con el proveedor: los flujos fueron abiertos y no se encontró interacción al cargar el workflow\n* 17/Jul se implementará un control para gestionar los casos donde el workflow no carga correctamente; entrega a QA el 22/Jul\n* 22/Jul se entrega en ambiente de QA para pruebas\n* Se libera con la nueva versión el 3 de agosto, para no impactar el proyecto NPS en curso",
    responsable: "Juan David Agudelo", estatus: "Liberado", fechaReporte: "2026-07-09", fechaSolucion: "2026-08-03" },

  { id: 10, medio: "Punto Conecta", flujo: "Apertura de Cuenta", casos: 1, clasificacion: "Incidencia", criticidad: "Bloqueante",
    descripcion: "RFC ya registrado por otro cliente.",
    descripcionCompleta: "Al realizar el flujo de apertura y contestar el cuestionario de personas vulnerables, el usuario no logra avanzar. Análisis: el cliente ingresa un RFC ya registrado por otro cliente; se atenderá vía línea de atención para actualizar sus datos conforme los protocolos operativos definidos.",
    observaciones: "* Al actualizar el cliente en CRM se identifica que el RFC ya está asociado a otro número de cliente; se define la solución para controlar el escenario\n* Se confirma que el 16 de julio quedaría solventado, en espera de pruebas funcionales\n* 16/Jul se libera el ajuste en QA y se realizan pruebas; actualmente en pruebas funcionales\n* 22/Jul en ambiente de pruebas, se integraría en la próxima liberación\n* Se libera con la nueva versión el 3 de agosto, para no impactar el proyecto NPS en curso\n* 29/Jul Diana Torres Rodríguez da seguimiento con el CAI para validar el protocolo de estos casos",
    responsable: "Juan David Agudelo", estatus: "Liberado", fechaReporte: "2026-07-09", fechaSolucion: "2026-08-03" },

  { id: 11, medio: "Laboratorio BP", flujo: "Apertura de Cuenta", casos: 1, clasificacion: "Incidencia", criticidad: "No Bloqueante",
    descripcion: "Fuente grande oculta botón “continuar” en biométricos.",
    descripcionCompleta: "Con un tipo de fuente grande en el dispositivo no se visualiza la acción “continuar” en videograbación y captura biométrica. El cliente puede reducir el tamaño de fuente para avanzar, pero se busca solución raíz con el proveedor.",
    observaciones: "* 9/Jul se escala con el proveedor Karalundi; ya está en pruebas la implementación con Incode y se sugiere repetir el escenario con letra grande en Samsung\n* 14/Jul Karalundi reporta que el proveedor trabaja en una solución para el tamaño de la fuente\n* 16/Jul reunión con el proveedor: corrección lista el 17/07\n* 17/Jul se realizan pruebas: aparece el botón pero el texto se superpone; se escala de nuevo\n* 22/Jul el proveedor comparte una solución para implementar desde la aplicación; ya está en ambiente de pruebas\n* Se libera con la nueva versión el 3 de agosto, para no impactar el proyecto NPS en curso\n* 29/Jul: solución en BETA el 3 de agosto, pendientes pruebas de validadores funcionales y aprobación en tiendas\n* 7 de agosto: continúa versión 4.1.0 en revisión por tiendas iOS\n* 10 de agosto: se confirma liberación y masificación en tiendas (Play Store y App Store)",
    responsable: "Juan David Agudelo", estatus: "Liberado", fechaReporte: "2026-07-08", fechaSolucion: "2026-08-10" },

  { id: 12, medio: "Reunión Líderes", flujo: "Entrega TDD", casos: 1, clasificacion: "Incidencia", criticidad: "No Bloqueante",
    descripcion: "No permite modificar colonia de entrega en reposición de TDD.",
    descripcionCompleta: "Al ingresar al formulario de entrega de TDD con la dirección ya registrada, si el cliente quiere cambiarla y seleccionar otra colonia, no se lo permite ajustar.",
    observaciones: "* 29/Jul: solución en BETA el 3 de agosto, pendientes pruebas de validadores funcionales y aprobación en tiendas\n* 7 de agosto: continúa versión 4.1.0 en revisión por tiendas iOS\n* 10 de agosto: se confirma liberación y masificación en tiendas (Play Store y App Store)",
    responsable: "Cristian Rodríguez Hernández", estatus: "Liberado", fechaReporte: "2026-07-28", fechaSolucion: "2026-08-10" },

  { id: 13, medio: "Slack", flujo: "Enrolamiento", casos: 8, clasificacion: "Incidencia", criticidad: "Bloqueante",
    descripcion: "Código de error “5VXBU” al ingresar a la aplicación (reincidencia).",
    descripcionCompleta: "Reincidencia del código de error 5VXBU al ingresar a la aplicación. Se detecta que son clientes que en CRM no tienen número de cliente; deriva de las cargas masivas de promotores que se convierten a su vez en clientes.",
    observaciones: "* 3 de agosto se confirma que el equipo de CRM realiza 2 monitoreos diarios\n* 3 de agosto se confirma que la liberación se hace en la semana del 3 al 7 de agosto\n* 7 de agosto se confirma liberación del caso",
    responsable: "Juan Antonio García Herrera", estatus: "Liberado", fechaReporte: "2026-07-15", fechaSolucion: "2026-08-06" },

  { id: 14, medio: "Slack", flujo: "Transferencias", casos: 2, clasificacion: "Incidencia", criticidad: "Bloqueante",
    descripcion: "Código de error “40KXP” al transferir.",
    descripcionCompleta: "Al momento de transferir muestra código de error (40KXP). Se identifica que es un tema relacionado a la generación de token de VU.",
    observaciones: "* 3 de agosto se confirma con el equipo técnico que el caso se atenderá dentro del sprint en curso (3-21 de agosto)\n* Se revisa mejora para generar el token en el momento de la transacción; se encuentra en desarrollo",
    responsable: "Juan David Agudelo", estatus: "Desarrollo", fechaReporte: "2026-07-30", fechaSolucion: "03/08/2026 al 21/08/2026" },

  { id: 15, medio: "Reunión Líderes", flujo: "Notificaciones", casos: "N/A", clasificacion: "Mejora", criticidad: "No Bloqueante",
    descripcion: "Eliminar mensaje “Transferencias reflejadas al día siguiente” fuera de horario.",
    descripcionCompleta: "Se levantó la necesidad de actualizar el mensaje que notifica que, después de las 2 pm, los movimientos se pueden ver hasta el siguiente día hábil (mostrado de 2 pm a 8 am).",
    observaciones: "* 21/Jul se realizan ajustes en producción",
    responsable: "Cristian Rodríguez Hernández / Juan David Agudelo", estatus: "Liberado", fechaReporte: "2026-07-15", fechaSolucion: "2026-07-21" },

  { id: 16, medio: "Correo", flujo: "Inversiones", casos: "N/A", clasificacion: "Mejora", criticidad: "No Bloqueante",
    descripcion: "Actualizar productos de inversión para clientes Lazos Nivel Azul.",
    descripcionCompleta: "Se notifica que es necesario actualizar los productos en inversiones digitales aplicables para clientes de nivel azul.",
    observaciones: "* 29/Jul: solución en BETA el 3 de agosto, pendientes pruebas de validadores funcionales y aprobación en tiendas\n* Se notifica al equipo de CRM la necesidad de dar de alta el producto 652",
    responsable: "Cristian Rodríguez Hernández / Juan David Agudelo", estatus: "Liberado", fechaReporte: "2026-07-06", fechaSolucion: "2026-08-03" },

  { id: 17, medio: "Correo", flujo: "Apertura de Cuenta", casos: "N/A", clasificacion: "Mejora", criticidad: "No Bloqueante",
    descripcion: "Botón “entendido” regresa al inicio de sesión al finalizar apertura.",
    descripcionCompleta: "Al concluir el flujo de apertura de cuenta, en la pantalla de felicidades, dar clic en “Entendido” no lleva al menú principal, siendo necesario ingresar de nuevo a la aplicación para visualizar la cuenta creada.",
    observaciones: "Conforme el análisis realizado, se identifica que el ajuste solicitado no es lo más recomendable, ya que el usuario realiza su proceso en una web embebida en la app (PWA); por temas de seguridad implicaría mantener una sesión activa entre 10 y 50 minutos, lo que puede tardar el flujo de apertura según el caso del cliente. Las pruebas de laboratorio confirman que no es un tema que impacte la experiencia de forma relevante, ya que el usuario solo debe iniciar sesión de nuevo para ver su producto aperturado.",
    responsable: "Cristian Rodríguez Hernández / Juan David Agudelo", estatus: "Liberado", fechaReporte: "2026-07-06", fechaSolucion: "No aplica" },

  { id: 18, medio: "Correo", flujo: "Inversiones", casos: "N/A", clasificacion: "Mejora", criticidad: "No Bloqueante",
    descripcion: "Botón “regresar” nativo de Android interrumpe el flujo de apertura.",
    descripcionCompleta: "Durante el proceso de apertura, el botón “regresar” nativo de dispositivos Android cierra por completo la aplicación, obligando al cliente a volver a ingresar y reiniciar el flujo.",
    observaciones: "* 29/Jul: solución en BETA el 3 de agosto, pendientes pruebas de validadores funcionales y aprobación en tiendas\n* 7 de agosto: continúa versión 4.1.0 en revisión por tiendas iOS\n* 10 de agosto: se confirma liberación y masificación en tiendas (Play Store y App Store)",
    responsable: "Cristian Rodríguez Hernández / Juan David Agudelo", estatus: "Liberado", fechaReporte: "2026-07-10", fechaSolucion: "2026-08-10" },

  { id: 19, medio: "Reunión Líderes", flujo: "Inversiones", casos: "N/A", clasificacion: "Mejora", criticidad: "No Bloqueante",
    descripcion: "Mensajes informativos para propuesta de valor CEDES.",
    descripcionCompleta: "Se notifica que la sección de inversiones digitales tiene mensajes que no hacen referencia a la propuesta de valor de los productos CEDE.",
    observaciones: "* 29/Jul: solución en BETA el 3 de agosto, pendientes pruebas de validadores funcionales y aprobación en tiendas\n* 7 de agosto: continúa versión 4.1.0 en revisión por tiendas iOS\n* 10 de agosto: se confirma liberación y masificación en tiendas (Play Store y App Store)",
    responsable: "Cristian Rodríguez Hernández / Juan David Agudelo", estatus: "Liberado", fechaReporte: "2026-07-24", fechaSolucion: "2026-08-10" },

  { id: 20, medio: "Correo", flujo: "Apertura de Cuenta", casos: "100+", clasificacion: "Mejora", criticidad: "No Bloqueante",
    descripcion: "Sección de beneficios poco visible en el home de la aplicación.",
    descripcionCompleta: "La sección de promociones para incentivar el uso de la cuenta se encuentra al fondo de la pantalla principal (requiere scroll). Al no ser visible de primera impresión, se pierde una oportunidad inmediata de venta cruzada.",
    observaciones: "* 29/Jul: solución en BETA el 3 de agosto, pendientes pruebas de validadores funcionales y aprobación en tiendas\n* 7 de agosto: continúa versión 4.1.0 en revisión por tiendas iOS\n* 10 de agosto: se confirma liberación y masificación en tiendas (Play Store y App Store)",
    responsable: "Cristian Rodríguez Hernández / Juan David Agudelo", estatus: "Liberado", fechaReporte: "2026-07-06", fechaSolucion: "2026-08-10" },

  { id: 21, medio: "Reunión Líderes", flujo: "Apertura de Cuenta", casos: "N/A", clasificacion: "Mejora", criticidad: "No Bloqueante",
    descripcion: "Clientes con cuenta N4 BKY no visualizan apertura de cuenta CSB.",
    descripcionCompleta: "Existen clientes que no logran aperturar cuenta porque en la aplicación no se muestra la opción de apertura al tener una cuenta BKY.",
    observaciones: "* 29/Jul se integra mejora para evitar que los casos sucedan en producción",
    responsable: "Cristian Rodríguez Hernández / Juan David Agudelo", estatus: "Desarrollo", fechaReporte: "2026-07-22", fechaSolucion: "03/08/2026 al 21/08/2026" },

  { id: 22, medio: "Correo", flujo: "Inversión Digital", casos: "N/A", clasificacion: "Mejora", criticidad: "No Bloqueante",
    descripcion: "Actualización de ISR en productos de inversión digital.",
    descripcionCompleta: "Se identifica la necesidad, por parte de banca patrimonial, de actualizar el ISR aplicable a todos los productos de inversión digital.",
    observaciones: "* 4 de agosto el equipo de Banca Patrimonial confirma tasas de ISR por correo\n* 7 de agosto se confirma la actualización en el Core Bancario; el equipo de desarrollo de PUC ajusta los cotizadores; se sigue validando en ambiente de calidad porque aún no se refleja en los simuladores",
    responsable: "Cristian Rodríguez Hernández / Juan David Agudelo", estatus: "Desarrollo", fechaReporte: "2026-08-04", fechaSolucion: "2026-08-12" },

  { id: 23, medio: "Correo", flujo: "Entrega TDD", casos: 1, clasificacion: "Mejora", criticidad: "No Bloqueante",
    descripcion: "Ajustar a $0.00 el cobro por reposición de entrega de tarjeta a domicilio.",
    descripcionCompleta: "Se solicita por correo, con visto bueno de Jurídico, ajustar el cobro de reposición de entrega de tarjeta a domicilio a costo $0.00.",
    observaciones: "* 6 de agosto se integra historia de usuario y validación por el equipo\n* 7 de agosto se solicita confirmación al Core Bancario de la fecha de atención en calidad",
    responsable: "Jessica Juárez / Cristian Rodríguez Hernández", estatus: "Desarrollo", fechaReporte: "2026-08-06", fechaSolucion: "03/08/2026 al 21/08/2026" },

  { id: 24, medio: "Correo", flujo: "Apertura de Cuenta", casos: "N/A", clasificacion: "Mejora", criticidad: "No Bloqueante",
    descripcion: "Dependencia de red fija para completar el flujo de apertura.",
    descripcionCompleta: "Se identifica una dependencia al realizar el flujo de apertura de cuenta con el uso de red wifi estable; con datos móviles se reporta que no es posible concluir el proceso de forma exitosa.",
    observaciones: "* 6 de agosto se genera historia de usuario con el equipo técnico, considerando mejoras en latencia; se atiende en el próximo sprint por la atención de incidencias prioritarias y temas de performance en la aplicación",
    responsable: "Cristian Rodríguez Hernández / Juan David Agudelo", estatus: "Backlog", fechaReporte: "2026-07-06", fechaSolucion: "24/08/2026 al 11/09/2026" },

  { id: 25, medio: "Reunión Líderes", flujo: "Visualización de productos", casos: "N/A", clasificacion: "Mejora", criticidad: "No Bloqueante",
    descripcion: "Clientes no visualizan cuentas con estatus “Bloqueada”.",
    descripcionCompleta: "Se levanta un ticket en Slack porque el cliente no visualizaba su cuenta (SOPOR_CAV25_717). Análisis: el cliente sí tiene una cuenta activa con un código 7; ya se solicitó la documentación para el desbloqueo con el área correspondiente. La cuenta no está inactiva.",
    observaciones: "* Sesión de revisión con Banca Patrimonial (20/07/2026)\n* Pendiente información de Banca Patrimonial para crear la mejora\n* 29/Jul Banca Patrimonial comparte estatus para comenzar a revisar la mejora a implementar; se da seguimiento a los clientes que presentan este escenario",
    responsable: "Cristian Rodríguez Hernández / Juan David Agudelo", estatus: "Definición de Negocio", fechaReporte: "2026-07-14", fechaSolucion: "03/08/2026 al 21/08/2026" }
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
