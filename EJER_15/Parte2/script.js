const cards = document.querySelectorAll('.card');
const columns = document.querySelectorAll('.column');

let draggedCard = null;

cards.forEach(card => {
    card.addEventListener('dragstart', e => {
        draggedCard = card;
        card.classList.add('dragging');

        e.dataTransfer.setData('application/json', JSON.stringify({
            id: card.id,
            status: card.parentElement.id
        }));
    });

    card.addEventListener('dragend', () => {
        draggedCard.classList.remove('dragging');
        draggedCard = null;
    });
});

columns.forEach(col => {
    col.addEventListener('dragover', e => {
        e.preventDefault();

        const afterElement = getDragAfterElement(col, e.clientY);
        if (afterElement == null) {
            col.appendChild(draggedCard);
        } else {
            col.insertBefore(draggedCard, afterElement);
        }
    });

    col.addEventListener('dragenter', () => col.classList.add('drag-over'));
    col.addEventListener('dragleave', () => col.classList.remove('drag-over'));
    col.addEventListener('drop', () => col.classList.remove('drag-over'));
});

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.card:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}
