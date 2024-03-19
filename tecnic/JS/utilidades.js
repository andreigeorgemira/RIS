// Importar funciones desde el módulo llamadasAPI.js
import { obtenerObservacionsTecnic, obtenerMasCitasPaciente, obtenerRadiologos, obtenerRadiologoAsignado, obtenerEstudiosAnteriores, obtenerEstudiosRagiologico } from "../API/llamadasAPI.js";

// Función para formatear la hora en formato HH:mm
export function formatearHora(hora) {
  return hora.slice(0, 2) + ":" + hora.slice(2, 4);
}

// Función para formatear la fecha en formato dd/mm/aaaa
export function fechaFormateada(fecha) {
  // Convertir la fecha a un objeto Date
  let fechaOriginal = new Date(fecha);
  // Obtener el día, mes y año
  let dia = fechaOriginal.getDate();
  let mes = fechaOriginal.getMonth() + 1; // Los meses van de 0 a 11, se suma 1 para obtener el mes correcto
  let anio = fechaOriginal.getFullYear();

  // Formatear siempre en el orden "dd/mm/aaaa"
  let diaFormateado = dia.toString().padStart(2, "0"); // Asegurarse de que el día tenga dos dígitos
  let mesFormateado = mes.toString().padStart(2, "0"); // Asegurarse de que el mes tenga dos dígitos

  let fechaFormateada = `${diaFormateado}/${mesFormateado}/${anio}`;

  return fechaFormateada;
}

// Variables globales para almacenar los últimos valores seleccionados
let ultimoValorNumericoC = 580;
let ultimoValorAlfabeticoH = "RXS";
let ultimoValorAlfabeticoU = "RXS";

// Función para poblar un elemento de tipo select con opciones provenientes de una API
export function datosSelect(datosAPI, selectElement, opcionUF) {
  // Verificar que los datosAPI y rows existan
  if (!datosAPI[opcionUF]) {
    // Manejar el caso de datosAPI nulo o sin propiedad 'rows'
    return;
  }

  // Vaciar el contenido actual del select
  selectElement.innerHTML = "";

  // Obtener el último valor almacenado para la opción seleccionada
  let ultimoValorAlmacenado = obtenerUltimoValor(opcionUF);

  // Iterar sobre los elementos en 'rows' y crear opciones para el selector
  datosAPI[opcionUF].forEach((row) => {
    // Verificar propiedades antes de acceder a ellas
    if (row.ID == "ALT" || !row.ID || !row.DESCRIPCIO) {
      // Omitir la opción si el ID es "ALT" o si faltan propiedades
      return;
    }

    // Crear un elemento de opción
    let optionElement = document.createElement("option");

    // Asignar el valor y el texto del elemento de opción
    optionElement.value = row.ID;
    optionElement.textContent = row.DESCRIPCIO;

    // Asignar el atributo data-uf
    optionElement.setAttribute("data-uf", opcionUF);

    // Seleccionar el último valor almacenado para la opción
    if (row.ID == ultimoValorAlmacenado && optionElement.getAttribute("data-uf") == opcionUF) {
      optionElement.selected = true;
    }

    // Añadir la opción al selector
    selectElement.appendChild(optionElement);
  });

  selectElement.addEventListener("change", function () {
    // Obtener el valor seleccionado y actualizar la variable global correspondiente
    let valorSeleccionado = selectElement.value;
    let uf = selectElement.options[selectElement.selectedIndex].getAttribute("data-uf");
    actualizarUltimoValor(uf, valorSeleccionado);
  });
}

// Función auxiliar para obtener el último valor almacenado
function obtenerUltimoValor(opcionUF) {
  switch (opcionUF) {
    case "C":
      return ultimoValorNumericoC;
    case "H":
      return ultimoValorAlfabeticoH;
    case "U":
      return ultimoValorAlfabeticoU;
  }
}

// Función auxiliar para actualizar el último valor almacenado
function actualizarUltimoValor(opcionUF, nuevoValor) {
  switch (opcionUF) {
    case "C":
      ultimoValorNumericoC = nuevoValor;
      break;
    case "H":
      ultimoValorAlfabeticoH = nuevoValor;
      break;
    case "U":
      ultimoValorAlfabeticoU = nuevoValor;
      break;
  }
}

// Función para insertar el contenido del calendario en un elemento HTML
export function insertarCalendario(calendario) {
  calendario.innerHTML = `
  <div class="header">
        <button id="btnCerrarModal" class="close-btn">&times;</button>
        <div class="dropdown">
          <button class="nav-btn month-dropdown"><i class="far fa-calendar"></i> <span id="mesSeleccionado"></span></button>
          <div class="dropdown-content">
            <!-- Botones para cambiar el mes -->
            <button id="btnCambioMes0">Enero</button>
            <button id="btnCambioMes1">Febrero</button>
            <button id="btnCambioMes2">Marzo</button>
            <button id="btnCambioMes3">Abril</button>
            <button id="btnCambioMes4">Mayo</button>
            <button id="btnCambioMes5">Junio</button>
            <button id="btnCambioMes6">Julio</button>
            <button id="btnCambioMes7">Agosto</button>
            <button id="btnCambioMes8">Septiembre</button>
            <button id="btnCambioMes9">Octubre</button>
            <button id="btnCambioMes10">Noviembre</button>
            <button id="btnCambioMes11">Diciembre</button>
          </div>
        </div>
        <div class="dropdown">
          <button class="nav-btn year-dropdown"><i class="far fa-calendar"></i> <span id="anoSeleccionado"></span></button>
          <div class="dropdown-content" id="yearDropdownContent"></div>
        </div>
        <button id="btnAvui" class="avui">Avui</button>
      </div>
      <div class="custom-calendar" id="customCalendar"></div>
  `;
}

// Función para crear un overlay con información detallada sobre un paciente
export function creaccionOverlay(overlayDatos, valoresAPI, nhc_a_buscar, opcionUF) {
  // Encontrar el dato del paciente correspondiente al número de historial clínico
  let dato = valoresAPI.find((item) => item.NHC.trim() === nhc_a_buscar);
  let numage;
  let condicion1;
  let condicion2;
  let unoCumpleCondicion = false;

  // Determinar qué tipo de opción UF (C,H, U) se está utilizando y establecer las condiciones en función de eso
  if (opcionUF == "C") {
    // Si es "C", utilizar el número de age (edad)
    numage = `${dato.NUMAGE}`;
    // Definir las condiciones para verificar el estado de la cita
    condicion1 = dato.HORA_ARRIBADA != "0000" && dato.HORA_CONSULTA == "0000";
    condicion2 = dato.HORA_ARRIBADA != "0000" && dato.HORA_CONSULTA != "0000";
  } else {
    // Si es cualquier otra cosa, utilizar el número de sol (solución)
    numage = `${dato.NSOL}`;
    // Definir las condiciones para verificar el estado de la cita
    condicion1 = dato.ESTAT == "1";
    condicion2 = dato.ESTAT == "3";
  }

  // Promesas para obtener datos adicionales del paciente y pruebas médicas
  const masCitasPromise = obtenerMasCitasPaciente(numage).then((datos) => datos.rows);
  const radiologoAsignadoPromise = obtenerRadiologoAsignado(numage);
  const observacionsTecnicPromise = obtenerObservacionsTecnic(numage);
  const radiologosPromise = obtenerRadiologos().then((datos) => datos.rows);
  const estudiosAnterioresPromise = obtenerEstudiosAnteriores(nhc_a_buscar).then((dato) => dato.rows);
  const estudiosRagiologicoPromise = obtenerEstudiosRagiologico(numage).then((dato) => dato.rows);

  // Mostrar la información básica del paciente en el overlay
  mostrarOverlayBase(overlayDatos, dato, condicion1, condicion2, unoCumpleCondicion);

  // Obtener el elemento HTML para mostrar si el paciente tiene más citas
  let divTieneMasCitas = document.getElementById("tieneMasCitas");
  // Generar los botones de acuerdo a las condiciones de la cita
  generarBotones(divTieneMasCitas, condicion1, condicion2, unoCumpleCondicion);

  // Promesa para obtener datos de citas adicionales
  new Promise(() => {
    masCitasPromise.then((datos) => {
      let masCitas = datos;
      let tieneMasCitas = masCitas.length > 1;
      unoCumpleCondicion = masCitas.some((cita) => {
        return cita.HORA_ARRIBADA !== "0000" && cita.HORA_CONSULTA !== "0000";
      });

      if (tieneMasCitas) {
        let ul = document.createElement("ul");
        masCitas.forEach((cita) => {
          let li = document.createElement("li");
          li.textContent = `[${formatearHora(cita.HORA_VISITA)}] : ${cita.TIPUS}`;
          ul.appendChild(li);
        });

        let listaCitas = `
          <div class="alert alert-danger">
            <div class="text-center">
              <b>El paciente tiene más de una prueba pendiente para hoy</b>
            </div>
            <div class="text-left">
              ${ul.innerHTML}
            </div>
          </div>
        `;

        divTieneMasCitas.innerHTML = listaCitas;
        generarBotones(divTieneMasCitas, condicion1, condicion2, unoCumpleCondicion);
      }
    });

    // Promesa para obtener datos adicionales del paciente y pruebas médicas
    Promise.all([radiologoAsignadoPromise, observacionsTecnicPromise, radiologosPromise, estudiosAnterioresPromise, estudiosRagiologicoPromise]).then(([radiologoAsignado, observacionsTecnic, doctores, estudiosAnteriores, estudiosRadiologico]) => {
      // Manejar el caso en el que observacionsTecnic sea nulo
      if (observacionsTecnic == "Object reference not set to an instance of an object.") {
        observacionsTecnic = "";
      }

      // Obtener elementos HTML para actualizar la información del médico solicitante y pruebas médicas
      let solicitant = document.getElementById("solicitant");
      let proces = document.getElementById("proces");
      let observacionsMediques = document.getElementById("observacionsMediques");

      // Obtener el textarea para las observaciones técnicas y establecer su valor
      let textarea = document.getElementById("observacionsTecnic");
      textarea.value = observacionsTecnic;

      // Obtener el select para los médicos y poblarlo con opciones
      let selectDoctor = document.getElementById("select");

      // Iterar sobre los doctores y añadir opciones al select
      doctores.forEach((doctor) => {
        let opcion = document.createElement("option");
        opcion.value = doctor.USRHNET;
        opcion.text = doctor.NOM;

        // Seleccionar el médico asignado, si lo hay
        if (radiologoAsignado !== "" && radiologoAsignado === doctor.USRHNET) {
          opcion.selected = true;
        }

        // Añadir la opción al select
        selectDoctor.appendChild(opcion);
        // Actualizar el estado del select basado en las condiciones de la cita
        actualizarDisabled(selectDoctor, condicion1, condicion2, unoCumpleCondicion);
      });

      // Obtener el botón para mostrar/ocultar estudios anteriores
      var verEstudiosAnteriores = document.getElementById("verEstudiosAnteriores");
      var tablaVisible = false;

      // Añadir un event listener al botón para mostrar/ocultar estudios anteriores
      verEstudiosAnteriores.addEventListener("click", function () {
        mostrarEstudiosAnteriores(tablaVisible, verEstudiosAnteriores, estudiosAnteriores);
        tablaVisible = !tablaVisible;
      });

      // Obtener el tbody para las pruebas médicas y vaciarlo si hay pruebas anteriores
      let tbodypruebas = document.getElementById("tbodyPruebas");

      if (estudiosRadiologico != "") {
        tbodypruebas.innerHTML = "";
      }

      // Iterar sobre los estudios radiológicos y mostrar la información en la tabla
      estudiosRadiologico.forEach((valor) => {
        solicitant.value = valor.SOLICITANT;
        proces.value = valor.PROCES;
        observacionsMediques.value = valor.OBSERVACIONS;

        let tr = document.createElement("tr");

        let td1 = document.createElement("td");
        td1.textContent = valor.PROVA.trim();
        tr.appendChild(td1);

        let td2 = document.createElement("td");
        td2.textContent = valor.PROJECCIO.trim();
        tr.appendChild(td2);

        tbodypruebas.appendChild(tr);
      });
    });
  });
}

// Función para mostrar u ocultar la tabla de estudios anteriores
function mostrarEstudiosAnteriores(tablaVisible, verEstudiosAnteriores, estudiosAnteriores) {
  if (tablaVisible) {
    // Si la tabla está visible, ocultarla y cambiar el texto del botón
    verEstudiosAnteriores.innerText = "Veure estudis anteriors";
    let divTabla = document.getElementById("divTabla");
    if (divTabla) {
      divTabla.remove();
    }
  } else {
    // Si la tabla no está visible, mostrarla y cambiar el texto del botón
    verEstudiosAnteriores.innerText = "Ocultar estudis anteriors";
    let divTabla = document.createElement("div");
    divTabla.classList.add("col-12", "table-responsive");
    divTabla.id = "divTabla";

    let tabla = document.createElement("table");
    tabla.classList.add("tabla", "rounded-3", "overflow-hidden");

    let thead = document.createElement("thead");
    let trHead = document.createElement("tr");
    trHead.innerHTML = `
      <th style="width: 8%">NHC</th>
      <th style="width: 12%">AN</th>
      <th style="width: 10%">MODALITAT</th>
      <th style="width: 40%">PROVA</th>
      <th style="width: 20%">DATA</th>
      <th style="width: 5%"></th>`;

    let tbody = document.createElement("tbody");
    tbody.style.backgroundColor = "#f5f7f7";

    thead.appendChild(trHead);
    tabla.appendChild(thead);
    tabla.appendChild(tbody);
    divTabla.appendChild(tabla);

    // Ordenar los estudios anteriores por fecha descendente
    estudiosAnteriores.sort((a, b) => new Date(b.DATA) - new Date(a.DATA));

    // Iterar sobre los estudios anteriores y agregar filas a la tabla
    estudiosAnteriores.forEach((dato) => {
      let row = document.createElement("tr");
      let fechaOriginal = dato.DATA;
      let fecha = fechaFormateada(fechaOriginal.split("T")[0]);
      let hora = fechaOriginal.split("T")[1].slice(0, 5);
      let resultado = fecha + " " + hora;

      row.innerHTML = `
          <td>${dato.NHC}</td>
          <td>${dato.EPISODI}</td>
          <td>${dato.AMPLIADA}</td>
          <td>${dato.DESCRIPCIO}</td>
          <td>${resultado}</td>
          <td style="cursor: pointer;" onclick="window.open('${dato.DOCUMENT}', '_blank');">
            <i class="fa-solid fa-lungs fa-xl" style="color: #000000;"></i>
          </td>`;
      tbody.appendChild(row);
    });

    // Agregar la tabla al DOM
    verEstudiosAnteriores.parentElement.appendChild(divTabla);
  }
}

// Función para mostrar la información básica del paciente en el overlay
function mostrarOverlayBase(overlayDatos, dato, condicion1, condicion2, unoCumpleCondicion) {
  // Remover la capacidad de hacer scroll y agregar una clase para el overlay abierto
  document.body.classList.remove("scroll");
  document.body.classList.add("overlay-abierto");

  // Crear el contenido básico del overlay con la información del paciente
  let overlayBase = `<div id="content" class="overlay-content">
  <div id="head" class="modal-header">
    <h3 class="modal-title"><b>[${dato.NHC}]</b>${dato.APELLIDO1} ${dato.APELLIDO2}, ${dato.NOMBRE}</h3>
    <button class="btn-close" id="tancar" type="button"></button>
  </div>
  <hr />
  <div class="modal-body">
    <div class="row">
      <div class="col-6">
        <h4>Dades de la prova</h4>
      </div>
      <div class="col-6">
        <h4>Realització</h4>
      </div>
    </div>
    <hr />
    <div class="row">
      <div class="col-6 col-form-label">
        SOLICITANT
        <div class="col-12">
          <input id="solicitant" class="form-control" disabled />
        </div>
      </div>

      <div class="col-6 col-form-label">
        NOMBRE D'ERRORS
        <div class="col-1">
          <input class="form-control" ${condicion1 ? "" : "disabled"} value="0"/>
        </div>
      </div>

      <div class="col-4 col-form-label">
        PROCÉS
        <div class="col-12">
          <input id="proces" class="form-control" disabled />
        </div>
      </div>

      <div class="col-2 col-form-label">
        NHC
        <div class="col-12">
          <input class="form-control" disabled value="${dato.NHC}"/>
        </div>
      </div>

      <div class="col-6 col-form-label">
        DOCTOR
        <div class="col-12">
          <select id="select" class="form-select" ${condicion1 || condicion2 || unoCumpleCondicion ? "" : "disabled"}></select>
        </div>
      </div>

      <div class="col-6 col-form-label">
        OBSERVACIONS MÈDIQUES
        <div class="col-12">
          <textarea id="observacionsMediques" class="form-control" disabled></textarea>
        </div>
      </div>

      <div class="col-6 col-form-label">
        OBSERVACIONS DEL TÈCNIC
        <div class="col-12">
          <textarea id="observacionsTecnic" class="form-control" ${condicion1 ? "" : "disabled"}></textarea>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-6 col-form-label">
        <div class="col-12 table-responsive">
          <table  class="tabla rounded-3 overflow-hidden" style="margin-bottom:0;">
            <thead>
              <tr>
                <th style="width:40%;">PROVA</th>
                <th style="width:60%;">PROJECCIO</th>
              </tr>
            </thead>
            <tbody id="tbodyPruebas" style="background-color:#f5f7f7">
              <tr>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div id="tieneMasCitas" class="col-6 text-right">

      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="col-12">
          <span class="cursor" id="verEstudiosAnteriores">Veure estudis anteriors</span>
        </div>
      </div>
    </div>
    <hr>
    <div class="modal-footer">
      <button class="btn btn-danger hand" id="tancar" type="button">Tancar</button>
    </div>
  </div>
</div>`;

  overlayDatos.innerHTML = overlayBase;
  overlayDatos.style.display = "flex";
  // Agregar eventos de cierre al botón de cierre
  var botonesCerrar = document.querySelectorAll("#tancar");
  botonesCerrar.forEach(function (cerrarBoton) {
    cerrarBoton.addEventListener("click", cerrarOverlay);
  });
}

// Función para generar los botones de acuerdo a las condiciones de la cita
function generarBotones(htmlInsert, condicion1, condicion2, unoCumpleCondicion) {
  let botones;
  if (condicion1) {
    // Si se cumple la condición 1, mostrar botones de reasignar y enviar a worklist
    botones = `
      <div class="d-flex flex-column">
        <button class="btn btn-lg btn-success hand col-6 align-self-end mt-3" type="button">
          <span>Reassignar</span>
        </button>
        <button class="btn btn-lg btn-warning hand col-6 align-self-end mt-3" type="button">
          <span>Enviar a Worklist</span>
        </button>
      </div>
    `;
  } else if (condicion2 || unoCumpleCondicion) {
    // Si se cumple la condición 2 o al menos una de las citas cumple la condición, mostrar botones de informar incidencia y reasignar
    botones = `
      <div class="d-flex flex-column">
        <button class="btn btn-lg btn-danger hand col-6 align-self-end mt-3" type="button">
          <span>Informar incidència</span>
        </button>
        <button class="btn btn-lg btn-success hand col-6 align-self-end mt-3" type="button">
          <span>Reassignar</span>
        </button>
      </div>
    `;
  } else {
    // Si no se cumplen las condiciones anteriores, mostrar solo el botón de enviar a worklist
    botones = `
      <button class="btn btn-lg mt-3 float-end btn-secondary hand col-6" type="button">
        <span>Enviar a WorkList</span>
      </button>
    `;
  }
  htmlInsert.insertAdjacentHTML("beforeend", botones);
}

// Función para actualizar el estado disabled de un select según las condiciones de la cita
function actualizarDisabled(select, condicion1, condicion2, unoCumpleCondicion) {
  if (select) {
    // Deshabilitar el select si no se cumplen las condiciones
    select.disabled = !(condicion1 || condicion2 || unoCumpleCondicion);
  }
}

// Función para cerrar el overlay
function cerrarOverlay() {
  // Remover la clase de overlay abierto y restaurar la capacidad de hacer scroll
  document.body.classList.remove("overlay-abierto");
  document.body.classList.add("scroll");
  var overlayFooterBoton = overlayDatos.querySelector("#tancar");
  overlayFooterBoton.removeEventListener("click", cerrarOverlay);
  overlayDatos.innerHTML = "";
  overlayDatos.style.display = "none";
}
