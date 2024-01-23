console.time("Tiempo de ejecución");
let url = "https://localhost:7224/Radiologia/api/v4/";
let nsol = "196994";
let valores;

let tbodypruebas = document.getElementById("tbodyPruebas");

function obtenerEstudiosRagiologico(nsol) {
  return fetch(url + "ris/tecnic/getstudy", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      center: "CMQR",
      num: nsol,
      tipo: "nsol",
    }),
  }).then((respuesta) => respuesta.json());
}

obtenerEstudiosRagiologico(nsol).then((datos) => {
  valores = datos.rows;
  tbodypruebas.innerHTML = "";

  valores.forEach((valor) => {
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

console.timeEnd("Tiempo de ejecución");
