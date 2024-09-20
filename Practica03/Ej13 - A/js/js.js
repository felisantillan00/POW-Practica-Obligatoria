const pantallaOperadores = document.getElementById("pOperadores");  // Muestra la operación completa
const pantallaCarga = document.getElementById("pCarga");   // Muestra el valor actual ingresado
const botones = document.querySelectorAll("#botonera button");

let operadorActual = '';
let valorActual = '';
let valorAnterior = '';
let resultado = 0;
let puntoAgregado = false; // para restringir que no se ingresen multiples puntos

botones.forEach(boton => {
    boton.addEventListener("click", () => {
        const botonApretado = boton.textContent;

        // Si es un número o un punto, se añade al valor actual
        if (!isNaN(botonApretado) || botonApretado === '.') {
            if(botonApretado === '.' && puntoAgregado){
                return; // Restringir múltiples puntos
            }
            if (botonApretado === '.'){
                puntoAgregado = true; // Marcar que se ha agregado un punto
            }
            valorActual += botonApretado;
            pantallaCarga.textContent = valorActual;  // Actualiza `pCarga` siempre que se ingresa un número
        }
        
        // Si se presiona un operador, realiza el cálculo pendiente o continúa la operación
        if (['+', '-', '×', '÷', '%'].includes(botonApretado)) {
            if (valorAnterior === '') {
                // Si no hay valor anterior, almacenar el valor actual y el operador
                valorAnterior = valorActual;
                operadorActual = botonApretado;
                pantallaOperadores.textContent = valorAnterior + " " + operadorActual;  // Mostrar la operación en result
                pantallaCarga.textContent = '';  // Limpiar date para el nuevo valor
                valorActual = '';  // Limpiar el valor actual para el próximo número
                puntoAgregado = false;
            } else if (valorActual !== '') {
                // Si hay valor anterior y actual, realizar el cálculo
                realizarOperacion();
                operadorActual = botonApretado;
                pantallaOperadores.textContent = resultado + " " + operadorActual;  // Mostrar el resultado parcial con operador
                pantallaCarga.textContent = '';  // Limpiar date para el próximo número
                valorAnterior = resultado.toString();  // Almacenar el resultado como el nuevo valor anterior
                valorActual = '';  // Limpiar el valor actual
                puntoAgregado = false;
            }
        }

        // Si se presiona igual, se realiza el cálculo final
        if (botonApretado === '=') {
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
        if (botonApretado === 'C') {
            pantallaCarga.textContent = '0';
            pantallaOperadores.textContent = '';
            valorActual = '';
            valorAnterior = '';
            operadorActual = '';
            puntoAgregado = false; //Resetea el booleano del punto
        }

        // Eliminar un digito final
        if(botonApretado === '←'){
            if(valorActual.slice(-1) === '.'){
                puntoAgregado = false;
            } 
            valorActual = valorActual.slice(0, -1);  // Quitar el último carácter de valorActual
            pantallaCarga.textContent = valorActual;  // Actualizar la pantalla
        }

        // Limpiar la pantalla de carga
        if (botonApretado === 'CE') {
            pantallaCarga.textContent = '';
            valorActual = '';
            puntoAgregado = false; //Resetea el booleano del punto
        }
    });
});

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