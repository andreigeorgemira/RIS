/*****************************************************************************************************************************
 * *************************************FUNCIONES RADIOFÍSICO******************************************************************
 ******************************************************************************************************************************/

//variables globales
//creo un diccionario con las id del los iconos de los ojos, donde cada id tendrá aparejado un bolean
var diccionarioCondicionesFiltroOjo = new Map();
diccionarioCondicionesFiltroOjo.set("verProgramados", true);
diccionarioCondicionesFiltroOjo.set("verInformados", true);
diccionarioCondicionesFiltroOjo.set("verCompletados", true);

//contador para contar cuantos datos se muestran se utiliza en la función 'mostrarMasDatos' y en 'mostrarDatosInicio'
var contador = 0;
let incremento = 50; //defino el incremento en 50 porque valor actual es 25 y quiero sumar de 25 en 25
let valorActual = 25;

/**
 * Creo  una promesa que cuando la función de llamada a la api tenga los datos de la api me los ingrese en la función mostrarDatosApi donde se inyectan los datos en el html
 */
window.responseData; //donde guardar los datos que entregara la api
Promise.all([llamadaAPIradioFisico()]).then((data) => {
  responseData = data;
  //llamo a la función y le meto los datos
  mostrarDatosInicio(responseData);
});

/**
 * Función que captura el el stron del html y inserta la cantidad de datos que esta mostrando
 */
function mostrarRegistros() {
  let cantidadRegistros = document.getElementById("cantidadRegistros");
  cantidadRegistros.innerHTML = "Datos Mostrados: " + contador;
}

/**
 * Nos dice la cantidad de datos que nos llegan de la api
 * @param {*} responseData
 * @returns
 */
function cantidadDatosEntrada(responseData) {
  return responseData[0].rows.length;
}

/**
 * Función que recibe los datos que nos da la función llamadaAPIradioFisico y muestra los 25 primeros datos
 * @param {*} responseData Todos los datos que nos retorna la api
 */
function mostrarDatosInicio(responseData) {
  //console.log(cantidadDatosEntrada(responseData));
  //guardamos la id donde se mostraran los datos
  const tablaBody = document.getElementById("dataBody");

  //creamos un bucle para que inserte los datos, utilizo slice para que me muestre los datos de inicio de 0 a 25
  responseData[0].rows.slice(0, 25).forEach((datos) => {
    contador++;
    //creo una nueva
    const tr = document.createElement("tr");
    //console.log(datosFiltrados.rows[0]);
    //crear y añadir celdas a las filsa ALERTA -> FALTA -> + info  y Generar informe   INFORME
    tr.innerHTML = `
                <td><strong>${origenPaciente(datos.ORIGEN)}</strong></td>
                <td><strong>${datos.NHC}</strong></td>
                <td>${siRetornaNull(datos.AETITLE)}</td>
                <td>${siRetornaNull(datos.DOSE)}</td>
                <td>${siRetornaNull(datos.UNIT)}</td>
                <td>${ordenarNombre(datos.NOMPACIENT)}</td>
                <td>${ordenarDataSinDiaStr(datos.NACIMIENTO)}</td>
                <td>${ordenarData(datos.DATA_PROVA)}</td>
                <td>${siRetornaNull(datos.MODALITAT)}</td>
                <td>${siRetornaNull(datos.DESC_PROVA)}</td>
                <td>${siRetornaNull(datos.METGE)}</td>
                <td>${siRetornaNull(datos.METGE_RESPONSABLE)}</td>
                <td>${ordenarData(datos.DATA_REALITZADA)}</td>
                <td>${ordenarData(datos.DATA_INFORME)} </td>
                <td><a href="#" onclick="abrirInforme('${datos.INFORME}');"class="fa-regular fa-file-pdf fa-xl" style="color: #000000; display:
                    ${mostrarInforme(datos.DATA_INFORME)};"></a></td>                 
                <td id='datosEstado';>${datos.ESTAT}</td>       
                                `;
    // Añadir la fila al cuerpo de la tabla
    tablaBody.appendChild(tr);
  });
  mostrarRegistros();
}

/**
 * Función que hace magia y no entiendo muy bien lo que hace pero. Cuando haces click en el botón mostrarMas datos lla a a esta función
 * que esta llama a la función que incrementa datos hasta que no haya mas datos y desactiva el boton, sin esta función el metodo
 * removeEventListener("click") no funciona. Magia
 */
function llamarFunccion() {
  // Verifica si el botón está activo antes de llamar a incrementoDeDatos
  incrementoDeDatos(responseData);
}
/**
 * Función que cuando se hace click sobre el botón mostrar mas datos te muestra 25 datos mas.
 * Si quedan menos de 25 te muestra los restantes y cuando los ha mostrado todos desactiva el evento click del botón
 * @param {*} responseData datos que nos entrega la appi desde la función 'llamadaAPIradioFisico'
 */
function incrementoDeDatos(responseData) {
  // contador es usado en la función 'mostrarMasDatos' y en 'mostrarDatosInicio'  cuanta los datos que muestra

  //Mientras contador sea mas pequeño que la cantidad de datos totales
  if (contador < cantidadDatosEntrada(responseData)) {
    // llamo a la función, y le paso el incremento 'de 25 en 25' y el valor actual
    mostrarMasDatos(incremento, valorActual);

    // Actualiza 'valorActual' al valor actual de 'incremento'. --> valor actual + 25
    valorActual = incremento;

    // Incrementa 'incremento' en 25 para el próximo clic.
    incremento += 25;
  } else {
    // Si no hay mas datos, desactivo el botón mostrar mas datos
    console.log("No hay mas datos, botón desactivado");
    botonMostrarMas.removeEventListener("click", llamarFunccion);
  }
}

/**
 * Mostrar mas datos cuando presione el boton de ver mas datos, EN CONSTRUCCIÓN
 * @param {*} incremento
 * @param {*} valorActual
 */
function mostrarMasDatos(incremento, valorActual) {
  //guardamos la id donde se mostraran los datos
  const tablaBody = document.getElementById("dataBody");

  //creamos un bucle para que inserte los datos
  responseData[0].rows.slice(valorActual, incremento).forEach((datos) => {
    contador++;
    //creo una nueva fila
    const tr = document.createElement("tr");
    //console.log(datosFiltrados.rows[0]);
    //crear y añadir celdas a las filsa ALERTA -> FALTA -> + info  y Generar informe   INFORME
    tr.innerHTML = `
                <td><strong>${origenPaciente(datos.ORIGEN)}</strong></td>
                <td><strong>${datos.NHC}</strong></td>
                <td>${siRetornaNull(datos.AETITLE)}</td>
                <td>${siRetornaNull(datos.DOSE)}</td>
                <td>${siRetornaNull(datos.UNIT)}</td>
                <td>${ordenarNombre(datos.NOMPACIENT)}</td>
                <td>${ordenarDataSinDiaStr(datos.NACIMIENTO)}</td>
                <td>${ordenarData(datos.DATA_PROVA)}</td>
                <td>${siRetornaNull(datos.MODALITAT)}</td>
                <td>${siRetornaNull(datos.DESC_PROVA)}</td>
                <td>${siRetornaNull(datos.METGE)}</td>
                <td>${siRetornaNull(datos.METGE_RESPONSABLE)}</td>
                <td>${ordenarData(datos.DATA_REALITZADA)}</td>
                <td>${ordenarData(datos.DATA_INFORME)} </td>
                <td><a href="#" onclick="abrirInforme('${datos.INFORME}');"class="fa-regular fa-file-pdf fa-xl" style="color: #000000; display:
                    ${mostrarInforme(datos.DATA_INFORME)};"></a></td>                 
                <td id='datosEstado';>${datos.ESTAT}</td>       
                                `;
    // Añadir la fila al cuerpo de la tabla
    tablaBody.appendChild(tr);
  });
  mostrarRegistros();
}

/**
 * Función que recoge los datos entregados por la api y los inyecta en el html
 * @param {*} responseData Todos los datos que nos retorna la consulta a la api de GetWorklist de radiofisic
 */
// function mostrarDatosApi(responseData) {
//   //guardamos la id donde se mostraran los datos
//   const tablaBody = document.getElementById("dataBody");

//   //creamos un bucle con los datos recogidos de la api para que inserte los datos
//   responseData[0].rows.forEach((datos) => {
//     //creo una nueva fila
//     const tr = document.createElement("tr");
//     //console.log(datosFiltrados.rows[0]);
//     //crear y añadir celdas a las filas
//     tr.innerHTML = `
//                 <td><strong>${origenPaciente(datos.ORIGEN)}</strong></td>
//                 <td><strong>${datos.NHC}</strong></td>
//                 <td>${siRetornaNull(datos.AETITLE)}</td>
//                 <td>${siRetornaNull(datos.DOSE)}</td>
//                 <td>${siRetornaNull(datos.UNIT)}</td>
//                 <td>${ordenarNombre(datos.NOMPACIENT)}</td>
//                 <td>${ordenarDataSinDiaStr(datos.NACIMIENTO)}</td>
//                 <td>${ordenarData(datos.DATA_PROVA)}</td>
//                 <td>${siRetornaNull(datos.MODALITAT)}</td>
//                 <td>${siRetornaNull(datos.DESC_PROVA)}</td>
//                 <td>${siRetornaNull(datos.METGE)}</td>
//                 <td>${siRetornaNull(datos.METGE_RESPONSABLE)}</td>
//                 <td>${ordenarData(datos.DATA_REALITZADA)}</td>
//                 <td>${ordenarData(datos.DATA_INFORME)} </td>
//                 <td>  <a  href="#" onclick="abrirInforme('${datos.INFORME}');" class="fa-regular fa-file-pdf fa-xl" style="color: #000000; display:
//                  ${mostrarInforme(datos.DATA_INFORME)};"></a></td>
//                 <td id='datosEstado';>${datos.ESTAT}</td>

//                                 `;
//     // Añadir la fila al cuerpo de la tabla
//     tablaBody.appendChild(tr);
//   });
// }

/**
 * Función que filtra la información que se muestra en la pantalla.
 * @param {*} idIconoOjo recibe la id del icono del ojo
 * Por defecto se muestran todos los datos y el ojo esta en verde cuando se cliquea sobre el icono la información que representa se oculta y el ojo
 * se muestra en negro y tachado.
 * Dentro llamamos a la librería y, ponemos el boolean en false, creo un array con los datos que si se muestran.
 * Recorro el array y creo una tabla con los datos a mostrar. Por ultimo cambio el estado del icono
 */
function mostrarDatos(idIconoOjo) {
  var estadoOjo = document.getElementById(idIconoOjo);
  estadoOjo.classList.toggle("fa-eye"); // Icono ojo, mostrar info
  estadoOjo.classList.toggle("fa-eye-slash"); // Icono ojo tachado, ocultar info
  // console.log(diccionarioCondicionesFiltroOjo.set(idIconoOjo));
  diccionarioCondicionesFiltroOjo.set(idIconoOjo, !diccionarioCondicionesFiltroOjo.get(idIconoOjo)); //ponemos el booleano en false
  //Creamos un array con un filtro donde se guardara todo lo que no coincida con el id del icono seleccionado, -> con los datos que si se muestran
  var arrayFiltrado = responseData[0].rows.filter((entradaApi) => {
    switch (
      entradaApi.ESTAT //recogemos el estado -> programado, informado o completado de la variable entradaApi
    ) {
      case "Programada":
        return diccionarioCondicionesFiltroOjo.get("verProgramados");
      case "Informada":
        return diccionarioCondicionesFiltroOjo.get("verInformados");
      case "Completada":
        return diccionarioCondicionesFiltroOjo.get("verCompletados");
    }
  });
  //console.log("Mostrando array filtrado:");
  //console.log(arrayFiltrado);
  var tabla = document.getElementById("dataBody"); //guardo el elemento html body donde se muestran los datos
  tabla.innerHTML = ""; // Vaciamos la tabla

  arrayFiltrado.forEach((datos) => {
    let filasTabla = document.createElement("tr"); // Crear una nueva fila para cada conjunto de datos
    //añado filas al html simientes:
    filasTabla.innerHTML = `
    <td><strong>${origenPaciente(datos.ORIGEN)}</strong></td>
      <td><strong>${datos.NHC}</strong></td>
      <td>${siRetornaNull(datos.AETITLE)}</td>
      <td>${siRetornaNull(datos.DOSE)}</td>
      <td>${siRetornaNull(datos.UNIT)}</td>
      <td>${ordenarNombre(datos.NOMPACIENT)}</td>
      <td>${ordenarData(datos.NACIMIENTO)}</td>
      <td>${ordenarData(datos.DATA_PROVA)}</td>
      <td>${siRetornaNull(datos.MODALITAT)}</td>
      <td>${siRetornaNull(datos.DESC_PROVA)}</td>
      <td>${siRetornaNull(datos.METGE)}</td>
      <td>${siRetornaNull(datos.METGE_RESPONSABLE)}</td>
      <td>${ordenarData(datos.DATA_REALITZADA)}</td>
      <td>${ordenarData(datos.DATA_INFORME)} </td>
      <td>  <a  href="#" onclick="abrirInforme('${datos.INFORME}');" class="fa-regular fa-file-pdf fa-xl" style="color: #000000; display:
       ${mostrarInforme(datos.DATA_INFORME)};"></a></td>                 
      <td id='datosEstado';>${datos.ESTAT}</td>       
                      `;
    tabla.appendChild(filasTabla); //a tabla le metemos dentro las filas
  });
  //modifico el color del icono dependiendo de si en la clase contiene fa-eye o no.
  estadoOjo.style.color = estadoOjo.classList.contains("fa-eye") ? "#629c49" : "#000000";
}

/**
 * Función que abre el calendario cuando se hace click sobre el icono o lo cierra.
 */
function abrirCalendario() {
  if (fecha.style.display === "block") {
    //si hace click sobre el caledario y esta abierto lo cierro
    fecha.style.display = "none"; //mostramos el calendario
    console.log("cerrar calendario");
  } else {
    //si esta abierto y haces click lo cierro
    fecha.style.display = "block";
    console.log("abrir calendario");
  }
}

/**
 * Función que recibe un nombre desordenado y lo ordena
 * @param {*} nombreDesordenado
 * @returns el nombre ordenado en apellidos + nombre sin comillas y en mayúscula y minúsculas
 */
function ordenarNombre(nombreDesordenado) {
  if (nombreDesordenado === null) {
    return "";
  } else {
    nombreDesordenado = nombreDesordenado.trim(); ////quitamos los espacios de inicio y fin por si vienen mal
    var arrayNombre = nombreDesordenado.split(","); //pasamos el str a un array
    var pasoArrayAstr = arrayNombre.join(" "); //pasamos el array a un str pero ahora ya no tiene comas
    var quitarsignosRaros = pasoArrayAstr.replace("^", "");
    quitarsignosRaros = quitarsignosRaros.toLocaleLowerCase(); //pasamos el str a minúsculas
    var arrayNomOrdenado = quitarsignosRaros.split(" "); //pasamos el str a un array

    var resultado = "";

    for (let i = 0; i < arrayNomOrdenado.length; i++) {
      resultado += arrayNomOrdenado[i].charAt(0).toUpperCase(); //paso el primer carácter de cada sección del array y lo paso a mayúsculas
      // console.log('antes de slice()  =  ' + resultado );
      resultado += arrayNomOrdenado[i].slice(1) + " "; //sumamos el resto del nombre a la cadena de str partir del segundo carácter
      //console.log('Resultado final = ' + resultado );
    }
    return resultado.trim(); //quitamos los espacios de inicio y fin
  }
}
/**
 * Fución que recoge la fecha en formato 'YYYY-MM-DDTHH:MM:SS'Y LO PASO A 'DD/MM/YYYY HH:MM'
 * @param {*} dataDesordenada
 * @returns
 */
function ordenarDataSinDiaStr(fecha) {
  //convertir la fecha en dia mes año
  fecha = new Date(fecha); //convierto la fecha de entrada en un objeto tipo fecha
  let año = fecha.getFullYear(); //recojo año
  let mes = formatoFechaMM(fecha); //mes
  let dia = formatoFechaDD(fecha); //dia

  //si mes tiene menos de dos posiciones añado 0 inicial
  if (fecha === null) {
    return "";
  } else {
    return dia + "-" + mes + "-" + año;
  }
}

/**
 * Fución que recoge la fecha en formato 'YYYY-MM-DDTHH:MM:SS'Y LO PASO A Str dia semana +'DD/MM/YYYY HH:MM'
 * @param {*} dataDesordenada
 * @returns
 */
function ordenarData(fecha) {
  //convertir la fecha en dia mes año
  fecha = new Date(fecha); //convierto la fecha de entrada en un objeto tipo fecha
  let año = fecha.getFullYear(); //recojo año
  let mes = formatoFechaMM(fecha); //mes
  let dia = formatoFechaDD(fecha); //dia
  let diaSemanaStr = diaDeSemana(fecha);
  let hora = ordenarHora(fecha); //hora

  //si mes tiene menos de dos posiciones añado 0 inicial
  if (fecha === null) {
    return "";
  } else {
    return diaSemanaStr + " " + dia + "-" + mes + "-" + año + " " + hora;
  }
}
/**
 * Función que recoge una fecha en formato "2023-01-01T10:43:03" y lo paso a formato dd-mm-yyyy
 * @param {} fecha
 * @returns
 */
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
 * Función que modifica la fecha para que te muestre siempre dd
 * @param {*} fecha
 * @returns 0+dia si el dia es del 1 al 9
 */
function formatoFechaDD(fecha) {
  let dia = fecha.getDate(); //dia
  //añadir 0 si el dia es del 0 al 9
  if (dia < 10) {
    return (dia = "0" + dia);
  } else {
    return dia;
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
  } else {
    return mes;
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
/**
 * Función que dependiendo del origen mostrara un icono u otro
 * @param {*} origen puede ser URGENCIES, HOSPITALITZACIO o CONSULTES
 * @returns
 */
function origenPaciente(origen) {
  let color;
  if (origen === "URGENCIES") {
    //Cambio color rojo
    color = "red";
    //creo una etiqueta button y dentro le añado un icono y el estilo de color + la variable del color
    return `<button class="btn"><i class="fa-solid fa-truck-medical"style="color: ${color};"></i></button>`;
  } else if (origen === "HOSPITALITZACIO") {
    //Cambio color orange
    color = "orange";
    return `<button class="btn"><i class="fa-solid fa-bed"style="color: ${color};"></i></button>`;
  } else if (origen === "CONSULTES") {
    //Cambio color verde green
    color = "green";
    return `<button class="btn"><i class="fa-solid fa-stethoscope" style="color: ${color};"></i></button>`;
  } else {
    return "";
  }
}

/**
 * Función que pone el campo en blanco si el dato es null
 * @param {*} datoEntrada
 * @returns
 */
function siRetornaNull(datoEntrada) {
  if (datoEntrada === null) {
    return "";
  } else {
    return datoEntrada;
  }
}

/**
 * Función que verifica informe es null. Si es null oculta el icono de informe si existe al clicar sobre el se abrirá una nueva ventana con el informe
 * @param {*} urlInfo
 * @param {*} idElemento
 * @returns
 */
function abrirInforme(urlInfo) {
  return window.open(urlInfo, "Informe");
}

/**
 *Función que al recibir si DATA_INFORME es null retorna none si contiene datos retorna block. 
 Estos parametros los inyectamos en el html de la llamada de api y nos muestra el icono donde Data_informe no es null
 * @param {*} informe
 * @returns 
 */
function mostrarInforme(informe) {
  //ternario si informe es null retorna none si es false retorna block
  return informe === null ? "none" : "block";
}
