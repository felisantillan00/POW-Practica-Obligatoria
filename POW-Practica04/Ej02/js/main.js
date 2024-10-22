console.log("Script cargado");
const btnGenerar = document.getElementById("btnGenerar");
const btnReiniciar = document.getElementById("btnReiniciar");
const minInput = document.getElementById("valorMin");
const maxInput = document.getElementById("valorMax");

let turneroData = {
    limiteInferior: null,
    limiteSuperior: null,
    numeros: []
};

// Función para cargar el JSON desde el servidor
function cargarDatos() {
    // Inicializa los valores a null y vacíos sin hacer un fetch
    turneroData = {
        "limiteInferior": null,
        "limiteSuperior": null,
        "numeros": []
    };
    
    // Actualiza los valores en el HTML
    document.getElementById('valorMin').value = 1;
    document.getElementById('valorMax').value = 100;
}

// Llama a cargarDatos al cargar la página
window.onload = cargarDatos;

document.getElementById('btnGenerar').addEventListener('click', function() {
    console.log("Botón Generar presionado");
    const valorMin = parseInt(document.getElementById('valorMin').value);
    const valorMax = parseInt(document.getElementById('valorMax').value);
    console.log("Valores ingresados:", valorMin, valorMax); // Verifica los valores
    if (isNaN(valorMin) || isNaN(valorMax) || valorMin >= valorMax) {
        alert("Por favor ingresa valores válidos para el rango.");
        return;
    }
    if(valorMin < 1 || valorMax > 1000){
        alert("Por favor ingresa valores entre 1 y 1000.");
        return;
    }
    turneroData.limiteInferior = valorMin;
    turneroData.limiteSuperior = valorMax;
    // Generar número aleatorio
    let numeroAleatorio = Math.floor(Math.random() * (valorMax - valorMin + 1)) + valorMin;
    // Verificar si el número ya ha sido generado
    while (turneroData.numeros.some(numObj => numObj.numero === numeroAleatorio)) {
        numeroAleatorio++;
        if (numeroAleatorio > valorMax) {
            numeroAleatorio = valorMin;
        }
    }
    // Agregar el número al JSON
    turneroData.numeros.push({ "numero": numeroAleatorio });
    // Guardar en el servidor automáticamente
    fetch('http://localhost/POW-Practica/POW-Practica04/Ej02/db/turnero.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(turneroData),
    }).then(() => {
        // Mostrar el número generado
        document.getElementById('rango').innerHTML = `Minimo: ${valorMin}; Maximo: ${valorMax}`;
        document.getElementById('valResultante').innerHTML = `Número generado: ${numeroAleatorio}`;
    });
});


document.getElementById('btnReiniciar').addEventListener('click', function() {
    // Reiniciar el archivo JSON en el servidor
    fetch('http://localhost/POW-Practica/POW-Practica04/Ej02/db/turnero.php', {
        method: 'DELETE',
    }).then(() => {
        // Reiniciar los campos
        turneroData = {
            "limiteInferior": null,
            "limiteSuperior": null,
            "numeros": []
        };
        document.getElementById('valorMin').value = '';
        document.getElementById('valorMax').value = '';
        document.getElementById('valResultante').innerHTML = '';
        document.getElementById('rango').innerHTML = ``;
        alert("Sistema reiniciado.");
    });
});