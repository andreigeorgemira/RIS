import { formatearHora, fechaFormateada } from "./utilidades.js";

var contador;

export function getContadorProgramades() {
  return contador;
}

export function crearTablaWorklist(apiData, select, mostrarRealitzat, tabla, opcionUF) {
  // Obtener el valor actualmente seleccionado en el filtro
  var valorSelect = select.value;

  contador = 0;

  // Verificar si el toggle para "realitzats" está activado
  var filtroRealitzats = mostrarRealitzat;

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
    if (apiData) {
      // Iterar sobre las filas de datos recibidas
      apiData.rows.forEach((item) => {
        // Verificar si se cumple una condición específica
        var condicionRealitzats = filtroRealitzats && item.ID_AGENDES_HCS == valorSelect && item.HORA_CONSULTA != "0000";

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
            contador++;

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
              contador++;
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
    if (apiData) {
      // Iterar sobre las filas de datos recibidas
      apiData.rows.forEach((item) => {
        // Verificar si se cumple una condición específica
        var condicionRealitzats = filtroRealitzats && item.ID_AGENDES_HCS == valorSelect && item.HORA_CONSULTA != "0000";

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
            contador++;

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
              contador++;
            }
          }
          // Agregar la fila a la tabla
          tbody.appendChild(row);
        }
      });
    }

    tabla.appendChild(tbody);
  } else if (opcionUF == "U") {
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
    if (apiData) {
      // Iterar sobre las filas de datos recibidas
      apiData.rows.forEach((item) => {
        // Verificar si se cumple una condición específica
        var condicionRealitzats = filtroRealitzats && item.ID_AGENDES_HCS == valorSelect && item.HORA_CONSULTA != "0000";

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
            contador++;

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
              contador++;
            }
          }
          // Agregar la fila a la tabla
          tbody.appendChild(row);
        }
      });
    }

    tabla.appendChild(tbody);
  }
}