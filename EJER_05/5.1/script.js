const imagenes = [
  'img/img1.jpg',
  'img/img2.jpg',
  'img/img3.jpg',
  'img/img4.jpg',
  'img/img5.jpg'
];

function cambiarImagenPrincipal(index) {

  const imagenPrincipal = document.getElementById('imagen-principal');
  imagenPrincipal.src = imagenes[index];

  const miniaturas = document.querySelectorAll('.miniatura');
  miniaturas.forEach(miniatura => {
    miniatura.classList.remove('activa');
  });
  
  miniaturas[index].classList.add('activa');
}
