document.addEventListener("DOMContentLoaded", function () {
    const inputs = document.querySelectorAll('input, textarea'); // Selecciona también los textareas
    inputs.forEach(input => {
        input.addEventListener('focus', function () {
            const label = input.previousElementSibling;
            if (label) {
                label.classList.add('top');
                label.classList.add('focus');
            }
            input.parentNode.classList.add('focus');
        });
        input.addEventListener('blur', function () {
            input.value = input.value.trim();
            const label = input.previousElementSibling;
            if (label) {
                if (input.value.length === 0) {
                    label.classList.remove('top');
                }
                label.classList.remove('focus');
            }
            input.parentNode.classList.remove('focus');
        });
    });
});

document.getElementById('cuit').addEventListener('input', function() {
    let input = this.value.replace(/-/g, ''); // Eliminar cualquier guión existente
    if (input.length > 2) {
        input = input.slice(0, 2) + '-' + input.slice(2); // Agregar el primer guión después de los primeros 2 dígitos
    }
    if (input.length > 11) {
        input = input.slice(0, 11) + '-' + input.slice(11); // Agregar el segundo guión después de los 8 dígitos del medio
    }
    this.value = input; // Actualizar el valor del campo
    document.getElementById('resultado').textContent = ""; // Limpiar mensaje de error cuando se escribe
});

document.getElementById('cuitForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe

    var cuit = document.getElementById('cuit').value; // Captura el valor del input
    var resultado = ValidateCUITCUIL(cuit.replace(/-/g, '')); // Remover guiones antes de validar

    // Muestra el resultado en el párrafo "resultado"
    if (resultado) {
        document.getElementById('resultado').textContent = "CUIT/CUIL válido.";
        document.getElementById('resultado').style.color = "green"; // Cambiar color a verde
    } else {
        document.getElementById('resultado').textContent = "Error: CUIT/CUIL no válido.";
        document.getElementById('resultado').style.color = "red"; // Cambiar color a rojo
    }
});

function ValidateCUITCUIL(cuit) {
    // Verificar que tenga 11 dígitos
    if (cuit.length != 11) return false;

    // Coeficientes para cada posición
    var coeficientes = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
    var verificador = parseInt(cuit[10]); // El último dígito es el dígito verificador
    var suma = 0;

    // Aplicar el algoritmo Módulo 11
    for (var i = 0; i < 10; i++) {
        suma += parseInt(cuit[i]) * coeficientes[i];
    }

    var resto = suma % 11;
    var calculado = 11 - resto;

    if (calculado === 11) calculado = 0;
    if (calculado === 10) return false; // Error si el resultado es 10

    // Comparar con el dígito verificador
    return calculado === verificador;
}