document.addEventListener("DOMContentLoaded", function () {
  // console.log("Entro");

  //fecha 1967-09-16T00:00:00
  fecha = new Date("1967-09-16T00:00:00");
  let año = fecha.getFullYear(); //recojo año
  let mes = formatoFechaMM(fecha); //mes
  let dia = formatoFechaDD(fecha); //dia
  let diaSemanaStr = diaDeSemana(fecha); //dia de la semana del 0 al 6 domingo 0 lunes 1 martes 2 miércoles 3 jueves 4 viernes 5 sábado 6
  let hora = ordenarHora(fecha);

  console.log(diaSemanaStr + " dia");
  console.log(hora);
});

function ordenarHora(fecha) {
  var horadesordenada = new Date(fecha).toLocaleTimeString(); //guardo la hora en hh:mm/ss
  //si hora empieza por 0 le añadimos un 0 al inicio -> hora mala h:mm:ss Hora buena hh:mm:ss
  if (horadesordenada.length === 7) {
    // si la hora tiene 7 de largo --> h:mm:ss esta mal, le sumo un 0 al inicio
    horadesordenada = "0" + horadesordenada;
  }
  var horaordenadaSinSegundos = horadesordenada.trim(); //quito espacios
  let horaOrdenada = horaordenadaSinSegundos.substring(0, 5); //le quito los segundos
  return horaOrdenada;
}

/**
 * Función que recibe la fecha completa. Con la función .getDay(); te da un int del 0 al 6, donde
 *  domingo es 0 lunes es 1 martes es 2 miércoles es 3 jueves es 4 viernes es 5 y sábado es 6
 * @param {*} fecha
 * @returns el dia de la semana
 */
function diaDeSemana(fecha) {
  let diaSemana = fecha.getDay(); //dia de la semana del 0 al 6 domingo 0 lunes 1 martes 2 miércoles 3 jueves 4 viernes 5 sábado 6
  const arrayDias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  return arrayDias[diaSemana];
}

/**
 * Función que modifica la fecha para que te muestre siempre dd
 * @param {*} fecha
 * @returns 0+dia si el dia es del 1 al 9
 */
function formatoFechaDD(fecha) {
  let dia = fecha.getDate(); //dia
  //añadir 0 si el dia es del 0 al 9
  if (dia < 10) {
    return (dia = "0" + dia);
  }
}
/**
 * Función que modifica la fecha para que te muestre siempre mm
 * @param {*} fecha
 * @returns 0+mes si el ,es es del 1 al 9
 */
function formatoFechaMM(fecha) {
  let mes = fecha.getMonth() + 1; //mes
  if (mes < 10) {
    //si mes es mas peque de 9 le atizo un 0 delante
    return (mes = "0" + mes);
  }
}

/**
 * Función que recibe la fecha completa. Con la función .getDay(); te da un int del 0 al 6, donde
 *  domingo es 0 lunes es 1 martes es 2 miércoles es 3 jueves es 4 viernes es 5 y sábado es 6
 * @param {*} fecha
 * @returns el dia de la semana
 */
function diaDeSemana(fecha) {
  let diaSemana = fecha.getDay(); //dia de la semana del 0 al 6 domingo 0 lunes 1 martes 2 miércoles 3 jueves 4 viernes 5 sábado 6
  const arrayDias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  return arrayDias[diaSemana];
}
