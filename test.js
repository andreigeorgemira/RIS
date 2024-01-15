async function obtenerMasCitasPaciente(numage) {
  return fetch("https://localhost:7224/Radiologia/api/v4/ris/tecnic/HasMoreDates", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      center: "CMQR",
      numage: numage,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Respuesta de la API:", data);
    })
    .catch((error) => {
      console.error("Error al realizar la petición:", error);
    });
}

numage = 604033;
obtenerMasCitasPaciente(numage);
