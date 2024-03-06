// Crear el contenedor principal
var container = document.createElement("div");
container.className = "col-md-2";

// Crear el contenedor de botones
var buttonContainer = document.createElement("div");
buttonContainer.className = "d-grid gap-2";

// Crear las filas de botones
var rows = ["CT", "DX", "US", "MG", "PT", "NM", "MR", "RF", "PX", "OT", "XC", "DOC"];

for (var i = 0; i < rows.length; i += 3) {
  var rowDiv = document.createElement("div");
  rowDiv.className = "row";

  for (var j = i; j < i + 3 && j < rows.length; j++) {
    var colDiv = document.createElement("div");
    colDiv.className = "col";

    var button = document.createElement("button");
    button.className = "btn botones btn-block";
    button.type = "button";
    button.textContent = rows[j];

    colDiv.appendChild(button);
    rowDiv.appendChild(colDiv);
  }

  buttonContainer.appendChild(rowDiv);
}

// Agregar botón "SELECCIONA TOTES"
var selectButtonDiv = document.createElement("div");
selectButtonDiv.className = "row";
var selectButtonCol = document.createElement("div");
selectButtonCol.className = "col";
var selectButton = document.createElement("button");
selectButton.id = "select";
selectButton.className = "btn btn-primary btn-block";
selectButton.type = "button";
selectButton.textContent = "SELECCIONA TOTES";

selectButtonCol.appendChild(selectButton);
selectButtonDiv.appendChild(selectButtonCol);
buttonContainer.appendChild(selectButtonDiv);

// Agregar botón "Rotar"
var rotateButtonDiv = document.createElement("div");
rotateButtonDiv.className = "row";
var rotateButtonCol = document.createElement("div");
rotateButtonCol.className = "col";
var rotateButton = document.createElement("button");
rotateButton.className = "btn btn-warning btn-block";
rotateButton.type = "button";
var icon = document.createElement("i");
icon.className = "fa-solid fa-arrow-rotate-right fa-xl";
icon.style.color = "#000000";
rotateButton.appendChild(icon);

rotateButtonCol.appendChild(rotateButton);
rotateButtonDiv.appendChild(rotateButtonCol);
buttonContainer.appendChild(rotateButtonDiv);

// Agregar el contenedor de botones al contenedor principal
container.appendChild(buttonContainer);

// Agregar el contenedor principal al cuerpo del documento
document.body.appendChild(container);
