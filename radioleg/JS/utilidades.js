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
