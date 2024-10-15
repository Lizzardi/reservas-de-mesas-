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

    // Guardar las mesas seleccionadas en localStorage
    const mesasSeleccionadas = Array.from(selectedTables).map(button => button.textContent);
    localStorage.setItem('mesasSeleccionadas', JSON.stringify(mesasSeleccionadas));

    // Enviar los datos a un servidor (ejemplo con fetch)
    fetch('tu_ruta_al_servidor', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            mesas: mesasSeleccionadas,
            fecha: selectedDate,
            hora: selectedTime
        })
    })
    .then(response => {
        if (response.ok) {
            alert('Reserva realizada correctamente.');
            // Redirigir a la página de la factura
            window.location.href = 'fee.html'; // Cambia a fee.html después de realizar la reserva
        } else {
            alert('Error al realizar la reserva.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
