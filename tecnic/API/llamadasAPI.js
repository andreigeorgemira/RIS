import { fechaFormateada } from "../JS/utilidades.js";

// Función para realizar la solicitud a la API y guardar los datos
export function obtenerDatosGetWorklistAPI(opcionUF, fecha = new Date()) {
  return fetch("https://localhost:7224/Radiologia/api/v4/ris/tecnic/getWorklist", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    mode: "cors",
    body: JSON.stringify({ center: "CMQR", uf: opcionUF, date: fechaFormateada(fecha) }),
  }).then((data) => data.json());
}

// Función para realizar la solicitud a la API y guardar los datos
export function obtenerDatosGetAgendesRAD(opcionUF) {
  return fetch("https://localhost:7224/Radiologia/api/v4/ris/tecnic/GetAgendesRAD", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    mode: "cors",
    body: JSON.stringify({ center: "CMQR", uf: opcionUF }),
  }).then((data) => data.json());
}

/* // Función para realizar la solicitud a la API y guardar los datos
export async function obtenerObservacionsTecnic(numage) {
  return fetch("https://localhost:7224/Radiologia/api/v4/ris/tecnic/GetObstecniques", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json-patch+json",
    },
    mode: "cors",
    body: JSON.stringify({ center: "CMQR", num: numage }),
  })
    .then((data) => data.json())
    .catch((error) => {
      console.error("Error al realizar la petición:", error);
    });
} */

export function obtenerMasCitasPaciente(numage) {
  return fetch("https://localhost:7224/Radiologia/api/v4/ris/tecnic/HasMoreDates", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      center: "CMQR",
      numage: numage,
    }),
  }).then((response) => response.json());
}

export function obtenerDoctores() {
  return fetch("https://localhost:7224/Radiologia/api/v4/ris/tecnic/getProfessionals", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      center: "CMQR",
    }),
  }).then((response) => response.json());
}
