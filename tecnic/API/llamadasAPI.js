import { fechaFormateada } from "../JS/utilidades.js";

let url = "https://localhost:7224/Radiologia/api/v4/";

// Función para realizar la solicitud a la API y guardar los datos
export function obtenerDatosGetWorklistAPI(opcionUF, fecha = new Date()) {
  return fetch(url + "ris/tecnic/getWorklist", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    mode: "cors",
    body: JSON.stringify({
      center: "CMQR",
      uf: opcionUF,
      date: fechaFormateada(fecha),
    }),
  }).then((respuesta) => respuesta.json());
}

// Función para realizar la solicitud a la API y guardar los datos
export function obtenerDatosGetAgendesRAD(opcionUF) {
  return fetch(url + "ris/tecnic/GetAgendesRAD", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    mode: "cors",
    body: JSON.stringify({
      center: "CMQR",
      uf: opcionUF,
    }),
  }).then((respuesta) => respuesta.json());
}

// Función para realizar la solicitud a la API y guardar los datos
export function obtenerObservacionsTecnic(numage) {
  return fetch(url + "ris/tecnic/GetObstecniques", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json-patch+json",
    },
    mode: "cors",
    body: JSON.stringify({
      center: "CMQR",
      num: numage,
    }),
  }).then((respuesta) => respuesta.json());
}

export function obtenerMasCitasPaciente(numage) {
  return fetch(url + "ris/tecnic/HasMoreDates", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      center: "CMQR",
      numage: numage,
    }),
  }).then((respuesta) => respuesta.json());
}

export function obtenerRadiologos() {
  return fetch(url + "ris/tecnic/getProfessionals", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      center: "CMQR",
    }),
  }).then((respuesta) => respuesta.json());
}

export function obtenerRadiologoAsignado(numage) {
  return fetch(url + "ris/tecnic/getAssignedRad", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      center: "CMQR",
      num: numage,
    }),
  }).then((respuesta) => respuesta.json());
}

export function obtenerEstudiosAnteriores(nhc) {
  return fetch(url + "ris/radioleg/GetOldReports", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      center: "CMQR",
      nhc: nhc,
    }),
  }).then((respuesta) => respuesta.json());
}
