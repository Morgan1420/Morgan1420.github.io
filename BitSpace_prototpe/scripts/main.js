// --- JavaScript para la funcionalidad de las flechas ---
        
// Obtener los elementos de las flechas
const leftArrow = document.getElementById('left-arrow');
const rightArrow = document.getElementById('right-arrow');

// Añadir eventos de clic
leftArrow.addEventListener('click', () => {
    window.location.href = 'rooms/gym.html';
});

rightArrow.addEventListener('click', () => {
    window.location.href = 'rooms/gym.html';
});

const addButton = document.getElementById('add-button');
const addDropdown = document.getElementById('add-dropdown');
const startReadingBtn = document.getElementById('start-reading-btn');
const characterImg = document.querySelector('#character img');
let isReading = false;

addButton.addEventListener('click', () => {
    if (!isReading) {
        addDropdown.style.display = addDropdown.style.display === 'none' ? 'block' : 'none';
    } else {
        // Si está leyendo, al pulsar el icono de parar, vuelve a bit.png y al +
        characterImg.src = 'imatges/bits/bit.png';
        addButton.textContent = '+';
        isReading = false;
    }
});

document.addEventListener('click', (e) => {
    if (!addButton.contains(e.target) && !addDropdown.contains(e.target)) {
        addDropdown.style.display = 'none';
    }
});

startReadingBtn.addEventListener('click', () => {
    characterImg.src = 'imatges/bits/bit_llegint.png';
    addDropdown.style.display = 'none';
    addButton.textContent = '⏹'; // Cambia el + por un icono de parar
    isReading = true;
});
