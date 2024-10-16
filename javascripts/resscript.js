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

// Crear los botones de mesa
Array.from({ length: 22 }, (_, i) => {
    const button = document.createElement('button');
    button.classList.add('mesa-button');
    button.textContent = `M${i + 1}`;

    button.addEventListener('click', () => {
        button.classList.toggle('selected');
        updateSelectedTables();
    });

    buttonsContainer.appendChild(button);
});

// Actualizar la lista de mesas seleccionadas
const updateSelectedTables = () => {
    selectedTables = Array.from(document.querySelectorAll('.mesa-button.selected')).map(button => button.textContent);
    confirmTablesButton.classList.toggle('hidden', selectedTables.length === 0);
};

// Mostrar selección de fecha
confirmTablesButton.addEventListener('click', () => {
    selectionContainer.classList.add('hidden');
    dateSelection.classList.remove('hidden');
});

// Validar fecha y mostrar el formulario de reserva
confirmDateButton.addEventListener('click', () => {
    const selectedDate = document.getElementById('date').value;
    if (!selectedDate) return alert('Por favor, seleccione una fecha.');

    dateSelection.classList.add('hidden');
    reservationForm.classList.remove('hidden');
});

// Gestionar la reserva
reservationForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const selectedDate = document.getElementById('date').value;
    const selectedTime = document.getElementById('time').value;

    if (selectedTables.length === 0) return alert('Debe seleccionar al menos una mesa.');

    confirmationDetails.textContent = `Mesas: ${selectedTables.join(', ')}, Fecha: ${selectedDate}, Hora: ${selectedTime}`;
    reservationForm.classList.add('hidden');
    confirmationSection.classList.remove('hidden');

    // Guardar las mesas seleccionadas y la reserva en localStorage
    const reservationData = {
        mesas: selectedTables,
        fecha: selectedDate,
        hora: selectedTime
    };
    localStorage.setItem('reserva', JSON.stringify(reservationData));
});

// Confirmar y redirigir
finalConfirmButton.addEventListener('click', () => {
    alert('Reserva realizada correctamente.'); // Mensaje de confirmación
    window.location.href = '../htmls/fee.html'; // Redirigir a fee.html
});

// Cancelar la reserva
cancelButton.addEventListener('click', () => {
    confirmationSection.classList.add('hidden');
    selectionContainer.classList.remove('hidden');
    document.querySelectorAll('.mesa-button.selected').forEach(button => button.classList.remove('selected'));
    updateSelectedTables();
});
