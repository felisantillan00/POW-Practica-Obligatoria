const pantallaOp = document.getElementById("result");  // Muestra la operación completa
const pantallaVal = document.getElementById("date");   // Muestra el valor actual ingresado
const botones = document.querySelectorAll("#botonera button");

let operadorActual = '';
let valorActual = '';
let valorAnterior = '';
let resultado = 0;

botones.forEach(boton => {
    boton.addEventListener("click", () => {
        const botonApretado = boton.textContent;

        // Si es un número o un punto, se añade al valor actual
        if (!isNaN(botonApretado) || botonApretado === '.') {
            valorActual += botonApretado;
            pantallaVal.textContent = valorActual;  // Mostrar siempre lo que el usuario está escribiendo
        }

        // Si se presiona un operador, realiza el cálculo pendiente o continúa la operación
        if (['+', '-', '×', '÷', '%'].includes(botonApretado)) {
            if (valorAnterior === '') {
                // Si no hay valor anterior, almacenar el valor actual y el operador
                valorAnterior = valorActual;
                operadorActual = botonApretado;
                pantallaOp.textContent = valorAnterior + " " + operadorActual;  // Mostrar la operación en result
                pantallaVal.textContent = '';  // Limpiar date para el nuevo valor
                valorActual = '';  // Limpiar el valor actual para el próximo número
            } else if (valorActual !== '') {
                // Si hay valor anterior y actual, realizar el cálculo
                realizarOperacion();
                operadorActual = botonApretado;
                pantallaOp.textContent = resultado + " " + operadorActual;  // Mostrar el resultado parcial con operador
                pantallaVal.textContent = '';  // Limpiar date para el próximo número
                valorAnterior = resultado.toString();  // Almacenar el resultado como el nuevo valor anterior
                valorActual = '';  // Limpiar el valor actual
            }
        }

        // Si se presiona igual, se realiza el cálculo final
        if (botonApretado === '=') {
            if (valorAnterior !== '' && valorActual !== '') {
                realizarOperacion();
                pantallaOp.textContent = resultado;  // Completar la operación en result
                pantallaVal.textContent = '';  // Mostrar el resultado final en date
                valorAnterior = '';
                valorActual = resultado.toString();  // El resultado se convierte en el nuevo valor actual
                operadorActual = '';
            }
        }

        // Limpiar la pantalla con C
        if (botonApretado === 'C') {
            pantallaVal.textContent = '';
            pantallaOp.textContent = '';
            valorActual = '';
            valorAnterior = '';
            operadorActual = '';
        }

        // Quitar el último dígito con CE
        if (botonApretado === 'CE') {
            valorActual = valorActual.slice(0, -1);  // Quitar el último carácter de valorActual
            pantallaVal.textContent = valorActual;  // Actualizar la pantalla
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
            resultado = numAnterior / numActual;
            break;
        case '%':
            resultado = numAnterior % numActual;
            break;
    }
}