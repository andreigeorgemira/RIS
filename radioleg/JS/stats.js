import { obtenerEstadisticas, obtenerRadiologos } from "../API/llamadasAPI.js";

export function crearContenido(body) {
  body.innerHTML = `    <div class="stats">
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
      <div class="col-md-2">
        <div class="d-grid gap-2">
          <div class="row">
            <div class="col">
              <button class="btn botones btn-block" type="button">CT</button>
            </div>
            <div class="col">
              <button class="btn btn-block" type="button">DX</button>
            </div>
            <div class="col">
              <button class="btn btn-block" type="button">US</button>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <button class="btn btn-block" type="button">MG</button>
            </div>
            <div class="col">
              <button class="btn btn-block" type="button">PT</button>
            </div>
            <div class="col">
              <button class="btn btn-block" type="button">NM</button>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <button class="btn btn-block" type="button">MR</button>
            </div>
            <div class="col">
              <button class="btn btn-block" type="button">RF</button>
            </div>
            <div class="col">
              <button class="btn btn-block" type="button">PX</button>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <button class="btn btn-block" type="button">OT</button>
            </div>
            <div class="col">
              <button class="btn btn-block" type="button">XC</button>
            </div>
            <div class="col">
              <button class="btn btn-block" type="button">DOC</button>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <button id="select" class="btn btn-primary btn-block" type="button">SELECCIONA TOTES</button>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <button class="btn btn-warning btn-block" type="button">
                <i class="fa-solid fa-arrow-rotate-right fa-xl" style="color: #000000" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-10 top">
        <div class="d-flex justify-content-between">
          <h3>&nbsp;&nbsp;Estadístiques</h3>
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
        <div class="d-flex justify-content-between">
          <h3>&nbsp;&nbsp;Estadístiques per radiòleg</h3>
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
}

function botones() {
  const buttons = document.querySelectorAll(".botones");

  console.log(buttons);

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      // Toggle active class
      this.classList.toggle("btn-activo");

      // Perform some action when button is clicked
      if (this.classList.contains("btn-activo")) {
        // Add your action here
        console.log(`Button ${this.textContent} was clicked and is now active.`);
      } else {
        // Revert action when button is clicked again
        console.log(`Button ${this.textContent} was clicked and is no longer active.`);
      }
    });
  });
}

function establecerFechas() {
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

  datosEstadisticas(inicio, final);
  insertarRadiologos();
  crearGrafica();
}

function datosEstadisticas(inicio, final) {
  obtenerEstadisticas(inicio, final).then((dato) => {
    var valores = dato.rows;
    var totalValores = valores.length;
    var completadaInformada = 0;
    var informada = 0;
    var completada = 0;
    var programada = 0;

    valores.forEach((item) => {
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

    function generarCarta(valor, texto) {
      return `<div class="card m-2 card-statics">
                <div class="card-body d-flex flex-column justify-content-center">
                  <h1 class="card-title">${valor}</h1>
                  <h6 class="card-text">${texto}</h6>
                </div>
              </div>`;
    }

    var cartasHTML = "";
    cartasHTML += generarCarta(totalValores, "Estudis Programats");
    cartasHTML += generarCarta(completada + informada, "Total Realitzades");
    cartasHTML += generarCarta(informada, "Informades");
    cartasHTML += generarCarta(completada, "Pendents d'informar");
    cartasHTML += generarCarta(programada, "No Realitzats");

    document.getElementById("cartesEstadistiques").innerHTML = cartasHTML;
  });
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
        button.className = "btn botones btn-block radilogos";
        button.type = "button";
        button.innerHTML = `<h5>${radiologos[j].TRACTE}</h5><h6>${radiologos[j].COLEGIAT ?? ""}</h6>`;

        col.appendChild(button);
        row.appendChild(col);
      }

      divRadiologos.appendChild(row);
    }

    botones();

    const rowSelect = document.createElement("div");
    rowSelect.className = "row";
    const colSelect = document.createElement("div");
    colSelect.className = "col";
    const buttonSelect = document.createElement("button");
    buttonSelect.id = "select";
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
