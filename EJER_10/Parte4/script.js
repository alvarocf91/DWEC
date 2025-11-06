let fragmentoActual = null;
let letraSeleccionada = null;
let intentos = 0;

document.getElementById('empezar').addEventListener('click', () => {
    cargarFragmento('fragmento1.xml');
});

document.addEventListener('click', (e) => {
    if (!fragmentoActual) return;

    if (e.target.classList.contains('letra')) {
        letraSeleccionada = e.target.textContent;
        return;
    }

    if (letraSeleccionada === fragmentoActual.letra_clave && e.target.matches(fragmentoActual.selector_solucion)) {
        if (fragmentoActual.siguiente !== 'null') {
            cargarFragmento(fragmentoActual.siguiente);
        } else {
            alert('¡Has completado todos los fragmentos!');
        }
        intentos = 0;
        document.getElementById('intentos').textContent = `Intentos: ${intentos}`;
    } else {
        intentos++;
        document.getElementById('intentos').textContent = `Intentos: ${intentos}`;
        e.target.style.backgroundColor = 'red';
        setTimeout(() => e.target.style.backgroundColor = '', 500);
    }
});

function cargarFragmento(nombreArchivo) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', nombreArchivo, true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            let xml = xhr.responseXML;
            fragmentoActual = {
                texto: xml.querySelector('texto').textContent,
                pista: xml.querySelector('pista').textContent,
                selector_solucion: xml.querySelector('selector_solucion').textContent,
                letra_clave: xml.querySelector('letra_clave').textContent,
                siguiente: xml.querySelector('siguiente_fragmento').textContent
            };
            document.getElementById('texto').textContent = fragmentoActual.texto;
            document.getElementById('pista').textContent = fragmentoActual.pista;
        } else {
            alert('Error al cargar el fragmento');
        }
    };
    xhr.send();
}
