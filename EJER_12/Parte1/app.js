const contenedor = document.getElementById("productos");
const categoriaSelect = document.getElementById("categoriaSelect");
const estadoCarga = document.getElementById("estadoCarga");

let productos = [];
let productosMostrados = [];

async function cargarProductos() {
    try {
        const respuesta = await fetch("./data/productos.json");
        const data = await respuesta.json();

        productos = data;
        productosMostrados = [...productos];

        estadoCarga.textContent = ""; 

        mostrarProductos(productos);
        generarCategorias(productos);

    } catch (error) {
        estadoCarga.textContent = "Error al cargar los productos";
        console.error(error);
    }
}

function mostrarProductos(lista) {
    contenedor.innerHTML = "";

    lista.forEach(prod => {
        const tarjeta = document.createElement("div");

        tarjeta.innerHTML = `
            <h3>${prod.nombre}</h3>
            <p>Precio: ${prod.precio} €</p>
            <p>Stock: ${prod.stock}</p>
            <p>Categoría: ${prod.categoria}</p>
            <hr>
        `;

        contenedor.appendChild(tarjeta);
    });
}

function generarCategorias(productos) {
    const categorias = [...new Set(productos.map(p => p.categoria))];

    categorias.forEach(cat => {
        const option = document.createElement("option");
        option.value = cat;
        option.textContent = cat;
        categoriaSelect.appendChild(option);
    });
}

categoriaSelect.addEventListener("change", () => {
    const categoria = categoriaSelect.value;

    if (categoria === "Todas") {
        productosMostrados = [...productos];
    } else {
        productosMostrados = productos.filter(p => p.categoria === categoria);
    }

    mostrarProductos(productosMostrados);
});

document.getElementById("precioAsc").addEventListener("click", () => {
    productosMostrados.sort((a, b) => a.precio - b.precio);
    mostrarProductos(productosMostrados);
});

document.getElementById("precioDesc").addEventListener("click", () => {
    productosMostrados.sort((a, b) => b.precio - a.precio);
    mostrarProductos(productosMostrados);
});

cargarProductos();
