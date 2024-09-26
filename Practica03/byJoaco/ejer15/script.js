// Fecha objetivo (1 de julio de 2025)
const targetDate = new Date('2025-09-27T00:00:00');
const countdownElement = document.querySelector('.countdown');

function updateCountdown() {
    const now = new Date();
    const difference = targetDate - now;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    countdownElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;

    // Si ya hemos pasado la fecha objetivo
    if (difference < 0) {
        countdownElement.textContent = "¡El tiempo ha terminado!";
        clearInterval(interval);
    }
}
setInterval(updateCountdown, 1000);




document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault(); // Evita el envío real del formulario

    // Redirige a la página de confirmación
    window.location.href = 'confirmacion.html';
});