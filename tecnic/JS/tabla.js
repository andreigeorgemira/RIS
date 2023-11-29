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

  return headers[opcionUF] || "";
}

function datosC(item, filtroRealitzats, valorSelect) {
  let condicionRealitzats = filtroRealitzats && item.ID_AGENDES_HCS == valorSelect && item.HORA_CONSULTA != "0000";
  let horaArrivada = condicionRealitzats ? formatearHora(item.HORA_ARRIBADA) : "";

  let row = document.createElement("tr");
  row.innerHTML = `
    <td>${formatearHora(item.HORA_VISITA)}</td>
    <td>${fechaFormateada(item.DATA_VISITA)}</td>
    <td><b>${item.NHC}</b></td>
    <td>${item.APELLIDO1} ${item.APELLIDO2}, ${item.NOMBRE}</td>
    <td>${fechaFormateada(item.DATA_NEIXAMENT)}</td>
    <td>${item.TIPUS}</td>
    <td>${horaArrivada}</td>
    <td>${condicionRealitzats ? '<i class="fa-solid fa-check fa-xl" style="color: #49bc50;"></i></i>' : ""}</td>
  `;

  if (item.HORA_CONSULTA == "0000" && item.HORA_ARRIBADA != "0000") {
    row.classList.add("fila-espera");
  } else if (condicionRealitzats) {
    row.classList.add("realitzat");
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

export function crearTablaWorklist(valoresAPI, select, filtroRealitzats, tabla, opcionUF) {
  let valorSelect = select.value;
  tabla.innerHTML = "";

  let thead = document.createElement("thead");
  thead.innerHTML = crearEncabezado(opcionUF);
  tabla.appendChild(thead);

  let tbody = document.createElement("tbody");

  if (opcionUF === "C" && valoresAPI.C.rows) {
    valoresAPI.C.rows.forEach((item) => {
      if ((filtroRealitzats && item.ID_AGENDES_HCS == valorSelect) || (!filtroRealitzats && item.ID_AGENDES_HCS == valorSelect && item.HORA_CONSULTA == "0000")) {
        let row = datosC(item, filtroRealitzats, valorSelect);
        tbody.appendChild(row);
      }
    });
  } else if (opcionUF === "H" && valoresAPI.H.rows) {
    valoresAPI.H.rows.forEach((item) => {
      if (item.TIPPRV == valorSelect) {
        let row = datosH(item, valorSelect);
        tbody.appendChild(row);
      }
    });
  } else if (opcionUF === "U" && valoresAPI.U.rows) {
    valoresAPI.U.rows.forEach((item) => {
      if (item.TIPPRV == valorSelect) {
        let row = datosU(item);
        tbody.appendChild(row);
      }
    });
  }

  tabla.appendChild(tbody);

  let contadorC = (valoresAPI.C.rows || []).filter(function (item) {
    // Condiciones
    let condicionRealitzats = item.ID_AGENDES_HCS == valorSelect && item.HORA_CONSULTA != "0000";
    let condicion1 = filtroRealitzats && item.ID_AGENDES_HCS == valorSelect;
    let condicion2 = !filtroRealitzats && item.ID_AGENDES_HCS == valorSelect && item.HORA_CONSULTA == "0000";

    // Retornar true si no cumple con la primera condición y cumple con al menos una de las otras dos condiciones
    return !condicionRealitzats && (condicion1 || condicion2);
  });

  let longitudContadorC = contadorC.length;

  document.getElementById("totalProgramades").textContent = `(${longitudContadorC})`;

  let contadorH = (valoresAPI.H.rows || []).filter(function (item) {
    let condicion = item.PACIENT != null;
    return condicion;
  });
  let longitudContadorH = contadorH.length;

  document.getElementById("totalHospitalitzacio").textContent = `(${longitudContadorH})`;

  let contadorU = (valoresAPI.U.rows || []).filter(function (item) {
    let condicion = item.FDATASOL != null;
    return condicion;
  });
  let longitudContadorU = contadorU.length;

  document.getElementById("totalUrgencies").textContent = `(${longitudContadorU})`;
}
