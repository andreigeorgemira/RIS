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
  })
    .then((respuesta) => {
      if (!respuesta.ok) {
        throw new Error("Error al obtener los datos de la gráfica");
      }
      return respuesta.json();
    })
    .catch((error) => {
      mostrarError(error.message);
    });
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
  })
    .then((respuesta) => {
      if (!respuesta.ok) {
        throw new Error("Error al obtener los datos de los estudios");
      }
      return respuesta.json();
    })
    .catch((error) => {
      mostrarError(error.message);
    });
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
  })
    .then((respuesta) => {
      if (!respuesta.ok) {
        throw new Error("Error al obtener los datos de las estadisticas");
      }
      return respuesta.json();
    })
    .catch((error) => {
      mostrarError(error.message);
    });
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
  })
    .then((respuesta) => {
      if (!respuesta.ok) {
        throw new Error("Error al obtener los radiologos");
      }
      return respuesta.json();
    })
    .catch((error) => {
      mostrarError(error.message);
    });
}

export function obtenerExcelRadiologia(fromDate, toDate) {
  const url = `https://localhost:7224/Radiologia/api/v4/ris/statistics/GetExcel/CMQR/${fromDate}/${toDate}`;

  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((respuesta) => {
      if (!respuesta.ok) {
        throw new Error("Error descargar el fichero");
      }
      return respuesta.blob();
    })
    .then((blob) => {
      // Crear un enlace temporal para descargar el archivo
      const url = window.URL.createObjectURL(new Blob([blob]));
      const a = document.createElement("a");
      a.href = url;
      a.download = `CMQR_report_${fromDate}-${toDate}.xlsx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
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
