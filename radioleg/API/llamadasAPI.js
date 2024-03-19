// Importar la función formatearFecha del módulo utilidades.js
import { formatearFecha } from "../JS/utilidades.js";

// URL base para las solicitudes de datos
const url = "https://localhost:7224/Radiologia/api/v4/ris/statistics";

// Función para obtener los datos para la gráfica de modalidad
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

// Función para obtener el recuento de estudios por año
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

// Función para obtener estadísticas en un rango de fechas
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

// Función para obtener la lista de radiólogos
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

// Función para descargar un archivo Excel de radiología
export function obtenerExcelRadiologia(fromDate, toDate, ventana) {
  // URL para la descarga del archivo Excel
  const url = `https://localhost:7224/Radiologia/api/v4/ris/statistics/GetExcel/CMQR/${fromDate}/${toDate}`;

  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((respuesta) => {
      if (!respuesta.ok) {
        throw new Error("Error al descargar el fichero");
      }
      return respuesta.blob();
    })
    .then((blob) => {
      // Crear un enlace temporal para descargar el archivo
      const url = window.URL.createObjectURL(new Blob([blob]));
      const a = ventana.document.createElement("a");
      a.href = url;
      a.download = `CMQR_report_${fromDate}-${toDate}.xlsx`;
      ventana.document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    })
    .catch((error) => {
      mostrarError(error.message);
    });
}

// Función auxiliar para mostrar un mensaje de error
function mostrarError(mensaje) {
  Swal.fire({
    icon: "error",
    title: "¡Ups!",
    text: mensaje,
  });
}
