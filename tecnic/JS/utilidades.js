import { obtenerObservacionsTecnic } from "../API/llamadasAPI.js";

export function formatearHora(hora) {
  return hora.slice(0, 2) + ":" + hora.slice(2, 4);
}

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

// Variable global para almacenar la última opción seleccionada
let lastSelectedOption = null;

export function datosSelect(datosAPI, selectElement) {
  // Verificar que los datosAPI y rows existan
  if (!datosAPI || !datosAPI.rows) {
    // Manejar el caso de datosAPI nulo o sin propiedad 'rows'
    return;
  }

  // Vaciar el contenido actual del select
  selectElement.innerHTML = "";

  // Iterar sobre los elementos en 'rows' y crear opciones para el selector
  datosAPI.rows.forEach((row) => {
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

    // Marcar la opción con ID 580 como seleccionada por defecto
    if (row.ID === 580 && lastSelectedOption === null) {
      optionElement.selected = true;
      lastSelectedOption = 580; // Actualizar la variable global
    } else if (lastSelectedOption !== null && row.ID.toString() === lastSelectedOption.toString()) {
      optionElement.selected = true; // Seleccionar la última opción almacenada
    }

    // Añadir la opción al selector
    selectElement.appendChild(optionElement);
  });

  // Agregar un evento de cambio al selector para actualizar la opción seleccionada
  selectElement.addEventListener("change", function () {
    lastSelectedOption = selectElement.value;
  });
}

export function insertarCalendario(calendario) {
  calendario.innerHTML = `
  <div class="header">
        <button id="btnCerrarModal" class="close-btn">&times;</button>
        <div class="dropdown">
          <button class="nav-btn month-dropdown"><i class="far fa-calendar"></i> <span id="mesSeleccionado"></span></button>
          <div class="dropdown-content">
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

export function mostrarOverlay(overlayDatos, valoresAPI, nhc_a_buscar) {
  let dato = valoresAPI.C.rows.find((item) => item.NHC === nhc_a_buscar);
  let numage = `${dato.NHC}`;
  console.log(obtenerObservacionsTecnic(numage));
  let desactivado = dato.HORA_CONSULTA != "0000";

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
              <input class="form-control" ${desactivado ? "" : "disabled"} />
            </div>
          </div>

          <div class="col-6 col-form-label">
            NOMBRE D'ERRORS
            <div class="col-1">
              <input class="form-control" ${desactivado ? "" : "disabled"} />
            </div>
          </div>

          <div class="col-4 col-form-label">
            PROCÉS
            <div class="col-12">
              <input class="form-control" ${desactivado ? "" : "disabled"} />
            </div>
          </div>

          <div class="col-2 col-form-label">
            NHC
            <div class="col-12">
              <input class="form-control" ${desactivado ? "" : "disabled"} value="${dato.NHC}"/>
            </div>
          </div>

          <div class="col-6 col-form-label">
            DOCTOR
            <div class="col-12">
              <input class="form-control" ${desactivado ? "" : "disabled"}/>
            </div>
          </div>

          <div class="col-6 col-form-label">
            OBSERVACIONS MÈDIQUES
            <div class="col-12">
              <textarea class="form-control" ${desactivado ? "" : "disabled"}></textarea>
            </div>
          </div>

          <div class="col-6 col-form-label">
            OBSERVACIONS DEL TÈCNIC
            <div class="col-12">
              <textarea class="form-control" ${desactivado ? "" : "disabled"}></textarea>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-6 col-form-label">
            <div class="col-12">
              <table class="table table-hover">
                <thead class="thead-inversed">
                  <tr>
                    <th>PROVA</th>
                    <th>PROJECCIO</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="col-6 text-right">
            <div class="alert alert-danger text-center">
              <b>El pacient te més d'una prova pendent per avui</b><br />
              <div class="text-left">
                <ul></ul>
              </div>
            </div>
            <button class="btn btn-lg btn-secondary hand col-6" type="button">
              <span>Enviar a WorkList</span>
            </button>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <div class="col-12">
              <span class="hand">Veure estudis anteriors</span>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary hand" id="tancar" type="button">Tancar</button>
        </div>
      </div>
    </div>
  `;

  var botonesCerrar = document.querySelectorAll("#tancar");

  botonesCerrar.forEach(function (cerrarBoton) {
    cerrarBoton.addEventListener("click", cerrarOverlay);
  });
  overlayDatos.style.display = "flex";
}

// Función para cerrar el modal
export function cerrarOverlay() {
  var overlayFooterBoton = overlayDatos.querySelector("#tancar");
  overlayFooterBoton.removeEventListener("click", cerrarOverlay);
  overlayDatos.innerHTML = "";
  overlayDatos.style.display = "none";
}
