const tablaBody = document.querySelector("#tabla")
const totalBox = document.querySelector("#total")
const BYTES_A_MB = 1024 * 1024

async function iniciar() {
  try {
    const respuesta = await fetch("logs.txt")
    if (!respuesta.ok) throw new Error("No se pudo leer")

    const contenido = await respuesta.text()
    mostrarDatos(contenido)
  } catch (e) {
    totalBox.className = "alert alert-danger"
    totalBox.textContent = "Error cargando el archivo de logs"
  }
}

function extraerEntre(texto, inicio, fin) {
  return texto.slice(
    texto.indexOf(inicio) + inicio.length,
    texto.indexOf(fin)
  ).trim()
}

function mostrarDatos(texto) {
  const filas = texto.split("\n").filter(l => l.trim() !== "")
  let consumoTotal = 0

  for (const fila of filas) {
    const limpia = fila.trim()

    const idCompleto = extraerEntre(limpia, "ID:", "|")
    const id = idCompleto.split("-")[1]

    const usuario = extraerEntre(limpia, "user:", "| consumo").toLowerCase()

    const bytes = Number(extraerEntre(limpia, "consumo:", "bytes"))
    const mb = bytes / BYTES_A_MB
    consumoTotal += mb

    const hayError = limpia.includes("ERROR")

    const tr = document.createElement("tr")
    if (hayError) tr.classList.add("table-danger")

    tr.innerHTML = `
      <td>${id}</td>
      <td>${usuario}</td>
      <td>${mb.toFixed(2)}</td>
      <td>
        <button class="btn btn-${hayError ? "danger" : "success"} btn-sm">
          ${hayError ? "ERROR" : "OK"}
        </button>
      </td>
    `

    tablaBody.appendChild(tr)
  }

  totalBox.textContent = `Consumo total: ${consumoTotal.toFixed(2)} MB`
}
iniciar()
