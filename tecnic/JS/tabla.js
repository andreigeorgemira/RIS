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

function datosC(dato, filtroRealitzats, valorSelect) {
  let condicionRealitzats = filtroRealitzats && dato.ID_AGENDES_HCS == valorSelect && dato.HORA_CONSULTA != "0000";

  let row = document.createElement("tr");
  row.id = `${dato.NHC.trim()}`;
  row.innerHTML = `
    <td>${formatearHora(dato.HORA_VISITA)}</td>
    <td>${fechaFormateada(dato.DATA_VISITA)}</td>
    <td><b>${dato.NHC}</b></td>
    <td>${dato.APELLIDO1} ${dato.APELLIDO2}, ${dato.NOMBRE}</td>
    <td>${fechaFormateada(dato.DATA_NEIXAMENT)}</td>
    <td>${dato.TIPUS}</td>`;

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

function datosH(dato) {
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

  return row;
}

function datosU(dato) {
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
  contadorC = (valoresAPI.C || []).filter(function (dato) {
    valorSelectC = select.value;

    if (/^\d+$/.test(valorSelectC)) {
      ultimoValorNumericoC = valorSelectC;
    } else {
      valorSelectC = ultimoValorNumericoC;
    }

    // Condiciones para C
    let condicionRealitzats = dato.ID_AGENDES_HCS == ultimoValorNumericoC && dato.HORA_CONSULTA != "0000";
    let condicion1 = filtroRealitzats && dato.ID_AGENDES_HCS == ultimoValorNumericoC;
    let condicion2 = !filtroRealitzats && dato.ID_AGENDES_HCS == ultimoValorNumericoC && dato.HORA_CONSULTA == "0000";

    return !condicionRealitzats && (condicion1 || condicion2);
  });

  contadorH = (valoresAPI.H || []).filter(function (dato) {
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

    let condicion = dato.TIPPRV == ultimoValorAlfabeticoH && dato.PACIENT != null;
    return condicion;
  });

  contadorU = (valoresAPI.U || []).filter(function (dato) {
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

    let condicion = dato.TIPPRV == ultimoValorAlfabeticoU && dato.FDATASOL != null;
    return condicion;
  });

  document.getElementById("totalProgramades").textContent = `(${contadorC.length})`;
  document.getElementById("totalHospitalitzacio").textContent = `(${contadorH.length})`;
  document.getElementById("totalUrgencies").textContent = `(${contadorU.length})`;

  if (opcionUF === "C" && valoresAPI.C) {
    valoresAPI.C.forEach((dato) => {
      if ((filtroRealitzats && dato.ID_AGENDES_HCS == ultimoValorNumericoC) || (!filtroRealitzats && dato.ID_AGENDES_HCS == ultimoValorNumericoC && dato.HORA_CONSULTA == "0000")) {
        let row = datosC(dato, filtroRealitzats, ultimoValorNumericoC);
        tbody.appendChild(row);
      }
    });
  } else if (opcionUF === "H" && valoresAPI.H) {
    valoresAPI.H.forEach((dato) => {
      if (dato.TIPPRV == ultimoValorAlfabeticoH) {
        let row = datosH(dato, ultimoValorAlfabeticoH);
        tbody.appendChild(row);
      }
    });
  } else if (opcionUF === "U" && valoresAPI.U) {
    valoresAPI.U.forEach((dato) => {
      if (dato.TIPPRV == ultimoValorAlfabeticoU) {
        let row = datosU(dato, ultimoValorAlfabeticoU);
        tbody.appendChild(row);
      }
    });
  }
  tabla.appendChild(tbody);
}
