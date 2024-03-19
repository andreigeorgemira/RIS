// Importar funciones de formateo de hora y fecha del módulo "utilidades.js"
import { formatearHora, fechaFormateada } from "./utilidades.js";

// Función para crear el encabezado de la tabla según la opción seleccionada
function crearEncabezado(opcionUF) {
  // Definir encabezados para cada opción UF (C, H, U)
  let headers = {
    C: `
      <tr>
        <th style="width: 8%">HORA</th>
        <th style="width: 12%">DATA</th>
        <th style="width: 10%">NHC</th>
        <th style="width: 30%">NOM</th>
        <th style="width: 10%">DATA NAIX</th>
        <th style="width: 10%">PROVA</th>
        <th style="width: 12%">ARRIBADA</th>
        <th style="width: 6%"></th>
      </tr>
    `,
    H: `
      <tr>
        <th style="width: 8%">NHC</th>
        <th style="width: 12%">DATA/HORA</th>
        <th style="width: 10%">TERMINI</th>
        <th style="width: 30%">NOM</th>
        <th style="width: 10%">DATA NAIX</th>
        <th style="width: 10%">PROVA</th>
        <th style="width: 12%">UBICACIÓ</th>
        <th style="width: 6%">TRASLLAT</th>
      </tr>
    `,
    U: `
      <tr>
        <th style="width: 8%">NHC</th>
        <th style="width: 17%">DATA/HORA</th>
        <th style="width: 35%">NOM</th>
        <th style="width: 10%">DATA NAIX</th>
        <th style="width: 10%">PROVA</th>
        <th style="width: 12%">UBICACIÓ</th>
        <th style="width: 6%">TRASLLAT</th>
      </tr>
    `,
  };

  // Devolver el encabezado correspondiente a la opción seleccionada
  return headers[opcionUF];
}

// Función para generar filas de datos para la opción "C"
function datosC(dato, filtroRealitzats, valorSelect) {
  // Condiciones para determinar si el estudio está realizado y debe resaltarse
  let condicionRealitzats = filtroRealitzats && dato.ID_AGENDES_HCS == valorSelect && dato.HORA_CONSULTA != "0000";

  // Crear y configurar la fila HTML con los datos del estudio "C"
  let row = document.createElement("tr");
  row.id = `${dato.NHC.trim()}`;
  row.innerHTML = `
    <td>${formatearHora(dato.HORA_VISITA)}</td>
    <td>${fechaFormateada(dato.DATA_VISITA)}</td>
    <td><b>${dato.NHC}</b></td>
    <td>${dato.APELLIDO1} ${dato.APELLIDO2}, ${dato.NOMBRE}</td>
    <td>${fechaFormateada(dato.DATA_NEIXAMENT)}</td>
    <td>${dato.TIPUS}</td>`;

  // Añadir elementos adicionales según la condición de realización del estudio
  if (dato.HORA_CONSULTA == "0000" && dato.HORA_ARRIBADA != "0000") {
    row.innerHTML += `<td>${formatearHora(dato.HORA_ARRIBADA)}</td>`;
    row.innerHTML += '<td><img src="icons/espera.png" width="25px" height="25px"></td>';
    row.classList.add("fila-espera");
  } else {
    if (condicionRealitzats) {
      row.innerHTML += `<td>${formatearHora(dato.HORA_ARRIBADA)}</td>`;
      row.innerHTML += '<td><i class="fa-solid fa-check fa-xl" style="color: #49bc50;"></i></i></td>';
      row.classList.add("realitzat");
    } else {
      row.innerHTML += "<td></td>";
      row.innerHTML += "<td></td>";
    }
  }

  return row;
}

// Función para generar filas de datos para la opción "H"
function datosH(dato, filtroRealitzats, valorSelect) {
  // Condiciones para determinar si el estudio está realizado y debe resaltarse
  let condicionRealitzats = filtroRealitzats && dato.ESTAT == "3" && valorSelect == dato.TIPPRV;

  // Crear y configurar la fila HTML con los datos del estudio "H"
  let row = document.createElement("tr");
  row.id = `${dato.NHC.trim()}`;
  row.innerHTML = `
    <td><b>${dato.NHC}</b></td>
    <td>${dato.DATASOL}</td>
    <td><b>${dato.TERMINI}</b></td>
    <td>${dato.PACIENT}</td>
    <td>${dato.EDAT}</td>
    <td>${dato.PROVA}</td>
    <td>${dato.UBICACIO}</td>
    <td><b>${traslado(dato.TRASLLAT)}<b></td>
  `;

  // Añadir clase de resaltado si el estudio está realizado
  if (condicionRealitzats) {
    row.classList.add("realitzat-rojo");
  }

  return row;
}

// Función para generar filas de datos para la opción "U"
function datosU(dato, filtroRealitzats, valorSelect) {
  // Condiciones para determinar si el estudio está realizado y debe resaltarse
  let condicionRealitzats = filtroRealitzats && dato.ESTAT == "3" && valorSelect == dato.TIPPRV;

  // Crear y configurar la fila HTML con los datos del estudio "U"
  let row = document.createElement("tr");
  row.id = `${dato.NHC.trim()}`;
  row.innerHTML = `
    <td><b>${dato.NHC}</b></td>
    <td>${dato.DATASOL}</td>
    <td>${dato.PACIENT}</td>
    <td>${dato.EDAT}</td>
    <td>${dato.PROVA}</td>
    <td>${dato.UBICACIO}</td>
    <td>${traslado(dato.TRASLLAT)}</td>
  `;

  // Añadir clase de resaltado y clase de estilo para la opción "U"
  row.classList.add("rojo");
  if (condicionRealitzats) {
    row.classList.add("realitzat-rojo");
  }

  return row;
}

// Función auxiliar para determinar el tipo de traslado
function traslado(valorTraslado) {
  if (valorTraslado == "0") {
    return "A Peu";
  } else if (valorTraslado == "1") {
    return "Cadira";
  }
}

// Variables para almacenar los últimos valores seleccionados en las opciones "C", "H" y "U"
let ultimoValorNumericoC = null;
let ultimoValorAlfabeticoH = null;
let ultimoValorAlfabeticoU = null;

// Función exportada para crear la tabla de worklist con los datos proporcionados
export function crearTablaWorklist(valoresAPI, select, filtroRealitzats, tabla, opcionUF) {
  // Limpiar el contenido de la tabla
  tabla.innerHTML = "";

  // Crear el encabezado de la tabla según la opción seleccionada
  let thead = document.createElement("thead");
  thead.innerHTML = crearEncabezado(opcionUF);
  tabla.appendChild(thead);

  // Crear el cuerpo de la tabla
  let tbody = document.createElement("tbody");

  // Declarar arreglos para contar el número de estudios por opción
  let contadorC = [];
  let contadorH = [];
  let contadorU = [];

  // Declarar variables para almacenar el valor seleccionado en cada opción
  let valorSelectC;
  let valorSelectH;
  let valorSelectU;

  // Contador para estudios de tipo "C"
  contadorC = (valoresAPI.C || []).filter(function (dato) {
    valorSelectC = select.value;

    // Verificar si el valor seleccionado es numérico y actualizar el último valor seleccionado
    if (/^\d+$/.test(valorSelectC)) {
      ultimoValorNumericoC = valorSelectC;
    } else {
      valorSelectC = ultimoValorNumericoC;
    }

    // Definir condiciones para el filtro de estudios "C"
    let condicionRealitzats = dato.ID_AGENDES_HCS == ultimoValorNumericoC && dato.HORA_CONSULTA != "0000";
    let condicion1 = filtroRealitzats && dato.ID_AGENDES_HCS == ultimoValorNumericoC;
    let condicion2 = !filtroRealitzats && dato.ID_AGENDES_HCS == ultimoValorNumericoC && dato.HORA_CONSULTA == "0000";

    // Devolver verdadero si el estudio cumple las condiciones de filtro
    return !condicionRealitzats && (condicion1 || condicion2);
  });

  // Contador para estudios de tipo "H"
  contadorH = (valoresAPI.H || []).filter(function (dato) {
    valorSelectH = select.value;

    // Verificar si el valor seleccionado es alfabético y actualizar el último valor seleccionado
    if (/^[a-zA-Z]+$/.test(valorSelectH)) {
      ultimoValorAlfabeticoH = valorSelectH;
    } else {
      if (ultimoValorAlfabeticoH == undefined) {
        ultimoValorAlfabeticoH = "RXS";
      } else {
        valorSelectH = ultimoValorAlfabeticoH;
      }
    }

    // Definir condiciones para el filtro de estudios "H"
    let condicionRealitzats = dato.TIPPRV == ultimoValorAlfabeticoH && dato.ESTAT == "3";
    let condicion = dato.TIPPRV == ultimoValorAlfabeticoH && dato.PACIENT != null;
    return condicion && !condicionRealitzats;
  });

  // Contador para estudios de tipo "U"
  contadorU = (valoresAPI.U || []).filter(function (dato) {
    valorSelectU = select.value;

    // Verificar si el valor seleccionado es alfabético y actualizar el último valor seleccionado
    if (/^[a-zA-Z]+$/.test(valorSelectU)) {
      ultimoValorAlfabeticoU = valorSelectU;
    } else {
      if (ultimoValorAlfabeticoU == undefined) {
        ultimoValorAlfabeticoU = "RXS";
      } else {
        valorSelectU = ultimoValorAlfabeticoU;
      }
    }

    // Definir condiciones para el filtro de estudios "U"
    let condicionRealitzats = dato.TIPPRV == ultimoValorAlfabeticoU && dato.ESTAT == "3";
    let condicion = dato.TIPPRV == ultimoValorAlfabeticoU && dato.FDATASOL != null;
    return condicion && !condicionRealitzats;
  });

  // Actualizar el contador de cada tipo de estudio en el DOM
  document.getElementById("totalProgramades").textContent = `(${contadorC.length})`;
  document.getElementById("totalHospitalitzacio").textContent = `(${contadorH.length})`;
  document.getElementById("totalUrgencies").textContent = `(${contadorU.length})`;

  // Generar las filas de datos para cada opción UF y agregarlas al cuerpo de la tabla
  if (opcionUF === "C" && valoresAPI.C) {
    valoresAPI.C.forEach((dato) => {
      if ((filtroRealitzats && dato.ID_AGENDES_HCS == ultimoValorNumericoC) || (!filtroRealitzats && dato.ID_AGENDES_HCS == ultimoValorNumericoC && dato.HORA_CONSULTA == "0000")) {
        let row = datosC(dato, filtroRealitzats, ultimoValorNumericoC);
        tbody.appendChild(row);
      }
    });
  } else if (opcionUF === "H" && valoresAPI.H) {
    valoresAPI.H.forEach((dato) => {
      if ((dato.TIPPRV == ultimoValorAlfabeticoH && filtroRealitzats) || (dato.TIPPRV == ultimoValorAlfabeticoH && !filtroRealitzats && dato.ESTAT != "3")) {
        let row = datosH(dato, filtroRealitzats, ultimoValorAlfabeticoH);
        tbody.appendChild(row);
      }
    });
  } else if (opcionUF === "U" && valoresAPI.U) {
    valoresAPI.U.forEach((dato) => {
      if ((dato.TIPPRV == ultimoValorAlfabeticoU && filtroRealitzats) || (dato.TIPPRV == ultimoValorAlfabeticoU && !filtroRealitzats && dato.ESTAT != "3")) {
        let row = datosU(dato, filtroRealitzats, ultimoValorAlfabeticoU);
        tbody.appendChild(row);
      }
    });
  }
  tabla.appendChild(tbody);
}
