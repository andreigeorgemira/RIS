let mesActual;
let anoActual;

function abrirModal() {
  const fechaActual = new Date();
  mesActual = fechaActual.getMonth();
  anoActual = fechaActual.getFullYear();

  document.getElementById("myModal").style.display = "block";
  document.getElementById("overlay").style.display = "block";
  crearCalendario();
  llenarDropdownAno();
}

function cerrarModal() {
  document.getElementById("myModal").style.display = "none";
  document.getElementById("overlay").style.display = "none";
}

function crearCalendario() {
  const contenedorCalendario = document.getElementById("customCalendar");
  contenedorCalendario.innerHTML = "";

  const diasEnMes = new Date(anoActual, mesActual + 1, 0).getDate();
  const primerDiaSemana = new Date(anoActual, mesActual, 1).getDay();

  const diasSemana = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

  diasSemana.forEach((dia) => {
    const elementoDia = document.createElement("button");
    elementoDia.textContent = dia;
    elementoDia.disabled = true;
    contenedorCalendario.appendChild(elementoDia);
  });

  document.getElementById("mesSeleccionado").textContent = obtenerNombreMes(mesActual);
  document.getElementById("anoSeleccionado").textContent = anoActual;

  for (let i = 0; i < primerDiaSemana - 1; i++) {
    const diaVacio = document.createElement("button");
    diaVacio.textContent = "";
    diaVacio.disabled = true;
    contenedorCalendario.appendChild(diaVacio);
  }

  for (let dia = 1; dia <= diasEnMes; dia++) {
    const elementoDia = document.createElement("button");
    elementoDia.textContent = dia;
    elementoDia.onclick = () => seleccionarFecha(dia);
    contenedorCalendario.appendChild(elementoDia);
  }
}

function seleccionarFecha(dia) {
  const fechaSeleccionada = `${dia}/${mesActual + 1}/${anoActual}`;
  console.log(fechaSeleccionada);
}

function guardarFecha() {
  // Lógica para guardar la fecha
  cerrarModal();
}

function mesAnterior() {
  if (mesActual > 0) {
    mesActual--;
  } else {
    mesActual = 11;
    anoActual--;
  }
  crearCalendario();
}

function mesSiguiente() {
  if (mesActual < 11) {
    mesActual++;
  } else {
    mesActual = 0;
    anoActual++;
  }
  crearCalendario();
}

function obtenerNombreMes(mes) {
  const nombresMeses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  return nombresMeses[mes];
}

function llenarDropdownAno() {
  const contenidoDropdownAno = document.getElementById("yearDropdownContent");
  contenidoDropdownAno.innerHTML = "";

  for (let i = anoActual - 10; i <= anoActual + 10; i++) {
    const botonAno = document.createElement("button");
    botonAno.textContent = i;
    botonAno.onclick = () => cambiarAno(i);
    contenidoDropdownAno.appendChild(botonAno);
  }
}

function cambiarMes(nuevoMes) {
  mesActual = nuevoMes;
  crearCalendario();
  document.getElementById("mesSeleccionado").textContent = obtenerNombreMes(mesActual);
}

function cambiarAno(nuevoAno) {
  anoActual = nuevoAno;
  crearCalendario();
  document.getElementById("anoSeleccionado").textContent = anoActual;
}
