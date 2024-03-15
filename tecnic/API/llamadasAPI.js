import { fechaFormateada } from "../JS/utilidades.js";

const url = "https://localhost:7224/Radiologia/api/v4/ris";

// Función para realizar la solicitud a la API y guardar los datos
export function obtenerDatosGetWorklistAPI(opcionUF, fecha = new Date()) {
  return fetch(url + "/tecnic/getWorklist", {
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
  })
    .then((respuesta) => {
      if (!respuesta.ok) {
        throw new Error("Error al obtener getWorklist");
      }
      return respuesta.json();
    })
    .catch((error) => {
      mostrarError(error.message);
    });
}

// Función para realizar la solicitud a la API y guardar los datos
export function obtenerDatosGetAgendesRAD(opcionUF) {
  return fetch(url + "/tecnic/GetAgendesRAD", {
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
  })
    .then((respuesta) => {
      if (!respuesta.ok) {
        throw new Error("Error al obtener GetAgendesRAD");
      }
      return respuesta.json();
    })
    .catch((error) => {
      mostrarError(error.message);
    });
}

// Función para realizar la solicitud a la API y guardar los datos
export function obtenerObservacionsTecnic(numage) {
  return fetch(url + "/tecnic/GetObstecniques", {
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
  })
    .then((respuesta) => {
      if (!respuesta.ok) {
        throw new Error("Error al obtener GetObstecniques");
      }
      return respuesta.json();
    })
    .catch((error) => {
      mostrarError(error.message);
    });
}

export function obtenerMasCitasPaciente(numage) {
  return fetch(url + "/tecnic/HasMoreDates", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      center: "CMQR",
      numage: numage,
    }),
  })
    .then((respuesta) => {
      if (!respuesta.ok) {
        throw new Error("Error al obtener HasMoreDates");
      }
      return respuesta.json();
    })
    .catch((error) => {
      mostrarError(error.message);
    });
}

export function obtenerRadiologos() {
  return fetch(url + "/tecnic/getProfessionals", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      center: "CMQR",
    }),
  })
    .then((respuesta) => {
      if (!respuesta.ok) {
        throw new Error("Error al obtener getProfessionals");
      }
      return respuesta.json();
    })
    .catch((error) => {
      mostrarError(error.message);
    });
}

export function obtenerRadiologoAsignado(numage) {
  return fetch(url + "/tecnic/getAssignedRad", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      center: "CMQR",
      num: numage,
    }),
  })
    .then((respuesta) => {
      if (!respuesta.ok) {
        throw new Error("Error al obtener getAssignedRad");
      }
      return respuesta.json();
    })
    .catch((error) => {
      mostrarError(error.message);
    });
}

export function obtenerEstudiosAnteriores(nhc) {
  return fetch(url + "/radioleg/GetOldReports", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      center: "CMQR",
      nhc: nhc,
    }),
  })
    .then((respuesta) => {
      if (!respuesta.ok) {
        throw new Error("Error al obtener GetOldReports");
      }
      return respuesta.json();
    })
    .catch((error) => {
      mostrarError(error.message);
    });
}

export function obtenerEstudiosRagiologico(nsol) {
  return fetch(url + "/tecnic/getstudy", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      center: "CMQR",
      num: nsol,
      tipo: "nsol",
    }),
  })
    .then((respuesta) => {
      if (!respuesta.ok) {
        throw new Error("Error al obtener getstudy");
      }
      return respuesta.json();
    })
    .catch((error) => {
      mostrarError(error.message);
    });
}

function mostrarError(mensaje) {
  Swal.fire({
    icon: "error",
    title: "¡Ups!",
    text: mensaje,
  });
}
