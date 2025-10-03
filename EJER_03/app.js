const {
  agregarLibro,
  obtenerLibros,
  buscarLibro,
  eliminarLibro,
  calcularTotalPaginas,
  ordenarPorPaginas,
  hayLibrosLargos,
  todosSonLibrosCortos
} = require('./biblioteca');


console.log("Lista inicial de libros:");
console.log(obtenerLibros());


const idBuscar = 3;
const libro = buscarLibro(idBuscar);

if (libro) {
  console.log(`\nLibro con ID ${idBuscar} encontrado:`);
  console.log(libro);
} else {
  console.log(`\nNo se encontró ningún libro con ID ${idBuscar}.`);
}

const idEliminar = 5;
const eliminado = eliminarLibro(idEliminar);

if (eliminado) {
  console.log(`\nLibro con ID ${idEliminar} eliminado correctamente.`);
} else {
  console.log(`\nNo se encontró ningún libro con ID ${idEliminar} para eliminar.`);
}

console.log("\nColección de libros después de eliminación:");
console.log(obtenerLibros());


const totalPaginas = calcularTotalPaginas();
console.log(`\nTotal de páginas en la biblioteca: ${totalPaginas}`);

console.log("\nColección original de libros:");
console.log(obtenerLibros());

ordenarPorPaginas();

console.log("\nColección de libros ordenada por páginas (menor a mayor):");
console.log(obtenerLibros());

const limites = [300, 900];
limites.forEach(limite => {
  console.log(`\n¿Hay libros con más de ${limite} páginas? ${hayLibrosLargos(limite)}`);
  console.log(`¿Todos los libros tienen menos de ${limite} páginas? ${todosSonLibrosCortos(limite)}`);
});
