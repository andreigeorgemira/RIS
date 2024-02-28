import { obtenerDatosGrafica, obtenerEstudiosAno } from "../API/llamadasAPI.js";

function formatearNumero(numero) {
  return numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export async function datosGrafica(body) {
  let datosGraficaPromise = await obtenerDatosGrafica().then((datos) => datos.rows);
  let estudiosAnoPromise = await obtenerEstudiosAno().then((datos) => datos.rows);
  Promise.all([datosGraficaPromise, estudiosAnoPromise]).then(([valoresGrafica, estudiosAno]) => {
    body.innerHTML = `<div id="estudios" class="container mt-4"></div>
                      <div class="container mt-4 grafico">
                        <div class="row justify-content-center">
                          <div class="col-md-6">
                            <div id="chart-container"></div>
                          </div>
                        </div>
                      </div>`;
    crearGrafica(valoresGrafica);
    crearEstudios(estudiosAno);
    updateGrafica();
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

function crearGrafica(valoresGrafica) {
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

  var dom = document.getElementById("chart-container");
  var myChart = echarts.init(dom, null, {
    renderer: "svg",
    useDirtyRect: false,
  });

  var totalText = dom.querySelector(".total");
  if (!totalText) {
    totalText = document.createElement("div");
    totalText.classList.add("total");
    dom.appendChild(totalText);
  }

  totalText.innerText = "Total: " + formatearNumero(sumaTotal);

  if (option && typeof option === "object") {
    myChart.setOption(option, true);
  }

  window.addEventListener("resize", myChart.resize);
}

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
        const dato = estudiosAno[indice];
        nuevaColumna.innerHTML = `
              <div class="card mb-4">
                  <div class="card-body">
                      <h1 class="card-title">${dato.value}</h1>
                      <h6 class="card-text">${dato.name}</h6>
                  </div>
              </div>
          `;
      }

      nuevaFila.appendChild(nuevaColumna);
    }

    estudios.appendChild(nuevaFila);
  }
}

let temporizador;

function updateGrafica() {
  temporizador = setTimeout(function () {
    datosGrafica();
    updateGrafica();
  }, 60000);
}

export function stopUpdateGrafica() {
  clearTimeout(temporizador);
}
