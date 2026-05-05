// Datos globales (se rellenarán con fetch)
let libros = [];      // array de objetos libro (id, titulo, autor, ejemplaresDisponibles)
let alumnos = [];     // array de objetos alumno (id, nombre)
let prestamos = [];   // array de objetos prestamo (id, idLibro, idAlumno, fechas, estado)

const hoy = new Date().toISOString().split("T")[0]; // fecha actual "YYYY-MM-DD"

// ========== CARGA DE LOS JSON CON fetch() ==========
Promise.all([
  fetch("data/libros.json").then(r => r.json()),     // pide data/libros.json y convierte a JS
  fetch("data/alumnos.json").then(r => r.json()),    // pide data/alumnos.json y convierte a JS
  fetch("data/prestamos.json").then(r => r.json())   // pide data/prestamos.json y convierte a JS
])
.then(([dataLibros, dataAlumnos, dataPrestamos]) => {
  // Cuando los tres fetch terminan correctamente, guardamos los datos
  libros = dataLibros;
  alumnos = dataAlumnos;
  prestamos = dataPrestamos;

  // Mostramos la página inicial (dashboard)
  navegar("dashboard");
})
.catch(err => {
  // En un examen: comunicar error de carga (network / JSON mal formado)
  console.error("Error cargando JSON:", err);
  document.getElementById("contenido").innerText = "Error cargando datos.";
});

// ========== NAVEGACIÓN Y EVENTOS (SPA sencilla) ==========
document.querySelectorAll("nav button").forEach(boton => {
  // Añadimos un listener a cada botón del nav. data-page tiene la página destino.
  boton.addEventListener("click", () => {
    navegar(boton.dataset.page);
  });
});

function navegar(pagina) {
  // Función que controla qué mostrar según la "ruta" (pagina)
  const cont = document.getElementById("contenido");
  cont.innerHTML = ""; // limpiamos contenedor

  if (pagina === "dashboard") renderDashboard();
  if (pagina === "libros") renderLibros();
  if (pagina === "alumnos") renderAlumnos();
  if (pagina === "prestamos") renderPrestamos();
  if (pagina === "nuevo") renderNuevoPrestamo();
}

// ========== DASHBOARD: cálculo de estadísticas ==========
function calcularEstadisticas() {
  const totalLibros = libros.length;

  // prestamos activos = aquellos con estado === "activo"
  const activos = prestamos.filter(p => p.estado === "activo").length;

  // vencidos = activos cuya fechaDevolucion es anterior a hoy
  const vencidos = prestamos.filter(p =>
    p.estado === "activo" && p.fechaDevolucion < hoy
  ).length;

  // contamos cuántas veces aparece cada idLibro en prestamos
  const contador = {};
  prestamos.forEach(p => {
    contador[p.idLibro] = (contador[p.idLibro] || 0) + 1;
  });

  // buscamos el idLibro con mayor contador
  let idMax = null, max = 0;
  for (let id in contador) {
    if (contador[id] > max) {
      max = contador[id];
      idMax = id;
    }
  }

  // traducimos id a título; el ? evita error si no existe
  const libroMasPrestado = libros.find(l => l.id == idMax)?.titulo || "Ninguno";

  return { totalLibros, activos, vencidos, libroMasPrestado };
}

function renderDashboard() {
  const { totalLibros, activos, vencidos, libroMasPrestado } = calcularEstadisticas();
  const contenido = document.getElementById("contenido");

  contenido.innerHTML = `
    <h2>Dashboard</h2>
    <p>Total de libros: <b>${totalLibros}</b></p>
    <p>Préstamos activos: <b>${activos}</b></p>
    <p>Préstamos vencidos: <b>${vencidos}</b></p>
    <p>Libro más prestado: <b>${libroMasPrestado}</b></p>
  `;
}

// ========== LISTAS SIMPLES ==========
function renderLibros() {
  const contenido = document.getElementById("contenido");
  contenido.innerHTML = "<h2>Catálogo de libros</h2>";
  libros.forEach(l => {
    contenido.innerHTML += `
      <div class="card">
        <h3>${l.titulo}</h3>
        <p>Autor: ${l.autor}</p>
        <p>Disponibles: ${l.ejemplaresDisponibles}</p>
      </div>
    `;
  });
}

function renderAlumnos() {
  const contenido = document.getElementById("contenido");
  contenido.innerHTML = "<h2>Alumnos</h2>";
  alumnos.forEach(a => {
    const prest = prestamos.filter(p => p.idAlumno === a.id);
    contenido.innerHTML += `
      <div class="card">
        <h3>${a.nombre}</h3>
        <p>Préstamos realizados: ${prest.length}</p>
      </div>
    `;
  });
}

// ========== PRÉSTAMOS ACTIVOS Y FUNCIÓN DEVOLVER ==========
function devolverPrestamo(id) {
  const p = prestamos.find(pr => pr.id === id);
  if (!p) return;

  p.estado = "devuelto";
  p.fechaRealDevolucion = hoy;

  // aumentamos ejemplares disponibles del libro
  const libro = libros.find(l => l.id == p.idLibro);
  if (libro) libro.ejemplaresDisponibles++;

  // refrescamos la vista
  navegar("prestamos");
}

function renderPrestamos() {
  const contenido = document.getElementById("contenido");
  contenido.innerHTML = "<h2>Préstamos activos</h2>";

  prestamos
    .filter(p => p.estado === "activo")
    .forEach(p => {
      const alumno = alumnos.find(a => a.id == p.idAlumno)?.nombre || "??";
      const libro = libros.find(l => l.id == p.idLibro)?.titulo || "??";
      contenido.innerHTML += `
        <div class="card">
          <p><b>${libro}</b> prestado a <b>${alumno}</b></p>
          <p>Devuelve antes de: ${p.fechaDevolucion}</p>
          <button onclick="devolverPrestamo('${p.id}')">Devolver</button>
        </div>
      `;
    });
}

// ========== NUEVO PRÉSTAMO ==========
function renderNuevoPrestamo() {
  const contenido = document.getElementById("contenido");
  const librosDisponibles = libros.filter(l => l.ejemplaresDisponibles > 0);

  contenido.innerHTML = `
    <h2>Nuevo préstamo</h2>
    <label>Libro:</label>
    <select id="selLibro">
      ${librosDisponibles.map(l => `<option value="${l.id}">${l.titulo}</option>`).join("")}
    </select>

    <label>Alumno:</label>
    <select id="selAlumno">
      ${alumnos.map(a => `<option value="${a.id}">${a.nombre}</option>`).join("")}
    </select>

    <button id="btnCrear">Crear préstamo</button>
  `;

  // evento del botón para crear préstamo (delegado local)
  document.getElementById("btnCrear").addEventListener("click", () => {
    const idLibro = document.getElementById("selLibro").value;
    const idAlumno = document.getElementById("selAlumno").value;
    crearPrestamo(idLibro, idAlumno);
  });
}

function crearPrestamo(idLibro, idAlumno) {
  const libro = libros.find(l => l.id == idLibro);
  if (!libro) {
    alert("Libro no encontrado");
    return;
  }
  if (libro.ejemplaresDisponibles <= 0) {
    alert("No hay ejemplares disponibles");
    return;
  }

  const nuevo = {
    id: crypto.randomUUID(), // genera un id único (en el examen puede usarse Date.now() si no está disponible)
    idLibro,
    idAlumno,
    fechaPrestamo: hoy,
    fechaDevolucion: new Date(Date.now() + 21*24*60*60*1000).toISOString().split("T")[0],
    estado: "activo"
  };

  // Actualizamos estado en memoria (no se persiste a disco sin backend)
  libro.ejemplaresDisponibles--;
  prestamos.push(nuevo);

  console.log("Préstamo creado:", nuevo);
  navegar("prestamos");
}

  /*const nuevo = {
    id: Date.now().toString(),   // ID único basado en la hora
    idLibro,
    idAlumno,
    fechaPrestamo: hoy,
    fechaDevolucion: new Date(Date.now() + 21*24*60*60*1000)
        .toISOString()
        .split("T")[0],
    estado: "activo"
};*/


