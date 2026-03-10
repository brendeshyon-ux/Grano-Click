const form = document.getElementById("signinForm");
const userName = document.getElementById("userName");
const userLastName = document.getElementById("userLastName");
const userEmail = document.getElementById("userEmail");
const userConfirmEmail = document.getElementById("userConfirmEmail");
const userPhone = document.getElementById("userPhone");
const userBirthDate = document.getElementById("userBirthDate");
const userStreet = document.getElementById("userStreet");
const userNeighborhood = document.getElementById("userNeighborhood");
const userCounty = document.getElementById("userCounty");
const userPostalCode = document.getElementById("userPostalCode");
const userPassword = document.getElementById("userPassword");
const userConfirmPassword = document.getElementById("userConfirmPassword");
const btnSignin = document.getElementById("btnSignin");
const btnCancel = document.getElementById("btnCancel");

const alertMessages = document.getElementById("alert-messages");
let errors = [];

const regs = {
  name: /^(?!.*[<>;\'\"\\\/])[A-Za-záéíóúñ]{3,}(?:[\s][A-Za-záéíóúñ]{2,}){0,70}$/,
  email: /^(?=.{3,50}$)(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  street: /^(?=.{3,100}$)(?!.*\s{2,})(?=.*\b\d{1,5}\b)[A-Za-zÁÉÍÓÚÜÑáéíóúüñ][A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9 .,'#\/\-°ª()]*$/,
  neighborhood: /^(?=.{3,100}$)(?!.*\s{2,})(?=.*[A-Za-zÁÉÍÓÚÜÑáéíóúüñ])[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9][A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9 .,'\-]*$/,
  county: /^(?=.{3,100}$)(?!.*\s{2,})[A-Za-zÁÉÍÓÚÜÑáéíóúüñ][A-Za-zÁÉÍÓÚÜÑáéíóúüñ .'\-]*$/,
  postalCode: /^(?!(?:00000|12345|23456|34567|45678|56789))(0[1-9]\d{3}|[1-9]\d{4})$/,
  phone: /^(?!0\d{2}|1\d{2}|2[0-1]\d|220)(?!(\d)\1{9}$)(?!0123456789$)(?!1234567890$)(?!9876543210$)(?!0101010101$)(?!(\d\d)\2{4}$)\d{10}$/,
  password: /^(?!.*(?:abc123|abcdef|abcd1234|123456|1234567|12345678|qwerty|asdfgh|zxcvbn|password|pass123|admin|usuario|welcome))(?!.*(.)\1\1)(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%&*()_\-+=])(?!.*\s)[A-Za-z\d@#$%&*()_\-+=]{8,12}$/,
};

function cleanAlert() {
  if (alertMessages) alertMessages.innerHTML = "";
}

function cleanErrors() {
  const inputs = [userName, userLastName, userEmail, userConfirmEmail, userPhone, userBirthDate, userStreet, userNeighborhood, userCounty, userPostalCode, userPassword, userConfirmPassword];
  inputs.forEach((input) => {
    input.classList.remove("input-invalid-glow", "input-valid-glow");
    input.style.border = "";
  });
  cleanAlert();
  errors = [];
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

// --- VALIDACIONES ---
function validateField(element, regex, errorField) {
  const isValid = regex.test(element.value);
  if (!isValid) {
    applyGlowClass(element, false);
    errors.push(errorField);
    return false;
  }
  applyGlowClass(element, true);
  return true;
}

function isAdult(birthDateString) {
  const birthDate = new Date(birthDateString);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) age--;
  return age >= 18 && age <= 100;
}

function getPasswordErrors(pass) {
  let missing = [];
  if (pass.length < 8) {
    missing.push("usar al menos 8 caracteres");
  } else if (pass.length > 12) {
    missing.push("no exceder los 12 caracteres (tienes " + pass.length + ")");
  }
  if (!/[A-Z]/.test(pass)) missing.push("una mayúscula");
  if (!/[a-z]/.test(pass)) missing.push("una minúscula");
  if (!/\d/.test(pass)) missing.push("un número");
  if (!/[@#$%&*()_\-+=]/.test(pass)) missing.push("poner al menos un carácter especial @#$%&*()_\-+=");
  if (/\s/.test(pass)) missing.push("sin espacios");
  return missing;
}

function validateInfo() {
  let veredict = true;
  errors = [];

  veredict = validateField(userName, regs.name, "Nombre") && veredict;
  veredict = validateField(userLastName, regs.name, "Apellido") && veredict;
  veredict = validateField(userEmail, regs.email, "Correo") && veredict;
  veredict = validateField(userPhone, regs.phone, "Teléfono") && veredict;
  veredict = validateField(userStreet, regs.street, "Calle y número") && veredict;
  veredict = validateField(userNeighborhood, regs.neighborhood, "Colonia") && veredict;
  veredict = validateField(userCounty, regs.county, "Municipio") && veredict;
  veredict = validateField(userPostalCode, regs.postalCode, "Código Postal") && veredict;

  if (!userBirthDate.value || !isAdult(userBirthDate.value)) {
    applyGlowClass(userBirthDate, false);
    errors.push("Fecha de Nacimiento (más de 18 años)");
    veredict = false;
  } else {
    applyGlowClass(userBirthDate, true);
  }

  if (!regs.password.test(userPassword.value)) {
    applyGlowClass(userPassword, false);
    errors.push("Contraseña inválida");
    veredict = false;
  } else {
    applyGlowClass(userPassword, true);
  }

  if (userConfirmPassword.value !== userPassword.value || userConfirmPassword.value === "") {
    applyGlowClass(userConfirmPassword, false);
    errors.push("Contraseñas no coinciden");
    veredict = false;
  } else {
    applyGlowClass(userConfirmPassword, true);
  }

  if (userConfirmEmail.value === "" || userConfirmEmail.value !== userEmail.value) {
    applyGlowClass(userConfirmEmail, false);
    errors.push("Los correo no coinciden");
    veredict = false;
  } else {
    applyGlowClass(userConfirmEmail, true);
  }

  return veredict;
}

const passwordRequirements = document.getElementById("password-requirements");

userPassword.addEventListener("input", () => {
    const pass = userPassword.value;
    const errorsList = getPasswordErrors(pass);
    const isValid = regs.password.test(pass);
    
    applyGlowClass(userPassword, isValid);

    passwordRequirements.innerHTML = "";

    if (pass.length > 0 && !isValid) {
        let html = '<ul class="ps-3 mb-0" style="list-style: none; color: #ff4d4d;">';
        errorsList.forEach(error => {
            html += `<li><i class="bi bi-x-circle me-1"></i> Falta ${error}</li>`;
        });
        html += '</ul>';
        passwordRequirements.innerHTML = html;
    } else if (isValid) {
        passwordRequirements.innerHTML = '<span style="color: #66ff66;"><i class="bi bi-check-circle me-1"></i> ¡Contraseña perfecta!</span>';
    }
});


function registerUserLocal() {
  const localUsers = JSON.parse(localStorage.getItem("localUsers") || "[]");
  const emailInput = userEmail.value.toLowerCase().trim();

  const exists = localUsers.some(user => user.correo === emailInput);

  if (exists) {
    cleanAlert();
    alertMessages.insertAdjacentHTML("beforeend", `
      <div class="alert alert-danger alert-error-glow">
        <p class="custom-alert-title">Error al Registrar</p>
        <p><strong>Este correo ya está registrado en el sistema local.</strong></p>
      </div>
    `);
    return;
  }

  const newUser = {
    nombres: userName.value.trim(),
    apellidos: userLastName.value.trim(),
    correo: emailInput,
    telefono: userPhone.value.trim(),
    fechaNacimiento: userBirthDate.value,
    contrasena: userPassword.value,
    rol: "user"
  };

  localUsers.push(newUser);
  localStorage.setItem("localUsers", JSON.stringify(localUsers));

  cleanAlert();
  alertMessages.insertAdjacentHTML("beforeend", `
    <div class="alert alert-success alert-success-glow">
      <p class="custom-alert-title">¡Registro Local Exitoso!</p>
      <p>Usuario guardado en el navegador. Redirigiendo al login...</p>
    </div>
  `);

  form.reset();
  setTimeout(() => {
    window.location.href = "./login.html";
  }, 1500);
}

function handleAddUserFlow(event) {
  event.preventDefault();
  cleanErrors();

  if (!validateInfo()) {
    const listaCampos = errors.map(campo => `<li>${campo}</li>`).join("");
    alertMessages.insertAdjacentHTML("beforeend", `
      <div class="alert alert-danger alert-error-glow">
        <p class="custom-alert-title">¡Error de Validación!</p>
        <ul class="custom-alert-list">${listaCampos}</ul>
      </div>
    `);
    return;
  }

  registerUserLocal();
}

const fieldsToValidate = [
  { element: userName, reg: regs.name },
  { element: userLastName, reg: regs.name },
  { element: userEmail, reg: regs.email },
  { element: userPhone, reg: regs.phone },
  { element: userStreet, reg: regs.street },
  { element: userNeighborhood, reg: regs.neighborhood },
  { element: userCounty, reg: regs.county },
  { element: userPostalCode, reg: regs.postalCode },
  { element: userPassword, reg: regs.password },
];

fieldsToValidate.forEach(({ element, reg }) => {
  element.addEventListener("input", () => {
    applyGlowClass(element, reg.test(element.value));
  });
});

btnSignin.addEventListener("click", handleAddUserFlow);
btnCancel.addEventListener("click", (e) => {
  e.preventDefault();
  cleanErrors();
  form.reset();
});

userConfirmPassword.addEventListener("input", () => {
  const isConfirmValid =
    userConfirmPassword.value.trim() !== "" &&
    userConfirmPassword.value === userPassword.value;
  applyGlowClass(userConfirmPassword, isConfirmValid);
});


userConfirmEmail.addEventListener("input", () => {
  const isConfirmValid =
    userConfirmEmail.value.trim() !== "" &&
    userConfirmEmail.value === userEmail.value;
  applyGlowClass(userConfirmEmail, isConfirmValid);
});

userBirthDate.addEventListener("input", () => {
  const isValid = userBirthDate.value && isAdult(userBirthDate.value);
  applyGlowClass(userBirthDate, isValid);
});

userPassword.addEventListener("input", () => {
  const isValid = regs.password.test(userPassword.value);
  applyGlowClass(userPassword, isValid);
  const isConfirmValid = userConfirmPassword.value === userPassword.value && userConfirmPassword.value !== "";
  applyGlowClass(userConfirmPassword, isConfirmValid);
});

userEmail.addEventListener("input", () => {
  const isValid = regs.email.test(userEmail.value);
  applyGlowClass(userEmail, isValid);
  const isConfirmValid = userConfirmEmail.value === userEmail.value && userConfirmEmail.value !== "";
  applyGlowClass(userConfirmEmail, isConfirmValid);
});