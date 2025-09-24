let estudiantes = [
  { nombre: "Luis", apellidos: "Pérez", calificacion: 8, aprobado: true },
  { nombre: "María", apellidos: "López", calificacion: 4, aprobado: false },
  { nombre: "Carlos", apellidos: "García", calificacion: 6, aprobado: false } // incoherencia
];

let estudiantesConId = estudiantes.map((est, i) => ({
  ...est,
  id: i + 1
}));

let aprobados = estudiantesConId.filter(est => est.calificacion >= 5);

aprobados.forEach(est => {
  console.log(`¡Felicidades ${est.nombre}, has aprobado con ${est.calificacion}!`);
});

estudiantes.forEach(est => {
  let coherente = (est.calificacion >= 5 && est.aprobado === true) ||
                  (est.calificacion < 5 && est.aprobado === false);

  if (!coherente) {
    console.warn(`Incoherencia en el registro de ${est.nombre}: calificación = ${est.calificacion}, aprobado = ${est.aprobado}`);
  }
});





