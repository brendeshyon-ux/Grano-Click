function injectFullStyles() {
  const css = ``;
}

// --- LÓGICA DEL CARRITO ---
function abrirCarrito() {
  const sidebar = document.getElementById('carrito-sidebar');
  const overlay = document.getElementById('carrito-overlay');
  if (sidebar && overlay) {
    sidebar.classList.add('active');
    overlay.classList.add('active');
    renderizarCarritoSidebar();
  }
}

function cerrarCarrito() {
  const sidebar = document.getElementById('carrito-sidebar');
  const overlay = document.getElementById('carrito-overlay');
  if (sidebar && overlay) {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
  }
}

function renderizarCarritoSidebar() {
  const carrito = JSON.parse(localStorage.getItem("carrito") || "[]");
  const contenedor = document.getElementById('lista-carrito-body');
  const totalTxt = document.getElementById('total-carrito-sidebar');
  if (!contenedor || !totalTxt) return;

  if (carrito.length === 0) {
    contenedor.innerHTML = '<p class="text-center mt-5 opacity-50">Tu carrito está esperando un café...</p>';
    totalTxt.innerText = "$0.00";
    return;
  }

  let html = "";
  let total = 0;
  carrito.forEach((item) => {
    const subtotal = item.precio * item.cantidad;
    total += subtotal;
    html += `
      <div class="item-carrito-sidebar d-flex align-items-center mb-4">
          <img src="${item.foto}" width="55" height="55" style="object-fit: cover; border-radius: 8px;" class="me-3">
          <div class="flex-grow-1">
              <p class="mb-0 fw-bold text-light" style="font-size: 0.9rem;">${item.nombre}</p>
              <div class="d-flex align-items-center gap-2 mt-2">
                  <button class="btn-qty btn-minus" data-id="${item.id}">-</button>
                  <span class="text-white px-1">${item.cantidad}</span>
                  <button class="btn-qty btn-plus" data-id="${item.id}">+</button>
              </div>
          </div>
          <div class="text-end d-flex flex-column align-items-end">
              <div class="fw-bold mb-1" style="color: #FDF5AA;">$${subtotal.toFixed(2)}</div>
              <button class="btn-eliminar-item" data-id="${item.id}">Eliminar</button>
          </div>
      </div>`;
  });
  contenedor.innerHTML = html;
  totalTxt.innerText = `$${total.toFixed(2)}`;
}

document.addEventListener("click", (e) => {
  const id = e.target.getAttribute("data-id");
  if (!id) return;

  if (e.target.classList.contains("btn-plus")) {
    if (window.agregarAlCarrito) window.agregarAlCarrito(id, false);
    renderizarCarritoSidebar();
  }
  else if (e.target.classList.contains("btn-minus")) {
    if (window.quitarDelCarrito) window.quitarDelCarrito(id);
    renderizarCarritoSidebar();
  }
  else if (e.target.classList.contains("btn-eliminar-item")) {
    let carrito = JSON.parse(localStorage.getItem("carrito") || "[]");
    carrito = carrito.filter(item => item.id !== id);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderizarCarritoSidebar();
    if (window.actualizarContadoresVista) window.actualizarContadoresVista();
  }
});

// --- UTILIDADES DE RUTAS ---
function getPagePaths(page, element) {
  return `./${element}`;
}
function getIconPath(page, iconName) {
  return `./assets/${iconName}`;
}

// --- CONSTRUCCIÓN DE COMPONENTES ---
function buildNavBar(page) {
  const iconPath = getIconPath(page, "logo1-1.png");
  const signPage = getPagePaths(page, "signin.html");
  const productPage = getPagePaths(page, "productos.html");
  const indexPage = getPagePaths(page, "index.html");
  const usPage = getPagePaths(page, "sobreNosotros.html");
  const contactoPage = getPagePaths(page, "contacto.html");
  const logPage = getPagePaths(page, "login.html");
  const formularioCreacion = getPagePaths(page, "formularioCreacion.html");

  const userName = localStorage.getItem("userName");
  const userRole = localStorage.getItem("userRole");
  const isLogged = !!userName;
  const isAdmin = userRole === "admin";

  const navBarHTML = `
    <nav class="navbar navbar-dark navbar-expand-lg mt-2">
      <div class="container">
        <a class="navbar-brand" href="${indexPage}"><img src="${iconPath}" alt="Logo" height="20" /></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavbarContent">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="mainNavbarContent">
          <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
            <li class="nav-item"><a class="nav-link" href="${indexPage}">Inicio</a></li>
            <li class="nav-item"><a class="nav-link" href="${productPage}">Productos</a></li>
            <li class="nav-item"><a class="nav-link" href="${contactoPage}">Contáctanos</a></li>
            <li class="nav-item"><a class="nav-link" href="${usPage}">Sobre nosotros</a></li>
            ${isAdmin ? `<li class="nav-item"><a class="nav-link nav-admin-cta" href="${formularioCreacion}">Agregar producto</a></li>` : ''}
          </ul>
          <ul class="navbar-nav d-flex align-items-center">
            ${!isLogged ? `
              <li class="nav-item"><a class="nav-link" href="${logPage}">Iniciar sesión</a></li>
              <li class="nav-item me-3"><a class="nav-link" href="${signPage}">Registrarse</a></li>
            ` : `
              <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" 
              href="#" id="accountDropdown" data-bs-toggle="dropdown">
              <span>Hola, ${userName}</span>
              </a>
              <ul class="dropdown-menu border-0 p-0 m-0">
              <li><a class="dropdown-item logout-btn" href="#">Cerrar sesión</a></li>
              </ul>
              </li>
            `}
            <li class="nav-item">
              <a class="btn btn-outline-warning d-flex align-items-center gap-2" id="btn-abrir-carrito" href="#">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-cart2" viewBox="0 0 16 16">
                  <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l1.25 5h8.22l1.25-5zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
                </svg> Carrito
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>`;

  const carritoHTML = `
    <div id="carrito-overlay" class="carrito-overlay"></div>
    <div id="carrito-sidebar" class="carrito-sidebar">
        <div class="carrito-header"><h3>Tu Pedido</h3><button id="cerrar-carrito">&times;</button></div>
        <div id="lista-carrito-body" class="carrito-body"></div>
        <div class="carrito-footer">
            <div class="d-flex justify-content-between mb-3 fs-5"><span>Total:</span><span id="total-carrito-sidebar" class="fw-bold" style="color: #FDF5AA;">$0.00</span></div>
            <button id="btn-pagar-final" class="btn-pagar-custom">PAGAR Y FINALIZAR</button>
        </div>
    </div>`;


  document.getElementById("encabezado").innerHTML = navBarHTML;
  document.body.insertAdjacentHTML('beforeend', carritoHTML);

  const logoutBtn = document.querySelector(".logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      Swal.fire({
        title: "¿Cerrar sesión?",
        text: "Tendrás que volver a ingresar para finalizar tus pedidos.",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Salir",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#FDF5AA",
        cancelButtonColor: "#A7EBF2",
        background: "#011C40",
        color: "#FDF5AA"
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem("userName");
          localStorage.removeItem("userRole");
          localStorage.removeItem("userEmail");
          window.location.href = indexPage;
        }
      });
    });
  }

  // Eventos del Carrito
  document.getElementById('btn-abrir-carrito').onclick = (e) => { 
    e.preventDefault(); 
    abrirCarrito(); 
  };
  document.getElementById('cerrar-carrito').onclick = cerrarCarrito;
  document.getElementById('carrito-overlay').onclick = cerrarCarrito;

  const btnPagarFinal = document.getElementById('btn-pagar-final');
  if (btnPagarFinal) {
    if (!isLogged) {
      btnPagarFinal.innerText = "Inicia sesión para pagar.";
    }
    btnPagarFinal.onclick = () => {
       if (isLogged) {
         window.location.href = "./checkout.html";
       } else {
        window.location.href = logPage;
       }
    };
  }
} 


function buildFooter(page) {
  const indexPage = getPagePaths(page, "index.html");
  const iconPath = getIconPath(page, "logo1-1.png");
  const contactoPage = getPagePaths(page, "contacto.html");

  const footerHTML = `
    <footer class="footer-gradient py-3 mt-5">
      <div class="container text-center text-md-start">
        <div class="row align-items-center">
          <div class="col-md-6 mb-3 mb-md-0">
            <a href="${indexPage}"><img src="${iconPath}" alt="LogoFooter" height="20"></a>
            <div class="mt-2 opacity-75 small">© 2026 Grano & Click. Todos los derechos reservados.</div>
          </div>
          <div class="col-md-6 text-md-end">
            <nav class="d-flex justify-content-center justify-content-md-end gap-3">
              <a href="${contactoPage}" class="text-decoration-none text-light small">Contáctanos</a>
              <a href="#" class="info-aviso-privacidad text-decoration-none text-light small">Aviso de Privacidad</a>
            </nav>
          </div>
        </div>
      </div>
    </footer>`;

  const footerContainer = document.getElementById("footer-container");
  if (footerContainer) footerContainer.innerHTML = footerHTML;
}

// --- EVENTO PRIVACIDAD ---
document.addEventListener("click", (e) => {
  const linkPrivacidad = e.target.closest(".info-aviso-privacidad");
  if (!linkPrivacidad) return;
  e.preventDefault();

  const page = document.querySelector("div[id]") || { id: "default" };
  const avisoPage = getPagePaths(page, "avisoDePrivacidad.html");

  window.open(avisoPage, '_blank');
});

// --- INICIALIZACIÓN ---
window.addEventListener("load", () => {
  injectFullStyles();
  const page = document.querySelector("div[id]") || { id: "default" };
  buildNavBar(page);
  buildFooter(page);
});

// Exponer funciones globales
window.abrirCarrito = abrirCarrito;
window.cerrarCarrito = cerrarCarrito;