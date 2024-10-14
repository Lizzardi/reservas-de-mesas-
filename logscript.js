const container = document.querySelector(".container");
const btnsignin = document.getElementById("btn-sign-in");
const btnsignup = document.getElementById("btn-sign-up");
const botonlog = document.getElementById("iniciar");
const botonreg = document.getElementById("registro");

// Alternar entre el formulario de iniciar sesión y registrarse
btnsignin.addEventListener("click", () => {
    container.classList.remove("toggle");
});

btnsignup.addEventListener("click", () => {
    container.classList.add("toggle");
});

// Función para validar si hay campos vacíos
const validateFields = (fields) => {
    for (let field of fields) {
        if (field.value.trim() === "") {
            return false; // Hay al menos un campo vacío
        }
    }
    return true; // Todos los campos están llenos
};

// Función para validar el correo
const validateEmail = (email) => {
    return email.endsWith('@gmail.com');
};

// Función para validar la contraseña
const validatePassword = (password) => {
    return password.length >= 6; // Validación: mínimo 6 caracteres
};

// Registrar usuario
botonreg.addEventListener("click", (event) => {
    event.preventDefault(); // Evita el envío automático del formulario

    // Obtener los datos del formulario de registro
    const nombre = document.querySelector(".sign-up input[placeholder='Nombre y Apellido']");
    const correo = document.querySelector(".sign-up input[placeholder='correo']");
    const contraseña = document.querySelector(".sign-up input[placeholder='Crear contraseña']");
    const repetirContraseña = document.querySelector(".sign-up input[placeholder='Repetir contraseña']");

    // Validar que no haya campos vacíos
    if (!validateFields([nombre, correo, contraseña, repetirContraseña])) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    // Validar que el correo tenga el dominio correcto
    if (!validateEmail(correo.value)) {
        alert("El correo debe ser un @gmail.com");
        return;
    }

    // Validar que la contraseña tenga al menos 6 caracteres
    if (!validatePassword(contraseña.value)) {
        alert("La contraseña debe tener al menos 6 caracteres.");
        return;
    }

    // Validar que las contraseñas coincidan
    if (contraseña.value !== repetirContraseña.value) {
        alert("Las contraseñas no coinciden.");
        return;
    }

    // Guardar los datos en localStorage
    const usuario = {
        nombre: nombre.value,
        correo: correo.value,
        contraseña: contraseña.value
    };

    localStorage.setItem('usuario', JSON.stringify(usuario));
    alert("Registro exitoso. Ahora puede iniciar sesión.");
    container.classList.remove("toggle"); // Cambiar al formulario de iniciar sesión
});

// Iniciar sesión
botonlog.addEventListener("click", (event) => {
    event.preventDefault(); // Evita el envío automático del formulario

    // Obtener los datos del formulario de inicio de sesión
    const correo = document.querySelector(".sign-in input[placeholder='correo']").value.trim(); // Asegurarse de que no haya espacios
    const contraseña = document.getElementById('login-password').value.trim(); // Lo mismo para la contraseña

    // Validar que no haya campos vacíos
    if (!correo || !contraseña) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    // Obtener los datos del usuario registrado desde localStorage
    const usuarioRegistrado = JSON.parse(localStorage.getItem('usuario'));

    // Verificar si el usuario está en localStorage
    if (!usuarioRegistrado) {
        alert("No se encontró un usuario registrado.");
        return;
    }

    // Validar las credenciales
    if (usuarioRegistrado.correo === correo && usuarioRegistrado.contraseña === contraseña) {
        alert("Inicio de sesión exitoso");
        window.location.href = "./reserva.html"; // Redirigir a la página de reservas
    } else {
        alert("Correo o contraseña incorrectos");
    }
});

// Toggle para mostrar/ocultar contraseña en el Login
const toggleLoginPassword = document.getElementById('toggle-login-password');
const loginPasswordInput = document.getElementById('login-password');

toggleLoginPassword.addEventListener('click', () => {
    const type = loginPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    loginPasswordInput.setAttribute('type', type);
    toggleLoginPassword.textContent = type === 'password' ? '👁️' : '🙈'; // Cambiar icono
});

// Toggle para mostrar/ocultar contraseña en el Registro
const toggleRegisterPassword = document.getElementById('toggle-register-password');
const registerPasswordInput = document.querySelector(".sign-up input[placeholder='Crear contraseña']");

toggleRegisterPassword.addEventListener('click', () => {
    const type = registerPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    registerPasswordInput.setAttribute('type', type);
    toggleRegisterPassword.textContent = type === 'password' ? '👁️' : '🙈'; // Cambiar icono
});

// Toggle para mostrar/ocultar la contraseña de repetir
const toggleRepeatPassword = document.getElementById('toggle-repeat-password');
const repeatPasswordInput = document.querySelector(".sign-up input[placeholder='Repetir contraseña']");

toggleRepeatPassword.addEventListener('click', () => {
    const type = repeatPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    repeatPasswordInput.setAttribute('type', type);
    toggleRepeatPassword.textContent = type === 'password' ? '👁️' : '🙈'; // Cambiar icono
});
