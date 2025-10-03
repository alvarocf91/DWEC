const empleados = [
  { id: 1, nombre: "Ana Pérez", departamento: "Ventas", salario: 2500 },
  { id: 2, nombre: "Luis Gómez", departamento: "Marketing", salario: 3000 },
  { id: 3, nombre: "María López", departamento: "Ventas", salario: 2800 },
  { id: 4, nombre: "Jorge Martínez", departamento: "IT", salario: 4000 },
  { id: 5, nombre: "Lucía Fernández", departamento: "Marketing", salario: 3200 },
  { id: 6, nombre: "Carlos Sánchez", departamento: "Finanzas", salario: 3500 },
  { id: 7, nombre: "Elena Rodríguez", departamento: "IT", salario: 4200 },
  { id: 8, nombre: "Miguel Torres", departamento: "Recursos Humanos", salario: 2600 },
  { id: 9, nombre: "Sandra Molina", departamento: "Ventas", salario: 2700 },
  { id: 10, nombre: "Raúl Jiménez", departamento: "Finanzas", salario: 3600 }
];

function agregarEmpleado(empleado) {
  empleados.push(empleado);
}

function eliminarEmpleado(id) {
  const index = empleados.findIndex(emp => emp.id === id);
  if (index !== -1) {
    empleados.splice(index, 1);
    return true;
  }
  return false;
}

function buscarPorDepartamento(departamento) {
  return empleados.filter(emp => emp.departamento.toLowerCase() === departamento.toLowerCase());
}

function calcularSalarioPromedio() {
  if (empleados.length === 0) return 0;
  const totalSalarios = empleados.reduce((total, emp) => total + emp.salario, 0);
  return totalSalarios / empleados.length;
}

function obtenerEmpleadosOrdenadosPorSalario() {
  return [...empleados].sort((a, b) => b.salario - a.salario);
}

module.exports = {
  agregarEmpleado,
  eliminarEmpleado,
  buscarPorDepartamento,
  calcularSalarioPromedio,
  obtenerEmpleadosOrdenadosPorSalario
};

