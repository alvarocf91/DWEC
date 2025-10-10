function agregarTarea() {
    const tareaInput = document.getElementById('nueva-tarea');
    if (tareaInput.value.trim() !== '') {
        const tarea = document.createElement('li');
        tarea.textContent = tareaInput.value;
        
        const eliminarBtn = document.createElement('button');
        eliminarBtn.textContent = "Eliminar";
        eliminarBtn.onclick = function() {
            tarea.remove();
        };
        
        tarea.appendChild(eliminarBtn);
        document.getElementById('lista-tareas').appendChild(tarea);
        
        tareaInput.value = '';
    }
}
