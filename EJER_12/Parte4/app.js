const panel = document.getElementById("panel");
const estado = document.getElementById("estado");

async function cargarPanel() {
    try {
        // Carga simultánea de datos
        const [resPedidos, resDetalles, resProductos] = await Promise.all([
            fetch("./data/pedidos.json"),
            fetch("./data/detalles_pedidos.json"),
            fetch("./data/productos.json")
        ]);

        const pedidos = await resPedidos.json();
        const detalles = await resDetalles.json();
        const productos = await resProductos.json();

        estado.textContent = "";

        const pedidosEnriquecidos = combinarDatos(pedidos, detalles, productos);
        mostrarPanel(pedidosEnriquecidos);

    } catch (error) {
        estado.textContent = "Error cargando datos.";
        console.error(error);
    }
}

// ------- COMBINAR DATOS -------
function combinarDatos(pedidos, detalles, productos) {

    return pedidos.map(pedido => {
        // Obtener detalles del pedido actual
        const detallesPedido = detalles
            .filter(d => d.pedidoId === pedido.id)
            .map(det => {
                const prod = productos.find(p => p.id === det.productoId);

                return {
                    cantidad: det.cantidad,
                    precioUnitario: det.precioUnitario,
                    nombreProducto: prod ? prod.nombre : "Producto desconocido"
                };
            });

        // Calcular total
        const totalPedido = detallesPedido.reduce(
            (acc, d) => acc + d.cantidad * d.precioUnitario,
            0
        );

        return {
            ...pedido,
            detalles: detallesPedido,
            totalPedido
        };
    });
}

// ------- MOSTRAR PANEL -------
function mostrarPanel(pedidos) {
    panel.innerHTML = "";

    pedidos.forEach(p => {
        const tarjeta = document.createElement("div");

        tarjeta.innerHTML = `
            <h3>Pedido #${p.id}</h3>
            <p>Fecha: ${p.fecha}</p>
            <p>Estado: ${p.estado}</p>
            <p><strong>Total:</strong> ${p.totalPedido.toFixed(2)} €</p>
            <h4>Detalles:</h4>
        `;

        const lista = document.createElement("ul");

        p.detalles.forEach(d => {
            const item = document.createElement("li");
            item.textContent =
                `${d.cantidad} x ${d.nombreProducto} - ${d.precioUnitario} €`;
            lista.appendChild(item);
        });

        tarjeta.appendChild(lista);
        tarjeta.appendChild(document.createElement("hr"));
        panel.appendChild(tarjeta);
    });
}

cargarPanel();
