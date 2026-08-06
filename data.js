/**
 * data.js
 * -----------------------------------------------------------------------
 * Fuente de datos del Dashboard de Estabilidad Operativa PUC.
 *
 * ESTA VERSIÓN contiene datos de muestra extraídos del archivo
 * "Copia de REPORTE-PROGRAM LAZOS V2.xlsx" (hojas "Vista principal" y
 * "Encuestas Fuerza de Ventas") para efectos del wireframe de alta fidelidad.
 *
 * En la Versión 1 real, este archivo se sustituye por una carga:
 *   fetch('data/hallazgos.json')
 *   fetch('data/encuesta.json')
 * generada a partir del Excel mediante el script de conversión descrito
 * en la arquitectura (ver sección "Actualización de datos").
 * La forma (shape) de los objetos NO cambia entre data.js y el JSON final,
 * por eso la migración es de una sola línea en script.js.
 * -----------------------------------------------------------------------
 */

// ---- Catálogos (Diccionario de Datos V2) ----
const CATALOGOS = {
  flujo: ["Enrolamiento", "Apertura de Cuenta", "Entrega TDD", "Inversiones", "Transferencias", "Notificaciones", "Visualización de productos"],
  medioReporte: ["Laboratorio BP", "Laboratorio CH", "Correo", "Slack", "Reunión Líderes"],
  estatus: ["Liberado", "Pruebas", "Desarrollo", "Análisis", "Definición de Negocio"],
  clasificacion: ["Incidencia", "Mejora"],
  criticidad: ["Bloqueante", "No Bloqueante"]
};

// ---- Hallazgos (Vista General) ----
const HALLAZGOS = [
  { id: 1, medio: "Laboratorio BP", flujo: "Enrolamiento", casos: 4, clasificacion: "Incidencia", criticidad: "Bloqueante", descripcion: "No llegaron códigos OTP en el flujo de enrolamiento.", responsable: "Juan David Agudelo", estatus: "Liberado", fechaReporte: "2026-07-08", fechaSolucion: "2026-07-09" },
  { id: 2, medio: "Laboratorio BP", flujo: "Apertura de Cuenta", casos: 1, clasificacion: "Incidencia", criticidad: "Bloqueante", descripcion: "Error de conexión al capturar RFC.", responsable: "Juan David Agudelo", estatus: "Liberado", fechaReporte: "2026-07-08", fechaSolucion: "2026-07-09" },
  { id: 3, medio: "Laboratorio CH", flujo: "Enrolamiento", casos: 1, clasificacion: "Incidencia", criticidad: "No Bloqueante", descripcion: "No permite acceder ingresando contraseña.", responsable: "Cristian Rodríguez Hernández", estatus: "Liberado", fechaReporte: "2026-07-05", fechaSolucion: "2026-07-10" },
  { id: 4, medio: "Laboratorio CH", flujo: "Entrega TDD", casos: 2, clasificacion: "Incidencia", criticidad: "Bloqueante", descripcion: "Solicitud de tarjeta, código de error “XFF4H”.", responsable: "Juan David Agudelo", estatus: "Liberado", fechaReporte: "2026-07-07", fechaSolucion: "2026-07-10" },
  { id: 5, medio: "Laboratorio BP", flujo: "Entrega TDD", casos: 1, clasificacion: "Incidencia", criticidad: "Bloqueante", descripcion: "Solicitud de tarjeta, código de error “DLL08”.", responsable: "Juan David Agudelo", estatus: "Liberado", fechaReporte: "2026-07-08", fechaSolucion: "2026-07-10" },
  { id: 6, medio: "Laboratorio BP", flujo: "Entrega TDD", casos: 1, clasificacion: "Incidencia", criticidad: "Bloqueante", descripcion: "Solicitud de tarjeta, código de error “C0B4S”.", responsable: "Juan David Agudelo", estatus: "Liberado", fechaReporte: "2026-07-08", fechaSolucion: "2026-07-10" },
  { id: 7, medio: "Laboratorio CH", flujo: "Apertura de Cuenta", casos: 1, clasificacion: "Incidencia", criticidad: "No Bloqueante", descripcion: "Botón “continuar” no se habilita en videograbación.", responsable: "Juan David Agudelo", estatus: "Liberado", fechaReporte: "2026-07-06", fechaSolucion: "2026-07-10" },
  { id: 8, medio: "Correo", flujo: "Enrolamiento", casos: 3, clasificacion: "Incidencia", criticidad: "Bloqueante", descripcion: "Código de error (5VXBU) al ingresar a la aplicación.", responsable: "Juan David Agudelo", estatus: "Liberado", fechaReporte: "2026-07-07", fechaSolucion: "2026-07-17" },
  { id: 9, medio: "Punto Conecta", flujo: "Apertura de Cuenta", casos: 2, clasificacion: "Incidencia", criticidad: "Bloqueante", descripcion: "Pantalla en blanco por red inestable (captura INE/biométricos).", responsable: "Juan David Agudelo", estatus: "Liberado", fechaReporte: "2026-07-09", fechaSolucion: "2026-08-03" },
  { id: 10, medio: "Punto Conecta", flujo: "Apertura de Cuenta", casos: 1, clasificacion: "Incidencia", criticidad: "Bloqueante", descripcion: "RFC ya registrado por otro cliente.", responsable: "Juan David Agudelo", estatus: "Liberado", fechaReporte: "2026-07-09", fechaSolucion: "2026-08-03" },
  { id: 11, medio: "Laboratorio BP", flujo: "Apertura de Cuenta", casos: 1, clasificacion: "Incidencia", criticidad: "No Bloqueante", descripcion: "Fuente grande oculta botón “continuar” en biométricos.", responsable: "Juan David Agudelo", estatus: "Pruebas", fechaReporte: "2026-07-08", fechaSolucion: "03/08/2026 al 07/08/2026" },
  { id: 12, medio: "Reunión Líderes", flujo: "Entrega TDD", casos: 1, clasificacion: "Incidencia", criticidad: "No Bloqueante", descripcion: "No permite modificar colonia de entrega en reposición de TDD.", responsable: "Cristian Rodríguez Hernández", estatus: "Pruebas", fechaReporte: "2026-07-28", fechaSolucion: "03/08/2026 al 07/08/2026" },
  { id: 13, medio: "Slack", flujo: "Apertura de Cuenta", casos: 8, clasificacion: "Incidencia", criticidad: "Bloqueante", descripcion: "Código de error (5VXBU) al ingresar a la aplicación (reincidencia).", responsable: "Juan Antonio García Herrera", estatus: "Pruebas", fechaReporte: "2026-07-15", fechaSolucion: "2026-08-07" },
  { id: 14, medio: "Reunión Líderes", flujo: "Transferencias", casos: 2, clasificacion: "Incidencia", criticidad: "Bloqueante", descripcion: "Código de error (40KXP) al transferir.", responsable: "Juan David Agudelo", estatus: "Desarrollo", fechaReporte: "2026-08-03", fechaSolucion: "03/08/2026 al 21/08/2026" },
  { id: 15, medio: "Reunión Líderes", flujo: "Notificaciones", casos: "N/A", clasificacion: "Mejora", criticidad: "No Bloqueante", descripcion: "Eliminar mensaje “Transferencias reflejadas al día siguiente” fuera de horario.", responsable: "Juan David Agudelo", estatus: "Liberado", fechaReporte: "2026-07-15", fechaSolucion: "2026-07-21" },
  { id: 16, medio: "Correo", flujo: "Inversiones", casos: "N/A", clasificacion: "Mejora", criticidad: "No Bloqueante", descripcion: "Actualizar productos de inversión para clientes Lazos Nivel Azul.", responsable: "Juan David Agudelo", estatus: "Liberado", fechaReporte: "2026-07-06", fechaSolucion: "2026-08-03" },
  { id: 17, medio: "Correo", flujo: "Inversiones", casos: "N/A", clasificacion: "Mejora", criticidad: "No Bloqueante", descripcion: "Botón “regresar” nativo de Android interrumpe el flujo de apertura.", responsable: "Juan David Agudelo", estatus: "Pruebas", fechaReporte: "2026-07-10", fechaSolucion: "2026-08-03" },
  { id: 18, medio: "Reunión Líderes", flujo: "Inversiones", casos: "N/A", clasificacion: "Mejora", criticidad: "No Bloqueante", descripcion: "Mensajes informativos para propuesta de valor CEDES.", responsable: "Juan David Agudelo", estatus: "Pruebas", fechaReporte: "2026-07-24", fechaSolucion: "03/08/2026 al 07/08/2026" },
  { id: 19, medio: "Correo", flujo: "Apertura de Cuenta", casos: "N/A", clasificacion: "Mejora", criticidad: "No Bloqueante", descripcion: "Sección de beneficios poco visible en el home de la aplicación.", responsable: "Juan David Agudelo", estatus: "Pruebas", fechaReporte: "2026-07-06", fechaSolucion: "03/08/2026 al 07/08/2026" },
  { id: 20, medio: "Reunión Líderes", flujo: "Apertura de Cuenta", casos: "100+", clasificacion: "Mejora", criticidad: "No Bloqueante", descripcion: "Clientes con cuenta N4 BKY no visualizan apertura de cuenta CSB.", responsable: "Juan David Agudelo", estatus: "Desarrollo", fechaReporte: "2026-07-22", fechaSolucion: "03/08/2026 al 21/08/2026" },
  { id: 21, medio: "Correo", flujo: "Apertura de Cuenta", casos: "N/A", clasificacion: "Mejora", criticidad: "No Bloqueante", descripcion: "Dependencia de red fija para completar el flujo de apertura.", responsable: "Cristian Rodríguez / Juan David Agudelo", estatus: "Análisis", fechaReporte: "2026-07-06", fechaSolucion: "03/08/2026 al 21/08/2026" },
  { id: 22, medio: "Correo", flujo: "Apertura de Cuenta", casos: "N/A", clasificacion: "Mejora", criticidad: "No Bloqueante", descripcion: "Botón “entendido” regresa al inicio de sesión al finalizar apertura.", responsable: "Cristian Rodríguez / Juan David Agudelo", estatus: "Análisis", fechaReporte: "2026-07-06", fechaSolucion: "03/08/2026 al 21/08/2026" },
  { id: 23, medio: "Reunión Líderes", flujo: "Visualización de productos", casos: 1, clasificacion: "Mejora", criticidad: "No Bloqueante", descripcion: "Clientes no visualizan cuentas con estatus “Bloqueada”.", responsable: "Cristian Rodríguez / Juan David Agudelo", estatus: "Definición de Negocio", fechaReporte: "2026-07-14", fechaSolucion: "03/08/2026 al 21/08/2026" }
];

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
