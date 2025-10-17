const contenedor = document.getElementById('contenedor');
const arrastrable = document.getElementById('arrastrable');

let offsetX = 0;
let offsetY = 0;
let seEstaArrastrando = false;

arrastrable.addEventListener('mousedown', function(e) {
  seEstaArrastrando = true;

  const rect = arrastrable.getBoundingClientRect();
  offsetX = e.clientX - rect.left;
  offsetY = e.clientY - rect.top;

  arrastrable.style.cursor = 'grabbing';
});

document.addEventListener('mousemove', function(e) {
  if (!seEstaArrastrando) return;

  const contRect = contenedor.getBoundingClientRect();

  let nuevaLeft = e.clientX - contRect.left - offsetX;
  let nuevaTop = e.clientY - contRect.top - offsetY;

  arrastrable.style.left = nuevaLeft + 'px';
  arrastrable.style.top = nuevaTop + 'px';
});

document.addEventListener('mouseup', function(e) {
  if (seEstaArrastrando) {
    seEstaArrastrando = false;
    arrastrable.style.cursor = 'grab';
  }
});

