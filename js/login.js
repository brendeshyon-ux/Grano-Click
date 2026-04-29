const form = document.getElementById("loginForm");
const localCorreo = document.getElementById("emails");
const localPass = document.getElementById("pass");
const btnSend = document.getElementById("send");
const alertMessagesContainer = document.getElementById("alert-messages");

const regs = {
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  password: /^(?!.*(?:abc123|abcdef|abcd1234|123456|1234567|12345678|qwerty|asdfgh|zxcvbn|password|pass123|admin|usuario|welcome))(?!.*(.)\1\1)(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%&*()_\-+=])(?!.*\s)[A-Za-z\d@#$%&*()_\-+=]{8,12}$/
};

function cleanAlerts() {
  if (alertMessagesContainer) {
    while (alertMessagesContainer.firstChild) {
      alertMessagesContainer.removeChild(alertMessagesContainer.firstChild);
    }
  }
}

function applyGlowClass(element, isValid) {
  element.style.border = "";
  if (isValid) {
    element.classList.remove("input-invalid-glow");
    element.classList.add("input-valid-glow");
  } else {
    element.classList.remove("input-valid-glow");
    element.classList.add("input-invalid-glow");
  }
}

function displayAlert(title, message, isSuccess = false) {
  cleanAlerts();
  const alertClass = isSuccess ? "alert-success-glow" : "alert-error-glow";
  const html = `
    <div class="alert ${alertClass}" style="
      background: var(--fondoCards); 
      box-shadow: var(--card-shadow-inner); 
      border-radius: 1.5rem; 
      padding: 1.2rem; 
      border: 1px solid rgba(255,255,255,0.1);">
      <p style="color: #ff4d4d; font-weight: 600; margin-bottom: 5px;">${title}</p>
      <p style="color: #ff4d4d; font-size: 0.9rem; margin: 0;">${message}</p>
    </div>`;
  if (alertMessagesContainer) {
    alertMessagesContainer.insertAdjacentHTML("beforeend", html);
  }
}

function validateField(element, regex) {
  const isValid = regex.test(element.value);
  applyGlowClass(element, isValid);
  return isValid;
}

function validaPrevio() {
  let veredict = true;
  const correoOk = validateField(localCorreo, regs.email);
  const passOk = localPass.value.trim().length > 0;

  applyGlowClass(localPass, passOk);
  veredict = correoOk && passOk;
  return veredict;
}

function loginLocal() {
  const correo = localCorreo.value.trim().toLowerCase();
  const password = localPass.value.trim();

  const localUsers = JSON.parse(localStorage.getItem("localUsers") || "[]");

  const usuarioEncontrado = localUsers.find(u => u.correo === correo && u.contrasena === password);

  if (usuarioEncontrado) {
    localStorage.setItem("userName", usuarioEncontrado.nombres);
    localStorage.setItem("userEmail", usuarioEncontrado.correo);
    localStorage.setItem("userRole", usuarioEncontrado.rol || "user");
    localStorage.setItem("authToken", "token-local-12345");

    displayAlert("Acceso Concedido", `¡Bienvenido(a) ${usuarioEncontrado.nombres}!`, true);
    return true;
  } else {
    displayAlert("Error de Acceso", "Correo o contraseña incorrectos.");
    return false;
  }
}

function usuarioAceptado() {
  window.location.href = "./productos.html";
}

btnSend.addEventListener("click", function (event) {
  event.preventDefault();
  cleanAlerts();

  if (!validaPrevio()) {
    displayAlert("Error de Validación", "Por favor, completa los campos correctamente.");
    return;
  }

  const ok = loginLocal();
  if (ok) {
    setTimeout(() => {
      usuarioAceptado();
      form.reset();
    }, 1000);
  }
});

localCorreo.addEventListener("input", () => {
  validateField(localCorreo, regs.email);
});

localPass.addEventListener("input", () => {
  const isValid = localPass.value.trim().length > 0;
  applyGlowClass(localPass, isValid);
});