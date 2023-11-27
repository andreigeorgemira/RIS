import { formatearHora, fechaFormateada } from "./utilidades.js";

var contador = [0, 0, 0, 0];

export function getContadorProgramades(index) {
  return contador[index];
}

export function crearTablaWorklist(valoresAPI, select, filtroRealitzats, tabla, opcionUF) {
  // Obtener el valor actualmente seleccionado en el filtro
  var valorSelect = select.value;

  for (var index = 0; index < contador.length; index++) {
    contador[index] = 0;
  }

  // Limpiar el contenido actual de la tabla
  tabla.innerHTML = "";

  if (opcionUF == "C") {
    // Insertar thead con sus contenidos
    var thead = document.createElement("thead");
    thead.innerHTML = `
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
  `;
    tabla.appendChild(thead);

    // Insertar tbody
    var tbody = document.createElement("tbody");

    // Verificar si hay datos de la API
    if (valoresAPI.C.rows) {
      // Verificar si se cumple una condición específica
      var condicionRealitzats = filtroRealitzats && item.ID_AGENDES_HCS == valorSelect && item.HORA_CONSULTA != "0000";
      // Iterar sobre las filas de datos recibidos
      valoresAPI.C.rows.forEach((item) => {
        // Verificar condiciones para mostrar o no una fila en la tabla
        if ((filtroRealitzats && item.ID_AGENDES_HCS == valorSelect) || (!filtroRealitzats && item.ID_AGENDES_HCS == valorSelect && item.HORA_CONSULTA == "0000")) {
          // Crear una nueva fila HTML
          var row = document.createElement("tr");

          // Llenar la fila con datos específicos
          row.innerHTML = `
          <td>${formatearHora(item.HORA_VISITA)}</td>
          <td>${fechaFormateada(item.DATA_VISITA)}</td>
          <td><b>${item.NHC}</b></td>
          <td>${item.APELLIDO1} ${item.APELLIDO2}, ${item.NOMBRE}</td>
          <td>${fechaFormateada(item.DATA_NEIXAMENT)}</td>
          <td>${item.TIPUS}</td>`;

          // Verificar condiciones adicionales y agregar contenido a la fila
          if (item.HORA_CONSULTA == "0000" && item.HORA_ARRIBADA != "0000") {
            row.innerHTML += `<td>${formatearHora(item.HORA_ARRIBADA)}</td>`;
            row.innerHTML += '<td><img src="icons/espera.png" width="25px" height="25px"></td>';

            // Agregar una clase específica a la fila
            row.classList.add("fila-espera");
          } else {
            // Verificar la condición adicional para determinar el contenido de la fila
            if (condicionRealitzats) {
              row.innerHTML += `<td>${formatearHora(item.HORA_ARRIBADA)}</td>`;
              row.innerHTML += '<td><i class="fa-solid fa-check fa-xl" style="color: #49bc50;"></i></i></td>';

              // Agregar una clase específica a la fila
              row.classList.add("realitzat");
            } else {
              row.innerHTML += "<td></td>";
              row.innerHTML += "<td></td>";
            }
          }
          // Agregar la fila a la tabla
          tbody.appendChild(row);
        }
      });
    }

    tabla.appendChild(tbody);
  } else if (opcionUF == "H") {
    // Insertar thead con sus contenidos
    var thead = document.createElement("thead");
    thead.innerHTML = `
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
  `;
    tabla.appendChild(thead);

    // Insertar tbody
    var tbody = document.createElement("tbody");

    // Verificar si hay datos de la API
    if (valoresAPI.H.rows) {
      // Iterar sobre las filas de datos recibidos
      valoresAPI.H.rows.forEach((item) => {
        // Crear una nueva fila HTML
        var row = document.createElement("tr");

        if (item.TIPPRV == valorSelect) {
          // Llenar la fila con datos específicos
          row.innerHTML = `
          <td><b>${item.NHC}</b></td>
          <td>${item.DATASOL}</td>
          <td><b>${item.TERMINI}</b></td>
          <td>${item.PACIENT}</td>
          <td>${item.EDAT}</td>
          <td>${item.PROVA}</td>
          <td>${item.UBICACIO}</td>
          <td><b>${traslado(item.TRASLLAT)}<b></td>`;

          contador[1]++;

          tbody.appendChild(row);
        }
      });
    }
    function traslado(valorTraslado) {
      if (valorTraslado == "0") {
        return "A Peu";
      } else if (valorTraslado == "1") {
        return "Cadira";
      }
    }
    tabla.appendChild(tbody);
  } else if (opcionUF == "U") {
    // Insertar thead con sus contenidos
    var thead = document.createElement("thead");
    thead.innerHTML = `
    <tr>
      <th style="width: 8%">NHC</th>
      <th style="width: 17%">DATA/HORA</th>
      <th style="width: 35%">NOM</th>
      <th style="width: 10%">DATA NAIX</th>
      <th style="width: 10%">PROVA</th>
      <th style="width: 12%">UBICACIÓ</th>
      <th style="width: 6%">TRASLLAT</th>
    </tr>
  `;
    tabla.appendChild(thead);

    // Insertar tbody
    var tbody = document.createElement("tbody");

    // Verificar si hay datos de la API
    if (valoresAPI.U.rows) {
      // Iterar sobre las filas de datos recibidos
      valoresAPI.U.rows.forEach((item) => {
        // Crear una nueva fila HTML
        var row = document.createElement("tr");

        if (item.TIPPRV == valorSelect) {
          // Llenar la fila con datos específicos
          row.innerHTML = `
          <td><b>${item.NHC}</b></td>
          <td>${item.DATASOL}</td>
          <td>${item.PACIENT}</td>
          <td>${item.EDAT}</td>
          <td>${item.PROVA}</td>
          <td>${item.UBICACIO}</td>
          <td>${traslado(item.TRASLLAT)}</td>`;

          contador[2]++;
        }

        function traslado(valorTraslado) {
          if (valorTraslado == "0") {
            return "A Peu";
          } else if (valorTraslado == "1") {
            return "Cadira";
          }
        }

        tbody.appendChild(row);
      });
    }

    tabla.appendChild(tbody);
  }
}
