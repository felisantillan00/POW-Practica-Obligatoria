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