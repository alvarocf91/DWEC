const selectDestino = document.getElementById("selectDestino");
const contenedorTipos = document.getElementById("contenedorTipos");
const inputPrecio = document.getElementById("precioFiltro");
const valorPrecio = document.getElementById("valorPrecioFiltro");
const btnReset = document.getElementById("btnReset");

const listaActividades = document.getElementById("listaActividades");
const mensajeSinResultados = document.getElementById("mensajeSinResultados");

const listaItinerario = document.getElementById("listaItinerario");
const numActividades = document.getElementById("numActividades");
const duracionTotal = document.getElementById("duracionTotal");
const costeTotal = document.getElementById("costeTotal");

const formReserva = document.getElementById("formReserva");
const erroresDiv = document.getElementById("erroresValidacion");
const seguroViaje = document.getElementById("seguroViaje");

let itinerario = [];

function cargarFiltros() {
  const destinos = ["Todos", ...new Set(actividades.map(a => a.destino))];
  selectDestino.innerHTML = destinos.map(d => `<option value="${d}">${d}</option>`).join("");

  const tipos = [...new Set(actividades.map(a => a.tipo))];
  contenedorTipos.innerHTML = tipos.map(t => `
    <div class="form-check">
      <input class="form-check-input" type="checkbox" value="${t}" id="tipo-${t}">
      <label class="form-check-label" for="tipo-${t}">${t}</label>
    </div>
  `).join("");

  valorPrecio.textContent = inputPrecio.value;
}

function obtenerFiltros() {
  const destino = selectDestino.value;
  const tiposSeleccionados = [...contenedorTipos.querySelectorAll("input:checked")].map(c => c.value);
  const precioMax = parseFloat(inputPrecio.value);

  return { destino, tiposSeleccionados, precioMax };
}

function renderizarActividades() {
  const { destino, tiposSeleccionados, precioMax } = obtenerFiltros();
  let filtradas = actividades.filter(a => a.precio <= precioMax);

  if (destino !== "Todos") filtradas = filtradas.filter(a => a.destino === destino);
  if (tiposSeleccionados.length > 0)
    filtradas = filtradas.filter(a => tiposSeleccionados.includes(a.tipo));

  listaActividades.innerHTML = "";

  if (filtradas.length === 0) {
    mensajeSinResultados.classList.remove("d-none");
    return;
  }

  mensajeSinResultados.classList.add("d-none");

  filtradas.forEach(a => {
    const card = document.createElement("div");
    card.className = "col-md-6 mb-3";
    card.innerHTML = `
      <div class="card card-actividad h-100">
        <img src="${a.imagen}" class="card-img-top" alt="${a.nombre}">
        <div class="card-body">
          <h5 class="card-title">${a.nombre}</h5>
          <p class="card-text"><strong>Destino:</strong> ${a.destino}</p>
          <p class="card-text"><strong>Tipo:</strong> ${a.tipo}</p>
          <p class="card-text text-primary fw-bold">${a.precio.toFixed(2)} €</p>
          <button class="btn btn-success w-100" onclick="agregarItinerario(${a.id})">Añadir al Itinerario</button>
        </div>
      </div>
    `;
    listaActividades.appendChild(card);
  });
}

function agregarItinerario(id) {
  const actividad = actividades.find(a => a.id === id);
  if (!itinerario.some(a => a.id === id)) {
    itinerario.push(actividad);
    actualizarItinerario();
  }
}

function quitarItinerario(id) {
  itinerario = itinerario.filter(a => a.id !== id);
  actualizarItinerario();
}

function actualizarItinerario() {
  listaItinerario.innerHTML = "";

  itinerario.forEach(a => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.innerHTML = `
      <div>
        <strong>${a.nombre}</strong><br>
        <small>${a.precio} €</small>
      </div>
      <button class="btn btn-sm btn-danger" onclick="quitarItinerario(${a.id})">Quitar</button>
    `;
    listaItinerario.appendChild(li);
  });

  const totalCoste = itinerario.reduce((acc, a) => acc + a.precio, 0);
  const totalDuracion = itinerario.reduce((acc, a) => acc + a.duracionHoras, 0);

  numActividades.textContent = itinerario.length;
  duracionTotal.textContent = totalDuracion.toFixed(1);
  costeTotal.textContent = totalCoste.toFixed(2);

  if (totalCoste > 1000) {
    seguroViaje.parentElement.classList.remove("d-none");
    seguroViaje.required = true;
  } else {
    seguroViaje.required = false;
    seguroViaje.checked = false;
  }
}

formReserva.addEventListener("submit", e => {
  e.preventDefault();
  erroresDiv.innerHTML = "";

  const nombre = document.getElementById("nombreCliente");
  const email = document.getElementById("emailCliente");
  const fecha = document.getElementById("fechaInicio");
  const codigo = document.getElementById("codigoDescuento");
  const errores = [];

  [nombre, email, fecha, codigo].forEach(c => c.classList.remove("campo-error"));

  if (itinerario.length === 0)
    errores.push("El itinerario no puede estar vacío.");

  if (!nombre.value.trim()) {
    errores.push("Debe introducir su nombre completo.");
    nombre.classList.add("campo-error");
  }

  if (!email.value.trim() || !/\S+@\S+\.\S+/.test(email.value)) {
    errores.push("Debe introducir un email válido.");
    email.classList.add("campo-error");
  }

  const fechaSeleccionada = new Date(fecha.value);
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  if (!fecha.value || fechaSeleccionada < hoy) {
    errores.push("La fecha de inicio no puede ser pasada.");
    fecha.classList.add("campo-error");
  }

  const totalCoste = itinerario.reduce((acc, a) => acc + a.precio, 0);
  if (totalCoste > 1000 && !seguroViaje.checked)
    errores.push("Debe contratar el seguro de viaje al superar los 1000€.");

  if (codigo.value.trim() && !/^[A-Z]{4}\d{2}$/.test(codigo.value.trim())) {
    errores.push("El código de descuento debe tener el formato ABCD25.");
    codigo.classList.add("campo-error");
  }

  if (errores.length > 0) {
    erroresDiv.innerHTML = errores.map(e => `<p class="error-text"> ${e}</p>`).join("");
    return;
  }

  erroresDiv.innerHTML = `<p class="text-success">Reserva confirmada con éxito</p>`;
  formReserva.reset();
  itinerario = [];
  actualizarItinerario();
});

selectDestino.addEventListener("change", renderizarActividades);
inputPrecio.addEventListener("input", () => {
  valorPrecio.textContent = inputPrecio.value;
  renderizarActividades();
});
contenedorTipos.addEventListener("change", renderizarActividades);
btnReset.addEventListener("click", () => {
  selectDestino.value = "Todos";
  inputPrecio.value = 1000;
  valorPrecio.textContent = 1000;
  contenedorTipos.querySelectorAll("input").forEach(c => (c.checked = false));
  renderizarActividades();
});

document.addEventListener("DOMContentLoaded", () => {
  cargarFiltros();
  renderizarActividades();
  actualizarItinerario();
});
