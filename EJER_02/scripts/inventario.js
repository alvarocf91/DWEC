export function crearProducto(nombre, categoria, precio, stock) {
  return { nombre, categoria, precio, stock };
}
export function filtrarPorCategoria(inventario, categoria) {
  return inventario.filter(producto => producto.categoria === categoria);
}
export function listarProductosAgotados(inventario) {
  return inventario.filter(producto => producto.stock === 0);
}
export function calcularValorTotalInventario(inventario) {
  return inventario.reduce((total, producto) => total + (producto.precio * producto.stock), 0);
}
export default function resumenInventario(inventario) {
  const totalProductos = inventario.length;
  const categorias = [...new Set(inventario.map(producto => producto.categoria))]; // Extraemos categorías únicas
  const valorTotal = calcularValorTotalInventario(inventario);
    console.log(`Resumen del inventario:`);
  console.log(`Número total de productos: ${totalProductos}`);
  console.log(`Número de categorías distintas: ${categorias.length}`);
  console.log(`Valor total del inventario: $${valorTotal}`);
}