const numeros = [8,5,4,3,2,1]

const dobles = numeros.map(num=> num * 2);
console.log("Dobles:", dobles);

const pares = numeros.filter(num=>num%2==0);
console.log("Pares :" ,pares);

console.log("Numeros pares con for...of:");
for(let num of pares){
    console.log(num);
}
