import { obtenerDatosGetWorklistAPI, actualizarDatosPeriodicamente, obtenerDatosGetAgendesRAD } from "../API/llamadasAPI.js";
import { crearTablaWorklist } from "./tabla.js";
import { datosSelect, fechaFormateada } from "./utilidades.js";

let tabla = document.getElementById("tabla");
let select = document.getElementById("filtro");
let mostrarRealitzat = document.getElementById("mostrarRealitzat");
let icono = document.getElementById("icono");
let textoCalendario = document.getElementById("calendario");

let filtroRealitzats = false;
let agendesDatos;
let opcionUF = "C";

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

// Recuperar el nombre de usuario y especialidad que recibo por de la URL
let urlParams = new URLSearchParams(window.location.search);
let user = urlParams.get("user");
let especialidad = urlParams.get("especialidad");
document.getElementById("NombreUser").innerHTML = "User " + user;
document.getElementById("EspecialidadUser").innerHTML = "Especialidad  " + especialidad;

function obtenerDatosAPI(fechaSeleccionada) {
  const fecha = fechaSeleccionada ? new Date(fechaSeleccionada) : new Date();

  Promise.all([obtenerDatosGetWorklistAPI("C", fecha), obtenerDatosGetWorklistAPI("H", fecha), obtenerDatosGetWorklistAPI("U", fecha)]).then(([datosC, datosH, datosU]) => {
    valoresAPI.C = datosC;
    valoresAPI.H = datosH;
    valoresAPI.U = datosU;
    crearYActualizarTabla();
    opcionesSelect[opcionUF] = agendesDatos;
  });
}

function obtenerSelectAPI() {
  Promise.all([obtenerDatosGetAgendesRAD("C"), obtenerDatosGetAgendesRAD("H"), obtenerDatosGetAgendesRAD("U")]).then(([datosC, datosH, datosU]) => {
    opcionesSelect.C = datosC;
    opcionesSelect.H = datosH;
    opcionesSelect.U = datosU;
  });
}

function crearYActualizarTabla() {
  crearTablaWorklist(valoresAPI, select, filtroRealitzats, tabla, opcionUF);
}

function datosFiltradosSelect() {
  if (opcionesSelect[opcionUF]) {
    datosSelect(opcionesSelect[opcionUF], select);
  } else {
    obtenerDatosGetAgendesRAD(opcionUF).then((datos) => {
      opcionesSelect[opcionUF] = datos;
      agendesDatos = datos;
      datosSelect(agendesDatos, select);
    });
  }
}

mostrarRealitzat.addEventListener("click", function () {
  filtroRealitzats = !filtroRealitzats;
  icono.classList.toggle("fa-eye");
  icono.classList.toggle("fa-eye-slash");
  crearYActualizarTabla();
});

select.addEventListener("change", crearYActualizarTabla);

let refreshButton = document.getElementById("refresh");
refreshButton.addEventListener("click", function () {
  obtenerDatosAPI();
  obtenerSelectAPI();
});

let contenedor = document.querySelector(".mi-contenedor");
contenedor.addEventListener("click", function (event) {
  let boton = event.target.closest("button");
  if (boton && contenedor.contains(boton)) {
    opcionUF = obtenerValorUF(boton.value);
    datosFiltradosSelect();
    crearYActualizarTabla();
  }
});

function obtenerValorUF(valor) {
  switch (valor) {
    case "programades":
      return "C";
    case "hospitalitzacio":
      return "H";
    case "urgencies":
      return "U";
    case "altres":
      return "C";
    default:
      return "C";
  }
}

document.getElementById("btnDiaAnterior").addEventListener("click", diaAnterior);
document.getElementById("btnAbrirModal").addEventListener("click", abrirModal);
document.getElementById("btnDiaSiguiente").addEventListener("click", diaSiguiente);
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("btnCerrarModal").addEventListener("click", cerrarModal);

  for (let i = 0; i <= 11; i++) {
    document.getElementById(`btnCambioMes${i}`).addEventListener("click", () => cambiarMes(i));
  }

  document.getElementById("btnGuardarFecha").addEventListener("click", guardarFecha);
  document.getElementById("overlay").addEventListener("click", cerrarModal);
});

let mesActual;
let anoActual;
let fecha = new Date();

function abrirModal() {
  const fechaActual = new Date();
  mesActual = fechaActual.getMonth();
  anoActual = fechaActual.getFullYear();

  document.getElementById("myModal").style.display = "block";
  document.getElementById("overlay").style.display = "block";
  crearCalendario();
  llenarDropdownAno();
}

function cerrarModal() {
  document.getElementById("myModal").style.display = "none";
  document.getElementById("overlay").style.display = "none";
}

function crearCalendario() {
  const contenedorCalendario = document.getElementById("customCalendar");
  contenedorCalendario.innerHTML = "";

  const diasEnMes = new Date(anoActual, mesActual + 1, 0).getDate();
  const primerDiaSemana = new Date(anoActual, mesActual, 1).getDay();

  const diasSemana = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

  diasSemana.forEach((dia) => {
    const elementoDia = document.createElement("button");
    elementoDia.textContent = dia;
    elementoDia.disabled = true;
    contenedorCalendario.appendChild(elementoDia);
  });

  document.getElementById("mesSeleccionado").textContent = obtenerNombreMes(mesActual);
  document.getElementById("anoSeleccionado").textContent = anoActual.toString().padStart(4, "0");

  for (let i = 0; i < primerDiaSemana - 1; i++) {
    const diaVacio = document.createElement("button");
    diaVacio.textContent = "";
    diaVacio.disabled = true;
    contenedorCalendario.appendChild(diaVacio);
  }

  for (let dia = 1; dia <= diasEnMes; dia++) {
    const elementoDia = document.createElement("button");
    elementoDia.textContent = dia.toString().padStart(2, "0");
    elementoDia.onclick = () => seleccionarFecha(dia);
    contenedorCalendario.appendChild(elementoDia);
  }
}

function seleccionarFecha(dia) {
  const fechaSeleccionada = `${(mesActual + 1).toString().padStart(2, "0")}/${dia.toString().padStart(2, "0")}/${anoActual.toString().padStart(4, "0")}`;
  obtenerDatosAPI(fechaSeleccionada);

  if (fechaFormateada((fecha = new Date())) != fechaFormateada(fechaSeleccionada)) {
    var split = fechaSeleccionada.split("/");
    textoCalendario.textContent = [split[1], split[0], split[2]].join("/");
  } else {
    textoCalendario.textContent = "Avui";
  }
  cerrarModal();
}

function guardarFecha() {
  cerrarModal();
}

function diaAnterior() {}

function diaSiguiente() {}

function obtenerNombreMes(mes) {
  const nombresMeses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  return nombresMeses[mes];
}

function llenarDropdownAno() {
  const contenidoDropdownAno = document.getElementById("yearDropdownContent");
  contenidoDropdownAno.innerHTML = "";

  for (let i = anoActual - 10; i <= anoActual + 10; i++) {
    const botonAno = document.createElement("button");
    botonAno.textContent = i.toString().padStart(4, "0");
    botonAno.onclick = () => cambiarAno(i);
    contenidoDropdownAno.appendChild(botonAno);
  }
}

function cambiarMes(nuevoMes) {
  mesActual = nuevoMes;
  crearCalendario();
  document.getElementById("mesSeleccionado").textContent = obtenerNombreMes(mesActual);
}

function cambiarAno(nuevoAno) {
  anoActual = nuevoAno;
  crearCalendario();
  document.getElementById("anoSeleccionado").textContent = anoActual.toString().padStart(4, "0");
}

// Llamar a las funciones iniciales
obtenerDatosAPI();
obtenerSelectAPI();
datosFiltradosSelect();
