const pantalla = document.getElementById("valor");
const cantInt = document.getElementById("cantIntentos");
const validacion = document.getElementById("validacion");
const title = document.getElementById("title");
const subtitle = document.getElementById("subtitle");
const mejorPuntajeElem = document.getElementById("mejorPuntaje");
const partidasFinalizadasElem = document.getElementById("partidasFinalizadas");
const promedioIntentosElem = document.getElementById("promedioIntentos");

let random = getRandomInt();
let intentos = 0;
let mejorPuntaje = Infinity;
let partidasFinalizadas = 0;
let totalIntentos = 0;

var gravedad = .5;
var numHijos = 50;
var numParticulas = 100;
var particulasCreadas = 0;

// Función para crear una partícula (parte de los fuegos artificiales)
function crearParticula() {
    var particula = document.createElement("div");
    particula.className = "particula";
    var y = window.innerHeight;
    var x = Math.random() * window.innerWidth;
    particula.style.top = y + "px";
    particula.style.left = x + "px";
    var velocidadY = -15 - (Math.random() * 15);
    particula.setAttribute("data-velocidad-y", velocidadY);
    particula.setAttribute("data-velocidad-x", "0");
    particula.setAttribute("data-padre", "true");
    particula.style.background = getRandomColor();
    document.getElementsByTagName("body")[0].append(particula);
    particulasCreadas++;
    if (particulasCreadas < numParticulas) {
        setTimeout(crearParticula, 50 + (Math.random() * 150));
    }
}

function start() {
    crearParticula();
    validacion.textContent = "";
    // Duración estimada de los fuegos artificiales (en milisegundos)
    setTimeout(function() {
        reiniciarPartida();  // Reinicia el juego después de los fuegos artificiales
    }, 15000);  // Ajusta este valor según la duración de los fuegos artificiales
}

function update() {
    var particulas = document.getElementsByClassName("particula");
    for (var p = 0; p < particulas.length; p++) {
        var particula = particulas[p];
        var velocidadY = parseFloat(particula.getAttribute("data-velocidad-y"));
        velocidadY += gravedad;
        particula.setAttribute("data-velocidad-y", velocidadY);
        var top = particula.style.top ? particula.style.top : "0"; //10px
        top = parseFloat(top.replace("px", ""));
        top += velocidadY;
        particula.style.top = top + "px";
        var velocidadX = parseFloat(particula.getAttribute("data-velocidad-x"));
        var left = particula.style.left ? particula.style.left : "0";
        left = parseFloat(left.replace("px", ""));
        left += velocidadX;
        particula.style.left = left + "px";
        var padre = particula.getAttribute("data-padre");
        if (velocidadY >= 0 && padre === "true") {
            explotar(particula);
        }
        if (top > window.innerHeight) {
            particula.remove();
        }
    }
    setTimeout(update, 20);
}

function explotar(particula) {
    for (var h = 0; h < numHijos; h++) {
        var hijo = document.createElement("div");
        hijo.className = "particula";
        hijo.style.top = particula.style.top;
        hijo.style.left = particula.style.left;
        hijo.style.background = particula.style.background;
        var velocidadY = (Math.random() * 20) - 18;
        hijo.setAttribute("data-velocidad-y", velocidadY);
        var velocidadX = (Math.random() * 16) - 8;
        hijo.setAttribute("data-velocidad-x", velocidadX);
        hijo.setAttribute("data-padre", false);
        //Agregar el hijo :) :) :)
        document.getElementsByTagName("body")[0].append(hijo);
    }
    particula.remove();
}

//utilerias
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Función para comparar el número ingresado por el usuario
function compararNumero() {
    const valorUsuario = parseInt(pantalla.value);
    if (isNaN(valorUsuario) || valorUsuario < 1 || valorUsuario > 1000) {
        alert("Por favor, ingresa un número válido entre 1 y 1000.");
        pantalla.value = " ";
        return;
    }
    intentos++;
    cantInt.textContent = `Cantidad de intentos: ${intentos}`;
    if (valorUsuario === random) {
        title.textContent = "¡Felicidades! Has adivinado el número."; // Cambiar el contenido del h1
        subtitle.textContent = ""; // Cambiar el contenido del h2
        start();  // Inicia los fuegos artificiales
        // Actualizamos los datos del juego
        partidasFinalizadas++;
        totalIntentos += intentos;
        if (intentos < mejorPuntaje) {
            mejorPuntaje = intentos;
        }
        // Guardamos los datos antes de reiniciar la partida
        guardarDatos();
        mostrarEstadisticas();
    } else if (valorUsuario < random) {
        validacion.textContent = 'El número es mayor.';
        pantalla.value = "";
    } else {
        validacion.textContent = 'El número es menor.';
        pantalla.value = " ";
    }
}

// Función para reiniciar la partida
function reiniciarPartida() {
    intentos = 0;
    random = getRandomInt();
    cantInt.textContent = `Cantidad de intentos: 0`;
    pantalla.value = "";
    title.textContent = 'Bienvenido al juego de adivinanzas!';
    subtitle.textContent = 'Adivina el número entre 1 - 1000!';
}

// Función para inicializar los datos al cargar la página
window.onload = function () {
    update();  // Actualiza el movimiento de partículas
    cargarDatos();  // Carga los datos almacenados si existen
};

// Función para generar un número aleatorio
function getRandomInt() {
    return Math.floor(Math.random() * 1000) + 1;
}

// Funciones para los datos. 
function guardarDatos() {
    const datos = {
        mejorPuntaje: mejorPuntaje,
        partidasFinalizadas: partidasFinalizadas,
        totalIntentos: totalIntentos
    };
    sessionStorage.setItem('datosJuego', JSON.stringify(datos));
}

function cargarDatos() {
    const datosStr = sessionStorage.getItem('datosJuego');
    if (datosStr) {
        const datos = JSON.parse(datosStr);
        mejorPuntaje = datos.mejorPuntaje;
        partidasFinalizadas = datos.partidasFinalizadas;
        totalIntentos = datos.totalIntentos;
        mostrarEstadisticas();
    }
}

function mostrarEstadisticas() {
    mejorPuntajeElem.textContent = `Mejor partida en menor cantidad de intentos: ${mejorPuntaje === Infinity ? 'N/A' : mejorPuntaje}`;
    partidasFinalizadasElem.textContent = `Partidas finalizadas: ${partidasFinalizadas}`;
    promedioIntentosElem.textContent = `Promedio de intentos: ${partidasFinalizadas === 0 ? 'N/A' : (totalIntentos / partidasFinalizadas).toFixed(2)}`;
}

function darPista() {
    intentos += 2;
    cantInt.textContent = `Cantidad de intentos: ${intentos}`;

    // Calcular la diferencia entre el número aleatorio y el número ingresado
    const diferencia = Math.abs(random - valor); // Asumiendo que 'valor' es el número ingresado
    let rango = 100; // Rango base

    // Ajustar el rango dependiendo de la diferencia
    if (diferencia > 300) {
        rango = 200; // Si la diferencia es grande, permite un rango más amplio
    } else if (diferencia > 100) {
        rango = 100; // Si es moderada, mantiene un rango normal
    } else {
        rango = 50; // Si está cerca, da un rango más pequeño
    }

    // Calcular los límites de la pista
    const limiteInferior = Math.max(1, random - rango); // Asegura que no sea menor a 1
    const limiteSuperior = Math.min(1000, random + rango); // Asegura que no sea mayor a 1000

    alert("El número está entre " + limiteInferior + " y " + limiteSuperior);
}

