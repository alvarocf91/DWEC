const usuarios = [
    {nombre: 'Ana', edad: 25},
    {nombre: 'Luis', edad: 30},
    {nombre: 'Carlos', edad: 22},
    {nombre: 'Sofía', edad: 28}
];

function crearTabla(datos) {

    const tabla = document.createElement('table');

    const cabecera = document.createElement('thead');
    const filaCabecera = document.createElement('tr');
    const thNombre = document.createElement('th');
    const thEdad = document.createElement('th');
    
    thNombre.textContent = 'Nombre';
    thEdad.textContent = 'Edad';
    
    filaCabecera.appendChild(thNombre);
    filaCabecera.appendChild(thEdad);
    cabecera.appendChild(filaCabecera);
    tabla.appendChild(cabecera);

    const cuerpo = document.createElement('tbody');

    datos.forEach(usuario => {
        const fila = document.createElement('tr');
        
        const celdaNombre = document.createElement('td');
        const celdaEdad = document.createElement('td');
        
        celdaNombre.textContent = usuario.nombre;
        celdaEdad.textContent = usuario.edad;
        
        fila.appendChild(celdaNombre);
        fila.appendChild(celdaEdad);
        
        cuerpo.appendChild(fila);
    });
    
    tabla.appendChild(cuerpo);
    
    document.getElementById('contenedor-tabla').appendChild(tabla);
}


crearTabla(usuarios);
