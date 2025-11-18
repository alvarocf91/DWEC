let usuarios = [];
let productos = [];
let pedidos = [];
let detalles = [];

const estado = document.getElementById("estado");
const usuarioSelect = document.getElementById("usuarioSelect");

const panelUsuario = document.getElementById("panelUsuario");
const panelPedidos = document.getElementById("panelPedidos");
const panelResumen = document.getElementById("panelResumen");


async function cargarDatosIniciales() {
    try {
        const [resUsuarios, resProductos, resPedidos, resDetalles] = await Promise.all([
            fetch("./data/usuarios.json"),
            fetch("./data/productos.json"),
            fetch("./data/pedidos.json"),
            fetch("./data/detalles_pedidos.json")
        ]);

        usuarios = await resUsuarios.json();
        productos = await resProductos.json();
        pedidos = await resPedidos.json();
        detalles = await resDetalles.json();

        estado.textContent = "";
        inicializarDashboard();

    } catch (error) {
        estado.textContent = "Error al cargar datos.";
        console.error(error);
    }
}


function inicializarDashboard() {
    usuarios.forEach(u => {
        const option = document.createElement("option");
        option.value = u.id;
        option.textContent = u.nombre;
        usuarioSelect.appendChild(option);
    });

    usuarioSelect.addEventListener("change", () => {
        if (usuarioSelect.value) {
            mostrarDashboardUsuario(Number(usuarioSelect.value));
        }
    });
}


function mostrarDashboardUsuario(usuarioId) {
    limpiarPaneles();

    const usuario = usuarios.find(u => u.id === usuarioId);
    const pedidosUsuario = pedidos.filter(p => p.usuarioId === usuarioId);

    renderizarInfoUsuario(usuario);

    if (pedidosUsuario.length === 0) {
        panelPedidos.innerHTML = "<p>Este usuario no tiene pedidos registrados.</p>";
        panelResumen.innerHTML = "<p>Total acumulado: 0 €</p>";
        return;
    }

    const pedidosCompletos = pedidosUsuario.map(p => {
        const detallesPedido = buscarDetallesDePedido(p.id);

        const total = calcularTotalPedido(detallesPedido);

        return {
            ...p,
            detalles: detallesPedido,
            total
        };
    });

    renderizarPedidosUsuario(pedidosCompletos);

    const gastoTotal = pedidosCompletos.reduce((acc, p) => acc + p.total, 0);
    renderizarResumen(gastoTotal);
}


function buscarDetallesDePedido(pedidoId) {
    return detalles
        .filter(d => d.pedidoId === pedidoId)
        .map(det => {
            const producto = productos.find(p => p.id === det.productoId);
            return {
                nombre: producto ? producto.nombre : "Producto desconocido",
                cantidad: det.cantidad,
                precio: det.precioUnitario
            };
        });
}

function calcularTotalPedido(detallesArray) {
    return detallesArray.reduce(
        (acc, d) => acc + d.cantidad * d.precio,
        0
    );
}


function renderizarInfoUsuario(usuario) {
    panelUsuario.innerHTML = `
        <h2>Datos del Usuario</h2>
        <p><strong>Nombre:</strong> ${usuario.nombre}</p>
        <p><strong>Email:</strong> ${usuario.email}</p>
        <p><strong>Fecha de Registro:</strong> ${usuario.fechaRegistro}</p>
        <hr>
    `;
}

function renderizarPedidosUsuario(pedidos) {
    panelPedidos.innerHTML = "<h2>Pedidos del Usuario</h2>";

    pedidos.forEach(p => {
        const div = document.createElement("div");

        div.innerHTML = `
            <h3>Pedido #${p.id}</h3>
            <p>Fecha: ${p.fecha}</p>
            <p>Estado: ${p.estado}</p>
            <p><strong>Total:</strong> ${p.total.toFixed(2)} €</p>
            <h4>Detalles:</h4>
        `;

        const ul = document.createElement("ul");

        p.detalles.forEach(d => {
            const li = document.createElement("li");
            li.textContent = `${d.cantidad} x ${d.nombre} - ${d.precio} €`;
            ul.appendChild(li);
        });

        div.appendChild(ul);
        div.appendChild(document.createElement("hr"));
        panelPedidos.appendChild(div);
    });
}

function renderizarResumen(gastoTotal) {
    panelResumen.innerHTML = `
        <h2>Resumen</h2>
        <p><strong>Gasto total acumulado:</strong> ${gastoTotal.toFixed(2)} €</p>
    `;
}

function limpiarPaneles() {
    panelUsuario.innerHTML = "";
    panelPedidos.innerHTML = "";
    panelResumen.innerHTML = "";
}

cargarDatosIniciales();
