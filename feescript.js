// Obtener los elementos HTML para actualizar la factura
const mesaSeleccionada = document.getElementById('mesa-seleccionada');
const totalPagar = document.getElementById('total-a-pagar');

// Leer las mesas seleccionadas desde localStorage
const mesasSeleccionadas = JSON.parse(localStorage.getItem('mesasSeleccionadas')) || [];
const costoPorMesa = 25; // Costo fijo por mesa

// Si no hay mesas seleccionadas, mostrar un mensaje por defecto
if (mesasSeleccionadas.length === 0) {
    mesaSeleccionada.textContent = 'No se han seleccionado mesas.';
} else {
    // Actualizar los detalles de las mesas seleccionadas en la factura
    mesaSeleccionada.textContent = `Mesas seleccionadas: ${mesasSeleccionadas.join(', ')}`;

    // Calcular el total a pagar en base a la cantidad de mesas seleccionadas
    const total = mesasSeleccionadas.length * costoPorMesa;
    totalPagar.textContent = `Total a pagar: $${total}`;
}

// Redirigir al confirmar la reserva
document.getElementById('final-confirm').addEventListener('click', () => {
    alert('Reserva confirmada');
    window.location.href = 'index.html';  // Redirige de vuelta a la página de reserva o realiza una acción adicional
});

// Lógica para cancelar la reserva
document.getElementById('cancel').addEventListener('click', () => {
    alert('Reserva cancelada');
    window.location.href = 'reserva.html';  // Redirige de vuelta a la página de reserva
});
