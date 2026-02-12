// Función para inyectar HTML de forma segura
function putHTML(place, textToPut, msg) {
  let container = document.getElementById(place);
  if (container) {
    container.insertAdjacentHTML("beforeend", textToPut);
  } else {
    console.error(msg);
  }
}

// Determina la ruta de los assets (imágenes)
function getIconPath(page, iconName) {
  return page.id === "indexHere" ? `./assets/${iconName}` : `../assets/${iconName}`;
}

// Determina la ruta de las páginas HTML
function getPagePaths(page, element) {
  const isIndex = page.id === "indexHere";
  
  if (element === "index.html") {
    return isIndex ? `./index.html` : `../index.html`;
  }
  
  // Si estamos en el index, las páginas están en ./html/
  // Si ya estamos en una página dentro de /html/, se quedan en ./
  return isIndex ? `./html/${element}` : `./${element}`;
}

// Genera el Footer
function buildFooter(page) {
  let indexPage = getPagePaths(page, "index.html");
  let iconPath = getIconPath(page, "LogoFooter.png");
  let contactoPage = getPagePaths(page, "contacto.html");

  const footer = `
    <footer class="footer-gradient py-3">
      <div class="container">
        <div class="row align-items-center flex-column flex-md-row text-center text-md-start">
          <div class="col-md-6 mb-3 mb-md-0 d-flex flex-column align-items-center align-items-md-start">
            <a href="${indexPage}" class="footer-brand">
              <img src="${iconPath}" alt="LogoFooter" height="35">
            </a>
            <div class="footer-copyright">© 2025 Grano & Click. Todos los derechos reservados.</div>
          </div>
          <div class="col-md-6 d-flex flex-column align-items-center align-items-md-end">
            <nav class="footer-links d-flex flex-column flex-md-row gap-2">
              <a href="${contactoPage}">Contáctanos</a>
              <a href="#" class="info-aviso-privacidad">Aviso de Privacidad</a>
            </nav>
          </div>
        </div>
      </div>
    </footer>`;
  putHTML("footer-container", footer, "Error: No se encontró 'footer-container'");
}

// Genera el Navbar (Sin lógica de servidor)
function buildNavBar(page) {
  let iconPath = getIconPath(page, "LogoBien.png");
  let indexPage = getPagePaths(page, "index.html");
  let usPage = getPagePaths(page, "sobreNosotros.html");
  let contactoPage = getPagePaths(page, "contacto.html");
  let productPage = getPagePaths(page, "productos.html");

  const navBar = `
    <nav class="navbar navbar-dark navbar-expand-lg mt-2">
      <div class="container">
        <a class="navbar-brand" href="${indexPage}">
          <img src="${iconPath}" alt="Logo" height="35" />
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavbarContent">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="mainNavbarContent">
          <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
            <li class="nav-item"><a class="nav-link" href="${indexPage}">Inicio</a></li>
            <li class="nav-item"><a class="nav-link" href="${productPage}">Productos</a></li>
            <li class="nav-item"><a class="nav-link" href="${contactoPage}">Contáctanos</a></li>
            <li class="nav-item"><a class="nav-link" href="${usPage}">Sobre nosotros</a></li>
          </ul>
        </div>
      </div>
    </nav>`;
  putHTML("encabezado", navBar, "Error: No se encontró 'encabezado'");
}

// Evento para el Aviso de Privacidad (SweetAlert2)
document.addEventListener("click", (e) => {
  if (e.target.closest(".info-aviso-privacidad")) {
    e.preventDefault();
    Swal.fire({
      title: '🔒 Aviso de Privacidad',
      text: 'Grano & Click protege tus datos locales.',
      icon: 'info',
      confirmButtonColor: '#63addfff'
    });
  }
});

// Inicialización al cargar la página
window.addEventListener("load", () => {
  const page = document.querySelector("div[id]"); // Busca el primer div con ID
  if (page) {
    buildFooter(page);
    buildNavBar(page);
  }
});