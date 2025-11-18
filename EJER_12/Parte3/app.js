const form = document.getElementById("formProducto");
const btnGuardar = document.getElementById("btnGuardar");
const estado = document.getElementById("estado");

const inputNombre = document.getElementById("nombre");
const inputSKU = document.getElementById("sku");
const inputPrecio = document.getElementById("precio");
const inputStock = document.getElementById("stock");
const inputCategoria = document.getElementById("categoria");

let skuValido = false;

async function validarSKU(sku) {
    const res = await fetch("./data/productos.json");
    const productos = await res.json();

    const existe = productos.some(p => p.sku === sku);

    return !existe;
}

async function validarFormulario() {

    const nombre = inputNombre.value.trim();
    const sku = inputSKU.value.trim();
    const precio = Number(inputPrecio.value);
    const stock = Number(inputStock.value);
    const categoria = inputCategoria.value.trim();

    if (!nombre || !sku || !categoria) {
        btnGuardar.disabled = true;
        return;
    }

    if (sku.length < 5) {
        estado.textContent = "El SKU debe tener al menos 5 caracteres.";
        btnGuardar.disabled = true;
        return;
    }

    if (precio <= 0) {
        estado.textContent = "El precio debe ser mayor que 0.";
        btnGuardar.disabled = true;
        return;
    }

    if (stock < 0) {
        estado.textContent = "El stock no puede ser negativo.";
        btnGuardar.disabled = true;
        return;
    }

    estado.textContent = "Validando SKU...";
    skuValido = await validarSKU(sku);

    if (!skuValido) {
        estado.textContent = "El SKU ya existe.";
        btnGuardar.disabled = true;
        return;
    }

    estado.textContent = "";
    btnGuardar.disabled = false;
}

[inputNombre, inputSKU, inputPrecio, inputStock, inputCategoria]
    .forEach(input => input.addEventListener("input", validarFormulario));


form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nuevoProducto = {
        nombre: inputNombre.value,
        sku: inputSKU.value,
        precio: Number(inputPrecio.value),
        stock: Number(inputStock.value),
        categoria: inputCategoria.value
    };

    estado.textContent = "Producto creado (simulación). Revisa la consola.";

    console.log("Nuevo producto creado:", nuevoProducto);
});
