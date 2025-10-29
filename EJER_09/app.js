const pages = {
  inicio: `<h1>Página de Inicio</h1>
           <p>Bienvenido a nuestra web. Aquí encontrarás información sobre nuestros servicios.</p>`,
  productos: `<h1>Productos</h1>
              <p>Descubre nuestra gama de productos de alta calidad.</p>`,
  contacto: `<h1>Contacto</h1>
             <p>Puedes contactarnos a través del formulario o redes sociales.</p>`
};

const app = document.getElementById('app');
const links = document.querySelectorAll('nav a');

function loadPage(route, push = true) {
  const content = pages[route] || pages.inicio;
  app.innerHTML = content;

  if (push) {
    history.pushState({ route }, '', `/${route}`);
  }

  links.forEach(link => {
    link.classList.toggle('active', link.dataset.route === route);
  });
}

links.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const route = e.target.dataset.route;
    loadPage(route);
  });
});

window.addEventListener('popstate', e => {
  const route = e.state?.route || 'inicio';
  loadPage(route, false);
});

window.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname.replace('/', '') || 'inicio';
  loadPage(path, false);
});
