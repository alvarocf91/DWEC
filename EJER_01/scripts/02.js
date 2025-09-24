let coche = {
    marca:"Seat",
    modelo:"Ibiza",
    año:2025,
    estaDisponible: true
};

console.table(coche)

const{marca,modelo}=coche;
console.log("Marca:",marca);
console.log("Modelo:",modelo);

coche.estaDisponible = false;

coche.color = "verde";

delete coche.año;

console.table(coche);
