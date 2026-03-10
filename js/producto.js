const cards_cafe = document.getElementById("cards_cafe");
const cardsPostre = document.getElementById("cardsPostre");
let productosData = [];

function getProductos() {
    fetch("data/productos.json")
        .then((res) => {
            if (!res.ok) throw new Error("Error al cargar el JSON");
            return res.json();
        })
        .then((data) => {
            productosData = data;
            renderizarSeccion(productosData.filter(p => p.categoria === "cafe"), cards_cafe);
            renderizarSeccion(productosData.filter(p => p.categoria === "pasteleria"), cardsPostre);

            actualizarContadoresVista();
        })
        .catch((error) => console.log("Error:", error.message));
}

function renderizarSeccion(data, contenedor) {
    if (!contenedor) return;
    let html = "";
    for (const product of data) {
        html += `
        <div class="col">
            <div class="product-card-wrapper">
                <img src="${product.foto}" class="product-image-floating" alt="${product.nombre}">
                <div class="product-info-card">
                    <h5 class="card-title">${product.nombre}</h5>
                    <p class="card-text">${product.descripcion}</p>
                    <div class="price-action-area">
                        <p class="card-price">$${product.precio.toFixed(2)}</p>

                        <div class="botones-cantidad">
                           
                            <button class="btn-agregar-minimal add-cart" data-id="${product.id}">
                                Agregar +
                            </button>
                        </div>
                    </div>
                    <div class="mini-control">
                        En carrito: <span id="contador-${product.id}">0</span>
                    </div>
                </div>
            </div>
        </div>`;
    }
    contenedor.innerHTML = html;
}
function agregarAlCarrito(id, mostrarAlerta = true) {
    let carrito = JSON.parse(localStorage.getItem("carrito") || "[]");
    const index = carrito.findIndex((item) => item.id === id);

    if (index !== -1) {
        carrito[index].cantidad++;
    } else {
        const productoBase = productosData.find((p) => p.id === id);
        if (productoBase) {
            carrito.push({ ...productoBase, cantidad: 1 });
        }
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarContadoresVista();
 
    if (typeof renderizarCarritoSidebar === 'function') {
        renderizarCarritoSidebar();
    }

    if (mostrarAlerta) {
        Swal.fire({
            title: "¡Excelente elección!",
            text: "Producto añadido al carrito",
            icon: "success",
            timer: 1200,
            showConfirmButton: false,
            background: "#011C40",
            color: "#FDF5AA"
        });
    }
}

// --- 4. LÓGICA PARA QUITAR ---
function quitarDelCarrito(id) {
    let carrito = JSON.parse(localStorage.getItem("carrito") || "[]");
    const index = carrito.findIndex((item) => item.id === id);

    if (index !== -1) {
        if (carrito[index].cantidad > 1) {
            carrito[index].cantidad--;
        } else {
            carrito.splice(index, 1);
        }
        
        localStorage.setItem("carrito", JSON.stringify(carrito));
        actualizarContadoresVista();
    }
}

function actualizarContadoresVista() {
    const carrito = JSON.parse(localStorage.getItem("carrito") || "[]");

    productosData.forEach(p => {
        const span = document.getElementById(`contador-${p.id}`);
        if (span) span.innerText = "0";
    });

    carrito.forEach((item) => {
        const span = document.getElementById(`contador-${item.id}`);
        if (span) span.innerText = item.cantidad;
    });
}

window.addEventListener("load", () => {
    getProductos();
});

document.addEventListener("click", (e) => {
    const btnAdd = e.target.closest(".add-cart");
    if (btnAdd) {
        const id = btnAdd.getAttribute("data-id");
        agregarAlCarrito(id);
        return;
    }

    const btnRemove = e.target.closest(".btn-quitar");
    if (btnRemove) {
        const id = btnRemove.getAttribute("data-id");
        quitarDelCarrito(id);
    }
});

window.agregarAlCarrito = agregarAlCarrito;
window.quitarDelCarrito = quitarDelCarrito;
window.actualizarContadoresVista = actualizarContadoresVista;