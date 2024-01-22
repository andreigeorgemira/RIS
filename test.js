let url = "https://localhost:7224/Radiologia/api/v4/";
let nhc = "58073";
let valores;
let tabla = document.getElementById("tbody");

obtenerEstudiosAnteriores(nhc).then((dato) => {
  valores = dato.rows;
  valores.forEach((dato) => {
    let row = document.createElement("tr");
    row.innerHTML = `
    <td>${dato.NHC}</td>
    <td>${dato.EPISODI}</td>
    <td>${dato.AMPLIADA}</td>
    <td>${dato.DESCRIPCIO}</td>
    <td>${dato.DATA}</td>
    <td><a href="${dato.DOCUMENT}"> <i class="fa-solid fa-lungs fa-xl" style="color: #000000;"></i></a></td>`;
    tabla.appendChild(row);
  });
});

function obtenerRadiologoAsignado(nhc) {
  return fetch(url + "ris/radioleg/GetOldReports", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      center: "CMQR",
      nhc: nhc,
    }),
  }).then((respuesta) => respuesta.json());
}
