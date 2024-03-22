//hasta que no se han ingresado datos en user u pass no se manda el formulario
document.addEventListener("DOMContentLoaded", function () {
  var loginForm = document.getElementById("loginForm"); //capturo el formulario

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevenir la acción por defecto del formulario

    validarForm(); // Llamar a la función validarForm()
  });
});

function validarForm() {
  //recejemos el user y pass

  //user id username
  var user = document.getElementById("username").value.trim(); //guardo use, sin espacios al inicio ni final
  var password = document.getElementById("password").value.trim(); //guardo pas, sin espacios al inicio ni final
  var especialidad = document.getElementById("selectOption").value;

  //guardo en una variable el xml modificado con el pas y el user con ${}
  var strXml = `<?xml version="1.0" encoding="utf-8"?>
  <soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
    <soap12:Body>
      <IsValidCredential xmlns="http://tempuri.org/">
        <user>${user}</user>
        <password>${password}</password>
      </IsValidCredential>
    </soap12:Body>
  </soap12:Envelope>`;

  var config = {
    //le decimos al servidor que mandamos un xml
    headers: {
      "Content-Type": "application/soap+xml",
      "Cache-Control": "no-cache", // Agrega esta línea para evitar la caché
    },
  };

  // Realizar la solicitud POST al servicio web y le mandamos el xml
  axios
    .post("http://192.168.4.5:8010/WebService1.asmx", strXml, config)
    .then(function (response) {
      // Manejar la respuesta del servicio web

      //*************MANEJAR LA RESPUESTA DEL SERVER  */
      //creamos la respuesta en un archivo xml
      var objetoDOM = new DOMParser(); //creo un objeto DOMP donde guardar el xml que nos llega del server DOMParser es una API en JavaScript
      var documentoXML = objetoDOM.parseFromString(response.data, "text/xml"); //Metemos la respuesta en un documento XML dentro del objeto DOMP

      // Convierte el objeto xml a str
      var objetoXMLaStr = new XMLSerializer().serializeToString(documentoXML);

      // Sí dentro del str el booleano contesta true entro
      if (objetoXMLaStr.includes("true")) {
        if (especialidad == "tecnico") {
          //si especialidad es técnico lo mando al apartado de técnico

          //redirection y mano el por post user name y especialidad
          location.href = "../tecnic/tecnic.html?user=" + user + "&especialidad=" + especialidad;
        } else if (especialidad == "Radiologo") {
          //si especialidad es técnico lo mando al apartado de Radiologo

          location.href = "../radioleg/radioleg.html?user=" + user + "&especialidad=" + especialidad;
        } else if (especialidad == "Radiofisico") {
          //si especialidad es técnico lo mando al apartado de Radiofisico

          location.href = "../radiofisic/radiofisic.html?user=" + user + "&especialidad=" + especialidad;
        }
      } else {
        document.getElementById("errorMessage").textContent = "Usuario o contraseña incorrectos"; //pongo un menaje de error
        document.getElementById("password").value = ""; //reset en el campo password
      }
    })

    .catch(function (error) {
      // Manejar errores
      console.error(error);
    });
}
