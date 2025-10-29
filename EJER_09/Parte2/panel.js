const viewportSpan = document.getElementById('viewport');
const ventanaSpan = document.getElementById('ventana');
const posicionSpan = document.getElementById('posicion');
const resolucionSpan = document.getElementById('resolucion');
const espacioSpan = document.getElementById('espacio');
const conexionSpan = document.getElementById('conexion');
const indicador = document.getElementById('indicador');

let ultimaPosX = window.screenX;
let ultimaPosY = window.screenY;

function actualizarPanel() {
  viewportSpan.textContent = `${window.innerWidth} x ${window.innerHeight}`;
  ventanaSpan.textContent = `${window.outerWidth} x ${window.outerHeight}`;
  posicionSpan.textContent = `${window.screenX}, ${window.screenY}`;
  resolucionSpan.textContent = `${screen.width} x ${screen.height}`;
  espacioSpan.textContent = `${screen.availWidth} x ${screen.availHeight}`;

  actualizarConexion();
}

function actualizarConexion() {
  const online = navigator.onLine;
  conexionSpan.textContent = online ? 'Online' : 'Offline';
  indicador.style.background = online ? 'green' : 'red';
}

window.addEventListener('resize', actualizarPanel);   
window.addEventListener('online', actualizarConexion); 
window.addEventListener('offline', actualizarConexion); 
--
setInterval(() => {
  if (window.screenX !== ultimaPosX || window.screenY !== ultimaPosY) {
    ultimaPosX = window.screenX;
    ultimaPosY = window.screenY;
    posicionSpan.textContent = `${ultimaPosX}, ${ultimaPosY}`;
  }
}, 250);

window.addEventListener('DOMContentLoaded', actualizarPanel);
