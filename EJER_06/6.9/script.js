const container = document.getElementById('grid-container');
let isDrawing = false;

for (let i = 0; i < 40 * 40; i++) {
  const cell = document.createElement('div');
  cell.classList.add('grid-cell');
  container.appendChild(cell);
}

container.addEventListener('mousedown', function(e) {
  isDrawing = true;
  if (e.target.classList.contains('grid-cell')) {
    e.target.style.backgroundColor = 'black';
  }
});
document.addEventListener('mouseup', function() {
  isDrawing = false;
});

container.addEventListener('mouseover', function(e) {
  if (!isDrawing) return;
  if (e.target.classList.contains('grid-cell')) {
    e.target.style.backgroundColor = 'black';
  }
});
container.addEventListener('dragstart', function(e) {
  e.preventDefault();
});
