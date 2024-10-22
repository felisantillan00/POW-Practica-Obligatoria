$(document).ready(function () {
    // Inicializa DataTable
    let table = $('#datatablesSimple').DataTable();

    // Obtener parámetro de búsqueda desde la URL (si existe)
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get('search');

    // Llama a la API para obtener los datos
    $.get('https://petstore.swagger.io/v2/pet/findByStatus?status=available', function(data) {
        // Limpia los datos previos de la tabla
        table.clear();
        
        // Función para mapear los estados
        const statusMap = {
            'available': 'De alta',
            'pending': 'Pendiente',
            'sold': 'De baja'
        };

        // Añade las filas con los datos obtenidos
        data.forEach(pet => {
            const id = pet.id !== undefined ? pet.id : 'Sin ID';
            const name = pet.name || 'Desconocido';
            const category = pet.category && pet.category.name ? pet.category.name : 'Sin categoría';
            const status = statusMap[pet.status] || 'Estado desconocido';  // Mapeo de estados

            const row = [
                id,
                name,
                category,
                status,
                new Date().toLocaleDateString() // Fecha actual
            ];

            table.row.add(row);  // Añade las nuevas filas a la tabla
        });

        // Redibuja la tabla con los nuevos datos
        table.draw();

        // Si existe un término de búsqueda, aplícalo
        if (searchTerm) {
            table.search(searchTerm).draw();
        }
    });
});




// $(document).ready(function () {
//     let table = $('#datatablesSimple').DataTable();

//     // Llama a la API para obtener los datos
//     $.get('https://petstore.swagger.io/v2/pet/findByStatus?status=available', function(data) {
//         // Limpia los datos previos de la tabla
//         table.clear();

//         // Añade las filas con los datos obtenidos
//         data.forEach(pet => {
//             const category = pet.category && pet.category.name ? pet.category.name : 'Sin categoría'; // Manejo de nulos
//             const name = pet.name || 'Desconocido';  // Manejo de nombres no definidos
//             const status = pet.status || 'Indefinido';  // Manejo de status no definidos
//             const row = [
//                 pet.id,
//                 name,
//                 category,  
//                 status,
//                 new Date().toLocaleDateString()  // Fecha actual
//             ];

//             table.row.add(row);  // Añade las nuevas filas a la tabla
//         });

//         // Redibuja la tabla con los nuevos datos
//         table.draw();
//     });
// });

