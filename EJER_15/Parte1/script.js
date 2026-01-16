const dropZone = document.getElementById('drop-zone');
const previewContainer = document.getElementById('preview');
const downloadsContainer = document.getElementById('downloads');
const processBtn = document.getElementById('process-btn');

let imageFiles = [];

dropZone.addEventListener('dragover', e => {
    e.preventDefault();
    dropZone.classList.add('dragover');
});

dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('dragover');
});

dropZone.addEventListener('drop', e => {
    e.preventDefault();
    dropZone.classList.remove('dragover');

    const files = Array.from(e.dataTransfer.files);
    imageFiles = files.filter(f => f.type.startsWith('image/'));
    previewImages(imageFiles);
});

function previewImages(files) {
    previewContainer.innerHTML = '';
    downloadsContainer.innerHTML = '';
    files.forEach(file => {
        const reader = new FileReader();
        reader.onload = e => {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.className = 'thumbnail';
            previewContainer.appendChild(img);
        };
        reader.readAsDataURL(file);
    });
}

processBtn.addEventListener('click', () => {
    const watermark = document.getElementById('watermark').value;
    const maxWidth = Number(document.getElementById('max-width').value);
    const format = document.getElementById('format').value;

    downloadsContainer.innerHTML = '';

    imageFiles.forEach(file => {
        const reader = new FileReader();
        const img = new Image();

        reader.onload = e => img.src = e.target.result;
        reader.readAsDataURL(file);

        img.onload = () => {
            let ratio = 1;
            if (maxWidth && img.width > maxWidth) ratio = maxWidth / img.width;

            const canvas = document.createElement('canvas');
            canvas.width = img.width * ratio;
            canvas.height = img.height * ratio;
            const ctx = canvas.getContext('2d');

            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            if (watermark) {
                ctx.font = `${Math.floor(canvas.width / 20)}px Arial`;
                ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
                ctx.textAlign = 'center';
                ctx.fillText(watermark, canvas.width / 2, canvas.height - 20);
            }

            canvas.toBlob(blob => {
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `editada-${file.name}`;
                link.textContent = `Descargar ${file.name}`;
                downloadsContainer.appendChild(link);
            }, format, 0.9);
        };
    });
});
