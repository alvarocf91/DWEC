document.addEventListener('DOMContentLoaded', () => {
  console.log("Archivo main.js cargado correctamente");

  const form = document.getElementById('pizza-form');
  const precioTotalEl = document.getElementById('precio-total');
  const realizarPedidoBtn = document.getElementById('realizar-pedido');

  function actualizarPrecio() {
    let total = 0;

    const tamañoSeleccionado = form.querySelector('input[name="tamaño"]:checked');
    console.log('Tamaño seleccionado:', tamañoSeleccionado ? tamañoSeleccionado.value : 'Ninguno');
    if (tamañoSeleccionado) {
      total += parseFloat(tamañoSeleccionado.value);
    }

    const masaSeleccionada = form.querySelector('#masa');
    console.log('Masa seleccionada:', masaSeleccionada ? masaSeleccionada.value : 'Ninguno');
    if (masaSeleccionada) {
      total += parseFloat(masaSeleccionada.value);
    }

    const ingredientesSeleccionados = form.querySelectorAll('input[name="ingredientes"]:checked');
    console.log('Ingredientes seleccionados:', ingredientesSeleccionados.length);
    ingredientesSeleccionados.forEach(checkbox => {
      console.log('Ingrediente:', checkbox.value);
      total += parseFloat(checkbox.value);
    });

    console.log('Precio total calculado:', total);

    precioTotalEl.textContent = total.toFixed(2);
  }

  form.addEventListener('change', () => {
    console.log('Cambio detectado');
    actualizarPrecio();
  });

  realizarPedidoBtn.addEventListener('click', () => {
    const tamaño = form.querySelector('input[name="tamaño"]:checked').parentElement.textContent.trim();
    const masa = form.querySelector('#masa').selectedOptions[0].text;
    const ingredientes = Array.from(form.querySelectorAll('input[name="ingredientes"]:checked'))
      .map(input => input.parentElement.textContent.trim());
    const precioFinal = precioTotalEl.textContent;

    let resumen = `Resumen del pedido:\n`;
    resumen += `- Tamaño: ${tamaño}\n`;
    resumen += `- Masa: ${masa}\n`;
    resumen += `- Ingredientes extra: ${ingredientes.length ? ingredientes.join(', ') : 'Ninguno'}\n`;
    resumen += `\nPrecio total: ${precioFinal} €`;

    alert(resumen);
  });

  actualizarPrecio();
});
