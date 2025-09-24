function retirarDinero(saldo,cantidad,tieneTarjetaCredito = false){
    if(saldo>=cantidad){
        let nuevoSaldo = saldo - cantidad;
        console.log('Retiro exitoso. Saldo restante:$ {nuevoSaldo}');
    }
    else if(tieneTarjetaCredito){
        console.log("Saldo insuficiente, pagando con tarjeta de crédito.");
    }
    else{
        console.log("Saldo insuficiente.");
    }
}