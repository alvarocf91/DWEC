const barra = document.getElementById('barra-progreso');
const boton = document.getElementById('volver-arriba');

function actualizarScroll() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const porcentaje = (scrollTop / docHeight) * 100;

  barra.style.width = porcentaje + '%';

  if (scrollTop > window.innerHeight) {
    boton.classList.add('show');
  } else {
    boton.classList.remove('show');
  }
}

window.addEventListener('scroll', actualizarScroll);

boton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('DOMContentLoaded', actualizarScroll);
