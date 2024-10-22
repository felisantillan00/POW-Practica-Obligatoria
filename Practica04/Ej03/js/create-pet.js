// Código existente para manejar el envío del formulario
document.addEventListener("DOMContentLoaded", function() {
    const petForm = document.getElementById("petForm");
    petForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Evita el envío del formulario por defecto
        
        // Captura los valores del formulario
        const name = document.getElementById("name").value;
        const category = document.getElementById("category").value;
        const status = document.getElementById("status").value;
        const photoUrls = document.getElementById("photoUrls").value.split(",").map(url => url.trim()); // Convierte las URLs a un array
        const tags = document.getElementById("tags").value.split(",").map(tag => ({ name: tag.trim() })); // Convierte los tags a objetos

        // Crea un objeto mascota
        const pet = {
            id: 0, // Deja esto en 0 para que el servidor lo genere
            name: name,
            category: {
                id: 0, // Puedes dejar esto en 0 o cambiarlo si tienes categorías definidas
                name: category
            },
            photoUrls: photoUrls,
            tags: tags,
            status: status
        };

        // Muestra el objeto mascota en la consola
        console.log("Mascota a enviar:", pet);

        // Realiza la solicitud POST a la API
        fetch('https://petstore.swagger.io/v2/pet', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pet)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la red');
            }
            return response.json(); // Convierte la respuesta a JSON
        })
        .then(data => {
            console.log('Respuesta de la API:', data);
            alert("Mascota creada exitosamente");
            window.location.href = 'index.html'; // Cambia por la ruta correcta de tu listado
        })
        .catch(error => {
            console.error('Error al enviar la mascota:', error);
            // alert("Hubo un error al crear la mascota");
            alert("Hubo un error al crear la mascota: " + error.message); // Muestra el mensaje de error

        });

        // Limpia el formulario después de enviar
        petForm.reset();
    });
});
