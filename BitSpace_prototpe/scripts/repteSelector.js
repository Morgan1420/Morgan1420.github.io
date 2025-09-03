document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.repte').forEach(function(box) {
        // Set tapa color from data-color
        const tapa = box.querySelector('.tapa');
        if (tapa && box.dataset.color) {
            tapa.style.background = box.dataset.color;
        }
        // Toggle tapa on click
        box.addEventListener('click', function() {
            box.classList.toggle('tapa-hidden');
        });
    });
});
