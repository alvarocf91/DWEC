const {
  agregarEmpleado,
  eliminarEmpleado,
  buscarPorDepartamento,
  calcularSalarioPromedio,
  obtenerEmpleadosOrdenadosPorSalario
} = require('./empleados');


console.log("Lista inicial de empleados:");
console.log(obtenerEmpleadosOrdenadosPorSalario());

const deptBuscar = "Ventas";
const empleadosVentas = buscarPorDepartamento(deptBuscar);
console.log(`\nEmpleados en el departamento '${deptBuscar}':`);
console.log(empleadosVentas);

const salarioPromedio = calcularSalarioPromedio();
console.log(`\nSalario promedio de los empleados: ${salarioPromedio.toFixed(2)}`);

console.log("\nEmpleados ordenados por salario (mayor a menor):");
console.log(obtenerEmpleadosOrdenadosPorSalario());

const nuevoEmpleado = {
  id: 14,
  nombre: "Marina Castillo",
  departamento: "Ventas",
  salario: 2750
};

agregarEmpleado(nuevoEmpleado);
console.log("\nLista de empleados después de añadir uno nuevo:");
console.log(obtenerEmpleadosOrdenadosPorSalario());

const idEliminar = 3;
const eliminado = eliminarEmpleado(idEliminar);
console.log(eliminado ? `\nEmpleado con ID ${idEliminar} eliminado.` : `\nNo se encontró empleado con ID ${idEliminar}.`);

console.log("\nLista actualizada de empleados:");
console.log(obtenerEmpleadosOrdenadosPorSalario());

