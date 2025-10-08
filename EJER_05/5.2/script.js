function ocultarTodasLasRespuestas() {
  const respuestas = document.querySelectorAll('.faq p');
  respuestas.forEach(parrafo => {
    parrafo.classList.add('oculto');
  });
}

function revelarRespuesta(h2Elemento) {
  ocultarTodasLasRespuestas();
  const parrafo = h2Elemento.nextElementSibling;

  if (parrafo && parrafo.tagName === 'P') {
    parrafo.classList.remove('oculto');
  }
}
