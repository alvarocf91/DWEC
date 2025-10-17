const formulario = document.getElementById('formulario');
const tablaBody = document.getElementById('tabla-body');

formulario.addEventListener('submit', function(evento) {
  evento.preventDefault();
  const nombre = document.getElementById('nombre').value;
  const apellido = document.getElementById('apellido').value;

  const nuevaFila = document.createElement('tr');

  const celdaNombre = document.createElement('td');
  celdaNombre.textContent = nombre;

  const celdaApellido = document.createElement('td');
  celdaApellido.textContent = apellido;

  nuevaFila.appendChild(celdaNombre);
  nuevaFila.appendChild(celdaApellido);

  tablaBody.appendChild(nuevaFila);

  formulario.reset();
});
