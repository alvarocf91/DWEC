const form = document.getElementById("formBusqueda");
const emailInput = document.getElementById("emailInput");
const estado = document.getElementById("estado");
const resultados = document.getElementById("resultados");

async function buscarUsuarioYPedidos(email) {

    const resUsuarios = await fetch("./data/usuarios.json");
    const usuarios = await resUsuarios.json();

    const usuario = usuarios.find(u => u.email === email);

    if (!usuario) {
        throw new Error("Usuario no encontrado");
    }

    const resPedidos = await fetch("./data/pedidos.json");
    const pedidos = await resPedidos.json();

    const pedidosUsuario = pedidos.filter(p => p.usuarioId === usuario.id);

    return {
        usuario,
        pedidos: pedidosUsuario
    };
}

function mostrarResultados({ usuario, pedidos }) {
    resultados.innerHTML = `
        <h3>Usuario encontrado:</h3>
        <p><strong>Nombre:</strong> ${usuario.nombre}</p>
        <p><strong>Fecha de registro:</strong> ${usuario.fechaRegistro}</p>
        <h3>Pedidos:</h3>
    `;

    if (pedidos.length === 0) {
        resultados.innerHTML += `<p>Este usuario no tiene pedidos registrados.</p>`;
        return;
    }

    pedidos.forEach(p => {
        const div = document.createElement("div");
        div.innerHTML = `
            <p>ID Pedido: ${p.id}</p>
            <p>Fecha: ${p.fecha}</p>
            <p>Estado: ${p.estado}</p>
            <hr>
        `;
        resultados.appendChild(div);
    });
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    resultados.innerHTML = "";

    if (email === "" || !email.includes("@")) {
        estado.textContent = "Introduce un email válido.";
        return;
    }

    estado.textContent = "Buscando...";

    try {
        const datos = await buscarUsuarioYPedidos(email);
        estado.textContent = "";
        mostrarResultados(datos);
    } catch (error) {
        estado.textContent = error.message;
    }
});
