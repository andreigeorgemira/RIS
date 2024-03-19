/**
 * Función para formatear una fecha en el formato "dd/mm/yyyy".
 * @param {Date} fecha - La fecha a formatear.
 * @returns {string} La fecha formateada en formato "dd/mm/yyyy".
 */
export function formatearFecha(fecha) {
  var fechaObjeto = new Date(fecha);

  var dia = fechaObjeto.getDate();
  var mes = fechaObjeto.getMonth() + 1;
  var anio = fechaObjeto.getFullYear();

  dia = dia < 10 ? "0" + dia : dia;
  mes = mes < 10 ? "0" + mes : mes;

  var fechaFormateada = dia + "/" + mes + "/" + anio;
  return fechaFormateada;
}

/**
 * Función para formatear una fecha en el formato "dd-mm-yyyy".
 * @param {Date} fecha - La fecha a formatear.
 * @returns {string} La fecha formateada en formato "dd-mm-yyyy".
 */
export function formatearFechaExcel(fecha) {
  var fechaObjeto = new Date(fecha);

  var dia = fechaObjeto.getDate();
  var mes = fechaObjeto.getMonth() + 1;
  var anio = fechaObjeto.getFullYear();

  dia = dia < 10 ? "0" + dia : dia;
  mes = mes < 10 ? "0" + mes : mes;

  var fechaFormateada = dia + "-" + mes + "-" + anio;
  return fechaFormateada;
}
