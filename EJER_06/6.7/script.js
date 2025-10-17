const tabla = document.getElementById('miTabla');

tabla.addEventListener('dblclick', function(event) {
  const td = event.target;
  if (td.tagName.toLowerCase() !== 'td') {
    return; 
  }

  const valorActual = td.textContent;

  const input = document.createElement('input');
  input.type = 'text';
  input.value = valorActual;

  td.textContent = '';  
  td.appendChild(input);
  input.focus();

  input.addEventListener('blur', function() {
    const nuevoValor = input.value;
    td.removeChild(input);
    td.textContent = nuevoValor;
  });


  input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      input.blur();  
    }
  });
});
