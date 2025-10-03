(function() {
  const categorias = document.querySelectorAll('.categoria');
  const nombresCategorias = Array.prototype.map.call(categorias, function(categoria) {
    return categoria.textContent;
  });
  console.log('Ejercicio 28:', nombresCategorias);
})();
