const nombre = "Alvaro"
let edad = 21
const tieneMascota = false
edad = 22
tieneMascota = true
console.log("nombre:", nombre,"|tipo:", typeof nombre);
console.log("edad:", edad,"|tipo:",typeof edad);
console.log("tieneMascota:",tieneMascota,"|tipo:",typeof tieneMascota);
const frase = '${nombre} tiene ${edad} años y ${tieneMascota ? "tiene mascota " : "no tiene mascota"}.';
console.log(frase);
