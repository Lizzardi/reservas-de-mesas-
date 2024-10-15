document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector(".container");
    const btnsignin = document.getElementById("btn-sign-in");
    const btnsignup = document.getElementById("btn-sign-up");
    const botonlog = document.getElementById("iniciar");
    const botonreg = document.getElementById("registro");

    // Alternar entre formularios
    btnsignin.addEventListener("click", () => container.classList.remove("toggle"));
    btnsignup.addEventListener("click", () => container.classList.add("toggle"));

    // Funciones de validación
    const validateFields = (fields) => fields.every(field => field.value.trim() !== "");
    const validateEmail = (email) => email.endsWith('@gmail.com');
    const validatePassword = (password) => password.length >= 6;

    // Función para manejar el registro
    const handleRegistration = () => {
        const fields = Array.from(document.querySelectorAll('.sign-up input'));
        const [nombre, correo, contraseña, repetirContraseña] = fields;

        // Validar campos
        if (!validateFields(fields)) return alert("Por favor, complete todos los campos.");
        if (!validateEmail(correo.value)) return alert("El correo debe ser un @gmail.com.");
        if (!validatePassword(contraseña.value)) return alert("La contraseña debe tener al menos 6 caracteres.");
        if (contraseña.value !== repetirContraseña.value) return alert("Las contraseñas no coinciden.");

        // Guardar en localStorage
        const usuario = { nombre: nombre.value, correo: correo.value, contraseña: contraseña.value };
        localStorage.setItem('usuario', JSON.stringify(usuario));
        alert("Registro exitoso. Ahora puede iniciar sesión.");
        container.classList.remove("toggle");
    };

    // Función para manejar el inicio de sesión
    const handleLogin = () => {
        const fields = Array.from(document.querySelectorAll('.sign-in input'));
        const [correo, contraseña] = fields;

        // Validar campos
        if (!validateFields(fields)) return alert("Por favor, complete todos los campos.");

        // Obtener datos del usuario registrado desde localStorage
        const usuarioRegistrado = JSON.parse(localStorage.getItem('usuario'));

        // Verificar si el usuario está en localStorage
        if (!usuarioRegistrado) return alert("No se encontró un usuario registrado.");
        
        // Validar credenciales
        if (usuarioRegistrado.correo === correo.value.trim() && usuarioRegistrado.contraseña === contraseña.value.trim()) {
            alert("Inicio de sesión exitoso");
            window.location.href = "./reserva.html"; // Redirigir a la página de reservas
        } else {
            alert("Correo o contraseña incorrectos");
        }
    };

    // Eventos de botón
    botonreg.addEventListener("click", (event) => {
        event.preventDefault();
        handleRegistration();
    });

    botonlog.addEventListener("click", (event) => {
        event.preventDefault();
        handleLogin();
    });

    // Función para mostrar/ocultar contraseñas
    const togglePasswordVisibility = (inputField, toggleButton) => {
        const type = inputField.getAttribute('type') === 'password' ? 'text' : 'password';
        inputField.setAttribute('type', type);
        toggleButton.textContent = type === 'password' ? '👁️' : '🙈';
    };

    // Toggle de contraseñas
    document.getElementById('toggle-login-password').addEventListener('click', () => {
        const loginPasswordInput = document.querySelector(".sign-in input[placeholder='contraseña']");
        togglePasswordVisibility(loginPasswordInput, event.currentTarget);
    });

    document.getElementById('toggle-register-password').addEventListener('click', () => {
        const registerPasswordInput = document.querySelector(".sign-up input[placeholder='Crear contraseña']");
        togglePasswordVisibility(registerPasswordInput, event.currentTarget);
    });

    document.getElementById('toggle-repeat-password').addEventListener('click', () => {
        const repeatPasswordInput = document.querySelector(".sign-up input[placeholder='Repetir contraseña']");
        togglePasswordVisibility(repeatPasswordInput, event.currentTarget);
    });
});
