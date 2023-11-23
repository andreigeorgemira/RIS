export function formatearHora(hora) {
  return hora.slice(0, 2) + ":" + hora.slice(2, 4);
}

export function fechaFormateada(fecha) {
  var fechaOriginal = new Date(fecha);
  var dia = fechaOriginal.getDate();
  var mes = fechaOriginal.getMonth() + 1;
  var anio = fechaOriginal.getFullYear();

  var diaFormateado = dia < 10 ? "0" + dia : dia;
  var mesFormateado = mes < 10 ? "0" + mes : mes;

  var fechaFormateada = `${diaFormateado}/${mesFormateado}/${anio}`;

  return fechaFormateada;
}

export function datosSelect(datosAPI, filtro) {
  // Vacía el contenido actual del select
  filtro.innerHTML = "";

  // Itera sobre los elementos en 'rows' y crea opciones para el selector
  datosAPI.rows.forEach((row) => {
    // Verifica si el ID es "ALT" y omite la opción
    if (row.ID === "ALT") {
      return;
    }

    // Crea un elemento de opción
    var optionElement = document.createElement("option");

    // Asigna el valor y el texto del elemento de opción
    optionElement.value = row.ID; // Asegúrate de que la propiedad 'numero' sea la correcta en tus datos
    optionElement.textContent = row.DESCRIPCIO; // Asegúrate de que la propiedad 'texto' sea la correcta en tus datos

    // Verifica si el ID es 580 y marca la opción como seleccionada
    if (row.ID === 580) {
      optionElement.selected = true;
    }

    // Añade la opción al selector
    filtro.appendChild(optionElement);
  });
}