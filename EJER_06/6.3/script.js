const checkbox = document.getElementById('terminos');
const botonEnviar = document.getElementById('enviar');

checkbox.addEventListener('change', function() {
  botonEnviar.disabled = !checkbox.checked;
});
