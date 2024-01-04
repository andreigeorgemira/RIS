function llamadaAPI() {
  return (
    fetch("https://localhost:7224/Radiologia/api/v4/ris/radiofisic/GetWorklist", {
      method: "POST",
      headers: {
        Accept: "application/json",
        //en la cabecera hay el tipo de documento y la consulta a la api
        "Content-Type": "application/json-patch+json",
      },
      //consulta api
      body: JSON.stringify(
        //transformamos lo siguiente a formato json que es lo que quiero la api
        {
          center: "CMQR",
          fromDate: "01/01/2023",
          toDate: "02/01/2023",
        }
      ),
    })
      //manejar respuesta asíncrona
      //.then(response => response.json())  // Analizar los datos JSON
      //.then(data => console.log(data))    // Registrar los datos en la consola
      //.catch(error => console.error('Error:', error));  // Manejar cualquier error
      .then((response) => response.json())
  );
}

var responseData;

Promise.all([llamadaAPI()]).then((data) => {
  console.log(data);
  responseData = data;
});
