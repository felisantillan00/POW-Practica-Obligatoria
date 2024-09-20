const countdownElement = document.getElementById('countdown');

function updateCountdown() {
    const startDate = new Date(2023, 6, 1); // Meses en JavaScript comienzan desde 0
    const currentDate = new Date();
    const diffInMilliseconds = currentDate - startDate;

    const days = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffInMilliseconds % (1000 * 60)) / 1000);

    countdownElement.textContent = `Han pasado ${days} días, ${hours} horas, ${minutes} minutos y ${seconds} segundos desde el 1 de julio de 2023.`;
}

// Actualizar la cuenta regresiva cada segundo
setInterval(updateCountdown, 1000);

// Llamamos a la función por primera vez para mostrar el valor inicial
updateCountdown();