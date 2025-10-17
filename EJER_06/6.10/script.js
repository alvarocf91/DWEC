const carrito = [];

const formatoMoneda = new Intl.NumberFormat('es-ES', {
  style: 'currency',
  currency: 'EUR'
});

document.querySelectorAll('.btn-add').forEach(btn => {
  btn.addEventListener('click', () => {
    const producto = btn.closest('.producto');
    const nombre = producto.querySelector('.nombre').textContent.trim();
    const precioTexto = producto.querySelector('.valor-precio').textContent.trim();
    const precio = parseFloat(
      precioTexto.replace(/\./g, '').replace(',', '.').replace(/[^\d.]/g, '')
    );

    const existente = carrito.find(p => p.nombre === nombre);
    if (existente) {
      existente.cantidad++;
    } else {
      carrito.push({ nombre, precio, cantidad: 1 });
    }

    renderizarCarrito();
    calcularTotal();
  });
});

function renderizarCarrito() {
  const lista = document.getElementById('carrito-lista');
  lista.innerHTML = '';

  if (carrito.length === 0) {
    document.getElementById('carrito-vacio').style.display = 'block';
    return;
  } else {
    document.getElementById('carrito-vacio').style.display = 'none';
  }

  carrito.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${item.nombre} (x${item.cantidad})</span>
      <span>${formatoMoneda.format(item.precio * item.cantidad)}</span>
    `;
    lista.appendChild(li);
  });
}

function calcularTotal() {
  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  document.getElementById('total-precio').textContent = formatoMoneda.format(total);
}
