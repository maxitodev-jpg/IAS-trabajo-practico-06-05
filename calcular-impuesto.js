// Calcula el impuesto sobre un subtotal
function calcularImpuesto(subtotal, porcentajeImpuesto) {
    return subtotal * (porcentajeImpuesto / 100);
}

module.exports = calcularImpuesto;
