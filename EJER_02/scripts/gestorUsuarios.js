export function crearPerfil(nombre, email, edad) {
  return { nombre, email, edad };
}
export default function mostrarPerfil(usuario) {
  return `Nombre: ${usuario.nombre}, Email: ${usuario.email}, Edad: ${usuario.edad}`;
}
export function esMayorDeEdad(usuario) {
  return usuario.edad >= 18;
}
export function obtenerMayoresDeEdad(usuarios) {
  return usuarios.filter(esMayorDeEdad);
}
export function calcularPromedioEdad(usuarios) {
  const totalEdad = usuarios.reduce((acumulado, usuario) => acumulado + usuario.edad, 0);
  return totalEdad / usuarios.length;
}