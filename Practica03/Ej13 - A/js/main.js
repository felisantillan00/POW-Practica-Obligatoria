const pantallaOperadores = document.getElementById("pOperadores");  // Muestra la operación completa
const pantallaCarga = document.getElementById("pCarga");   // Muestra el valor actual ingresado
const botones = document.querySelectorAll("#botonera button");

let operadorActual = '';
let valorActual = '';
let valorAnterior = '';
let resultado = 0;
let puntoAgregado = false; // para restringir que no se ingresen multiples puntos

// Asocia teclas del teclado a los botones de la calculadora
const teclas = {
    '0': document.getElementById("btCero"),
    '1': document.getElementById("btUno"),
    '2': document.getElementById("btDos"),
    '3': document.getElementById("btTres"),
    '4': document.getElementById("btCuatro"),
    '5': document.getElementById("btCinco"),
    '6': document.getElementById("btSeis"),
    '7': document.getElementById("btSiete"),
    '8': document.getElementById("btOcho"),
    '9': document.getElementById("btNueve"),
    '.': document.getElementById("btPunto"),
    '+': document.getElementById("btSuma"),
    '-': document.getElementById("btResta"),
    '*': document.getElementById("btMult"),
    '×': document.getElementById("btMult"),
    '/': document.getElementById("btDiv"),
    '÷': document.getElementById("btDiv"),
    '%': document.getElementById("btPorc"),
    'Backspace': document.getElementById("btElimDig"),
    'Enter': document.getElementById("btIgual"),
    '=': document.getElementById("btIgual"),
    'Escape': document.getElementById("btC"),
    'C': document.getElementById("btC"),
    'CE': document.getElementById("btCE"),
};

//Manejo de los clicks sobre los botones
botones.forEach(boton => {
    boton.addEventListener("click", () => {
        manejarEntrada(boton.textContent)
    });
});

// Manejo de entrada del teclado
document.addEventListener("keydown", (event) => {
    let tecla = event.key;

    if(tecla === '*') tecla = '×';
    if(tecla === '/') tecla = '÷';
    if(tecla === 'Enter') tecla = '=';
    if(tecla === 'Escape') tecla = 'C';
    if(tecla === 'Backspace') tecla = '←';

    manejarEntrada(tecla);

    // Simular hover en el botón correspondiente a la tecla presionada
    if (teclas[tecla]) {
        teclas[tecla].classList.add('hover'); // Agrega la clase 'hover'
    }
});

// Detectar cuando se suelta la tecla
document.addEventListener("keyup", (event) => {
    let tecla = event.key;

    if(tecla === '*') tecla = '×';
    if(tecla === '/') tecla = '÷';
    if(tecla === 'Enter') tecla = '=';
    if(tecla === 'Escape') tecla = 'C';
    if(tecla === 'Backspace') tecla = '←';

    // Remover la clase hover cuando se libera la tecla
    if (teclas[tecla]) {
        teclas[tecla].classList.remove('hover');
    }
});

// Función que maneja tanto clics como teclas
function manejarEntrada(entrada) {
        // Si es un número o un punto, se añade al valor actual
        if (!isNaN(entrada) || entrada === '.') {
            if(entrada === '.' && puntoAgregado){
                return; // Restringir múltiples puntos
            }
            if (entrada === '.'){
                puntoAgregado = true; // Marcar que se ha agregado un punto
            }
            valorActual += entrada;
            pantallaCarga.textContent = valorActual;  // Actualiza `pCarga` siempre que se ingresa un número
        }
        
        // Si se presiona un operador, realiza el cálculo pendiente o continúa la operación
        if (['+', '-', '×', '÷', '%'].includes(entrada)) {
            if (valorAnterior === '') {
                // Si no hay valor anterior, almacenar el valor actual y el operador
                valorAnterior = valorActual;
                operadorActual = entrada;
                pantallaOperadores.textContent = valorAnterior + " " + operadorActual;  // Mostrar la operación en result
                pantallaCarga.textContent = '';  // Limpiar date para el nuevo valor
                valorActual = '';  // Limpiar el valor actual para el próximo número
                puntoAgregado = false;
            } else if (valorActual !== '') {
                // Si hay valor anterior y actual, realizar el cálculo
                realizarOperacion();
                operadorActual = entrada;
                pantallaOperadores.textContent = resultado + " " + operadorActual;  // Mostrar el resultado parcial con operador
                pantallaCarga.textContent = '';  // Limpiar date para el próximo número
                valorAnterior = resultado.toString();  // Almacenar el resultado como el nuevo valor anterior
                valorActual = '';  // Limpiar el valor actual
                puntoAgregado = false;
            }
        }

        // Si se presiona igual, se realiza el cálculo final
        if (entrada === '=') {
            if (valorAnterior !== '' && valorActual !== '') {
                realizarOperacion();
                pantallaOperadores.textContent = resultado;  // Mostrar el resultado parcial con operador
                pantallaCarga.textContent = '';  // Limpiar date para el próximo número
                valorAnterior = resultado.toString();  // Almacenar el resultado como el nuevo valor anterior
                valorActual = '';  // Limpiar el valor actual
                puntoAgregado = valorActual.includes('.');  // Verificar si el nuevo valor tiene punto
            }
        }

        // Limpiar la pantalla con C
        if (entrada === 'C') {
            pantallaCarga.textContent = '0';
            pantallaOperadores.textContent = '';
            valorActual = '';
            valorAnterior = '';
            operadorActual = '';
            puntoAgregado = false; //Resetea el booleano del punto
        }

        // Eliminar un digito final
        if(entrada === '←'){
            if(valorActual.slice(-1) === '.'){
                puntoAgregado = false;
            } 
            valorActual = valorActual.slice(0, -1);  // Quitar el último carácter de valorActual
            pantallaCarga.textContent = valorActual;  // Actualizar la pantalla
        }

        // Limpiar la pantalla de carga
        if (entrada === 'CE') {
            pantallaCarga.textContent = '0';
            valorActual = '';
            puntoAgregado = false; //Resetea el booleano del punto
        }
}

// Función para realizar la operación
function realizarOperacion() {
    const numAnterior = parseFloat(valorAnterior);
    const numActual = parseFloat(valorActual);

    switch (operadorActual) {
        case '+':
            resultado = numAnterior + numActual;
            break;
        case '-':
            resultado = numAnterior - numActual;
            break;
        case '×':
            resultado = numAnterior * numActual;
            break;
        case '÷':
            if(numActual !== 0){
                resultado = numAnterior / numActual;
                break;
            }
            else{
                pantallaOperadores.textContent = "Error, no se puede dividir por 0";
            }
        case '%':
            resultado = numAnterior % numActual;
            break;
    }
}