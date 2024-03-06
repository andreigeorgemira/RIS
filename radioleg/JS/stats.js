import { obtenerEstadisticas, obtenerRadiologos } from "../API/llamadasAPI.js";

export function crearContenido(body) {
  body.innerHTML = `<div class="stats">
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
        <div class="d-flex flex-wrap">
          <div class="card m-2 card-statics">
            <div class="card-body d-flex flex-column justify-content-center">
              <h1 class="card-title" id="total-realitzades">0</h1>
              <h6 class="card-text">Total Realitzades</h6>
            </div>
          </div>
          <div class="card m-2 card-statics">
            <div class="card-body d-flex flex-column justify-content-center">
              <h1 class="card-title" id="informades">0</h1>
              <h6 class="card-text">Informades</h6>
            </div>
          </div>
          <div class="card m-2 card-statics">
            <div class="card-body d-flex flex-column justify-content-center">
              <h1 class="card-title" id="pendents-informar">0</h1>
              <h6 class="card-text">Pendents d'informar</h6>
            </div>
          </div>
          <div class="card m-2 card-statics">
            <div class="card-body d-flex flex-column justify-content-center">
              <h1 class="card-title" id="no-realitzats">0</h1>
              <h6 class="card-text">No Realitzats</h6>
            </div>
          </div>
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
</div>`;
  establecerFechas();
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
  rotateButton.className = "btn btn-warning btn-block";
  rotateButton.type = "button";
  var icon = document.createElement("i");
  icon.className = "fa-solid fa-arrow-rotate-right fa-xl";
  icon.style.color = "#000000";
  rotateButton.appendChild(icon);

  rotateButtonCol.appendChild(rotateButton);
  rotateButtonDiv.appendChild(rotateButtonCol);
  buttonContainer.appendChild(rotateButtonDiv);

  container.appendChild(buttonContainer);

  var containerFluid = document.querySelector(".container-fluid .row");

  var estadisticasDiv = document.querySelector(".container-fluid .row .col-md-10.top");

  containerFluid.insertBefore(container, estadisticasDiv);
}

var estadisitcasAPI;
var botonesSeleccionados = [];

function toggleBotonActivo(boton, activados) {
  if (activados) {
    boton.classList.add("btn-activo");
  } else {
    boton.classList.remove("btn-activo");
  }
}

function botonSeleccionado(boton, botonesSeleccionados) {
  const modalidad = boton.textContent;
  const index = botonesSeleccionados.indexOf(modalidad);
  if (boton.classList.contains("btn-activo")) {
    if (index === -1) {
      if (modalidad === "DX") {
        botonesSeleccionados.push("DX");
        botonesSeleccionados.push("CR");
      } else {
        botonesSeleccionados.push(modalidad);
      }
    }
  } else {
    if (index !== -1) {
      if (modalidad === "DX") {
        botonesSeleccionados.splice("DX");
        botonesSeleccionados.splice("CR");
      } else {
        botonesSeleccionados.splice(index, 1);
      }
    }
  }
}

function botones() {
  const buttons = document.querySelectorAll(".botones:not(.radiologos)");
  const botonSelect = document.getElementById("select");
  var activados = false;

  buttons.forEach((button) => {
    botonSeleccionado(button, botonesSeleccionados);
  });

  function activarBotones() {
    activados = !activados;
    buttons.forEach((boton) => {
      toggleBotonActivo(boton, activados);
      botonSeleccionado(boton, botonesSeleccionados);
    });
    filtroEstadisticas(botonesSeleccionados);
  }

  function botonSeleccionadoIndividual(event) {
    event.target.classList.toggle("btn-activo");
    botonSeleccionado(event.target, botonesSeleccionados);
    filtroEstadisticas(botonesSeleccionados);
  }

  botonSelect.addEventListener("click", activarBotones);

  buttons.forEach((button) => {
    button.addEventListener("click", botonSeleccionadoIndividual);
  });

  filtroEstadisticas(botonesSeleccionados);
}

async function establecerFechas() {
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

  // Esperar a que se obtengan los valores de estadísticas
  await obtenerValoresEstadisticas(inicio, final);

  insertarRadiologos();
  crearGrafica();
}

async function obtenerValoresEstadisticas(inicio, final) {
  try {
    const dato = await obtenerEstadisticas(inicio, final);
    estadisitcasAPI = dato.rows;
  } catch (error) {
    console.error("Error al obtener estadísticas:", error);
  }
}

function filtroEstadisticas(modalidades) {
  const datosFiltrados = estadisitcasAPI.filter((item) => modalidades.includes(item.MODALITAT));
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

function insertarRadiologos() {
  var divRadiologos = document.getElementById("radiologos");

  obtenerRadiologos().then((datos) => {
    var radiologos = datos.rows;
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
        button.className = "btn botones btn-block radiologos";
        button.type = "button";
        button.innerHTML = `<h5>${radiologos[j].TRACTE}</h5><h6>${radiologos[j].COLEGIAT ?? ""}</h6>`;

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
    buttonDeselect.className = "btn btn-danger btn-block";
    buttonDeselect.type = "button";
    buttonDeselect.textContent = "DESMARCAR TOTES";
    colDeselect.appendChild(buttonDeselect);
    rowDeselect.appendChild(colDeselect);
    divRadiologos.appendChild(rowDeselect);
  });
  botones();
}

function crearGrafica() {
  var dom = document.getElementById("contenedor-grafico");
  var myChart = echarts.init(dom, null, {
    renderer: "canvas",
    useDirtyRect: false,
  });

  var option;

  const rawData = [
    [100, 200, 300, 400, 500, 600, 700],
    [150, 250, 350, 450, 550, 650, 750],
  ];

  const totalData = [];
  for (let i = 0; i < rawData[0].length; ++i) {
    let sum = 0;
    for (let j = 0; j < rawData.length; ++j) {
      sum += rawData[j][i];
    }
    totalData.push(sum);
  }
  const grid = {
    left: 100,
    right: 130,
    top: 50,
    bottom: 50,
  };
  const series = ["Video Ad", "Search Engine"].map((name, sid) => {
    return {
      name,
      type: "bar",
      stack: "total",
      barWidth: "60%",
      label: {
        show: true,
        formatter: (params) => Math.round(params.value * 1000) / 10 + "%",
      },
      data: rawData[sid].map((d, did) => (totalData[did] <= 0 ? 0 : d / totalData[did])),
    };
  });
  option = {
    legend: {
      orient: "vertical",
      right: 0,
      top: "middle",
      selectedMode: true,
    },
    grid,
    yAxis: {
      type: "value",
    },
    xAxis: {
      type: "category",
      data: ["doctor", "doctor", "doctor", "doctor", "doctor", "doctor", "doctor"],
    },
    series,
  };

  if (option && typeof option === "object") {
    myChart.setOption(option);
  }

  window.addEventListener("resize", myChart.resize);
}
