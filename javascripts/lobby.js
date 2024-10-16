const carouselInner = document.querySelector('.carousel-inner');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const indicators = document.querySelectorAll('.carousel-indicators button');

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

// Assuming there are multiple reserve buttons, add event listeners to each
document.querySelectorAll('.reserve-button').forEach(button => {
    button.addEventListener('click', (event) => {
        const targetPage = event.target.getAttribute('data-target');
        if (targetPage) {
            window.location.href = targetPage;
        }
    });
});