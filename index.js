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

// ===============================
// FUNCION CALCULAR IMPUESTOS
// ===============================

function calcularImpuestos(subtotal, porcentajeImpuesto) {
    return subtotal * (porcentajeImpuesto / 100);
}

// ===============================
// EJEMPLO
// ===============================

const productos = [
    { nombre: "Foco LED", precio: 5000, cantidad: 2 },
    { nombre: "Lampara", precio: 12000, cantidad: 1 }
];

const subtotal = calcularSubtotal(productos);
const impuestos = calcularImpuestos(subtotal, 21);

console.log("Subtotal:", subtotal);
console.log("Impuestos:", impuestos);
console.log("Total:", subtotal + impuestos);
