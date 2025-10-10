let total = 0;

function añadirAlCarrito(button) {
  const producto = button.parentNode;
  const precio = parseFloat(producto.getAttribute('data-price'));
 
  const itemCarrito = producto.cloneNode(true);
  itemCarrito.querySelector('button').textContent = 'Quitar';
  itemCarrito.querySelector('button').onclick = function() {
    eliminarDelCarrito(itemCarrito, precio);
  };
  
  document.getElementById('carrito').appendChild(itemCarrito);

  total += precio;
  document.getElementById('total').textContent = `Total: $${total.toFixed(2)}`;
}

function eliminarDelCarrito(item, precio) {
  item.remove();
  total -= precio;
  document.getElementById('total').textContent = `Total: $${total.toFixed(2)}`;
}
