import { crearPerfil, obtenerMayoresDeEdad, calcularPromedioEdad, esMayorDeEdad } from './gestorUsuarios.js';
import mostrarPerfil from './gestorUsuarios.js';
const usuarios = [
  crearPerfil('Juan Pérez', 'juan.perez@example.com', 25),
  crearPerfil('Ana Gómez', 'ana.gomez@example.com', 17),
  crearPerfil('Carlos Ruiz', 'carlos.ruiz@example.com', 30),
  crearPerfil('Lucía Martínez', 'lucia.martinez@example.com', 16),
  crearPerfil('Pedro López', 'pedro.lopez@example.com', 21),
];
const mayoresDeEdad = obtenerMayoresDeEdad(usuarios);
console.log("Usuarios mayores de edad:");
mayoresDeEdad.forEach(usuario => {
  console.log(mostrarPerfil(usuario));
});
const promedioEdad = calcularPromedioEdad(usuarios);
console.log(`La edad promedio de los usuarios es: ${promedioEdad}`);