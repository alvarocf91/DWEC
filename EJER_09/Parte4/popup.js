const botonCerrar = document.getElementById('cerrar-popup');

botonCerrar.addEventListener('click', () => {
  if (window.opener && !window.opener.closed) {
    const h1 = window.opener.document.querySelector('h1');
    if (h1) h1.textContent = 'El pop-up te saluda';
  }

  window.close();
});
