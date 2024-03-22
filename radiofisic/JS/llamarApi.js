//Creamos una consulta de la appi
//hacer cabecera de llamada -> poner url + metodo + cabecera + cuerpo + manejo respuesta

/**
 * LLamada api a GetWorklist de radiofisic
 * @returns respuesta de la appi
 */
function llamadaAPIradioFisico() {
  //url del radiofisic  GetWorklist
  return fetch("https://localhost:7224/Radiologia/api/v4/ris/radiofisic/GetWorklist", {
    //método
    method: "POST",
    headers: {
      //cabecera
      Accept: "application/json",
      "Content-Type": "application/json-patch+json",
    },
    //Cuerpo
    body: JSON.stringify(
      //transformamos lo siguiente a formato json que es lo que quiero la api
      {
        center: "CMQR",
        fromDate: "01/01/2023",
        toDate: "02/01/2023",
      }
    ),
  }) //Manejo de respuesta
    .then((response) => response.json());
}
