document.getElementById('btnSearchPet').addEventListener('click', function () {
    const petId = document.getElementById('searchPetId').value;
    if (petId) {
        console.log('Buscando mascota con ID:', petId); // Agregar log del ID
        fetch(`https://petstore.swagger.io/v2/pet/${petId}`)
            .then(response => {
                console.log('Estado de respuesta:', response.status); // Log del estado de la respuesta
                if (!response.ok) {
                    throw new Error('No se encontró la mascota.');
                }
                return response.json();
            })
            .then(pet => {
                console.log('Mascota encontrada:', pet); // Log de los datos de la mascota
                document.getElementById('petForm').style.display = 'block';
                document.getElementById('error-message').style.display = 'none';

                // Rellenar los spans con los datos obtenidos de la API
                document.getElementById('petName').textContent = pet.name;
                document.getElementById('petCategory').textContent = pet.category ? pet.category.name : '';
                document.getElementById('petStatus').textContent = pet.status;
                document.getElementById('petPhotoUrls').textContent = pet.photoUrls ? pet.photoUrls.join(', ') : '';
                document.getElementById('petTags').textContent = pet.tags ? pet.tags.map(tag => tag.name).join(', ') : '';
            })
            .catch(error => {
                console.error('Error:', error.message); // Log del error
                document.getElementById('petForm').style.display = 'none';
                document.getElementById('error-message').style.display = 'block';
            });
    }
});

// Evento para eliminar la mascota
document.getElementById('btnDeletePet').addEventListener('click', function () {
    const petId = document.getElementById('searchPetId').value;
    if (petId) {
        // Hacer la solicitud DELETE para eliminar la mascota
        fetch(`https://petstore.swagger.io/v2/pet/${petId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al eliminar la mascota.');
            }
            alert('Mascota eliminada correctamente.');
            window.location.href = 'index.html'; // Cambia por la ruta correcta de tu listado
        })
        .catch(error => {
            alert('Hubo un error al eliminar la mascota: ' + error.message);
        });
    } else {
        alert('Debe ingresar el ID de la mascota para eliminarla.');
    }
});
