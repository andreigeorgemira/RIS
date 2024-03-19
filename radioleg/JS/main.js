// Importar las funciones necesarias desde los archivos correspondientes
import { valoresAPI, stopUpdateGrafica } from "./dashboard.js";
import { crearContenido } from "./stats.js";

// Obtener referencia al cuerpo del documento HTML
const body = document.getElementById("contenido");

// Obtener referencia al elemento modalSpinner
var modalSpinner = document.getElementById("modalSpinner");

// Recuperar el nombre de usuario y especialidad de la URL, si están presentes
let urlParams = new URLSearchParams(window.location.search);
let user = urlParams.get("user");
let especialidad = urlParams.get("especialidad");

// Si no se proporciona un usuario y una especialidad, establecerlos como cadenas vacías
if (user == null) {
  user = "";
  especialidad = "";
} else {
  // Mostrar el nombre de usuario y especialidad en la página
  document.getElementById("NombreUser").innerHTML = "User " + user;
  document.getElementById("EspecialidadUser").innerHTML = "Especialidad  " + especialidad;
}

// Escuchar el evento de carga del contenido al cargar el DOM
document.addEventListener("DOMContentLoaded", loadContent("dashboard"));

// Obtener referencias a los enlaces del menú
const dashboardLink = document.getElementById("dashboard");
const listaLink = document.getElementById("lista");
const estadistiquesLink = document.getElementById("estadistiques");

// Escuchar clics en los enlaces del menú y cargar el contenido correspondiente
dashboardLink.addEventListener("click", function (event) {
  event.preventDefault(); // Evitar el comportamiento predeterminado del enlace
  loadContent("dashboard");
});

listaLink.addEventListener("click", function (event) {
  event.preventDefault(); // Evitar el comportamiento predeterminado del enlace
  loadContent("lista");
});

estadistiquesLink.addEventListener("click", function (event) {
  event.preventDefault(); // Evitar el comportamiento predeterminado del enlace
  loadContent("estadistiques");
});

// Función para cargar el contenido según la opción seleccionada en el menú
function loadContent(option) {
  switch (option) {
    case "dashboard":
      // Limpiar el contenido actual y cargar el panel de dashboard
      vaciarContent();
      valoresAPI(body);
      break;
    case "lista":
      // Detener la actualización de la gráfica y limpiar el contenido
      stopUpdateGrafica();
      vaciarContent();
      break;
    case "estadistiques":
      // Detener la actualización de la gráfica, limpiar el contenido y cargar las estadísticas
      stopUpdateGrafica();
      vaciarContent();
      crearContenido(body);
      break;
  }
}

// Función para vaciar el contenido del cuerpo del documento y mostrar el spinner
function vaciarContent() {
  body.innerHTML = ""; // Limpiar el contenido del cuerpo del documento
  body.appendChild(modalSpinner); // Mostrar el spinner
}
