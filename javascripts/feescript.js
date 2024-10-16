// Obtener los elementos HTML
const mesaSeleccionada = document.getElementById('mesa-seleccionada');
const totalPagar = document.getElementById('total-a-pagar');
const capacidad = document.getElementById('capacidad'); // Asegúrate de que este elemento existe

// Leer las mesas seleccionadas desde localStorage
const reservationData = JSON.parse(localStorage.getItem('reserva')) || {};
const mesasSeleccionadas = reservationData.mesas || [];
const costoPorMesa = 25; // Costo fijo por mesa
const capacidadPorMesa = 4; // Capacidad por mesa

// Actualizar la factura
if (mesasSeleccionadas.length === 0) {
    mesaSeleccionada.textContent = 'No se han seleccionado mesas.';
    capacidad.textContent = '';
} else {
    mesaSeleccionada.textContent = `Mesas seleccionadas: ${mesasSeleccionadas.join(', ')}`;
    
    // Calcular total a pagar y capacidad
    const total = mesasSeleccionadas.length * costoPorMesa;
    totalPagar.textContent = `Total a pagar: $${total}`;
    
    const totalPersonas = mesasSeleccionadas.length * capacidadPorMesa;
    capacidad.textContent = `Capacidad total: ${totalPersonas} personas`;
}

// Redirigir al confirmar la reserva
document.getElementById('final-confirm').addEventListener('click', () => {
    alert('Reserva confirmada');
    window.location.href = '../htmls/lobby.html'; // Redirige al lobby
});

// Lógica para cancelar la reserva
document.getElementById('cancel').addEventListener('click', () => {
    alert('Reserva cancelada');
    window.location.href = 'reserva.html'; // Revarga la reserva
});
