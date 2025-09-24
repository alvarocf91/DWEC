const usuario = {
    nombre:"Jose",
    email:"jose@gmail.com"
};
const perfil = {
    puesto:"Programador",
    empresa:"Tech"
};
const empleado = {
    ...usuario,
    perfil 
};
console.log(empleado);
const ciudad = empleado.perfil?.direccion?.ciudad;
const ciudadFinal = ciudad ?? "Ciudad no especificada";
console.log(ciudadFinal);