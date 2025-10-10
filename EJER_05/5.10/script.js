function generarLorem() {
  const cantidad = document.getElementById('cantidad').value;
  const resultado = document.getElementById('resultado');
  

  resultado.innerHTML = '';
  
  const fragmento = document.createDocumentFragment();
  
  for (let i = 0; i < cantidad; i++) {
    const parrafo = document.createElement('p');
    parrafo.textContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
    fragmento.appendChild(parrafo);
  }
  
  resultado.appendChild(fragmento);
}
