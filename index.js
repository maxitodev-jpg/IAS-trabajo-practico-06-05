function calcularImpuestos(subtotal, porcentajeImpuesto) {
    return subtotal * (porcentajeImpuesto / 100);
}

console.log("Impuestos:", calcularImpuestos(22000, 21));

