document.addEventListener("DOMContentLoaded", function () {
  // Obtener los datos del archivo JSON
  fetch("datos.json")
    .then((response) => response.json())
    .then((data) => {
      // Ordenar los datos por ID de menor a mayor
      data.sort((a, b) => parseInt(a.ID) - parseInt(b.ID));

      // Insertar los datos ordenados en la tabla HTML
      const tablaBody = document.getElementById("datosBody");
      data.forEach((dato) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `<td>${dato.ID}</td><td>${dato.DESCRIPTION}</td>`;

        // Verificar si la descripción comienza con alguno de los textos específicos (ignorando mayúsculas/minúsculas y espacios en blanco)
        const textosEspecificos = ["CR", "DX", "NM", "CT", "MG", "US", "GENERICA", "01", "00", "MR", "RM", "RF"];
        if (textosEspecificos.some((texto) => dato.DESCRIPTION.trim().toUpperCase().startsWith(texto.toUpperCase()))) {
          fila.classList.add("fondo-verde"); // Agregar clase para el fondo verde
        }

        tablaBody.appendChild(fila);
      });
    })
    .catch((error) => console.error("Error al cargar los datos:", error));
});

/**
 * TODOS GENERICA
 *
 * CR -> DX -> 01 -> 00
 * CT -> NM
 * MG
 * US
 * MR -> RM
 * RF
 *
 */
