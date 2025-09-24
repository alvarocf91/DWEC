const producto = {
    nombre : "Portatil",
    precio : 900

};

const cliente = {
    nombreCliente : "Gerardo",
    esPremium : false
};

const pedido = {...producto,...cliente};

console.log("Pedido:",pedido);

const producto2 = {

    nombre : "Telefono",
    precio : 500
};

const pedido2 = {...producto2,...cliente};
console.log("Pedido con mismo nombre",pedido2);