// Calcula el subtotal de una lista de productos
function calcularSubtotal(productos) {
    let subtotal = 0;

    for (let producto of productos) {
        subtotal += producto.precio * producto.cantidad;
    }

    return subtotal;
}