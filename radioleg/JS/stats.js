import { obtenerEstadisticas, obtenerRadiologos, obtenerExcelRadiologia } from "../API/llamadasAPI.js";
import { formatearFechaExcel } from "../JS/utilidades.js";

export function crearContenido(body) {
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
  establecerFechas();
  insertarRadiologos();
  generarBotones();
}

function generarBotones() {
  var container = document.createElement("div");
  container.className = "col-md-2";

  var buttonContainer = document.createElement("div");
  buttonContainer.className = "d-grid gap-2";

  var rows = ["CT", "DX", "US", "MG", "PT", "NM", "MR", "RF", "PX", "OT", "XC", "DOC"];

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

      if (rows[j] == "CT" || rows[j] == "DX") {
        button.classList.add("btn-activo");
      }

      colDiv.appendChild(button);
      rowDiv.appendChild(colDiv);
    }

    buttonContainer.appendChild(rowDiv);
  }

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

  var containerFluid = document.querySelector(".container-fluid .row");

  var estadisticasDiv = document.querySelector(".container-fluid .row .col-md-10.top");

  containerFluid.insertBefore(container, estadisticasDiv);
}

var estadisticasAPI;
var botonesSeleccionados = [];

function toggleBotonActivo(boton) {
  boton.classList.toggle("btn-activo");
  botonSeleccionado(boton);
  filtroRadiologos(botonesSeleccionados, botonesSeleccionadosRadiologos);
}

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

function botones() {
  const botones = document.querySelectorAll(".botones:not(.radiologos)");
  const botonSelect = document.getElementById("select");
  const botonDeselect = document.getElementById("deselect");

  function selectBotones() {
    botonSelect.disabled = true;
    botones.forEach((boton) => {
      boton.classList.add("btn-activo");
      botonSeleccionado(boton);
      filtroEstadisticas(botonesSeleccionados);
      filtroRadiologos(botonesSeleccionados, botonesSeleccionadosRadiologos);
    });
    botonDeselect.disabled = false;
  }

  function deselectBotones() {
    botonDeselect.disabled = true;
    botones.forEach((boton) => {
      boton.classList.remove("btn-activo");
      botonSeleccionado(boton);
      filtroEstadisticas(botonesSeleccionados);
      filtroRadiologos(botonesSeleccionados, botonesSeleccionadosRadiologos);
    });
    botonSelect.disabled = false;
  }

  function todosBotonesSeleccionados() {
    return Array.from(botones).every((boton) => boton.classList.contains("btn-activo"));
  }

  botonSelect.addEventListener("click", function () {
    selectBotones();
    if (todosBotonesSeleccionados()) {
      botonSelect.disabled = true;
    }
  });

  botonDeselect.addEventListener("click", function () {
    deselectBotones();
    if (!todosBotonesSeleccionados()) {
      botonDeselect.disabled = true;
    }
  });

  botones.forEach(function (boton) {
    boton.addEventListener("click", function () {
      toggleBotonActivo(this);
      filtroEstadisticas(botonesSeleccionados);

      if (todosBotonesSeleccionados()) {
        botonSelect.disabled = true;
        botonDeselect.disabled = false;
      } else {
        botonSelect.disabled = false;
        botonDeselect.disabled = true;
      }
    });
  });

  let botonActivo = document.querySelectorAll(".botones.btn-activo:not(.radiologos)");

  if (botonActivo) {
    botonActivo.forEach((boton) => {
      botonSeleccionado(boton);
    });
  }

  filtroEstadisticas(botonesSeleccionados);
  filtroRadiologos(botonesSeleccionados, botonesSeleccionadosRadiologos);
}

var botonesSeleccionadosRadiologos = [];

function toggleBotonActivoRadiologs(boton) {
  boton.classList.toggle("btn-activo");
  actualizarBotonesSeleccionadosRadiologos(boton);
}

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

function botonesRadiologos() {
  const botones = document.querySelectorAll(".botones.radiologos");
  const botonSelect = document.getElementById("selectRadiologos");
  const botonDeselect = document.getElementById("deselectRadiologos");

  function selectBotones() {
    botonSelect.disabled = true;
    botones.forEach((boton) => {
      boton.classList.add("btn-activo");
      actualizarBotonesSeleccionadosRadiologos(boton);
      filtroRadiologos(botonesSeleccionados, botonesSeleccionadosRadiologos);
    });
    botonDeselect.disabled = false;
  }

  function deselectBotones() {
    botonDeselect.disabled = true;
    botones.forEach((boton) => {
      boton.classList.remove("btn-activo");
      actualizarBotonesSeleccionadosRadiologos(boton);
      filtroRadiologos(botonesSeleccionados, botonesSeleccionadosRadiologos);
    });
    botonSelect.disabled = false;
  }

  function todosBotonesSeleccionados() {
    return Array.from(botones).every((boton) => boton.classList.contains("btn-activo"));
  }

  botonSelect.addEventListener("click", function () {
    selectBotones();
    if (todosBotonesSeleccionados()) {
      botonSelect.disabled = true;
    }
  });

  botonDeselect.addEventListener("click", function () {
    deselectBotones();
    if (!todosBotonesSeleccionados()) {
      botonDeselect.disabled = true;
    }
  });

  let botonActivo = document.querySelector(".botones.radiologos.btn-activo");

  if (botonActivo) {
    actualizarBotonesSeleccionadosRadiologos(botonActivo);
  }

  botones.forEach(function (boton) {
    boton.addEventListener("click", function () {
      toggleBotonActivoRadiologs(this);
      filtroRadiologos(botonesSeleccionados, botonesSeleccionadosRadiologos);

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

let datosPorRadiologo = {};

function filtroRadiologos(modalidades, radiologos) {
  datosPorRadiologo = {};

  const datosFiltrados = estadisticasAPI.filter((item) => modalidades.includes(item.MODALITAT) && (radiologos.includes(item.METGE_RESPONSABLE) || radiologos.includes(item.METGESIGNAT)));

  datosFiltrados.forEach((item) => {
    let nombreRadiologo;
    if (radiologos.includes(item.METGE_RESPONSABLE)) {
      nombreRadiologo = item.METGE_RESPONSABLE;
    } else if (radiologos.includes(item.METGESIGNAT)) {
      nombreRadiologo = item.METGESIGNAT;
    } else {
      return;
    }

    if (!datosPorRadiologo[nombreRadiologo]) {
      datosPorRadiologo[nombreRadiologo] = {
        informadas: 0,
        completadas: 0,
        programadas: 0,
      };
    }

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

  let total = { informadas: 0, completadas: 0, programadas: 0 };
  Object.values(datosPorRadiologo).forEach((estadisticas) => {
    total.informadas += estadisticas.informadas;
    total.completadas += estadisticas.completadas;
    total.programadas += estadisticas.programadas;
  });

  const totalRealizadas = total.informadas + total.completadas;
  const cartasHTML = generarCarta(totalRealizadas, "Total Realitzades") + generarCarta(total.informadas, "Informades") + generarCarta(total.completadas, "Pendents d'informar") + generarCarta(total.programadas, "No Realitzats");

  const contenedorCartas = document.getElementById("cartesEstadistiquesRadioleg");
  contenedorCartas.innerHTML = cartasHTML;

  crearGrafica(Object.keys(datosPorRadiologo));
}

async function establecerFechas() {
  var modalSpinner = document.getElementById("modalSpinner");
  modalSpinner.style.display = "flex";

  var fechaInicio = document.getElementById("inicio");
  var fechaFinal = document.getElementById("final");
  var fechaActual = new Date();

  var dia = ("0" + fechaActual.getDate()).slice(-2);
  var mes = ("0" + (fechaActual.getMonth() + 1)).slice(-2);
  var anio = fechaActual.getFullYear();
  let final = anio + "-" + mes + "-" + dia;
  fechaFinal.value = final;

  fechaActual.setDate(fechaActual.getDate() - 30);
  var diaInicio = ("0" + fechaActual.getDate()).slice(-2);
  var mesInicio = ("0" + (fechaActual.getMonth() + 1)).slice(-2);
  var anioInicio = fechaActual.getFullYear();
  let inicio = anioInicio + "-" + mesInicio + "-" + diaInicio;
  fechaInicio.value = inicio;

  await obtenerValoresEstadisticas(inicio, final);

  async function cambioFechas() {
    modalSpinner.style.display = "flex";
    let nuevaFechaInicio = fechaInicio.value;
    let nuevaFechaFinal = fechaFinal.value;
    await obtenerValoresEstadisticas(nuevaFechaInicio, nuevaFechaFinal);
    filtroEstadisticas(botonesSeleccionados);
    filtroRadiologos(botonesSeleccionados, botonesSeleccionadosRadiologos);
    modalSpinner.style.display = "none";
  }

  fechaInicio.addEventListener("change", cambioFechas);
  fechaFinal.addEventListener("change", cambioFechas);

  const generarExcelButton = document.querySelector(".excel");

  generarExcelButton.addEventListener("click", function () {
    obtenerExcelRadiologia(formatearFechaExcel(fechaInicio.value), formatearFechaExcel(fechaFinal.value));
  });
  botonesRadiologos();
  botones();

  modalSpinner.style.display = "none";
}

async function obtenerValoresEstadisticas(inicio, final) {
  const dato = await obtenerEstadisticas(inicio, final);
  estadisticasAPI = dato.rows;
}

function filtroEstadisticas(modalidades) {
  const datosFiltrados = estadisticasAPI.filter((item) => modalidades.includes(item.MODALITAT));
  var totalValores = datosFiltrados.length;
  var completadaInformada = 0;
  var informada = 0;
  var completada = 0;
  var programada = 0;

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

  var cartasHTML = "";
  cartasHTML += generarCarta(totalValores, "Estudis Programats");
  cartasHTML += generarCarta(completada + informada, "Total Realitzades");
  cartasHTML += generarCarta(informada, "Informades");
  cartasHTML += generarCarta(completada, "Pendents d'informar");
  cartasHTML += generarCarta(programada, "No Realitzats");

  document.getElementById("cartesEstadistiques").innerHTML = cartasHTML;
}

function generarCarta(valor, texto) {
  return `<div class="card m-2 card-statics">
            <div class="card-body d-flex flex-column justify-content-center">
              <h1 class="card-title">${valor}</h1>
              <h6 class="card-text">${texto}</h6>
            </div>
          </div>`;
}

var radiologos;

function insertarRadiologos() {
  var divRadiologos = document.getElementById("radiologos");

  obtenerRadiologos().then((datos) => {
    radiologos = datos.rows;
    const totalRadiologos = radiologos.length;

    divRadiologos.innerHTML = "";

    const filasPorGrupo = 2;
    const grupos = Math.ceil(totalRadiologos / filasPorGrupo);

    for (let i = 0; i < grupos; i++) {
      const row = document.createElement("div");
      row.className = "row";

      for (let j = i * filasPorGrupo; j < (i + 1) * filasPorGrupo && j < totalRadiologos; j++) {
        const col = document.createElement("div");
        col.className = "col";

        const button = document.createElement("button");
        button;
        button.className = "btn botones btn-block radiologos";
        button.type = "button";
        button.innerHTML = `<h5>${radiologos[j].TRACTE}</h5><h6>${radiologos[j].COLEGIAT ?? ""}</h6>`;

        if (radiologos[j].TRACTE.trim() == "_ No Aplica _") {
          button.classList.add("btn-activo");
        }
        col.appendChild(button);
        row.appendChild(col);
      }

      divRadiologos.appendChild(row);
    }

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

function crearGrafica(radiologos) {
  var dom = document.getElementById("contenedor-grafico");
  var myChart = echarts.init(dom, null, {
    renderer: "canvas",
    useDirtyRect: false,
  });

  var option;

  const grid = {
    left: 100,
    right: 130,
    top: 50,
    bottom: 50,
  };

  // Preparar los datos de cada radiólogo para cada tipo de estadística
  const informadaData = radiologos.map((radiologo) => (datosPorRadiologo[radiologo] ? datosPorRadiologo[radiologo].informadas : 0));
  const completadaData = radiologos.map((radiologo) => (datosPorRadiologo[radiologo] ? datosPorRadiologo[radiologo].completadas : 0));
  const programadaData = radiologos.map((radiologo) => (datosPorRadiologo[radiologo] ? datosPorRadiologo[radiologo].programadas : 0));

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

  if (option && typeof option === "object") {
    myChart.setOption(option);
  }

  window.addEventListener("resize", myChart.resize);
}
