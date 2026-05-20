// ===============================
// FUNCION CALCULAR SUBTOTAL
// ===============================

function calcularSubtotal(productos) {
    let subtotal = 0;

    for (let i = 0; i < productos.length; i++) {
        subtotal += productos[i].precio * productos[i].cantidad;
    }

    return subtotal;
}

const productos = [
    { nombre: "Foco LED", precio: 5000, cantidad: 2 },
    { nombre: "Lampara", precio: 12000, cantidad: 1 }
];

console.log("Subtotal:", calcularSubtotal(productos));git add .

