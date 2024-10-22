$(document).ready(function () {
    const table = $('#datatablesSimple').DataTable();

    // Captura el evento de clic en el botón de búsqueda
    $('#btnNavbarSearch').on('click', function () {
        const searchTerm = $('#searchInput').val().trim();

        // Si el campo de búsqueda está vacío, no hacemos nada
        if (searchTerm === "") {
            return; // Salimos de la función si no hay término
        }

        // Si no estás en el index, redirige con el parámetro de búsqueda
        if (window.location.pathname !== '../pages/index.html') {
            window.location.href = `../pages/index.html?search=${encodeURIComponent(searchTerm)}`;
        } else {
            // Si ya estás en el index, aplica la búsqueda directamente en la tabla
            table.search(searchTerm).draw();
        }
    });
});


