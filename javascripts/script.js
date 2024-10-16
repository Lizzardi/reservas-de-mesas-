const carouselInner = document.querySelector('.carousel-inner');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const indicators = document.querySelectorAll('.carousel-indicators button');
const reserveButtons = document.querySelectorAll(".reserve-button");

let currentSlide = 0;

function showSlide(index) {
    carouselInner.style.transform = `translateX(-${index * 100}%)`;

    // Actualizar indicadores
    indicators.forEach(indicator => indicator.classList.remove('active'));
    indicators[index].classList.add('active');
}

prevButton.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + indicators.length) % indicators.length;
    showSlide(currentSlide);
});

nextButton.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % indicators.length;
    showSlide(currentSlide);
});

// Rotación automática (opcional)
setInterval(() => {
    currentSlide = (currentSlide + 1) % indicators.length;
    showSlide(currentSlide);
}, 5000); // Cambiar cada 5 segundos

// Añadir evento a todos los botones de "Reserva ahora" y "Reserve con nosotros"
reserveButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Crear la notificación
        let notification = document.createElement('div');
        notification.classList.add('notification');
        notification.innerHTML = `
            <p>Para poder reservar, primero debe registrarse o iniciar sesión si ya cuenta con una cuenta.</p>
            <button class="regresar">Regresar</button>
            <button class="registrarse">Registrarse</button>
        `;

        // Agregar la notificación al cuerpo del documento
        document.body.appendChild(notification);

        // Agregar evento al botón "Regresar"
        notification.querySelector('.regresar').addEventListener('click', () => {
            document.body.removeChild(notification); // Cerrar la notificación
        });

        // Agregar evento al botón "Registrarse"
        notification.querySelector('.registrarse').addEventListener('click', () => {
            window.location.href = './login.html'; 
        });
    });
});
