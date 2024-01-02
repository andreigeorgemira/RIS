// Importación de funciones específicas desde módulos externos
import { obtenerDatosGetWorklistAPI, obtenerDatosGetAgendesRAD } from "../API/llamadasAPI.js";
import { crearTablaWorklist } from "./tabla.js";
import { datosSelect, fechaFormateada, mostrarOverlay, insertarCalendario } from "./utilidades.js";

// Selección de elementos del DOM
let tabla = document.getElementById("tabla");
let select = document.getElementById("filtro");
let mostrarRealitzat = document.getElementById("mostrarRealitzat");
let icono = document.getElementById("icono");
let textoCalendario = document.getElementById("calendario");

// Evento que se ejecuta cuando el DOM ha cargado
document.addEventListener("DOMContentLoaded", function () {
  // Seleccionar el elemento con la clase 'overlayDatos'
  var overlayDatos = document.querySelector(".overlayDatos");
});

// Variables globales
let filtroRealitzats = false;
let opcionUF = "C";
let fechaSeleccionadaGlobal = new Date();

// Objeto para almacenar opciones seleccionadas y valores de la API
let opcionesSelect = {
  C: null,
  H: null,
  U: null,
};

let valoresAPI = {
  C: null,
  H: null,
  U: null,
};

// Recuperar el nombre de usuario y especialidad de la URL
let urlParams = new URLSearchParams(window.location.search);
let user = urlParams.get("user");
let especialidad = urlParams.get("especialidad");
document.getElementById("NombreUser").innerHTML = "User " + user;
document.getElementById("EspecialidadUser").innerHTML = "Especialidad  " + especialidad;

// Referencia al elemento de carga
let spinner = document.getElementById("modalSpinner");

// Función para obtener datos de la API y actualizar la tabla
function obtenerDatosAPI(fechaSeleccionada, mostrarSpinner = true) {
  if (mostrarSpinner) {
    spinner.style.display = "flex";
  }

  let fecha = fechaSeleccionada ? new Date(fechaSeleccionada) : new Date();

  // Promesa para obtener datos de diferentes worklists
  Promise.all([obtenerDatosGetWorklistAPI("C", fecha), obtenerDatosGetWorklistAPI("H", fecha), obtenerDatosGetWorklistAPI("U", fecha)]).then(([datosC, datosH, datosU]) => {
    valoresAPI.C = datosC;
    valoresAPI.H = datosH;
    valoresAPI.U = datosU;
    crearYActualizarTabla();

    if (mostrarSpinner) {
      spinner.style.display = "none";
    }
  });
}

// Función para obtener datos periódicamente
function obtenerDatosPeriodicos() {
  setTimeout(function () {
    obtenerDatosAPI(fechaSeleccionadaGlobal, false);
    obtenerDatosPeriodicos();
  }, 5000);
}

// Función para crear y actualizar la tabla
function crearYActualizarTabla() {
  crearTablaWorklist(valoresAPI, select, filtroRealitzats, tabla, opcionUF);
  eventoClic();
}

// Función simplificada para manejar la selección de datos en el selector
function datosFiltradosSelect() {
  if (opcionesSelect[opcionUF]) {
    datosSelect(opcionesSelect[opcionUF], select);
  } else {
    obtenerDatosGetAgendesRAD(opcionUF).then((datos) => {
      opcionesSelect[opcionUF] = datos;
      datosSelect(opcionesSelect[opcionUF], select);
    });
  }
}

// Evento de clic en el botón de mostrar realizados
mostrarRealitzat.addEventListener("click", function () {
  filtroRealitzats = !filtroRealitzats;
  icono.classList.toggle("fa-eye");
  icono.classList.toggle("fa-eye-slash");
  crearYActualizarTabla();
});

// Evento de cambio en el selector
select.addEventListener("change", crearYActualizarTabla);

// Evento de clic en el botón de refrescar
let refreshButton = document.getElementById("refresh");
refreshButton.addEventListener("click", function () {
  vaciarTabla();
  obtenerDatosAPI();
});

// Función para vaciar la tabla
function vaciarTabla() {
  tabla.innerHTML = "";
}

// Función para manejar eventos de clic en las filas de la tabla
function eventoClic() {
  let filasTabla = document.querySelectorAll("#tabla tbody tr");

  filasTabla.forEach((fila) => {
    fila.addEventListener("click", function () {
      let nhc_a_buscar = fila.getAttribute("id");
      mostrarOverlay(overlayDatos, valoresAPI, nhc_a_buscar);
    });
  });
}

// Evento de clic en botones dentro de un contenedor
let contenedor = document.querySelector(".mi-contenedor");
contenedor.addEventListener("click", function (event) {
  let boton = event.target.closest("button");
  if (boton && contenedor.contains(boton)) {
    opcionUF = obtenerValorUF(boton.value);
    datosFiltradosSelect();
    crearYActualizarTabla();

    // Añadir y quitar la clase 'active' según el botón seleccionado
    contenedor.querySelectorAll("button").forEach((btn) => {
      btn.classList.remove("botonSeleccionado");
    });
    boton.classList.add("botonSeleccionado");
  }
});

// Función para obtener el valor de UF (Unidad Funcional) según el botón seleccionado
function obtenerValorUF(valor) {
  switch (valor) {
    case "programades":
    case "altres":
      return "C";
    case "hospitalitzacio":
      return "H";
    case "urgencies":
      return "U";
    default:
      return "C";
  }
}

// Inicialización del calendario
var modal = document.getElementById("modalCalendario");
insertarCalendario(modal);

// Eventos para navegación y selección en el calendario
document.getElementById("btnDiaAnterior").addEventListener("click", diaAnterior);
document.getElementById("btnAbrirModal").addEventListener("click", abrirModal);
document.getElementById("btnDiaSiguiente").addEventListener("click", diaSiguiente);
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("btnCerrarModal").addEventListener("click", cerrarModal);

  for (let i = 0; i <= 11; i++) {
    document.getElementById(`btnCambioMes${i}`).addEventListener("click", () => cambiarMes(i));
  }

  document.getElementById("btnAvui").addEventListener("click", fechaHoy);
  document.getElementById("overlay").addEventListener("click", cerrarModal);
});

// Variables para la fecha actual y el mes/ano actual
let fecha = new Date();
let mesActual = fecha.getMonth();
let anoActual = fecha.getFullYear();

// Función para abrir el modal del calendario
function abrirModal() {
  document.getElementById("modalCalendario").style.display = "block";
  document.getElementById("overlay").style.display = "block";
  crearCalendario();
  llenarDropdownAno();
}

// Función para cerrar el modal del calendario
function cerrarModal() {
  document.getElementById("modalCalendario").style.display = "none";
  document.getElementById("overlay").style.display = "none";
}

// Función para crear el contenido del calendario
function crearCalendario() {
  let contenedorCalendario = document.getElementById("customCalendar");
  contenedorCalendario.innerHTML = "";

  let diasEnMes = new Date(anoActual, mesActual + 1, 0).getDate();
  let primerDiaSemana = new Date(anoActual, mesActual, 1).getDay();

  let diasSemana = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

  // Crear botones para los días de la semana
  diasSemana.forEach((dia) => {
    let elementoDia = document.createElement("button");
    elementoDia.textContent = dia;
    elementoDia.disabled = true;
    contenedorCalendario.appendChild(elementoDia);
  });

  // Mostrar mes y año seleccionados
  document.getElementById("mesSeleccionado").textContent = obtenerNombreMes(mesActual);
  document.getElementById("anoSeleccionado").textContent = anoActual.toString().padStart(4, "0");

  // Crear botones para días vacíos antes del primer día del mes
  for (let i = 0; i < primerDiaSemana - 1; i++) {
    let diaVacio = document.createElement("button");
    diaVacio.textContent = "";
    diaVacio.disabled = true;
    contenedorCalendario.appendChild(diaVacio);
  }

  // Crear botones para los días del mes
  for (let dia = 1; dia <= diasEnMes; dia++) {
    let elementoDia = document.createElement("button");
    elementoDia.textContent = dia.toString().padStart(2, "0");

    // Agregar la clase 'selected' al botón del día actual
    if (dia === fecha.getDate() && mesActual === fecha.getMonth() && anoActual === fecha.getFullYear()) {
      elementoDia.classList.add("selected");
    }

    // Agregar evento de clic para seleccionar la fecha
    elementoDia.onclick = () => seleccionarFecha(dia);
    contenedorCalendario.appendChild(elementoDia);
  }
}

// Función para seleccionar una fecha en el calendario
function seleccionarFecha(dia) {
  // Quitar la clase 'selected' del botón previamente seleccionado
  let botonAnterior = document.querySelector(`#customCalendar button.selected`);
  if (botonAnterior) {
    botonAnterior.classList.remove("selected");
  }

  // Agregar la clase 'selected' al botón del día actual
  let botonSeleccionado = document.querySelector(`#customCalendar button:nth-child(${dia + 7})`);
  if (botonSeleccionado) {
    botonSeleccionado.classList.add("selected");
  }

  // Crear objeto Date con la fecha seleccionada
  let fecha = new Date(anoActual, mesActual, dia);
  const diaStr = fecha.getDate().toString().padStart(2, "0");
  const mesStr = (fecha.getMonth() + 1).toString().padStart(2, "0");
  const anoStr = fecha.getFullYear().toString();

  // Formatear la fecha como MM/DD/YYYY
  const fechaFormateadaStr = `${mesStr}/${diaStr}/${anoStr}`;

  // Actualizar la fecha global seleccionada
  fechaSeleccionadaGlobal = fecha;

  // Vaciar la tabla y obtener datos para la fecha seleccionada
  vaciarTabla();
  obtenerDatosAPI(fechaFormateadaStr);

  // Actualizar el texto de la fecha en el calendario
  if (fechaFormateada(fecha) !== fechaFormateada(new Date())) {
    textoCalendario.textContent = fechaFormateada(fechaFormateadaStr);
  } else {
    textoCalendario.textContent = "Avui";
  }

  // Cerrar el modal del calendario
  cerrarModal();
}

// Función para seleccionar la fecha actual
function fechaHoy() {
  let hoy = new Date();
  seleccionarFecha(hoy.getDate());
}

// Función para navegar al día anterior
function diaAnterior() {
  fechaSeleccionadaGlobal.setDate(fechaSeleccionadaGlobal.getDate() - 1);
  seleccionarFecha(fechaSeleccionadaGlobal.getDate());
}

// Función para navegar al día siguiente
function diaSiguiente() {
  fechaSeleccionadaGlobal.setDate(fechaSeleccionadaGlobal.getDate() + 1);
  seleccionarFecha(fechaSeleccionadaGlobal.getDate());
}

// Función para obtener el nombre de un mes
function obtenerNombreMes(mes) {
  let nombresMeses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  return nombresMeses[mes];
}

// Función para llenar el dropdown de años en el modal del calendario
function llenarDropdownAno() {
  let contenidoDropdownAno = document.getElementById("yearDropdownContent");
  contenidoDropdownAno.innerHTML = "";

  for (let i = anoActual - 30; i <= anoActual + 10; i++) {
    let botonAno = document.createElement("button");
    botonAno.textContent = i.toString().padStart(4, "0");
    botonAno.onclick = () => cambiarAno(i);
    contenidoDropdownAno.appendChild(botonAno);
  }
}

// Función para cambiar el mes en el calendario
function cambiarMes(nuevoMes) {
  if (mesActual !== nuevoMes) {
    mesActual = nuevoMes;
    crearCalendario();
    document.getElementById("mesSeleccionado").textContent = obtenerNombreMes(mesActual);
  }
}

// Función para cambiar el año en el calendario
function cambiarAno(nuevoAno) {
  anoActual = nuevoAno;
  crearCalendario();
  document.getElementById("anoSeleccionado").textContent = anoActual.toString().padStart(4, "0");
}

// Llamadas a funciones iniciales
obtenerDatosPeriodicos();
obtenerDatosAPI();
datosFiltradosSelect();
