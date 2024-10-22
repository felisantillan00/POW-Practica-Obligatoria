document.getElementById('btnSearchPet').addEventListener('click', function () {
    const petId = document.getElementById('searchPetId').value;

    if (petId) {
        fetch(`https://petstore.swagger.io/v2/pet/${petId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('No se encontró la mascota.');
                }
                return response.json();
            })
            .then(pet => {
                // Si se encuentra la mascota, mostrar el formulario y rellenarlo con los datos
                document.getElementById('petForm').style.display = 'block';
                document.getElementById('error-message').style.display = 'none';
                // Rellenar el formulario con los datos obtenidos de la API
                document.getElementById('name').value = pet.name;
                document.getElementById('category').value = pet.category ? pet.category.name : '';
                document.getElementById('status').value = pet.status;
                document.getElementById('photoUrls').value = pet.photoUrls ? pet.photoUrls.join(', ') : '';
                document.getElementById('tags').value = pet.tags ? pet.tags.map(tag => tag.name).join(', ') : '';
            })
            .catch(error => {
                // Si no se encuentra la mascota, ocultar el formulario y mostrar el mensaje de error
                document.getElementById('petForm').style.display = 'none';
                document.getElementById('error-message').style.display = 'block';
            });
    }
});

// Lógica para enviar el formulario con los datos editados
document.getElementById('petForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevenir el envío por defecto

    const petId = document.getElementById('searchPetId').value;
    const updatedPet = {
        id: petId,
        name: document.getElementById('name').value,
        category: {
            name: document.getElementById('category').value
        },
        status: document.getElementById('status').value,
        photoUrls: document.getElementById('photoUrls').value.split(','),
        tags: document.getElementById('tags').value.split(',').map(tag => ({ name: tag.trim() }))
    };

    // Hacer la solicitud PUT para actualizar la mascota
    fetch(`https://petstore.swagger.io/v2/pet`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedPet)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al actualizar la mascota.');
        }
        return response.json();
    })
    .then(data => {
        alert('Mascota actualizada correctamente.');
        window.location.href = 'index.html'; // Cambia por la ruta correcta de tu listado
    })
    .catch(error => {
        alert('Hubo un error al actualizar la mascota: ' + error.message);
    });
});
