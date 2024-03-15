import { valoresAPI, stopUpdateGrafica } from "./dashboard.js";
import { crearContenido } from "./stats.js";

const body = document.getElementById("contenido");
// Obtener el div modalSpinner
var modalSpinner = document.getElementById("modalSpinner");

// Recuperar el nombre de usuario y especialidad de la URL
let urlParams = new URLSearchParams(window.location.search);
let user = urlParams.get("user");
if (user != null) {
  tituloWEB.innerHTML += " " + user;
}
let especialidad = urlParams.get("especialidad");
document.getElementById("NombreUser").innerHTML = "User " + user;
document.getElementById("EspecialidadUser").innerHTML = "Especialidad  " + especialidad;

document.addEventListener("DOMContentLoaded", loadContent("dashboard"));

// Obtener referencias a los enlaces del menú
const dashboardLink = document.getElementById("dashboard");
const listaLink = document.getElementById("lista");
const estadistiquesLink = document.getElementById("estadistiques");

dashboardLink.addEventListener("click", function (event) {
  event.preventDefault();
  loadContent("dashboard");
});

listaLink.addEventListener("click", function (event) {
  event.preventDefault();
  loadContent("lista");
});

estadistiquesLink.addEventListener("click", function (event) {
  event.preventDefault();
  loadContent("estadistiques");
});

function loadContent(option) {
  switch (option) {
    case "dashboard":
      vaciarContent();
      valoresAPI(body);
      break;
    case "lista":
      stopUpdateGrafica();
      vaciarContent();
      break;
    case "estadistiques":
      stopUpdateGrafica();
      vaciarContent();
      crearContenido(body);
      break;
  }
}

function vaciarContent() {
  body.innerHTML = "";
  body.appendChild(modalSpinner);
}
