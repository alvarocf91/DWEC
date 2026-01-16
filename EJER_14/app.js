const btnClaro = document.getElementById("claro");
const btnOscuro = document.getElementById("oscuro");

function aplicarTema(tema) {
  document.body.style.background = tema === "oscuro" ? "black" : "white";
  document.body.style.color = tema === "oscuro" ? "white" : "black";
  sessionStorage.setItem("tema", tema);
}

btnClaro.onclick = () => aplicarTema("claro");
btnOscuro.onclick = () => aplicarTema("oscuro");

const temaGuardado = sessionStorage.getItem("tema");
if (temaGuardado) aplicarTema(temaGuardado);

function getCookie(nombre) {
  return document.cookie
    .split("; ")
    .find(c => c.startsWith(nombre + "="))
    ?.split("=")[1];
}

function setCookie(nombre, valor, dias) {
  const fecha = new Date();
  fecha.setTime(fecha.getTime() + dias * 86400000);
  document.cookie = `${nombre}=${valor}; expires=${fecha.toUTCString()}; path=/`;
}

const banner = document.getElementById("banner");
const mensaje = document.getElementById("mensaje");

const ultima = getCookie("ultimaVisita");
if (ultima) {
  mensaje.textContent = `Bienvenido de nuevo. Tu última visita fue ${ultima}`;
} else {
  banner.style.display = "none";
}

setCookie("ultimaVisita", new Date().toLocaleString(), 30);

document.getElementById("cerrar").onclick = () => {
  banner.style.display = "none";
};

let db;
const request = indexedDB.open("tiendaDB", 1);

request.onupgradeneeded = e => {
  db = e.target.result;
  db.createObjectStore("productos", { keyPath: "id" });
  db.createObjectStore("carrito", { keyPath: "productoId" });
};

request.onsuccess = e => {
  db = e.target.result;
  cargarProductos();
  mostrarCarrito();
};

function cargarProductos() {
  const tx = db.transaction("productos", "readonly");
  const store = tx.objectStore("productos");

  store.getAll().onsuccess = async e => {
    if (e.target.result.length > 0) {
      mostrarProductos(e.target.result);
    } else {
      const res = await fetch("./data/productos.json");
      const data = await res.json();

      const txw = db.transaction("productos", "readwrite");
      const storew = txw.objectStore("productos");
      data.forEach(p => storew.add(p));

      mostrarProductos(data);
    }
  };
}

document.getElementById("forzar").onclick = () => {
  const tx = db.transaction("productos", "readwrite");
  tx.objectStore("productos").clear();
  cargarProductos();
};

function mostrarProductos(productos) {
  const cont = document.getElementById("productos");
  cont.innerHTML = "";

  productos.forEach(p => {
    const div = document.createElement("div");
    div.innerHTML = `
      ${p.nombre}
      <button onclick="addCarrito(${p.id})">Añadir</button>
    `;
    cont.appendChild(div);
  });
}

function addCarrito(id) {
  const tx = db.transaction("carrito", "readwrite");
  const store = tx.objectStore("carrito");

  const req = store.get(id);
  req.onsuccess = () => {
    if (req.result) {
      req.result.cantidad++;
      store.put(req.result);
    } else {
      store.add({ productoId: id, cantidad: 1 });
    }
    mostrarCarrito();
  };
}

function mostrarCarrito() {
  const ul = document.getElementById("carrito");
  ul.innerHTML = "";

  const tx = db.transaction("carrito", "readonly");
  tx.objectStore("carrito").getAll().onsuccess = e => {
    e.target.result.forEach(item => {
      const li = document.createElement("li");
      li.textContent = `${item.productoId} x ${item.cantidad}`;

      const mas = document.createElement("button");
      mas.textContent = "+";
      mas.onclick = () => actualizar(item.productoId, item.cantidad + 1);

      const menos = document.createElement("button");
      menos.textContent = "-";
      menos.onclick = () => actualizar(item.productoId, item.cantidad - 1);

      const borrar = document.createElement("button");
      borrar.textContent = "x";
      borrar.onclick = () => eliminar(item.productoId);

      li.append(mas, menos, borrar);
      ul.appendChild(li);
    });
  };
}

function actualizar(id, cantidad) {
  const tx = db.transaction("carrito", "readwrite");
  if (cantidad <= 0) {
    tx.objectStore("carrito").delete(id);
  } else {
    tx.objectStore("carrito").put({ productoId: id, cantidad });
  }
  mostrarCarrito();
}

function eliminar(id) {
  const tx = db.transaction("carrito", "readwrite");
  tx.objectStore("carrito").delete(id);
  mostrarCarrito();
}

document.getElementById("vaciar").onclick = () => {
  const tx = db.transaction("carrito", "readwrite");
  tx.objectStore("carrito").clear();
  mostrarCarrito();
};
