import { obtenerDatosGetWorklistAPI, actualizarDatosPeriodicamente, obtenerDatosGetAgendesRAD } from "../API/llamadasAPI.js";
import { crearTablaWorklist } from "./tabla.js";
import { datosSelect } from "./utilidades.js";

let tabla = document.getElementById("tabla");
let select = document.getElementById("filtro");
let mostrarRealitzat = document.getElementById("mostrarRealitzat");
let icono = document.getElementById("icono");

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

function obtenerDatosAPI() {
  Promise.all([obtenerDatosGetWorklistAPI("C"), obtenerDatosGetWorklistAPI("H"), obtenerDatosGetWorklistAPI("U")]).then(([datosC, datosH, datosU]) => {
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
refreshButton.addEventListener("click", obtenerDatosAPI);

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

// Llamar a las funciones iniciales
obtenerDatosAPI();
obtenerSelectAPI();
datosFiltradosSelect();
