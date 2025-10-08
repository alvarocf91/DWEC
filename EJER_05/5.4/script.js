const usuarios = [
  { nombre: 'Ana', edad: 25 },
  { nombre: 'Luis', edad: 30 },
  { nombre: 'María', edad: 28 },
  { nombre: 'Pedro', edad: 35 }
];


function construirTabla(arrayDeUsuarios) {

  const tabla = document.createElement('table');
  const fragmento = document.createDocumentFragment();


  const encabezado = document.createElement('tr');
  const claves = Object.keys(arrayDeUsuarios[0]);  
  
  claves.forEach(clave => {
    const th = document.createElement('th');
    th.textContent = clave.charAt(0).toUpperCase() + clave.slice(1);
    encabezado.appendChild(th);
  });

  tabla.appendChild(encabezado);

  arrayDeUsuarios.forEach(usuario => {
    const fila = document.createElement('tr');

    claves.forEach(clave => {
      const td = document.createElement('td');
      td.textContent = usuario[clave];
      fila.appendChild(td);
    });

    fragmento.appendChild(fila);
  });


  tabla.appendChild(fragmento);

  const contenedor = document.getElementById('contenedor-tabla');
  contenedor.appendChild(tabla);
}

construirTabla(usuarios);
