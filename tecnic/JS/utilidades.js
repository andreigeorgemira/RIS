export function formatearHora(hora) {
  return hora.slice(0, 2) + ":" + hora.slice(2, 4);
}

export function fechaFormateada(fecha) {
  let fechaOriginal = new Date(fecha);
  let dia = fechaOriginal.getDate();
  let mes = fechaOriginal.getMonth() + 1;
  let anio = fechaOriginal.getFullYear();

  // Formatear siempre en el orden "dd/mm/aaaa"
  let diaFormateado = dia.toString().padStart(2, "0");
  let mesFormateado = mes.toString().padStart(2, "0");

  let fechaFormateada = `${diaFormateado}/${mesFormateado}/${anio}`;

  return fechaFormateada;
}

// Variable global para almacenar la última opción seleccionada
let lastSelectedOption = null;

export function datosSelect(datosAPI, selectElement) {
  // Verificar que los datosAPI y rows existan
  if (!datosAPI || !datosAPI.rows) {
    // Manejar el caso de datosAPI nulo o sin propiedad 'rows'
    return;
  }

  // Vaciar el contenido actual del select
  selectElement.innerHTML = "";

  // Iterar sobre los elementos en 'rows' y crear opciones para el selector
  datosAPI.rows.forEach((row) => {
    // Verificar propiedades antes de acceder a ellas
    if (row.ID === "ALT" || !row.ID || !row.DESCRIPCIO) {
      // Omitir la opción si el ID es "ALT" o si faltan propiedades
      return;
    }

    // Crear un elemento de opción
    let optionElement = document.createElement("option");

    // Asignar el valor y el texto del elemento de opción
    optionElement.value = row.ID;
    optionElement.textContent = row.DESCRIPCIO;

    // Marcar la opción con ID 580 como seleccionada por defecto
    if (row.ID === 580 && lastSelectedOption === null) {
      optionElement.selected = true;
      lastSelectedOption = 580; // Actualizar la variable global
    } else if (lastSelectedOption !== null && row.ID.toString() === lastSelectedOption.toString()) {
      optionElement.selected = true; // Seleccionar la última opción almacenada
    }

    // Añadir la opción al selector
    selectElement.appendChild(optionElement);
  });

  // Agregar un evento de cambio al selector para actualizar la opción seleccionada
  selectElement.addEventListener("change", function () {
    lastSelectedOption = selectElement.value;
  });
}
