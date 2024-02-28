import { formatearFecha } from "../JS/utilidades.js";

const url = "https://localhost:7224/Radiologia/api/v4/ris/statistics";

export function obtenerDatosGrafica() {
  return fetch(url + "/getmodality", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    mode: "cors",
    body: JSON.stringify({
      center: "CMQR",
    }),
  }).then((respuesta) => respuesta.json());
}

export function obtenerEstudiosAno() {
  return fetch(url + "/getcounters", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    mode: "cors",
    body: JSON.stringify({
      center: "CMQR",
    }),
  }).then((respuesta) => respuesta.json());
}

export function obtenerEstadisticas(dataInici, dataFi) {
  return fetch(url + "/GetDashboard", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    mode: "cors",
    body: JSON.stringify({
      center: "CMQR",
      datainici: formatearFecha(dataInici),
      datafi: formatearFecha(dataFi),
    }),
  }).then((respuesta) => respuesta.json());
}

export function obtenerRadiologos() {
  return fetch(url + "/getProfessionals", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      center: "CMQR",
    }),
  }).then((respuesta) => respuesta.json());
}
