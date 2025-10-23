const contenedor = document.getElementById("contenedorProductos");
const inputNombre = document.getElementById("buscarNombre");
const selectCategoria = document.getElementById("categoria");
const inputPrecio = document.getElementById("precioMax");
const valorPrecio = document.getElementById("valorPrecio");
const radiosOrden = document.querySelectorAll("input[name='orden']");

function cargarCategorias() {
  const categorias = ["Todas", ...new Set(productos.map(p => p.categoria))];
  selectCategoria.innerHTML = categorias
    .map(cat => `<option value="${cat}">${cat}</option>`)
    .join("");
}

function renderizarProductos(lista) {
  contenedor.innerHTML = "";
  if (lista.length === 0) {
    contenedor.innerHTML = `<p class="text-center text-muted fs-5">No se encontraron productos.</p>`;
    return;
  }

  lista.forEach(p => {
    const card = `
      <div class="col-md-3">
        <div class="card h-100 shadow-sm">
          <img src="${p.imagen}" class="card-img-top" alt="${p.nombre}">
          <div class="card-body text-center">
            <h5 class="card-title">${p.nombre}</h5>
            <p class="card-text text-muted">${p.categoria}</p>
            <p class="fw-bold text-primary">${p.precio.toFixed(2)} €</p>
          </div>
        </div>
      </div>
    `;
    contenedor.insertAdjacentHTML("beforeend", card);
  });
}

function filtrarYOrdenar() {
  let filtrados = [...productos];
  const texto = inputNombre.value.toLowerCase();
  const categoria = selectCategoria.value;
  const precioMax = parseFloat(inputPrecio.value);
  const orden = document.querySelector("input[name='orden']:checked").value;

  if (texto) filtrados = filtrados.filter(p => p.nombre.toLowerCase().includes(texto));

  if (categoria !== "Todas") filtrados = filtrados.filter(p => p.categoria === categoria);

  filtrados = filtrados.filter(p => p.precio <= precioMax);

  if (orden === "precioAsc") filtrados.sort((a, b) => a.precio - b.precio);
  else if (orden === "precioDesc") filtrados.sort((a, b) => b.precio - a.precio);
  else if (orden === "nombre") filtrados.sort((a, b) => a.nombre.localeCompare(b.nombre));

  renderizarProductos(filtrados);
}

window.addEventListener("DOMContentLoaded", () => {
  cargarCategorias();
  valorPrecio.textContent = inputPrecio.value;
  renderizarProductos(productos);
});

inputNombre.addEventListener("input", filtrarYOrdenar);
selectCategoria.addEventListener("change", filtrarYOrdenar);
inputPrecio.addEventListener("input", () => {
  valorPrecio.textContent = inputPrecio.value;
  filtrarYOrdenar();
});
radiosOrden.forEach(radio => radio.addEventListener("change", filtrarYOrdenar));
