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

// Función para realizar la solicitud a la API y actualizar los datos periódicamente
export function actualizarDatosPeriodicamente(callback, opcionUF) {
  obtenerDatosGetWorklistAPI(opcionUF).then((data) => {
    callback(data);
    setInterval(() => actualizarDatosPeriodicamente(callback), 60000);
  });
}

// Función para realizar la solicitud a la API y guardar los datos
export function obtenerDatosGetAgendesRAD(opcionUF) {
  return fetch("https://localhost:7224/Radiologia/api/v4/ris/tecnic/GetAgendesRAD", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ center: "CMQR", uf: opcionUF }),
  }).then((data) => data.json());
}
