const buttonsContainer = document.querySelector('.buttons-container');
const reservationForm = document.querySelector('.reservation-form');
const confirmTablesButton = document.getElementById('confirm-tables');
const confirmDateButton = document.getElementById('confirm-date');
const confirmationSection = document.querySelector('.confirmation');
const confirmationDetails = document.getElementById('confirmation-details');
const finalConfirmButton = document.getElementById('final-confirm');
const cancelButton = document.getElementById('cancel');
const selectionContainer = document.querySelector('.selection-container');
const dateSelection = document.querySelector('.date-selection');

let selectedTables = [];

// Crear los 22 botones
for (let i = 1; i <= 22; i++) {
    let button = document.createElement('button');
    button.classList.add('mesa-button');
    button.textContent = `M${i}`;

    button.addEventListener('click', () => {
        button.classList.toggle('selected');
        updateSelectedTables();
    });

    buttonsContainer.appendChild(button);
}

function updateSelectedTables() {
    selectedTables = Array.from(document.querySelectorAll('.mesa-button.selected')).map(button => button.textContent);
    confirmTablesButton.classList.toggle('hidden', selectedTables.length === 0);
}

// Mostrar la selección de fecha cuando se confirmen las mesas
confirmTablesButton.addEventListener('click', () => {
    selectionContainer.classList.add('hidden');
    dateSelection.classList.remove('hidden');
});

// Validar la fecha y mostrar el formulario de reserva
confirmDateButton.addEventListener('click', () => {
    const selectedDate = document.getElementById('date').value;
    if (!selectedDate) {
        alert('Por favor, seleccione una fecha.');
        return;
    }
    dateSelection.classList.add('hidden');
    reservationForm.classList.remove('hidden');
});

// Gestionar la reserva al enviar el formulario
reservationForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const selectedDate = document.getElementById('date').value;
    const selectedTime = document.getElementById('time').value;

    // Validación básica
    if (selectedTables.length === 0) {
        alert('Debe seleccionar al menos una mesa.');
        return;
    }

    confirmationDetails.textContent = `Mesas: ${selectedTables.join(', ')}, Fecha: ${selectedDate}, Hora: ${selectedTime}`;
    reservationForm.classList.add('hidden');
    confirmationSection.classList.remove('hidden');

    // Guardar las mesas seleccionadas en localStorage
    localStorage.setItem('mesasSeleccionadas', JSON.stringify(selectedTables));

    // Enviar los datos a un servidor
    ffetch('tu_ruta_al_servidor', { // Asegúrate de usar la ruta correcta aquí
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            mesas: selectedTables,
            fecha: selectedDate,
            hora: selectedTime
        })
    })
    
    .then(response => {
        if (response.ok) {
            alert('Reserva realizada correctamente.');
            window.location.href = './fee.html'; // Cambiar a fee.html después de la reserva
        } else {
            alert('Error al realizar la reserva.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

// Confirmar la reserva final
finalConfirmButton.addEventListener('click', () => {
    alert('Reserva confirmada');
    window.location.href = './fee.html';
});

// Cancelar la reserva
cancelButton.addEventListener('click', () => {
    confirmationSection.classList.add('hidden');
    selectionContainer.classList.remove('hidden');
    document.querySelectorAll('.mesa-button.selected').forEach(button => button.classList.remove('selected'));
    updateSelectedTables();
});

