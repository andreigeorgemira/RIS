import { valoresAPI, stopUpdateGrafica } from "./dashboard.js";
import { crearContenido } from "./stats.js";

export const body = document.getElementById("contenido");

// Recuperar el nombre de usuario y especialidad de la URL
let urlParams = new URLSearchParams(window.location.search);
let user = urlParams.get("user");
if (user != null) {
  tituloWEB.innerHTML += " " + user;
}
let especialidad = urlParams.get("especialidad");
document.getElementById("NombreUser").innerHTML = "User " + user;
document.getElementById("EspecialidadUser").innerHTML = "Especialidad  " + especialidad;

document.addEventListener("DOMContentLoaded", loadContent("estadistiques"));

// Obtener referencias a los enlaces del menú
const dashboardLink = document.getElementById("dashboard");
const pendentsLink = document.getElementById("pendents");
const listaLink = document.getElementById("lista");
const estadistiquesLink = document.getElementById("estadistiques");

dashboardLink.addEventListener("click", function (event) {
  event.preventDefault();
  loadContent("dashboard");
});

pendentsLink.addEventListener("click", function (event) {
  event.preventDefault();
  loadContent("pendents");
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
      vaciarContent(body);
      valoresAPI(body);
      break;
    case "pendents":
      stopUpdateGrafica();
      vaciarContent(body);
      break;
    case "lista":
      stopUpdateGrafica();
      vaciarContent(body);
      break;
    case "estadistiques":
      stopUpdateGrafica();
      vaciarContent(body);
      crearContenido(body);
      break;
  }
}

function vaciarContent(body) {
  body.innerHTML = "";
}
