// Importar funciones desde el archivo llamadasAPI.js y utilidades.js
import { obtenerEstadisticas, obtenerRadiologos, obtenerExcelRadiologia } from "../API/llamadasAPI.js";
import { formatearFechaExcel } from "../JS/utilidades.js";

// Función para crear el contenido de la página de estadísticas
export function crearContenido(body) {
  // Insertar el HTML para las estadísticas en el cuerpo del documento
  body.innerHTML += `<div class="stats">
  <div class="col-2">
    <div>
      <span class="input-label">Data Inici: </span>
      <input id="inicio" class="form-control ng-pristine ng-valid ng-touched" type="date" />
    </div>
    <div>
      <span class="input-label">Data Final: </span>
      <input id="final" class="form-control ng-untouched ng-pristine ng-valid" type="date" />
    </div>
  </div>
  <br />

  <div class="container-fluid">
    <div class="row">
      <div class="col-md-10 top">
        <div class="d-flex justify-content-between h3-estadisitiques">
          <h3>Estadístiques</h3>
        </div>
        <div id="cartesEstadistiques" class="d-flex flex-wrap">
        </div>
      </div>
    </div>
  </div>
</div>

<hr />

<div class="stats margin">
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-3">
        <div id="radiologos" class="d-grid">
        </div>
      </div>
      <div class="col-md-8">
        <div class="d-flex justify-content-between h3-stats-radio">
          <h3>Estadístiques per radiòleg</h3>
        </div>
        <div id="cartesEstadistiquesRadioleg" class="d-flex flex-wrap">
        </div>
      </div>

      <div class="container mt-4">
        <div class="row justify-content-center">
          <div class="col-md-6">
            <div id="contenedor-grafico"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<div class="mb-5 d-flex justify-content-center">
  <div>
    <span class="cursor excel"><i class="far fa-file-excel"></i> Generar Excel (Totes les proves del període)</span>
  </div>
</div>`;
  // Establecer fechas por defecto en los campos de fecha
  establecerFechas();
  // Insertar radiólogos en la página
  insertarRadiologos();
  // Generar botones para la selección de modalidades
  generarBotones();
}

// Función para generar botones de selección de modalidades
function generarBotones() {
  // Crear un contenedor para los botones
  var container = document.createElement("div");
  container.className = "col-md-2";

  var buttonContainer = document.createElement("div");
  buttonContainer.className = "d-grid gap-2";

  // Array de modalidades
  var rows = ["CT", "DX", "US", "MG", "PT", "NM", "MR", "RF", "PX", "OT", "XC", "DOC"];

  // Crear botones para cada modalidad
  for (var i = 0; i < rows.length; i += 3) {
    var rowDiv = document.createElement("div");
    rowDiv.className = "row";

    for (var j = i; j < i + 3 && j < rows.length; j++) {
      var colDiv = document.createElement("div");
      colDiv.className = "col";

      var button = document.createElement("button");
      button.className = "btn botones btn-block";
      button.type = "button";
      button.textContent = rows[j];

      // Si la modalidad es CT o DX, activar el botón por defecto
      if (rows[j] == "CT" || rows[j] == "DX") {
        button.classList.add("btn-activo");
      }

      colDiv.appendChild(button);
      rowDiv.appendChild(colDiv);
    }

    buttonContainer.appendChild(rowDiv);
  }

  // Crear botón de selección de todas las modalidades
  var selectButtonDiv = document.createElement("div");
  selectButtonDiv.className = "row";
  var selectButtonCol = document.createElement("div");
  selectButtonCol.className = "col";
  var selectButton = document.createElement("button");
  selectButton.id = "select";
  selectButton.className = "btn btn-primary btn-block";
  selectButton.type = "button";
  selectButton.textContent = "SELECCIONA TOTES";

  selectButtonCol.appendChild(selectButton);
  selectButtonDiv.appendChild(selectButtonCol);
  buttonContainer.appendChild(selectButtonDiv);

  // Crear botón de deselección de todas las modalidades
  var rotateButtonDiv = document.createElement("div");
  rotateButtonDiv.className = "row";
  var rotateButtonCol = document.createElement("div");
  rotateButtonCol.className = "col";
  var rotateButton = document.createElement("button");
  rotateButton.id = "deselect";
  rotateButton.disabled = true;
  rotateButton.className = "btn btn-danger btn-block";
  rotateButton.type = "button";
  rotateButton.textContent = "DESMARCAR TOTES";

  rotateButtonCol.appendChild(rotateButton);
  rotateButtonDiv.appendChild(rotateButtonCol);
  buttonContainer.appendChild(rotateButtonDiv);

  container.appendChild(buttonContainer);

  // Insertar los botones antes de las estadísticas
  var containerFluid = document.querySelector(".container-fluid .row");

  var estadisticasDiv = document.querySelector(".container-fluid .row .col-md-10.top");

  containerFluid.insertBefore(container, estadisticasDiv);
}

var estadisticasAPI;
var botonesSeleccionados = [];

// Función para alternar la activación de un botón de modalidad
function toggleBotonActivo(boton) {
  boton.classList.toggle("btn-activo");
  botonSeleccionado(boton);
  filtroRadiologos(botonesSeleccionados, botonesSeleccionadosRadiologos);
}

// Función para manejar la selección de un botón de modalidad
function botonSeleccionado(boton) {
  const modalidad = boton.textContent.trim();

  if (boton.classList.contains("btn-activo")) {
    if (modalidad === "DX" && !botonesSeleccionados.includes("DX")) {
      botonesSeleccionados.push("DX");
      if (!botonesSeleccionados.includes("CR")) {
        botonesSeleccionados.push("CR");
      }
    } else if (modalidad !== "DX" && !botonesSeleccionados.includes(modalidad)) {
      botonesSeleccionados.push(modalidad);
    }
  } else {
    if (modalidad === "DX") {
      const indexDX = botonesSeleccionados.indexOf("DX");
      if (indexDX !== -1) {
        botonesSeleccionados.splice(indexDX, 1);
      }
      const indexCR = botonesSeleccionados.indexOf("CR");
      if (indexCR !== -1) {
        botonesSeleccionados.splice(indexCR, 1);
      }
    } else {
      const index = botonesSeleccionados.indexOf(modalidad);
      if (index !== -1) {
        botonesSeleccionados.splice(index, 1);
      }
    }
  }
}

// Función para manejar los botones de selección de modalidades
function botones() {
  // Obtener todos los botones de modalidades excepto los de radiólogos
  const botones = document.querySelectorAll(".botones:not(.radiologos)");
  const botonSelect = document.getElementById("select");
  const botonDeselect = document.getElementById("deselect");

  // Función para seleccionar todos los botones de modalidades
  function selectBotones() {
    botonSelect.disabled = true;
    // Activar todos los botones
    botones.forEach((boton) => {
      boton.classList.add("btn-activo");
      botonSeleccionado(boton);
      filtroEstadisticas(botonesSeleccionados);
      filtroRadiologos(botonesSeleccionados, botonesSeleccionadosRadiologos);
    });
    botonDeselect.disabled = false;
  }

  // Función para deseleccionar todos los botones de modalidades
  function deselectBotones() {
    botonDeselect.disabled = true;
    // Desactivar todos los botones
    botones.forEach((boton) => {
      boton.classList.remove("btn-activo");
      botonSeleccionado(boton);
      filtroEstadisticas(botonesSeleccionados);
      filtroRadiologos(botonesSeleccionados, botonesSeleccionadosRadiologos);
    });
    botonSelect.disabled = false;
  }

  // Función para verificar si todos los botones de modalidades están seleccionados
  function todosBotonesSeleccionados() {
    return Array.from(botones).every((boton) => boton.classList.contains("btn-activo"));
  }

  // Evento click para el botón de selección de todas las modalidades
  botonSelect.addEventListener("click", function () {
    selectBotones();
    if (todosBotonesSeleccionados()) {
      botonSelect.disabled = true;
    }
  });

  // Evento click para el botón de deselección de todas las modalidades
  botonDeselect.addEventListener("click", function () {
    deselectBotones();
    if (!todosBotonesSeleccionados()) {
      botonDeselect.disabled = true;
    }
  });

  // Evento click para cada botón de modalidad
  botones.forEach(function (boton) {
    boton.addEventListener("click", function () {
      toggleBotonActivo(this);
      filtroEstadisticas(botonesSeleccionados);

      // Actualizar estado de los botones Select y Deselect
      if (todosBotonesSeleccionados()) {
        botonSelect.disabled = true;
        botonDeselect.disabled = false;
      } else {
        botonSelect.disabled = false;
        botonDeselect.disabled = true;
      }
    });
  });

  // Activar los botones previamente seleccionados
  let botonActivo = document.querySelectorAll(".botones.btn-activo:not(.radiologos)");

  if (botonActivo) {
    botonActivo.forEach((boton) => {
      botonSeleccionado(boton);
    });
  }

  // Filtrar estadísticas y radiólogos según los botones seleccionados
  filtroEstadisticas(botonesSeleccionados);
  filtroRadiologos(botonesSeleccionados, botonesSeleccionadosRadiologos);
}

// Array para almacenar los botones seleccionados de radiólogos
var botonesSeleccionadosRadiologos = [];

// Función para alternar la activación de un botón de radiólogo
function toggleBotonActivoRadiologs(boton) {
  boton.classList.toggle("btn-activo");
  actualizarBotonesSeleccionadosRadiologos(boton);
}

// Función para actualizar los botones seleccionados de radiólogos
function actualizarBotonesSeleccionadosRadiologos(boton) {
  const textoBoton = boton.querySelector("h5").textContent.trim();
  const radiologoEncontrado = radiologos.find((radiologo) => radiologo.TRACTE === textoBoton);

  if (boton.classList.contains("btn-activo")) {
    if (radiologoEncontrado && !botonesSeleccionadosRadiologos.includes(radiologoEncontrado.USRHNET)) {
      botonesSeleccionadosRadiologos.push(radiologoEncontrado.USRHNET);
    }
  } else {
    const index = botonesSeleccionadosRadiologos.indexOf(radiologoEncontrado.USRHNET);
    if (index > -1) {
      botonesSeleccionadosRadiologos.splice(index, 1);
    }
  }
}

// Función para manejar los botones de radiólogos
function botonesRadiologos() {
  // Obtener todos los botones de radiólogos
  const botones = document.querySelectorAll(".botones.radiologos");
  const botonSelect = document.getElementById("selectRadiologos");
  const botonDeselect = document.getElementById("deselectRadiologos");

  // Función para seleccionar todos los botones de radiólogos
  function selectBotones() {
    botonSelect.disabled = true;
    // Activar todos los botones
    botones.forEach((boton) => {
      boton.classList.add("btn-activo");
      actualizarBotonesSeleccionadosRadiologos(boton);
      filtroRadiologos(botonesSeleccionados, botonesSeleccionadosRadiologos);
    });
    botonDeselect.disabled = false;
  }

  // Función para deseleccionar todos los botones de radiólogos
  function deselectBotones() {
    botonDeselect.disabled = true;
    // Desactivar todos los botones
    botones.forEach((boton) => {
      boton.classList.remove("btn-activo");
      actualizarBotonesSeleccionadosRadiologos(boton);
      filtroRadiologos(botonesSeleccionados, botonesSeleccionadosRadiologos);
    });
    botonSelect.disabled = false;
  }

  // Función para verificar si todos los botones de radiólogos están seleccionados
  function todosBotonesSeleccionados() {
    return Array.from(botones).every((boton) => boton.classList.contains("btn-activo"));
  }

  // Evento click para el botón de selección de todos los radiólogos
  botonSelect.addEventListener("click", function () {
    selectBotones();
    if (todosBotonesSeleccionados()) {
      botonSelect.disabled = true;
    }
  });

  // Evento click para el botón de deselección de todos los radiólogos
  botonDeselect.addEventListener("click", function () {
    deselectBotones();
    if (!todosBotonesSeleccionados()) {
      botonDeselect.disabled = true;
    }
  });

  // Obtener el botón de radiólogo previamente seleccionado
  let botonActivo = document.querySelector(".botones.radiologos.btn-activo");

  if (botonActivo) {
    actualizarBotonesSeleccionadosRadiologos(botonActivo);
  }

  // Evento click para cada botón de radiólogo
  botones.forEach(function (boton) {
    boton.addEventListener("click", function () {
      toggleBotonActivoRadiologs(this);
      filtroRadiologos(botonesSeleccionados, botonesSeleccionadosRadiologos);

      // Actualizar estado de los botones Select y Deselect
      if (todosBotonesSeleccionados()) {
        botonSelect.disabled = true;
        botonDeselect.disabled = false;
      } else {
        botonSelect.disabled = false;
        botonDeselect.disabled = true;
      }
    });
  });
}

// Objeto para almacenar las estadísticas por radiólogo
let datosPorRadiologo = {};

// Función para filtrar estadísticas por radiólogos
function filtroRadiologos(modalidades, radiologos) {
  // Reiniciar los datosPorRadiologo
  datosPorRadiologo = {};

  // Filtrar estadísticas por modalidades y radiólogos seleccionados
  const datosFiltrados = estadisticasAPI.filter((item) => modalidades.includes(item.MODALITAT) && (radiologos.includes(item.METGE_RESPONSABLE) || radiologos.includes(item.METGESIGNAT)));

  // Procesar datos filtrados
  datosFiltrados.forEach((item) => {
    let nombreRadiologo;
    // Determinar el nombre del radiólogo
    if (radiologos.includes(item.METGE_RESPONSABLE)) {
      nombreRadiologo = item.METGE_RESPONSABLE;
    } else if (radiologos.includes(item.METGESIGNAT)) {
      nombreRadiologo = item.METGESIGNAT;
    } else {
      return; // Salir si no se encuentra el radiólogo
    }

    // Inicializar datosPorRadiologo si no existe
    if (!datosPorRadiologo[nombreRadiologo]) {
      datosPorRadiologo[nombreRadiologo] = {
        informadas: 0,
        completadas: 0,
        programadas: 0,
      };
    }

    // Incrementar estadísticas según el estado del estudio
    switch (item.ESTAT) {
      case "Completada":
        datosPorRadiologo[nombreRadiologo].completadas++;
        break;
      case "Informada":
        datosPorRadiologo[nombreRadiologo].informadas++;
        break;
      case "Programada":
        datosPorRadiologo[nombreRadiologo].programadas++;
        break;
      default:
        break;
    }
  });

  // Calcular totales
  let total = { informadas: 0, completadas: 0, programadas: 0 };
  Object.values(datosPorRadiologo).forEach((estadisticas) => {
    total.informadas += estadisticas.informadas;
    total.completadas += estadisticas.completadas;
    total.programadas += estadisticas.programadas;
  });

  // Calcular total de estudios realizados
  const totalRealizadas = total.informadas + total.completadas;

  // Generar HTML para mostrar estadísticas en cartas
  const cartasHTML = generarCarta(totalRealizadas, "Total Realitzades") + generarCarta(total.informadas, "Informades") + generarCarta(total.completadas, "Pendents d'informar") + generarCarta(total.programadas, "No Realitzats");

  // Mostrar las cartas en el contenedor correspondiente
  const contenedorCartas = document.getElementById("cartesEstadistiquesRadioleg");
  contenedorCartas.innerHTML = cartasHTML;

  // Crear gráfica con los datos de los radiólogos
  crearGrafica(Object.keys(datosPorRadiologo));
}

// Función asincrónica para establecer las fechas
async function establecerFechas() {
  // Mostrar spinner mientras se carga
  var modalSpinner = document.getElementById("modalSpinner");
  modalSpinner.style.display = "flex";

  // Obtener elementos de fecha
  var fechaInicio = document.getElementById("inicio");
  var fechaFinal = document.getElementById("final");
  var fechaActual = new Date();

  // Obtener fecha actual y establecerla como final
  var dia = ("0" + fechaActual.getDate()).slice(-2);
  var mes = ("0" + (fechaActual.getMonth() + 1)).slice(-2);
  var anio = fechaActual.getFullYear();
  let final = anio + "-" + mes + "-" + dia;
  fechaFinal.value = final;

  // Obtener fecha de inicio hace 30 días
  fechaActual.setDate(fechaActual.getDate() - 30);
  var diaInicio = ("0" + fechaActual.getDate()).slice(-2);
  var mesInicio = ("0" + (fechaActual.getMonth() + 1)).slice(-2);
  var anioInicio = fechaActual.getFullYear();
  let inicio = anioInicio + "-" + mesInicio + "-" + diaInicio;
  fechaInicio.value = inicio;

  // Obtener estadísticas para el período seleccionado
  await obtenerValoresEstadisticas(inicio, final);

  // Función para manejar cambios en las fechas
  async function cambioFechas() {
    modalSpinner.style.display = "flex";
    let nuevaFechaInicio = fechaInicio.value;
    let nuevaFechaFinal = fechaFinal.value;
    await obtenerValoresEstadisticas(nuevaFechaInicio, nuevaFechaFinal);
    filtroEstadisticas(botonesSeleccionados);
    filtroRadiologos(botonesSeleccionados, botonesSeleccionadosRadiologos);
    modalSpinner.style.display = "none";
  }

  // Escuchar eventos de cambio en las fechas
  fechaInicio.addEventListener("change", cambioFechas);
  fechaFinal.addEventListener("change", cambioFechas);

  // Obtener botones
  const generarExcelButton = document.querySelector(".excel");

  // Agregar evento para generar el Excel
  generarExcelButton.addEventListener("click", function () {
    // Abrir una nueva ventana
    const nuevaVentana = window.open("", "_blank");
    // Mostrar mensaje de carga en la nueva ventana
    nuevaVentana.document.body.innerHTML = "<h1>Generant informe...</h1>";

    // Llamar a la función para obtener el Excel y pasar la referencia de la nueva ventana
    obtenerExcelRadiologia(formatearFechaExcel(fechaInicio.value), formatearFechaExcel(fechaFinal.value), nuevaVentana);
  });

  // Inicializar botones de radiólogos y modalidades
  botonesRadiologos();
  botones();

  // Ocultar spinner una vez cargado todo
  modalSpinner.style.display = "none";
}

// Función para obtener estadísticas según el período seleccionado
async function obtenerValoresEstadisticas(inicio, final) {
  const dato = await obtenerEstadisticas(inicio, final);
  estadisticasAPI = dato.rows;
}

// Función para filtrar estadísticas por modalidades
function filtroEstadisticas(modalidades) {
  // Filtrar datos según las modalidades seleccionadas
  const datosFiltrados = estadisticasAPI.filter((item) => modalidades.includes(item.MODALITAT));
  var totalValores = datosFiltrados.length;
  var completadaInformada = 0;
  var informada = 0;
  var completada = 0;
  var programada = 0;

  // Contar estadísticas por estado
  datosFiltrados.forEach((item) => {
    switch (item.ESTAT) {
      case "Completada":
        completadaInformada++;
        completada++;
        break;
      case "Informada":
        completadaInformada++;
        informada++;
        break;
      case "Programada":
        programada++;
        break;
      default:
        break;
    }
  });

  // Generar HTML para mostrar cartas con las estadísticas
  var cartasHTML = "";
  cartasHTML += generarCarta(totalValores, "Estudis Programats");
  cartasHTML += generarCarta(completada + informada, "Total Realitzades");
  cartasHTML += generarCarta(informada, "Informades");
  cartasHTML += generarCarta(completada, "Pendents d'informar");
  cartasHTML += generarCarta(programada, "No Realitzats");

  // Mostrar cartas en el contenedor correspondiente
  document.getElementById("cartesEstadistiques").innerHTML = cartasHTML;
}

// Función para generar HTML de una carta con valor y texto dados
function generarCarta(valor, texto) {
  return `<div class="card m-2 card-statics">
            <div class="card-body d-flex flex-column justify-content-center">
              <h1 class="card-title">${valor}</h1>
              <h6 class="card-text">${texto}</h6>
            </div>
          </div>`;
}

// Variable global para almacenar los radiólogos
var radiologos;

// Función para insertar los botones de los radiólogos en el DOM
function insertarRadiologos() {
  // Obtener el contenedor donde se insertarán los botones de los radiólogos
  var divRadiologos = document.getElementById("radiologos");

  // Obtener los radiólogos y procesar los datos
  obtenerRadiologos().then((datos) => {
    radiologos = datos.rows;
    const totalRadiologos = radiologos.length;

    // Limpiar el contenido anterior del contenedor
    divRadiologos.innerHTML = "";

    // Calcular el número de filas por grupo de botones
    const filasPorGrupo = 2;
    const grupos = Math.ceil(totalRadiologos / filasPorGrupo);

    // Crear filas y columnas de botones para cada grupo de radiólogos
    for (let i = 0; i < grupos; i++) {
      const row = document.createElement("div");
      row.className = "row";

      for (let j = i * filasPorGrupo; j < (i + 1) * filasPorGrupo && j < totalRadiologos; j++) {
        const col = document.createElement("div");
        col.className = "col";

        // Crear botón para cada radiólogo
        const button = document.createElement("button");
        button.className = "btn botones btn-block radiologos";
        button.type = "button";
        button.innerHTML = `<h5>${radiologos[j].TRACTE}</h5><h6>${radiologos[j].COLEGIAT ?? ""}</h6>`;

        // Agregar clase "btn-activo" si el radiólogo es "_ No Aplica _"
        if (radiologos[j].TRACTE.trim() == "_ No Aplica _") {
          button.classList.add("btn-activo");
        }
        col.appendChild(button);
        row.appendChild(col);
      }

      // Agregar fila al contenedor
      divRadiologos.appendChild(row);
    }

    // Crear botón para seleccionar todos los radiólogos
    const rowSelect = document.createElement("div");
    rowSelect.className = "row";
    const colSelect = document.createElement("div");
    colSelect.className = "col";
    const buttonSelect = document.createElement("button");
    buttonSelect.id = "selectRadiologos";
    buttonSelect.className = "btn btn-primary btn-block";
    buttonSelect.type = "button";
    buttonSelect.textContent = "SELECCIONA TOTES";
    colSelect.appendChild(buttonSelect);
    rowSelect.appendChild(colSelect);
    divRadiologos.appendChild(rowSelect);

    // Crear botón para desmarcar todos los radiólogos
    const rowDeselect = document.createElement("div");
    rowDeselect.className = "row";
    const colDeselect = document.createElement("div");
    colDeselect.className = "col";
    const buttonDeselect = document.createElement("button");
    buttonDeselect.id = "deselectRadiologos";
    buttonDeselect.disabled = true;
    buttonDeselect.className = "btn btn-danger btn-block";
    buttonDeselect.type = "button";
    buttonDeselect.textContent = "DESMARCAR TOTES";
    colDeselect.appendChild(buttonDeselect);
    rowDeselect.appendChild(colDeselect);
    divRadiologos.appendChild(rowDeselect);
  });
}

// Función para crear y actualizar la gráfica con los datos de los radiólogos
function crearGrafica(radiologos) {
  // Obtener el elemento DOM donde se mostrará la gráfica
  var dom = document.getElementById("contenedor-grafico");
  var myChart = echarts.init(dom, null, {
    renderer: "canvas",
    useDirtyRect: false,
  });

  var option;

  // Definir las propiedades del grid de la gráfica
  const grid = {
    left: 100,
    right: 130,
    top: 50,
    bottom: 50,
  };

  // Obtener datos de cada radiólogo para los estados "Informadas", "Pendientes" y "No realizadas"
  const informadaData = radiologos.map((radiologo) => (datosPorRadiologo[radiologo] ? datosPorRadiologo[radiologo].informadas : 0));
  const completadaData = radiologos.map((radiologo) => (datosPorRadiologo[radiologo] ? datosPorRadiologo[radiologo].completadas : 0));
  const programadaData = radiologos.map((radiologo) => (datosPorRadiologo[radiologo] ? datosPorRadiologo[radiologo].programadas : 0));

  // Definir series para la gráfica
  const series = ["Informades", "Pendents", "No realitzats"].map((name, sid) => {
    return {
      name,
      type: "bar",
      stack: "total",
      barWidth: "90%",
      data: radiologos.map((radiologo, index) => {
        switch (name) {
          case "Informades":
            return informadaData[index];
          case "Pendents":
            return completadaData[index];
          case "No realitzats":
            return programadaData[index];
          default:
            return 0;
        }
      }),
    };
  });

  // Definir opciones de la gráfica
  option = {
    legend: {
      orient: "vertical",
      right: 0,
      top: "top",
      selectedMode: true,
    },
    grid,
    yAxis: {
      type: "value",
      splitLine: {
        show: true,
        lineStyle: {
          color: "black",
          width: 1,
          type: "solid",
        },
      },
    },
    xAxis: {
      type: "category",
      data: radiologos,
    },
    series,
    tooltip: {
      trigger: "item",
      formatter: function (params) {
        let tooltipContent = `${params.name}<br/>${params.seriesName}: ${params.value}`;
        return tooltipContent;
      },
    },
  };

  // Renderizar la gráfica con las opciones definidas
  if (option && typeof option === "object") {
    myChart.setOption(option);
  }

  // Ajustar tamaño de la gráfica al cambiar tamaño de ventana
  window.addEventListener("resize", myChart.resize);
}
