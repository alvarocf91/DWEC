
const cursos = [
  {
    nombre: "Programación",
    profesor: "Ana Martínez",
    estudiantes: [
      { nombre: "Carlos", calificacion: 8 },
      { nombre: "Lucía", calificacion: 9 },
      { nombre: "Marcos", calificacion: 7 }
    ]
  },
  {
    nombre: "Diseño Gráfico",
    profesor: "Luis Gómez",
    estudiantes: [
      { nombre: "Sofía", calificacion: 6 },
      { nombre: "Pablo", calificacion: 5 },
      { nombre: "Andrea", calificacion: 7 }
    ]
  },
  {
    nombre: "Matemáticas",
    profesor: "Marta Pérez",
    estudiantes: [
      { nombre: "Ana", calificacion: 9 },
      { nombre: "Diego", calificacion: 10 },
      { nombre: "Elena", calificacion: 9 }
    ]
  },
  {
    nombre: "Historia",
    profesor: "Carlos Ruiz",
    estudiantes: [
      { nombre: "Laura", calificacion: 3 },
      { nombre: "Miguel", calificacion: 4 },
      { nombre: "Natalia", calificacion: 6 }
    ]
  }
];


const resumenCursos = cursos.map(curso => {
  const suma = curso.estudiantes.reduce((acc, estudiante) => acc + estudiante.calificacion, 0);
  const promedio = suma / curso.estudiantes.length;
  return {
    nombreCurso: curso.nombre,
    promedioCalificaciones: promedio
  };
});


const cursosDestacados = resumenCursos.filter(curso => curso.promedioCalificaciones >= 7);

cursosDestacados.forEach(curso => {
  console.log(`El curso ${curso.nombreCurso} tiene un promedio de ${curso.promedioCalificaciones.toFixed(2)} y es considerado destacado.`);
});


cursos.forEach(curso => {
  const hayCalificacionBaja = curso.estudiantes.some(estudiante => estudiante.calificacion < 4);
  if (hayCalificacionBaja) {
    console.log(`En el curso ${curso.nombre} hay estudiantes con calificaciones muy bajas.`);
  }
});