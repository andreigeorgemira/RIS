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

export async function obtenerObservacionsTecnic(parametro) {
  try {
    const response = await fetch("https://localhost:7224/Radiologia/api/v4/ris/tecnic/GetObstecniques", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json-patch+json",
      },
      mode: "cors",
      body: JSON.stringify({ center: "CMQR", num: parametro }),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}
