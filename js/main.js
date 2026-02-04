function irAProducto(seccionId) {
    window.location.href = `./html/productos.html#${seccionId}`;
}
document.querySelectorAll('.btn-details').forEach(button => {
    button.addEventListener('mouseover', () => {
        console.log("Usuario interesado en: " + button.previousElementSibling.previousElementSibling.innerText);
    });
});