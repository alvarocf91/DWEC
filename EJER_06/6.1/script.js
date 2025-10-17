// Obtener los elementos
const modal = document.getElementById("myModal");
const showModalBtn = document.getElementById("showModalBtn");
const closeBtn = document.getElementById("closeBtn");

// Cuando el usuario hace clic en el botón "Mostrar Modal"
showModalBtn.onclick = function() {
    modal.style.display = "block";
}

// Cuando el usuario hace clic en el botón "Cerrar"
closeBtn.onclick = function() {
    modal.style.display = "none";
}

// Cuando el usuario hace clic fuera del modal, también se cierra
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
