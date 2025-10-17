const selector = document.getElementById('color-selector');

selector.addEventListener('click', function(event) {

  if (event.target.classList.contains('color')) {
    const color = event.target.getAttribute('data-color');

    document.body.style.backgroundColor = color;
  }
});

