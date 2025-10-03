import { crearProducto, filtrarPorCategoria, listarProductosAgotados, calcularValorTotalInventario } from './inventario.js';
import resumenInventario from './inventario.js';
const inventario = [];
inventario.push(
  crearProducto("Smartphone", "Electrónica", 500, 10),
  crearProducto("Laptop", "Electrónica", 1000, 0),
  crearProducto("T-shirt", "Ropa", 20, 50),
  crearProducto("Pantalón", "Ropa", 30, 0),
  crearProducto("Libro de JavaScript", "Libros", 15, 100),
  crearProducto("Libro de Python", "Libros", 20, 30)
);
const productosRopa = filtrarPorCategoria(inventario, "Ropa");
console.log("Productos en la categoría 'Ropa':");
productosRopa.forEach(producto => console.log(producto));
const productosAgotados = listarProductosAgotados(inventario);
console.log("\nProductos agotados:");
productosAgotados.forEach(producto => console.log(producto));
const valorTotal = calcularValorTotalInventario(inventario);
console.log(`\nEl valor total del inventario es: $${valorTotal}`);
resumenInventario(inventario);