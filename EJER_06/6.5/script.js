const inputFiltro = document.getElementById('txtFiltro');
const listaPaises = document.getElementById('listaPaises');
const items = listaPaises.getElementsByTagName('li');

inputFiltro.addEventListener('input', function() {
  const texto = inputFiltro.value.toLowerCase(); 

  for (let i = 0; i < items.length; i++) {
    const pais = items[i].textContent.toLowerCase(); 

    if (pais.includes(texto)) {
      items[i].style.display = '';  
    } else {
      items[i].style.display = 'none';  
    }
  }
});
