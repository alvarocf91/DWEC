const libros = [
  { id: 1, titulo: "Cien años de soledad", autor: "Gabriel García Márquez", paginas: 417 },
  { id: 2, titulo: "1984", autor: "George Orwell", paginas: 328 },
  { id: 3, titulo: "El principito", autor: "Antoine de Saint-Exupéry", paginas: 96 },
  { id: 4, titulo: "Rayuela", autor: "Julio Cortázar", paginas: 564 },
  { id: 5, titulo: "Don Quijote de la Mancha", autor: "Miguel de Cervantes", paginas: 863 },
  { id: 6, titulo: "Fahrenheit 451", autor: "Ray Bradbury", paginas: 256 },
  { id: 7, titulo: "La sombra del viento", autor: "Carlos Ruiz Zafón", paginas: 568 },
  { id: 8, titulo: "Orgullo y prejuicio", autor: "Jane Austen", paginas: 279 },
  { id: 9, titulo: "El nombre del viento", autor: "Patrick Rothfuss", paginas: 662 },
  { id: 10, titulo: "Sapiens: De animales a dioses", autor: "Yuval Noah Harari", paginas: 496 }
];

function agregarLibro(nuevoLibro) {
  libros.push(nuevoLibro);
}

function obtenerLibros() {
  return libros;
}

function buscarLibro(id) {
  return libros.find(libro => libro.id === id);
}

function eliminarLibro(id) {
  const index = libros.findIndex(libro => libro.id === id);
  if (index !== -1) {
    libros.splice(index, 1);
    return true;
  }
  return false;
}

function calcularTotalPaginas() {
  return libros.reduce((total, libro) => total + libro.paginas, 0);
}

function ordenarPorPaginas() {
  libros.sort((a, b) => a.paginas - b.paginas);
}

function hayLibrosLargos(limitePaginas) {
  return libros.some(libro => libro.paginas > limitePaginas);
}

function todosSonLibrosCortos(limitePaginas) {
  return libros.every(libro => libro.paginas < limitePaginas);
}

module.exports = {
  agregarLibro,
  obtenerLibros,
  buscarLibro,
  eliminarLibro,
  calcularTotalPaginas,
  ordenarPorPaginas,
  hayLibrosLargos,
  todosSonLibrosCortos
};
