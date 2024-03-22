document.addEventListener("DOMContentLoaded", function () {
  //recojo eventos
  var clickCalendario = document.getElementById("iconoCalenadrio"); //click sobre el icono del calendario
  var inputFecha = document.getElementById("fecha"); //evento sobre el input de fecha

  //llamo a las funciones
  clickCalendario.addEventListener("click", abrirCalendario); //abrir calendario

  //capturo el botón mostrar mas datos
  let botonMostrarMas = document.getElementById("mostrarMasDatos");
  //añado un evento clik al botón mostrar mas Datos del html
  botonMostrarMas.addEventListener("click", llamarFunccion);

  let arrDatosCoinciden = [];
  let idsProcesados = new Set(); // Conjunto para rastrear IDs ya procesados ID_MSG es unico de cada paciente
  let buscador = document.getElementById("buscador"); //capturo el input share 'buscador'
  let botonBuscar = document.getElementById("botonBusador"); //capturo el boton
  botonBuscar.addEventListener("click", function () {
    let datosBuscar = buscador.value.toUpperCase(); // guardo el valor del buscador
    if (datosBuscar) {
      //si existe algo para buscar
      console.log("Dato a buscar:", datosBuscar);
      responseData[0].rows.forEach((segmentoArray) => {
        for (let propiedad in segmentoArray) {
          let valorPropiedad = String(segmentoArray[propiedad]).toUpperCase(); //guardo cada porpiedad en un str
          if (valorPropiedad.includes(datosBuscar)) {
            //si la id unica del paciente ya esta registrada, el continue hara que salte a la sigiente buelta del bucle
            if (idsProcesados.has(segmentoArray.ID_MSG)) {
              continue;
            }
            // Si no esta registrado el id lo guardo
            idsProcesados.add(segmentoArray.ID_MSG);

            // Agregamos el registro al arreglo de coincidencias
            console.log(arrDatosCoinciden, "array");
            //si coincide
            console.log(datosBuscar, "esta en", valorPropiedad);
            //MUESTRO EL RESULTADO QUE COINCIDE.
            //guardo en un array todos los datos
            arrDatosCoinciden.push(segmentoArray);
            var tabla = document.getElementById("dataBody"); //guardo el elemento html body donde se muestran los datos
            tabla.innerHTML = ""; // Vaciamos la tabla

            //guardamos la id donde se mostraran los datos

            arrDatosCoinciden.forEach((datos) => {
              let filasTabla = document.createElement("tr"); // Crear una nueva fila para cada conjunto de datos
              //añado filas al html simientes:
              filasTabla.innerHTML = `
              <td><strong>${origenPaciente(datos.ORIGEN)}</strong></td>
              <td><strong>${datos.NHC}</strong></td>
              <td>${siRetornaNull(datos.AETITLE)}</td>
              <td>${siRetornaNull(datos.DOSE)}</td>
              <td>${siRetornaNull(datos.UNIT)}</td>
              <td>${ordenarNombre(datos.NOMPACIENT)}</td>
              <td>${ordenarData(datos.NACIMIENTO)}</td>
              <td>${ordenarData(datos.DATA_PROVA)}</td>
              <td>${siRetornaNull(datos.MODALITAT)}</td>
              <td>${siRetornaNull(datos.DESC_PROVA)}</td>
              <td>${siRetornaNull(datos.METGE)}</td>
              <td>${siRetornaNull(datos.METGE_RESPONSABLE)}</td>
              <td>${ordenarData(datos.DATA_REALITZADA)}</td>
              <td>${ordenarData(datos.DATA_INFORME)} </td>
              <td>  <a  href="#" onclick="abrirInforme('${datos.INFORME}');" class="fa-regular fa-file-pdf fa-xl" style="color: #000000; display:
              ${mostrarInforme(datos.DATA_INFORME)};"></a></td>                 
              <td id='datosEstado';>${datos.ESTAT}</td>       
                      `;
              tabla.appendChild(filasTabla); //a tabla le metemos dentro las filas
            });
          }
        }
      });
    }
  });
}); //final  DOMContentLoaded
