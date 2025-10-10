function filtrarCiudades() {
  const busqueda = document.getElementById('busqueda').value.toLowerCase();
  const ciudades = document.querySelectorAll('#lista-ciudades li');
  
  ciudades.forEach(ciudad => {
    const pais = ciudad.getAttribute('data-pais').toLowerCase();
    if (pais.includes(busqueda)) {
      ciudad.style.display = 'list-item';
    } else {
      ciudad.style.display = 'none';
    }
  });
}
