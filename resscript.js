const buttonsContainer = document.querySelector('.buttons-container');
const reservationForm = document.querySelector('.reservation-form');

// Crear los 22 botones
for (let i = 1; i <= 22; i++) {
    let button = document.createElement('button');
    button.classList.add('mesa-button');
    button.textContent = `M${i}`;

    button.addEventListener('click', () => {
        button.classList.toggle('selected');
    });

    buttonsContainer.appendChild(button);
}

// Agregar un evento al formulario para enviar los datos
reservationForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Obtener los datos del formulario
    const selectedTables = document.querySelectorAll('.mesa-button.selected');
    const selectedDate = document.getElementById('date').value;
    const selectedTime = document.getElementById('time').value;

    // Validación básica
    if (selectedTables.length === 0) {
        alert('Debe seleccionar al menos una mesa.');
        return;
    }

    // Enviar los datos a un servidor (ejemplo con fetch)
    fetch('tu_ruta_al_servidor', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            mesas: Array.from(selectedTables).map(button => button.textContent),
            fecha: selectedDate,
            hora: selectedTime
        })
    })
    .then(response => {
        if (response.ok) {
            alert('Reserva realizada correctamente.');
        } else {
            alert('Error al realizar la reserva.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});