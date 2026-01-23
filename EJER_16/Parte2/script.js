const contenedorEventos = document.getElementById("eventosContainer")

function crearFechaCustom(...args) {
  if (args.length === 1) {
    if (typeof args[0] === "number") return new Date(args[0])
    if (typeof args[0] === "string") return new Date(args[0])
  }
  if (args.length === 3) return new Date(args[0], args[1] - 1, args[2])
  return null
}

let ahora = new Date()
let tresDiasMasTarde = new Date(ahora.getTime() + 3 * 24 * 60 * 60 * 1000)

let listaEventos = [
  { nombre: "Cabalgata de Reyes de Gijón 2026", descripcion: "Desfile tradicional por las calles de la ciudad", fecha: crearFechaCustom("2026-01-05") },
  { nombre: "Vibra Mahou Fest Gijón", descripcion: "Festival de música con artistas nacionales", fecha: crearFechaCustom("2026-05-16") },
  { nombre: "Concierto Alejandro Sanz en Gijón", descripcion: "Concierto en el Parque Hermanos Castro", fecha: crearFechaCustom("2026-06-12") },
  { nombre: "Concierto Lola Índigo en Gijón", descripcion: "Actuación en el Parque Hermanos Castro", fecha: crearFechaCustom("2026-06-19") },
  { nombre: "Concierto Antonio Orozco en Gijón", descripcion: "Show en el Parque Hermanos Castro", fecha: crearFechaCustom("2026-06-20") },
  { nombre: "Boombastic Asturias", descripcion: "Festival de música urbana en Llanera", fecha: crearFechaCustom("2026-07-16") },
  { nombre: "Festival Aéreo Internacional de Gijón", descripcion: "Exhibición aérea en la bahía de San Lorenzo", fecha: crearFechaCustom("2026-07-26") },
  { nombre: "Semana Grande de Gijón", descripcion: "Fiestas urbanas con conciertos y fuegos", fecha: crearFechaCustom("2026-08-06") }
]

function ordenarPorFecha() {
  listaEventos.sort((a, b) => a.fecha - b.fecha)
}

function formatearTiempo(ms) {
  const totalSegundos = Math.floor(ms / 1000)
  const dias = Math.floor(totalSegundos / 86400)
  const horas = Math.floor((totalSegundos % 86400) / 3600)
  const minutos = Math.floor((totalSegundos % 3600) / 60)
  const segundos = totalSegundos % 60
  return `${dias} : ${horas} : ${minutos} : ${segundos}`
}

function mostrarEventos() {
  contenedorEventos.innerHTML = ""

  for (const [index, evento] of listaEventos.entries()) {
    const tarjeta = document.createElement("div")
    tarjeta.className = "col-md-4"
    tarjeta.innerHTML = `
      <div class="card h-100">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${evento.nombre}</h5>
          <p class="card-text">${evento.descripcion}</p>
          <p><b>Fecha:</b> ${evento.fecha.toLocaleString()}</p>
          <p><b>Tiempo restante:</b> <span id="contador-${index}"></span></p>
          <div class="input-group mb-2">
            <input type="number" class="form-control" id="dias-${index}" placeholder="Días a posponer">
            <button class="btn btn-primary" id="btn-${index}">Posponer</button>
          </div>
        </div>
      </div>
    `
    contenedorEventos.appendChild(tarjeta)

    const boton = document.getElementById(`btn-${index}`)
    const inputDias = document.getElementById(`dias-${index}`)
    boton.addEventListener("click", () => {
      const dias = Number(inputDias.value)
      if (!isNaN(dias)) {
        evento.fecha.setDate(evento.fecha.getDate() + dias)
        ordenarPorFecha()
      }
    })
  }
}

function actualizarContadores() {
  const ahoraMs = Date.now()
  for (const [index, evento] of listaEventos.entries()) {
    const spanTiempo = document.getElementById(`contador-${index}`)
    if (!spanTiempo) continue
    const diff = evento.fecha.getTime() - ahoraMs
    spanTiempo.textContent = diff > 0 ? formatearTiempo(diff) : "FINALIZADO"
    spanTiempo.style.color = diff > 0 ? "green" : "red"
  }
}

ordenarPorFecha()
mostrarEventos()
setInterval(actualizarContadores, 1000)
