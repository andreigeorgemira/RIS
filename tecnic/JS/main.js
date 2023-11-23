import { obtenerDatosGetWorklistAPI, actualizarDatosPeriodicamente, obtenerDatosGetAgendesRAD } from "../API/llamadasAPI.js";
import { crearTablaWorklist, getContadorProgramades } from "./tabla.js";
import { datosSelect } from "./utilidades.js";

// Obtener referencias a elementos HTML
var tabla = document.getElementById("tabla");
var select = document.getElementById("filtro");
var mostrarRealitzat = document.getElementById("mostrarRealitzat");
var contadorProgramades = document.getElementById("totalProgramades");
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
var cache = {
  C: null,
  H: null,
  U: null,
};

// Llamar a la función para obtener datos al cargar la página
obtenerDatosGetWorklistAPI(opcionUF).then((datos) => {
  worklistDatos = datos;
  crearTablaWorklist(worklistDatos, select, filtroRealitzats, tabla, opcionUF);
  actualizarContadorProgramades();
  cache[opcionUF] = agendesDatos;
});

// Iniciar la actualización periódica de datos
actualizarDatosPeriodicamente((datos) => {
  worklistDatos = datos;
  crearTablaWorklist(worklistDatos, select, filtroRealitzats, tabla, opcionUF);
  actualizarContadorProgramades();
}, opcionUF);

// Llamar a la función para obtener datos al cargar la página
obtenerYProcesarDatosConCache();

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
  actualizarContadorProgramades();
});

// Event listener para el botón de refresh
var refreshButton = document.getElementById("refresh");
refreshButton.addEventListener("click", function () {
  // Llamar a la función para obtener datos y actualizar la tabla
  obtenerDatosGetWorklistAPI(opcionUF, worklistDatos, select, filtroRealitzats, tabla);
});

function actualizarContadorProgramades() {
  contadorProgramades.innerHTML = `(${getContadorProgramades()})`;
}

// Función para obtener y procesar los datos con gestión de caché
function obtenerYProcesarDatosConCache() {
  // Verifica si ya tienes los datos en caché
  if (cache[opcionUF]) {
    // Si los datos están en caché, utiliza los datos existentes
    agendesDatos = cache[opcionUF];
    datosSelect(agendesDatos, select);
  } else {
    // Si los datos no están en caché, realiza la llamada a la API
    obtenerDatosGetAgendesRAD(opcionUF).then((datos) => {
      // Almacena los datos en caché para futuras referencias
      cache[opcionUF] = datos;

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
  // Verifica si el clic ocurrió en un botón dentro del contenedor
  if (event.target.tagName === "BUTTON") {
    var value = event.target.value;
    opcionUF = obtenerValorUF(value);

    // Llama a la función para obtener y procesar los datos con el nuevo valor UF
    obtenerYProcesarDatosConCache();
    obtenerDatosGetWorklistAPI(opcionUF).then((datos) => {
      worklistDatos = datos;
      crearTablaWorklist(worklistDatos, select, filtroRealitzats, tabla, opcionUF);
    });
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
