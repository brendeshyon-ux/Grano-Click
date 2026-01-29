const productosLocales = [
    { "id": "cafe_1", "nombre": "Espresso | 30ml", "categoria": "cafe", "descripcion": "Un shot de café intenso, aromático y concentrado, perfecto para los amantes del sabor fuerte.", "precio": 34.50, "foto": "../assets/Producto/cafe1.png" },
    { "id": "cafe_2", "nombre": "Americano | 180ml", "categoria": "cafe", "descripcion": "Café suavizado con agua caliente, equilibrado y ligero, sin perder el carácter del café.", "precio": 54.50, "foto": "../assets/Producto/cafe2.png" },
    { "id": "cafe_3", "nombre": "Capuchino | 180ml", "categoria": "cafe", "descripcion": "Con leche vaporizada y espuma cremosa, con una textura suave y reconfortante.", "precio": 62.50, "foto": "../assets/Producto/cafe3.png" },
    { "id": "cafe_4", "nombre": "Latte | 240ml", "categoria": "cafe", "descripcion": "Combinado con leche cremosa vaporizada, ideal para un sabor suave y equilibrado.", "precio": 75.50, "foto": "../assets/Producto/cafe4.png" },
    { "id": "cafe_5", "nombre": "Moca | 240ml", "categoria": "cafe", "descripcion": "Con leche y chocolate líquido, una mezcla perfecta entre café y dulzura.", "precio": 79.50, "foto": "../assets/Producto/cafe5.png" },
    { "id": "cafe_6", "nombre": "Café de olla | 240ml", "categoria": "cafe", "descripcion": "Café tradicional mexicano con canela y notas especiadas, lleno de aroma y sabor artesanal.", "precio": 64.50, "foto": "../assets/Producto/cafe6.png" },
    { "id": "past_1", "nombre": "Cheesecake", "categoria": "pasteleria", "descripcion": "Rebanada de cheesecake clásico, suave, cremoso y con un toque irresistible de dulzura.", "precio": 54.50, "foto": "../assets/Producto/reposteria1.png" },
    { "id": "past_2", "nombre": "Brownie", "categoria": "pasteleria", "descripcion": "Brownie casero, húmedo y chocolatoso, perfecto para los amantes del chocolate.", "precio": 44.50, "foto": "../assets/Producto/reposteria2.png" },
    { "id": "past_3", "nombre": "Croissant", "categoria": "pasteleria", "descripcion": "Croissant crujiente por fuera y suave por dentro, relleno de chocolate fundido.", "precio": 54.50, "foto": "../assets/Producto/reposteria3.png" },
    { "id": "past_4", "nombre": "Galletas", "categoria": "pasteleria", "descripcion": "Galleta suave y recién horneada, con chispas de chocolate derretido.", "precio": 29.50, "foto": "../assets/Producto/reposteria4.png" },
    { "id": "past_5", "nombre": "Panqué", "categoria": "pasteleria", "descripcion": "Panqué esponjoso con sabor natural a naranja y trocitos de nuez.", "precio": 34.50, "foto": "../assets/Producto/reposteria5.png" },
    { "id": "past_6", "nombre": "Rol", "categoria": "pasteleria", "descripcion": "Rol suave y esponjoso con un aroma intenso a canela y un toque dulce irresistible.", "precio": 44.50, "foto": "../assets/Producto/reposteria6.png" }
];

const cards_cafe = document.getElementById("cards_cafe");
const cardsPostre = document.getElementById("cardsPostre");

// Renderizar productos
function inicializarProductos() {
    renderizarSeccion(productosLocales.filter(p => p.categoria === "cafe"), cards_cafe);
    renderizarSeccion(productosLocales.filter(p => p.categoria === "pasteleria"), cardsPostre);
    cargarCantidadLS();
}

function renderizarSeccion(data, contenedor) {
    if (!contenedor) return;
    contenedor.innerHTML = data.map(product => `
        <div class="col">
            <div class="product-card-wrapper">
                <img src="${product.foto}" class="product-image-floating" alt="${product.nombre}">
                
                <div class="product-info-card">
                    <h5 class="card-title" id="nombre-${product.id}">${product.nombre}</h5>
                    <p class="card-text">${product.descripcion}</p>
                    
                    <div class="price-action-area">
                        <p class="card-price" id="precio-${product.id}">$${product.precio.toFixed(2)}</p>
                        <button class="btn-agregar-minimal btn-agregar" data-id="${product.id}">
                            Agregar +
                        </button>
                    </div>
                    
                    <div class="mini-control">
                        En carrito: <span id="contador-${product.id}">0</span>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

window.addEventListener("load", inicializarProductos);