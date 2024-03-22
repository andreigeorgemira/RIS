document.addEventListener("DOMContentLoaded", function () {
  //guardamos la id donde se mostraran los datos
  //creamos un bucle para que inserte los datos
  window.responseData = {
    rows: [
      {
        VISIBLE: "true",
        DOSE: "2.3",
        UNIT: "dGy*cm2",
        ID_MSG: "45696acf-6747-4104-92df-a92d8cb5a759",
        DATA_MSG: "2023-01-01T10:39:15",
        CENTRE: "CMQR",
        ACCESSION_NUMBER: "QU174558",
        AGENDA: "0         ",
        NSOL: "174558",
        NHC: "10601881       ",
        NOMPACIENT: "COLLADOS PRAT,ESPERANZA",
        PROVA: "RXABD",
        DESC_PROVA: "Rx Abdomen Bipedestacio N",
        MODALITAT: "CR",
        EPISODI: "1.2.826.0.1.3680043.2.403.297.1230101103937008.17.345049564013",
        ESTAT: "Completada",
        METGE: "14882",
        METGE_RESPONSABLE: "NO APLICA",
        DATA_PROVA: "2023-01-01T10:39:00",
        DATA_REALITZADA: "2023-01-01T11:46:07",
        DATA_INFORME: null,
        INFORME: null,
        RUTA_RAIM: null,
        SERVEI: "MEG",
        DESC_SERVEI: "MEDICINA GENERAL",
        OBSERVACIONS: "Còlic",
        ORIGEN: "URGENCIES",
        OBSERVACIONS_TECNIC: null,
        ERRORS: 0,
        TECNIC: "717",
        LLIGAT: 1,
        DATA_UPDATE: "2023-01-01T10:43:03",
        HC3ESTAT: 2,
        HC3ESTUDI: "70131056211747362675060164369366122496",
        AETITLE: "PORTDX9CMQ01",
        ESTAT_INFORME_UDIAT: 0,
        DATA_CANVI_ESTAT_INFO_UDIAT: null,
        ESTAT_INFORME_IDI: 0,
        UNIVERS: "HNET",
        AETITLE_SAP: null,
        RIS_TANCAT: null,
        OLD_NHC: "65266     ",
        NOMPACIENT_GENOMI: "COLLADOS PRAT, ESPERANZA",
        NACIMIENTO: "1967-09-16T00:00:00", //nacimiento 1
      },
      {
        VISIBLE: "true",
        DOSE: "5.305",
        UNIT: "dGy*cm2",
        ID_MSG: "a6016ebe-5455-4992-936e-28aabbd4ec25",
        DATA_MSG: "2023-01-01T10:53:45",
        CENTRE: "CMQR",
        ACCESSION_NUMBER: "QU174560",
        AGENDA: "0         ",
        NSOL: "174560",
        NHC: "13796891       ",
        NOMPACIENT: "GARRIDO FORCADELL,OSCAR",
        PROVA: "RXABD",
        DESC_PROVA: "Rx Abdomen Bipedestacio N",
        MODALITAT: "CR",
        EPISODI: "1.2.826.0.1.3680043.2.403.297.1230101105410463.37.345049564013",
        ESTAT: "Completada",
        METGE: "14882",
        METGE_RESPONSABLE: null,
        DATA_PROVA: "2023-01-01T10:53:00",
        DATA_REALITZADA: "2023-01-01T12:00:21",
        DATA_INFORME: null,
        INFORME: null,
        RUTA_RAIM: null,
        SERVEI: "MEG",
        DESC_SERVEI: "MEDICINA GENERAL",
        OBSERVACIONS: "Dolor abdominal",
        ORIGEN: "URGENCIES",
        OBSERVACIONS_TECNIC: null,
        ERRORS: null,
        TECNIC: null,
        LLIGAT: 1,
        DATA_UPDATE: "2023-05-18T14:14:12",
        HC3ESTAT: 2,
        HC3ESTUDI: "70129758137532728968153031745283817472",
        AETITLE: "PORTDX9CMQ01",
        ESTAT_INFORME_UDIAT: 0,
        DATA_CANVI_ESTAT_INFO_UDIAT: null,
        ESTAT_INFORME_IDI: 0,
        UNIVERS: "HNET",
        AETITLE_SAP: null,
        RIS_TANCAT: null,
        OLD_NHC: "43777     ",
        NOMPACIENT_GENOMI: "GARRIDO FORCADELL, OSCAR",
        NACIMIENTO: "1974-08-03T00:00:00",
      },
      {
        VISIBLE: "true",
        DOSE: "1.246",
        UNIT: "dGy*cm2",
        ID_MSG: "8b639223-cb36-4e56-8603-622f751cdecd",
        DATA_MSG: "2023-01-01T11:14:00",
        CENTRE: "CMQR",
        ACCESSION_NUMBER: "QU174561",
        AGENDA: "0         ",
        NSOL: "174561",
        NHC: "15750713       ",
        NOMPACIENT: "FERNANDEZ MARTIN,MANUEL",
        PROVA: "RXTOR",
        DESC_PROVA: "Rx Torax PA N",
        MODALITAT: "CR",
        EPISODI: "1.2.826.0.1.3680043.2.403.297.1230101111424842.45.345049564013",
        ESTAT: "Completada",
        METGE: "14882",
        METGE_RESPONSABLE: null,
        DATA_PROVA: "2023-01-01T11:14:00",
        DATA_REALITZADA: "2023-01-01T12:21:34",
        DATA_INFORME: null,
        INFORME: null,
        RUTA_RAIM: null,
        SERVEI: "MEG",
        DESC_SERVEI: "MEDICINA GENERAL",
        OBSERVACIONS: "Tos i expectoracio",
        ORIGEN: "URGENCIES",
        OBSERVACIONS_TECNIC: null,
        ERRORS: null,
        TECNIC: null,
        LLIGAT: 1,
        DATA_UPDATE: "2023-01-01T11:17:22",
        HC3ESTAT: 2,
        HC3ESTUDI: "70128460063318095261245899121201512448",
        AETITLE: "PORTDX9CMQ01",
        ESTAT_INFORME_UDIAT: 0,
        DATA_CANVI_ESTAT_INFO_UDIAT: null,
        ESTAT_INFORME_IDI: 0,
        UNIVERS: "HNET",
        AETITLE_SAP: null,
        RIS_TANCAT: null,
        OLD_NHC: "273797    ",
        NOMPACIENT_GENOMI: "FERNANDEZ MARTIN, MANUEL",
        NACIMIENTO: "1976-08-07T00:00:00",
      },
      {
        VISIBLE: "true",
        DOSE: "0.888",
        UNIT: "dGy*cm2",
        ID_MSG: "3257f4a2-aa0c-444d-85d1-6a1c0ba02731",
        DATA_MSG: "2023-01-01T12:19:15",
        CENTRE: "CMQR",
        ACCESSION_NUMBER: "QU174562",
        AGENDA: "0         ",
        NSOL: "174562",
        NHC: "990912         ",
        NOMPACIENT: "CABRE SERRANO,TERESA",
        PROVA: "RXTOR",
        DESC_PROVA: "Rx Torax PA N",
        MODALITAT: "CR",
        EPISODI: "1.2.826.0.1.3680043.2.403.297.1230101121940470.44.345049564013",
        ESTAT: "Informada",
        METGE: "14325",
        METGE_RESPONSABLE: "bfabregas",
        DATA_PROVA: "2023-01-01T12:19:00",
        DATA_REALITZADA: "2023-01-01T13:26:50",
        DATA_INFORME: "2023-01-23T15:33:26",
        INFORME: "http://restserver.grupsgs.ct/api/v4/ris/reportviewer/cmqr/9370d13ebf5b03ffcd5b267ab7d66d3d8c100b24",
        RUTA_RAIM: null,
        SERVEI: "ALT",
        DESC_SERVEI: "ALTRES",
        OBSERVACIONS: "tx",
        ORIGEN: "URGENCIES",
        OBSERVACIONS_TECNIC: null,
        ERRORS: 0,
        TECNIC: "717",
        LLIGAT: 1,
        DATA_UPDATE: "2023-01-01T12:23:00",
        HC3ESTAT: 2,
        HC3ESTUDI: "42558661839757774928507560910410219520",
        AETITLE: "PORTDX9CMQ01",
        ESTAT_INFORME_UDIAT: 0,
        DATA_CANVI_ESTAT_INFO_UDIAT: null,
        ESTAT_INFORME_IDI: 0,
        UNIVERS: "HNET",
        AETITLE_SAP: null,
        RIS_TANCAT: null,
        OLD_NHC: "990912    ",
        NOMPACIENT_GENOMI: "CABRE SERRANO, TERESA",
        NACIMIENTO: "1978-05-08T00:00:00",
      },
      {
        VISIBLE: "true",
        DOSE: "1.336",
        UNIT: "dGy*cm2",
        ID_MSG: "c41a22f9-9ecf-4c0e-9dec-036651b4f5c8",
        DATA_MSG: "2023-01-01T12:59:45",
        CENTRE: "CMQR",
        ACCESSION_NUMBER: "QU174565",
        AGENDA: "0         ",
        NSOL: "174565",
        NHC: "411365         ",
        NOMPACIENT: "BALART FERRER,MERCE",
        PROVA: "RXTUR",
        DESC_PROVA: "Rx Turmell AP N",
        MODALITAT: "CR",
        EPISODI: "1.2.826.0.1.3680043.2.403.297.1230101125959783.40.345049564013",
        ESTAT: "Completada",
        METGE: "14882",
        METGE_RESPONSABLE: "NO APLICA",
        DATA_PROVA: "2023-01-01T12:59:00",
        DATA_REALITZADA: "2023-01-01T14:07:33",
        DATA_INFORME: null,
        INFORME: null,
        RUTA_RAIM: null,
        SERVEI: "MEG",
        DESC_SERVEI: "MEDICINA GENERAL",
        OBSERVACIONS: "Torcedura",
        ORIGEN: "URGENCIES",
        OBSERVACIONS_TECNIC: null,
        ERRORS: 0,
        TECNIC: "717",
        LLIGAT: 1,
        DATA_UPDATE: "2023-01-01T13:03:49",
        HC3ESTAT: 4,
        HC3ESTUDI: null,
        AETITLE: "PORTDX9CMQ01",
        ESTAT_INFORME_UDIAT: 0,
        DATA_CANVI_ESTAT_INFO_UDIAT: null,
        ESTAT_INFORME_IDI: 0,
        UNIVERS: "HNET",
        AETITLE_SAP: null,
        RIS_TANCAT: null,
        OLD_NHC: "411365    ",
        NOMPACIENT_GENOMI: "BALART FERRER, MERCE",
        NACIMIENTO: "1965-05-04T00:00:00",
      },
      {
        VISIBLE: "true",
        DOSE: "8.112",
        UNIT: "dGy*cm2",
        ID_MSG: "db7add8c-605f-4374-85ec-f3c5eb58acfc",
        DATA_MSG: "2023-01-01T13:34:15",
        CENTRE: "CMQR",
        ACCESSION_NUMBER: "QU174566",
        AGENDA: "0         ",
        NSOL: "174566",
        NHC: "15734386       ",
        NOMPACIENT: "VALLDUVI BOTET,ENRIC",
        PROVA: "RXTOR",
        DESC_PROVA: "Rx Torax Graella Costal N",
        MODALITAT: "CR",
        EPISODI: "1.2.826.0.1.3680043.2.403.297.1230101133438534.24.345049564013",
        ESTAT: "Informada",
        METGE: "14882",
        METGE_RESPONSABLE: "bfabregas",
        DATA_PROVA: "2023-01-01T13:34:00",
        DATA_REALITZADA: "2023-01-01T14:42:22",
        DATA_INFORME: "2023-01-23T15:34:26",
        INFORME: "http://restserver.grupsgs.ct/api/v4/ris/reportviewer/cmqr/6be0caf609771d285b020345b218d16d02665eda",
        RUTA_RAIM: null,
        SERVEI: "MEG",
        DESC_SERVEI: "MEDICINA GENERAL",
        OBSERVACIONS: "Dolor costal",
        ORIGEN: "URGENCIES",
        OBSERVACIONS_TECNIC: null,
        ERRORS: 0,
        TECNIC: "717",
        LLIGAT: 1,
        DATA_UPDATE: "2023-01-01T13:42:00",
        HC3ESTAT: 2,
        HC3ESTUDI: "47100623535330215985845316697882361856",
        AETITLE: "PORTDX9CMQ01",
        ESTAT_INFORME_UDIAT: 0,
        DATA_CANVI_ESTAT_INFO_UDIAT: null,
        ESTAT_INFORME_IDI: 0,
        UNIVERS: "HNET",
        AETITLE_SAP: null,
        RIS_TANCAT: null,
        OLD_NHC: "581671    ",
        NOMPACIENT_GENOMI: "VALLDUVI BOTET, ENRIC",
        NACIMIENTO: "1962-07-23T00:00:00",
      },
      {
        VISIBLE: "true",
        DOSE: "8.112",
        UNIT: "dGy*cm2",
        ID_MSG: "db7add8c-605f-4374-85ec-f3c5eb58acfc",
        DATA_MSG: "2023-01-01T13:34:15",
        CENTRE: "CMQR",
        ACCESSION_NUMBER: "QU174566",
        AGENDA: "0         ",
        NSOL: "174566",
        NHC: "15734386       ",
        NOMPACIENT: "EL GENEROSO,MANOLO",
        PROVA: "RXTOR",
        DESC_PROVA: "Rx Torax Graella Costal N",
        MODALITAT: "CR",
        EPISODI: "1.2.826.0.1.3680043.2.403.297.1230101133438534.24.345049564013",
        ESTAT: "Completada",
        METGE: "14882",
        METGE_RESPONSABLE: "bfabregas",
        DATA_PROVA: "2023-01-01T13:34:00",
        DATA_REALITZADA: "2023-01-01T14:42:22",
        DATA_INFORME: "2023-01-23T15:34:26",
        INFORME: "http://restserver.grupsgs.ct/api/v4/ris/reportviewer/cmqr/6be0caf609771d285b020345b218d16d02665eda",
        RUTA_RAIM: null,
        SERVEI: "MEG",
        DESC_SERVEI: "MEDICINA GENERAL",
        OBSERVACIONS: "Dolor DE ANO",
        ORIGEN: "URGENCIES",
        OBSERVACIONS_TECNIC: null,
        ERRORS: 0,
        TECNIC: "717",
        LLIGAT: 1,
        DATA_UPDATE: "2023-01-01T13:42:00",
        HC3ESTAT: 2,
        HC3ESTUDI: "47100623535330215985845316697882361856",
        AETITLE: "PORTDX9CMQ01",
        ESTAT_INFORME_UDIAT: 0,
        DATA_CANVI_ESTAT_INFO_UDIAT: null,
        ESTAT_INFORME_IDI: 0,
        UNIVERS: "HNET",
        AETITLE_SAP: null,
        RIS_TANCAT: null,
        OLD_NHC: "581671    ",
        NOMPACIENT_GENOMI: "VALLDUVI BOTET, ENRIC",
        NACIMIENTO: "1962-07-23T00:00:00",
      },
      {
        VISIBLE: "true",
        DOSE: "8.112",
        UNIT: "dGy*cm2",
        ID_MSG: "db7add8c-605f-4374-85ec-f3c5eb58acfc",
        DATA_MSG: "2023-01-01T13:34:15",
        CENTRE: "CMQR",
        ACCESSION_NUMBER: "QU174566",
        AGENDA: "0         ",
        NSOL: "174566",
        NHC: "15734386       ",
        NOMPACIENT: "EL SARTINILLA,PEDRO",
        PROVA: "RXTOR",
        DESC_PROVA: "Rx Torax Graella Costal N",
        MODALITAT: "CR",
        EPISODI: "1.2.826.0.1.3680043.2.403.297.1230101133438534.24.345049564013",
        ESTAT: "Completada",
        METGE: "14882",
        METGE_RESPONSABLE: "bfabregas",
        DATA_PROVA: "2023-01-01T13:34:00",
        DATA_REALITZADA: "2023-01-01T14:42:22",
        DATA_INFORME: "2023-01-23T15:34:26",
        INFORME: "http://restserver.grupsgs.ct/api/v4/ris/reportviewer/cmqr/6be0caf609771d285b020345b218d16d02665eda",
        RUTA_RAIM: null,
        SERVEI: "MEG",
        DESC_SERVEI: "MEDICINA GENERAL",
        OBSERVACIONS: "Dolor DE ANO",
        ORIGEN: "URGENCIES",
        OBSERVACIONS_TECNIC: null,
        ERRORS: 0,
        TECNIC: "717",
        LLIGAT: 1,
        DATA_UPDATE: "2023-01-01T13:42:00",
        HC3ESTAT: 2,
        HC3ESTUDI: "47100623535330215985845316697882361856",
        AETITLE: "PORTDX9CMQ01",
        ESTAT_INFORME_UDIAT: 0,
        DATA_CANVI_ESTAT_INFO_UDIAT: null,
        ESTAT_INFORME_IDI: 0,
        UNIVERS: "HNET",
        AETITLE_SAP: null,
        RIS_TANCAT: null,
        OLD_NHC: "581671    ",
        NOMPACIENT_GENOMI: "VALLDUVI BOTET, ENRIC",
        NACIMIENTO: "1962-07-23T00:00:00",
      },
    ],
  };
  mostrarDatosInicio();
  //capturo el boton mostrar mas datos
  let idBotonMostrarMas = document.getElementById("mostrarMasDatos");
  let incremento = 0; //defino el incremento
  let valorActual = 0;

  //evento click
  idBotonMostrarMas.addEventListener("click", function () {
    let cantidadDatosEntrada = responseData.rows.length;
    if (incremento < cantidadDatosEntrada) {
      incremento += 1; //sumo dos cada vez que hagan click
      mostrarMasDatos(incremento, valorActual);
      valorActual += 1;
    } else {
      console.log("Ingremento es mas grende que cantida de datos");
    }
  }); //final evento click

  let arrDatosCoinciden = [];
  let idsProcesados = new Set(); // Conjunto para rastrear IDs ya procesados ID_MSG es unico de cada paciente
  let buscador = document.getElementById("buscador"); //capturo el input share 'buscador'
  let botonBuscar = document.getElementById("botonBusador"); //capturo el boton

  botonBuscar.addEventListener("click", function () {
    let datosBuscar = buscador.value.toUpperCase(); // guardo el valor del buscador
    if (datosBuscar) {
      //si existe algo para buscar
      console.log("Dato a buscar:", datosBuscar);
      responseData.rows.forEach((segmentoArray) => {
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

/** if (datosBuscar) {
        cuenta++;
        console.log(segmento, "", cuenta);

        if (datosBuscar.includes(segmento)) {
          console.log(segmento, "es igual que", datosBuscar);
        }
      } */

/**
 *Función que realiza una llamada a api
 */
function mostrarDatosInicio() {
  mostrarRegistros();
  //guardamos la id donde se mostraran los datos
  const tablaBody = document.getElementById("dataBody");

  //creamos un bucle para que inserte los datos
  //responseData.rows.slice(0, 2).forEach((datos) => {
  responseData.rows.slice(0, 4).forEach((datos) => {
    //creo una nueva fila
    const tr = document.createElement("tr");
    //console.log(datosFiltrados.rows[0]);
    //crear y añadir celdas a las filsa ALERTA -> FALTA -> + info  y Generar informe   INFORME
    tr.innerHTML = `
                <td><strong>${origenPaciente(datos.ORIGEN)}</strong></td>
                <td><strong>${datos.NHC}</strong></td>
                <td>${siRetornaNull(datos.AETITLE)}</td>
                <td>${siRetornaNull(datos.DOSE)}</td>
                <td>${siRetornaNull(datos.UNIT)}</td>
                <td>${ordenarNombre(datos.NOMPACIENT)}</td>
                <td>${ordenarDataSinDiaStr(datos.NACIMIENTO)}</td>
                <td>${ordenarData(datos.DATA_PROVA)}</td>
                <td>${siRetornaNull(datos.MODALITAT)}</td>
                <td>${siRetornaNull(datos.DESC_PROVA)}</td>
                <td>${siRetornaNull(datos.METGE)}</td>
                <td>${siRetornaNull(datos.METGE_RESPONSABLE)}</td>
                <td>${ordenarData(datos.DATA_REALITZADA)}</td>
                <td>${ordenarData(datos.DATA_INFORME)} </td>
                <td><a href="#" onclick="abrirInforme('${datos.INFORME}');"class="fa-regular fa-file-pdf fa-xl" style="color: #000000; display:
                    ${mostrarInforme(datos.DATA_INFORME)};"></a></td>                 
                <td id='datosEstado';>${datos.ESTAT}</td>       
                                `;
    // Añadir la fila al cuerpo de la tabla
    tablaBody.appendChild(tr);
  });
}
