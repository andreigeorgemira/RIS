import { obtenerDatosGrafica, obtenerEstudiosAno } from "../API/llamadasAPI.js";

function formatearNumero(numero) {
  return numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

var valoresGrafica;

export async function valoresAPI(body, update = true) {
  let datosGraficaPromise = await obtenerDatosGrafica().then((datos) => datos.rows);
  let estudiosAnoPromise = await obtenerEstudiosAno().then((datos) => datos.rows);
  Promise.all([datosGraficaPromise, estudiosAnoPromise]).then(([valoresGraficaAPI, estudiosAnoAPI]) => {
    valoresGrafica = valoresGraficaAPI;
    console.log(update);
    if (update) {
      body.innerHTML = `<div id="estudios" class="container mt-4"></div>
      <div class="container mt-4 grafico">
        <div class="row justify-content-center">
          <div class="col-md-6">
            <div id="chart-container"></div>
          </div>
        </div>
      </div>`;
      crearEstudios(estudiosAnoAPI);
      crearGrafica();
      updateGrafica();
    } else {
      actualizarGrafica(valoresGrafica);
      insertarValores(estudiosAnoAPI);
    }
  });
}

var option = {
  title: {
    text: "TOTAL PROVES REALITZADES",
    left: "center",
    textStyle: {
      fontSize: "20px",
    },
  },
  tooltip: {
    trigger: "item",
  },
  series: [
    {
      name: "Proves totals",
      type: "pie",
      radius: "70%",
      data: [],
      label: {
        show: false,
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
    },
  ],
};

function crearGrafica() {
  const option = {
    series: [
      {
        data: [],
        type: "pie",
      },
    ],
    legend: {
      orient: "vertical",
      top: "middle",
      right: 0,
      textStyle: {
        fontSize: "20px",
      },
      formatter: function (name) {
        return name + ": 0 (0.00%)";
      },
    },
  };

  const dom = document.getElementById("chart-container");
  const myChart = echarts.init(dom, null, {
    renderer: "svg",
    useDirtyRect: false,
  });

  const totalText = document.createElement("div");
  totalText.classList.add("total");
  dom.appendChild(totalText);
  totalText.innerText = "Total: 0";

  if (option && typeof option === "object") {
    myChart.setOption(option, true);
  }

  window.addEventListener("resize", myChart.resize);

  actualizarGrafica(valoresGrafica);
}

function actualizarGrafica(valoresGrafica) {
  console.log(valoresGrafica);
  const sumaTotal = valoresGrafica.reduce((total, valor) => total + valor.value, 0);

  const datosFormateados = valoresGrafica.map((valor) => ({
    value: valor.value,
    name: valor.name,
    label: {
      formatter: function (params) {
        return `${params.name}: ${formatearNumero(params.value)} (${((params.value / sumaTotal) * 100).toFixed(2)}%)`;
      },
    },
  }));

  option.series[0].data = datosFormateados;

  option.legend = {
    orient: "vertical",
    top: "middle",
    right: 0,
    textStyle: {
      fontSize: "20px",
    },
    formatter: function (name) {
      const item = valoresGrafica.find((item) => item.name === name);
      const porcentaje = ((item.value / sumaTotal) * 100).toFixed(2);
      return `${name}: ${formatearNumero(item ? item.value : 0)} (${porcentaje}%)`;
    },
  };

  const dom = document.getElementById("chart-container");
  const myChart = echarts.getInstanceByDom(dom);

  const totalText = dom.querySelector(".total");
  if (totalText) {
    totalText.innerText = "Total: " + formatearNumero(sumaTotal);
  }

  if (option && typeof option === "object" && myChart) {
    myChart.setOption(option, true);
  }

  window.addEventListener("resize", () => {
    if (myChart) {
      myChart.resize();
    }
  });
}

// Función para crear la estructura HTML
function crearEstudios(estudiosAno) {
  var estudios = document.getElementById("estudios");
  estudios.innerHTML = "";
  let titulo = document.createElement("h3");
  titulo.textContent = "Any en curs";
  titulo.classList.add("text-center");
  titulo.classList.add("mb-3");
  estudios.appendChild(titulo);

  for (let i = 0; i < 2; i++) {
    const nuevaFila = document.createElement("div");
    nuevaFila.classList.add("row");

    for (let j = 0; j < 3; j++) {
      const nuevaColumna = document.createElement("div");
      nuevaColumna.classList.add("col-md-4");

      const indice = i * 3 + j;
      if (indice < estudiosAno.length) {
        nuevaColumna.innerHTML = `
              <div class="card mb-4">
                  <div class="card-body">
                      <h1 class="card-title"></h1>
                      <h6 class="card-text"></h6>
                  </div>
              </div>
          `;
      }

      nuevaFila.appendChild(nuevaColumna);
    }

    estudios.appendChild(nuevaFila);
  }
  insertarValores(estudiosAno);
}

// Función para insertar los valores dentro del HTML generado
function insertarValores(estudiosAno) {
  const cards = document.querySelectorAll("#estudios .card");
  cards.forEach((card, index) => {
    const dato = estudiosAno[index];
    if (dato) {
      card.querySelector(".card-title").textContent = dato.value;
      card.querySelector(".card-text").textContent = dato.name;
    }
  });
}

let temporizador;
var update = false;

function updateGrafica() {
  temporizador = setTimeout(function () {
    valoresAPI(null, update);
    updateGrafica();
  }, 60000);
}

export function stopUpdateGrafica() {
  clearTimeout(temporizador);
}
