import { formatearHora, fechaFormateada } from "./utilidades.js";

function crearEncabezado(opcionUF) {
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

  return headers[opcionUF];
}

function datosC(item, filtroRealitzats, valorSelect) {
  let condicionRealitzats = filtroRealitzats && item.ID_AGENDES_HCS == valorSelect && item.HORA_CONSULTA != "0000";

  let row = document.createElement("tr");
  row.innerHTML = `
    <td>${formatearHora(item.HORA_VISITA)}</td>
    <td>${fechaFormateada(item.DATA_VISITA)}</td>
    <td><b>${item.NHC}</b></td>
    <td>${item.APELLIDO1} ${item.APELLIDO2}, ${item.NOMBRE}</td>
    <td>${fechaFormateada(item.DATA_NEIXAMENT)}</td>
    <td>${item.TIPUS}</td>`;

  if (item.HORA_CONSULTA == "0000" && item.HORA_ARRIBADA != "0000") {
    row.innerHTML += `<td>${formatearHora(item.HORA_ARRIBADA)}</td>`;
    row.innerHTML += '<td><img src="icons/espera.png" width="25px" height="25px"></td>';
    row.classList.add("fila-espera");
  } else {
    if (condicionRealitzats) {
      row.innerHTML += `<td>${formatearHora(item.HORA_ARRIBADA)}</td>`;
      row.innerHTML += '<td><i class="fa-solid fa-check fa-xl" style="color: #49bc50;"></i></i></td>';
      row.classList.add("realitzat");
    } else {
      row.innerHTML += "<td></td>";
      row.innerHTML += "<td></td>";
    }
  }

  return row;
}

function datosH(item) {
  let row = document.createElement("tr");
  row.innerHTML = `
    <td><b>${item.NHC}</b></td>
    <td>${item.DATASOL}</td>
    <td><b>${item.TERMINI}</b></td>
    <td>${item.PACIENT}</td>
    <td>${item.EDAT}</td>
    <td>${item.PROVA}</td>
    <td>${item.UBICACIO}</td>
    <td><b>${traslado(item.TRASLLAT)}<b></td>
  `;

  return row;
}

function datosU(item) {
  let row = document.createElement("tr");
  row.innerHTML = `
    <td><b>${item.NHC}</b></td>
    <td>${item.DATASOL}</td>
    <td>${item.PACIENT}</td>
    <td>${item.EDAT}</td>
    <td>${item.PROVA}</td>
    <td>${item.UBICACIO}</td>
    <td>${traslado(item.TRASLLAT)}</td>
  `;

  return row;
}

function traslado(valorTraslado) {
  if (valorTraslado == "0") {
    return "A Peu";
  } else if (valorTraslado == "1") {
    return "Cadira";
  }
}

let ultimoValorNumericoC = null;
let ultimoValorAlfabeticoH = null;
let ultimoValorAlfabeticoU = null;

export function crearTablaWorklist(valoresAPI, select, filtroRealitzats, tabla, opcionUF) {
  tabla.innerHTML = "";

  let thead = document.createElement("thead");
  thead.innerHTML = crearEncabezado(opcionUF);
  tabla.appendChild(thead);

  let tbody = document.createElement("tbody");

  let contadorC = [];
  let contadorH = [];
  let contadorU = [];

  let valorSelectC;
  let valorSelectH;
  let valorSelectU;

  // Contador para C
  contadorC = (valoresAPI.C.rows || []).filter(function (item) {
    valorSelectC = select.value;

    if (/^\d+$/.test(valorSelectC)) {
      ultimoValorNumericoC = valorSelectC;
    } else {
      valorSelectC = ultimoValorNumericoC;
    }

    // Condiciones para C
    let condicionRealitzats = item.ID_AGENDES_HCS == ultimoValorNumericoC && item.HORA_CONSULTA != "0000";
    let condicion1 = filtroRealitzats && item.ID_AGENDES_HCS == ultimoValorNumericoC;
    let condicion2 = !filtroRealitzats && item.ID_AGENDES_HCS == ultimoValorNumericoC && item.HORA_CONSULTA == "0000";

    return !condicionRealitzats && (condicion1 || condicion2);
  });

  contadorH = (valoresAPI.H.rows || []).filter(function (item) {
    valorSelectH = select.value;

    if (/^[a-zA-Z]+$/.test(valorSelectH)) {
      ultimoValorAlfabeticoH = valorSelectH;
    } else {
      if (ultimoValorAlfabeticoH == undefined) {
        ultimoValorAlfabeticoH = "RXS";
      } else {
        valorSelectH = ultimoValorAlfabeticoH;
      }
    }

    let condicion = item.TIPPRV == ultimoValorAlfabeticoH && item.PACIENT != null;
    return condicion;
  });

  contadorU = (valoresAPI.U.rows || []).filter(function (item) {
    valorSelectU = select.value;

    if (/^[a-zA-Z]+$/.test(valorSelectU)) {
      ultimoValorAlfabeticoU = valorSelectU;
    } else {
      if (ultimoValorAlfabeticoU == undefined) {
        ultimoValorAlfabeticoU = "RXS";
      } else {
        valorSelectU = ultimoValorAlfabeticoU;
      }
    }

    let condicion = item.TIPPRV == ultimoValorAlfabeticoU && item.FDATASOL != null;
    return condicion;
  });

  document.getElementById("totalProgramades").textContent = `(${contadorC.length})`;
  document.getElementById("totalHospitalitzacio").textContent = `(${contadorH.length})`;
  document.getElementById("totalUrgencies").textContent = `(${contadorU.length})`;

  // Resto de la lógica para la tabla C
  if (opcionUF === "C" && valoresAPI.C.rows) {
    valoresAPI.C.rows.forEach((item) => {
      if ((filtroRealitzats && item.ID_AGENDES_HCS == ultimoValorNumericoC) || (!filtroRealitzats && item.ID_AGENDES_HCS == ultimoValorNumericoC && item.HORA_CONSULTA == "0000")) {
        let row = datosC(item, filtroRealitzats, ultimoValorNumericoC);
        tbody.appendChild(row);
      }
    });
  } else if (opcionUF === "H" && valoresAPI.H.rows) {
    valorSelectH = select.value;
    valoresAPI.H.rows.forEach((item) => {
      if (item.TIPPRV == valorSelectH) {
        let row = datosH(item, valorSelectH);
        tbody.appendChild(row);
      }
    });
  } else if (opcionUF === "U" && valoresAPI.U.rows) {
    valorSelectU = select.value;
    valoresAPI.U.rows.forEach((item) => {
      if (item.TIPPRV == valorSelectU) {
        let row = datosU(item);
        tbody.appendChild(row);
      }
    });
  }
  tabla.appendChild(tbody);
}
