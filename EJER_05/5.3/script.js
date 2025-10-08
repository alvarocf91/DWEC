function generarInformeDeValidacion(event) {

  event.preventDefault();


  const nombre = document.getElementById('nombre').value.trim();
  const email = document.getElementById('email').value.trim();

  const informeDiv = document.getElementById('informe-errores');


  informeDiv.innerHTML = '';

  const errores = [];


  if (nombre.length <= 3) {
    errores.push('El nombre debe tener más de 3 caracteres.');
  }

  if (!email.includes('@')) {
    errores.push('El email debe contener un "@".');
  }


  if (errores.length > 0) {
    errores.forEach(error => {
      const p = document.createElement('p');
      p.textContent = error;
      p.classList.add('error');
      informeDiv.appendChild(p);
    });
  } else {
    const p = document.createElement('p');
    p.textContent = 'Formulario valido';
    p.classList.add('valido');
    informeDiv.appendChild(p);
  }
}
