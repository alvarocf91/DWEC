let recetasXML;
let historial = [];

window.addEventListener('load', () => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'recetas.xml', true);
    xhr.onload = () => {
        if(xhr.status === 200){
            recetasXML = xhr.responseXML;
            poblarSelects();
        } else {
            alert("Error al cargar recetas.xml");
        }
    };
    xhr.send();
});

function poblarSelects(){
    let bases = new Set();
    let mezclas = new Set();
    let aleaciones = recetasXML.querySelectorAll('aleacion');

    aleaciones.forEach(a => {
        bases.add(a.querySelector('base').textContent);
        mezclas.add(a.querySelector('mezcla').textContent);
    });

    let selectBase = document.getElementById('base');
    let selectMezcla = document.getElementById('mezcla');

    bases.forEach(b => {
        let opt = document.createElement('option');
        opt.value = b;
        opt.textContent = b;
        selectBase.appendChild(opt);
    });

    mezclas.forEach(m => {
        let opt = document.createElement('option');
        opt.value = m;
        opt.textContent = m;
        selectMezcla.appendChild(opt);
    });
}

document.getElementById('sintetizar').addEventListener('click', () => {
    let base = document.getElementById('base').value;
    let mezcla = document.getElementById('mezcla').value;

    let aleacion = Array.from(recetasXML.querySelectorAll('aleacion'))
        .find(a => a.querySelector('base').textContent === base &&
                   a.querySelector('mezcla').textContent === mezcla);

    let divResultado = document.getElementById('resultado');
    if(aleacion){
        let res = aleacion.querySelector('resultado').textContent;
        let desc = aleacion.querySelector('descripcion').textContent;
        divResultado.textContent = `${res}: ${desc}`;

        historial.push({base, mezcla, resultado: res, descripcion: desc});
        actualizarHistorial();
    } else {
        divResultado.textContent = "Combinación no válida. No se ha producido ninguna aleación.";
    }
});

function actualizarHistorial(){
    let ul = document.getElementById('historial');
    ul.innerHTML = '';
    historial.forEach((item, idx) => {
        let li = document.createElement('li');
        li.textContent = `${item.base} + ${item.mezcla} = ${item.resultado}`;
        li.addEventListener('click', () => {
            document.getElementById('base').value = item.base;
            document.getElementById('mezcla').value = item.mezcla;
            document.getElementById('resultado').textContent = `${item.resultado}: ${item.descripcion}`;
        });
        ul.appendChild(li);
    });
}

let agenteValido = null;

document.getElementById('codigo').addEventListener('blur', () => {
    let codigo = document.getElementById('codigo').value;
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'personal.xml', true);
    xhr.onload = () => {
        if(xhr.status === 200){
            let xml = xhr.responseXML;
            let agente = xml.querySelector(`agente[codigo="${codigo}"]`);
            let spanNombre = document.getElementById('nombreAgente');
            let inputClave = document.getElementById('clave');
            agenteValido = null;

            if(agente){
                spanNombre.textContent = `Bienvenido, ${agente.querySelector('nombre').textContent}`;
                inputClave.disabled = false;
                agenteValido = agente;
            } else {
                spanNombre.textContent = "Código de agente no reconocido";
                inputClave.disabled = true;
                document.getElementById('estadoClave').textContent = '';
                document.getElementById('acceder').disabled = true;
            }
        }
    };
    xhr.send();
});

document.getElementById('clave').addEventListener('blur', () => {
    if(!agenteValido) return;
    let clave = document.getElementById('clave').value;
    let estado = document.getElementById('estadoClave');
    let boton = document.getElementById('acceder');

    if(clave === agenteValido.querySelector('clave').textContent){
        estado.textContent = "Clave correcta";
        boton.disabled = false;
    } else {
        estado.textContent = "Clave incorrecta";
        boton.disabled = true;
    }
});

document.getElementById('codigo').addEventListener('input', () => {
    document.getElementById('clave').value = '';
    document.getElementById('clave').disabled = true;
    document.getElementById('estadoClave').textContent = '';
    document.getElementById('acceder').disabled = true;
});
