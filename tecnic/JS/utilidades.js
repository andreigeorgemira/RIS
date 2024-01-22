import { obtenerObservacionsTecnic, obtenerMasCitasPaciente, obtenerRadiologos, obtenerRadiologoAsignado, obtenerEstudiosAnteriores } from "../API/llamadasAPI.js";

// Función para formatear la hora en formato HH:mm
export function formatearHora(hora) {
  return hora.slice(0, 2) + ":" + hora.slice(2, 4);
}

// Función para formatear la fecha en formato dd/mm/aaaa
export function fechaFormateada(fecha) {
  let fechaOriginal = new Date(fecha);
  let dia = fechaOriginal.getDate();
  let mes = fechaOriginal.getMonth() + 1;
  let anio = fechaOriginal.getFullYear();

  // Formatear siempre en el orden "dd/mm/aaaa"
  let diaFormateado = dia.toString().padStart(2, "0");
  let mesFormateado = mes.toString().padStart(2, "0");

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
    if (row.ID === "ALT" || !row.ID || !row.DESCRIPCIO) {
      // Omitir la opción si el ID es "ALT" o si faltan propiedades
      return;
    }

    // Crear un elemento de opción
    let optionElement = document.createElement("option");

    // Asignar el valor y el texto del elemento de opción
    optionElement.value = row.ID;
    optionElement.textContent = row.DESCRIPCIO;

    // Seleccionar el último valor almacenado para la opción
    if (row.ID === ultimoValorAlmacenado) {
      optionElement.selected = true;
    }

    // Añadir la opción al selector
    selectElement.appendChild(optionElement);
  });

  // Agregar un evento de cambio al selector para actualizar la opción seleccionada
  selectElement.addEventListener("change", function () {
    // Obtener el valor seleccionado y actualizar la variable global correspondiente
    let valorSeleccionado = selectElement.value;
    actualizarUltimoValor(opcionUF, valorSeleccionado);
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
    default:
      return null;
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

export function mostrarOverlay(overlayDatos, valoresAPI, nhc_a_buscar, opcionUF) {
  console.log(valoresAPI);
  console.log(opcionUF);
  let dato = valoresAPI.find((item) => item.NHC.trim() === nhc_a_buscar);
  let numage;
  if (opcionUF == "C") {
    numage = `${dato.NUMAGE}`;
  } else {
    numage = `${dato.NSOL}`;
  }
  let condicion1 = dato.HORA_ARRIBADA != "0000" && dato.HORA_CONSULTA == "0000";
  let condicion2 = dato.HORA_ARRIBADA != "0000" && dato.HORA_CONSULTA != "0000";
  let masCitasPromise = obtenerMasCitasPaciente(numage).then((datos) => datos.rows);
  let radiologoAsignadoPromise = obtenerRadiologoAsignado(numage);
  let observacionsTecnicPromise = obtenerObservacionsTecnic(numage);
  let radiologosPromise = obtenerRadiologos().then((datos) => datos.rows);
  let estudiosAnterioresPromise = obtenerEstudiosAnteriores(nhc_a_buscar).then((dato) => dato.rows);

  Promise.all([masCitasPromise, radiologoAsignadoPromise, observacionsTecnicPromise, radiologosPromise, estudiosAnterioresPromise]).then(([masCitas, radiologoAsignado, observacionsTecnic, doctores, estudiosAnteriores]) => {
    let tieneMasCitas = masCitas.length > 1;
    let listaCitas = "";

    let unoCumpleCondicion = masCitas.some((cita) => {
      return cita.HORA_ARRIBADA !== "0000" && cita.HORA_CONSULTA != "0000";
    });

    if (tieneMasCitas) {
      let ul = document.createElement("ul");
      masCitas.forEach((cita) => {
        let li = document.createElement("li");
        li.textContent = `[${formatearHora(cita.HORA_VISITA)}] : ${cita.TIPUS}`;
        ul.appendChild(li);
      });

      listaCitas = `
          <div class="alert alert-danger">
            <div class="text-center">
              <b>El paciente tiene más de una prueba pendiente para hoy</b>
            </div>
            <div class="text-left">
              ${ul.innerHTML}
            </div>
          </div>
        `;
    }

    if (observacionsTecnic == "Object reference not set to an instance of an object.") {
      observacionsTecnic = "";
    }

    // Crear el contenido del overlay con los datos del paciente y las citas
    overlayDatos.innerHTML = `
  <div id="content" class="overlay-content">
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
            <input class="form-control" disabled />
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
            <input class="form-control" disabled />
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
            <textarea class="form-control" disabled></textarea>
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
            <table class="tabla rounded-3 overflow-hidden" style="margin-bottom:0;">
              <thead>
                <tr>
                  <th style="width:40%;">PROVA</th>
                  <th style="width:60%;">PROJECCIO</th>
                </tr>
              </thead>
              <tbody style="background-color:#f5f7f7">
                <tr>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="col-6 text-right">
        ${
          tieneMasCitas
            ? `${listaCitas}
               <button class="btn btn-lg float-end btn-secondary hand col-6" type="button">
                  <span>Enviar a WorkList</span>
               </button>`
            : `<button class="btn btn-lg mt-3 float-end btn-secondary hand col-6" type="button">
                  <span>Enviar a WorkList</span>
               </button>`
        }
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
        <button class="btn btn-secondary hand" id="tancar" type="button">Tancar</button>
      </div>
    </div>
  </div>
`;

    let textarea = document.getElementById("observacionsTecnic");
    textarea.value = observacionsTecnic;

    let selectDoctor = document.getElementById("select");

    doctores.forEach((doctor) => {
      let opcion = document.createElement("option");
      opcion.value = doctor.USRHNET;
      opcion.text = doctor.NOM;

      if (radiologoAsignado !== "" && radiologoAsignado === doctor.USRHNET) {
        opcion.selected = true;
      }

      selectDoctor.appendChild(opcion);
    });

    var verEstudiosAnteriores = document.getElementById("verEstudiosAnteriores");
    var tablaVisible = false;

    verEstudiosAnteriores.addEventListener("click", function () {
      if (tablaVisible) {
        verEstudiosAnteriores.innerText = "Veure estudis anteriors";
        let divTabla = document.getElementById("divTabla");
        if (divTabla) {
          divTabla.remove();
        }
      } else {
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

        estudiosAnteriores.sort((a, b) => new Date(b.DATA) - new Date(a.DATA));

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

        verEstudiosAnteriores.parentElement.appendChild(divTabla);
      }

      tablaVisible = !tablaVisible;
    });

    // Agregar eventos de cierre al botón de cierre
    var botonesCerrar = document.querySelectorAll("#tancar");
    botonesCerrar.forEach(function (cerrarBoton) {
      cerrarBoton.addEventListener("click", cerrarOverlay);
    });

    // Mostrar el overlay
    overlayDatos.style.display = "flex";
  });
}

// Función para cerrar el overlay
export function cerrarOverlay() {
  var overlayFooterBoton = overlayDatos.querySelector("#tancar");
  overlayFooterBoton.removeEventListener("click", cerrarOverlay);
  overlayDatos.innerHTML = "";
  overlayDatos.style.display = "none";
}
