import { obtenerDatosGetWorklistAPI, actualizarDatosPeriodicamente, obtenerDatosGetAgendesRAD } from "../API/llamadasAPI.js";
import { crearTablaWorklist, getContadorProgramades } from "./tabla.js";
import { datosSelect } from "./utilidades.js";

// Obtener referencias a elementos HTML
var tabla = document.getElementById("tabla");
var select = document.getElementById("filtro");
var mostrarRealitzat = document.getElementById("mostrarRealitzat");
var contadorProgramades = document.getElementById("totalProgramades");
var contadorHospitalitzacio = document.getElementById("totalHospitalitzacio");
var contadorUrgencies = document.getElementById("totalUrgencies");
var contadorAltres = document.getElementById("totalAltres");
var icono = document.getElementById("icono");
var filtroRealitzats = false;

// Recuperar el nombre de usuario y especialidad que recibo por de la URL
var urlParams = new URLSearchParams(window.location.search);
var user = urlParams.get("user");
var especialidad = urlParams.get("especialidad");
document.getElementById("NombreUser").innerHTML = "User " + user;
document.getElementById("EspecialidadUser").innerHTML = "Especialidad  " + especialidad;

// Variable para almacenar los datos de la API
var worklistDatos;
var agendesDatos;
var opcionUF = "C";

// Objeto para almacenar en caché los datos de la API
var opcionesSelect = {
  C: null,
  H: null,
  U: null,
};

var valoresAPI = {
  C: null,
  H: null,
  U: null,
};

// Función para obtener datos de la API y actualizar el array
function obtenerDatosYActualizarArray() {
  // Realizar las tres llamadas de manera simultánea usando Promise.all
  Promise.all([obtenerDatosGetWorklistAPI("C"), obtenerDatosGetWorklistAPI("H"), obtenerDatosGetWorklistAPI("U")]).then(([datosC, datosH, datosU]) => {
    valoresAPI.C = datosC;
    valoresAPI.H = datosH;
    valoresAPI.U = datosU;

    crearTablaWorklist(valoresAPI, select, filtroRealitzats, tabla, opcionUF);
  });
}

obtenerDatosYActualizarArray();

actualizarContadores();
opcionesSelect[opcionUF] = agendesDatos;

// Llamar a la función para obtener datos al cargar la página
obtenerYProcesarDatosConopcionesSelect();

// Agregar un event listener al contenedor del div
mostrarRealitzat.addEventListener("click", function () {
  filtroRealitzats = !filtroRealitzats;

  icono.classList.toggle("fa-eye");
  icono.classList.toggle("fa-eye-slash");

  // Llamar a la función para actualizar la tabla
  crearTablaWorklist(worklistDatos, select, filtroRealitzats, tabla, opcionUF);
});

// Agregar un event listener para el cambio en el filtro
select.addEventListener("change", function () {
  crearTablaWorklist(worklistDatos, select, filtroRealitzats, tabla, opcionUF);
  actualizarContadores();
});

// Event listener para el botón de refresh
var refreshButton = document.getElementById("refresh");
refreshButton.addEventListener("click", function () {
  // Llamar a la función para obtener datos y actualizar la tabla
  obtenerDatosGetWorklistAPI(opcionUF, worklistDatos, select, filtroRealitzats, tabla);
});

function actualizarContadores() {
  contadorProgramades.innerHTML = `(${getContadorProgramades(0)})`;
  contadorHospitalitzacio.innerHTML = `(${getContadorProgramades(1)})`;
  contadorUrgencies.innerHTML = `(${getContadorProgramades(2)})`;
  contadorAltres.innerHTML = `(${getContadorProgramades(3)})`;
}

// Función para obtener y procesar los datos con gestión de caché
function obtenerYProcesarDatosConopcionesSelect() {
  // Verifica si ya tienes los datos en caché
  if (opcionesSelect[opcionUF]) {
    // Si los datos están en caché, utiliza los datos existentes
    agendesDatos = opcionesSelect[opcionUF];
    datosSelect(agendesDatos, select);
  } else {
    // Si los datos no están en caché, realiza la llamada a la API
    obtenerDatosGetAgendesRAD(opcionUF).then((datos) => {
      // Almacena los datos en caché para futuras referencias
      opcionesSelect[opcionUF] = datos;

      // Procesa y muestra los datos
      agendesDatos = datos;
      datosSelect(agendesDatos, select);
    });
  }
}

// Obtén el contenedor por su clase
var contenedor = document.querySelector(".mi-contenedor");

// Añade un evento de clic al contenedor para manejar clics en los botones
contenedor.addEventListener("click", function (event) {
  // Verifica si el clic ocurrió en un botón o en cualquier elemento dentro del botón
  var boton = event.target.closest("button");
  if (boton && contenedor.contains(boton)) {
    var valor = boton.value;
    opcionUF = obtenerValorUF(valor);

    // Llama a la función para obtener y procesar los datos con el nuevo valor UF
    obtenerYProcesarDatosConopcionesSelect();
    crearTablaWorklist(valoresAPI, select, filtroRealitzats, tabla, opcionUF);
  }
});

function obtenerValorUF(valor) {
  // Asigna el valor de UF según el botón clicado
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
