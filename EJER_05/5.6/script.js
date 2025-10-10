document.getElementById('tabs').addEventListener('click', function(event) {
  if (event.target.tagName === 'BUTTON') {
    const targetId = event.target.getAttribute('data-id');

    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => content.classList.add('oculto'));

    const activeContent = document.getElementById(targetId);
    activeContent.classList.remove('oculto');
  }
});
