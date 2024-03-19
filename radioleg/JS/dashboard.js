// Importar funciones desde el archivo llamadasAPI.js
import { obtenerDatosGrafica, obtenerEstudiosAno } from "../API/llamadasAPI.js";

// Función para formatear números con separador de miles
function formatearNumero(numero) {
  return numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Variable para almacenar los valores de la gráfica
var valoresGrafica;

// Función principal para obtener los datos de la API y actualizar la interfaz
export function valoresAPI(body, update = true) {
  // Iniciar las operaciones asíncronas para obtener los datos de la API
  let datosGraficaPromise = obtenerDatosGrafica().then((datos) => datos.rows);
  let estudiosAnoPromise = obtenerEstudiosAno().then((datos) => datos.rows);

  // Esperar a que ambas promesas se resuelvan
  Promise.all([datosGraficaPromise, estudiosAnoPromise]).then(([valoresGraficaAPI, estudiosAnoAPI]) => {
    // Almacenar los valores de la API en la variable global
    valoresGrafica = valoresGraficaAPI;

    // Si se requiere una actualización de la interfaz
    if (update) {
      // Insertar elementos HTML en el cuerpo del documento
      body.innerHTML += `<div id="estudios" class="container mt-4"></div>
      <div class="container mt-4 grafico">
        <div class="row justify-content-center">
          <div class="col-md-6">
            <div id="chart-container"></div>
          </div>
        </div>
      </div>`;
      // Crear elementos de los estudios
      crearEstudios(estudiosAnoAPI);
      // Crear la gráfica
      crearGrafica();
      // Actualizar la gráfica
      updateGrafica();
    } else {
      // Actualizar la gráfica sin crear nuevos elementos
      actualizarGrafica(valoresGrafica);
      // Insertar valores de los estudios
      insertarValores(estudiosAnoAPI);
    }
  });
}

// Opciones de la gráfica
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

// Función para crear la gráfica
function crearGrafica() {
  // Configuración de la gráfica
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

  // Obtener el contenedor de la gráfica
  const dom = document.getElementById("chart-container");
  // Inicializar la gráfica
  const myChart = echarts.init(dom, null, {
    renderer: "svg",
    useDirtyRect: false,
  });

  // Crear elemento para mostrar el total
  const totalText = document.createElement("div");
  totalText.classList.add("total");
  dom.appendChild(totalText);
  totalText.innerText = "Total: 0";

  // Configurar la opción de la gráfica
  if (option && typeof option === "object") {
    myChart.setOption(option, true);
  }

  // Escuchar cambios en el tamaño de la ventana
  window.addEventListener("resize", myChart.resize);

  // Actualizar la gráfica con los valores actuales
  actualizarGrafica(valoresGrafica);
}

// Función para actualizar la gráfica con nuevos valores
function actualizarGrafica(valoresGrafica) {
  // Calcular la suma total de los valores
  const sumaTotal = valoresGrafica.reduce((total, valor) => total + valor.value, 0);

  // Formatear los datos para mostrar en la gráfica
  const datosFormateados = valoresGrafica.map((valor) => ({
    value: valor.value,
    name: valor.name,
    label: {
      formatter: function (params) {
        return `${params.name}: ${formatearNumero(params.value)} (${((params.value / sumaTotal) * 100).toFixed(2)}%)`;
      },
    },
  }));

  // Actualizar los datos de la gráfica
  option.series[0].data = datosFormateados;

  // Configurar la leyenda de la gráfica
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

  // Obtener la instancia de la gráfica
  const dom = document.getElementById("chart-container");
  const myChart = echarts.getInstanceByDom(dom);

  // Actualizar el texto del total
  const totalText = dom.querySelector(".total");
  if (totalText) {
    totalText.innerText = "Total: " + formatearNumero(sumaTotal);
  }

  // Configurar la opción de la gráfica
  if (option && typeof option === "object" && myChart) {
    myChart.setOption(option, true);
  }

  // Escuchar cambios en el tamaño de la ventana
  window.addEventListener("resize", () => {
    if (myChart) {
      myChart.resize();
    }
  });
}

// Función para crear la estructura HTML de los estudios
function crearEstudios(estudiosAno) {
  // Obtener el contenedor de los estudios
  var estudios = document.getElementById("estudios");
  // Limpiar el contenido anterior
  estudios.innerHTML = "";
  // Crear título
  let titulo = document.createElement("h3");
  titulo.textContent = "Any en curs";
  titulo.classList.add("text-center");
  titulo.classList.add("mb-3");
  estudios.appendChild(titulo);

  // Crear filas y columnas para los estudios
  for (let i = 0; i < 2; i++) {
    const nuevaFila = document.createElement("div");
    nuevaFila.classList.add("row");

    for (let j = 0; j < 3; j++) {
      const nuevaColumna = document.createElement("div");
      nuevaColumna.classList.add("col-md-4");

      const indice = i * 3 + j;
      if (indice < estudiosAno.length) {
        // Insertar tarjeta para cada estudio
        nuevaColumna.innerHTML = `
              <div class="card mb-4 estudios">
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
  // Insertar valores de los estudios
  insertarValores(estudiosAno);
}

// Función para insertar valores de los estudios en el HTML generado
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

// Temporizador para actualizar automáticamente la gráfica
let temporizador;
var update = false;

// Función para iniciar la actualización automática de la gráfica
function updateGrafica() {
  temporizador = setTimeout(function () {
    valoresAPI(null, update);
    updateGrafica();
  }, 60000);
}

// Función para detener la actualización automática de la gráfica
export function stopUpdateGrafica() {
  clearTimeout(temporizador);
}
