const lista = document.getElementById('miLista');

function agregarBotones(li) {
  const btnSubir = document.createElement('button');
  btnSubir.textContent = 'Subir';
  btnSubir.classList.add('btn-subir');

  const btnBajar = document.createElement('button');
  btnBajar.textContent = 'Bajar';
  btnBajar.classList.add('btn-bajar');

  li.appendChild(btnSubir);
  li.appendChild(btnBajar);

  btnSubir.addEventListener('click', function(e) {
    const liActual = li;
    const anterior = liActual.previousElementSibling;
    if (anterior) {
      lista.insertBefore(liActual, anterior);
      actualizarBotones();
    }
  });

  btnBajar.addEventListener('click', function(e) {
    const liActual = li;
    const siguiente = liActual.nextElementSibling;
    if (siguiente) {
      lista.insertBefore(siguiente, liActual);
      actualizarBotones();
    }
  });
}

function actualizarBotones() {
  const items = lista.children;
  for (let i = 0; i < items.length; i++) {
    const li = items[i];
    const btnSubir = li.querySelector('.btn-subir');
    const btnBajar = li.querySelector('.btn-bajar');

    if (i === 0) {
      btnSubir.disabled = true;
    } else {
      btnSubir.disabled = false;
    }

    if (i === items.length - 1) {
      btnBajar.disabled = true;
    } else {
      btnBajar.disabled = false;
    }
  }
}

const elementos = lista.getElementsByTagName('li');
for (let li of elementos) {
  agregarBotones(li);
}

actualizarBotones();
