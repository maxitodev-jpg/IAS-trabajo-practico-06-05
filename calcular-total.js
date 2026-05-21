/**
 * Calcula el monto final que el cliente debe pagar.
 * 
 * @param {number} subtotal - Costo neto de los productos.
 * @param {number} impuesto - Valor del impuesto calculado (ej. IVA).
 * @param {number} [descuento=0] - Descuento opcional a restar (monto fijo).
 * @returns {number} Total de la venta redondeado a 2 decimales.
 */
function calcularTotal(subtotal, impuesto, descuento = 0) {
    // Validamos que los ingresos sean números válidos y positivos
    if (subtotal < 0 || impuesto < 0 || descuento < 0) {
        throw new Error("Los valores monetarios no pueden ser negativos.");
    }

    // Consolidamos el total
    const totalRaw = (subtotal + impuesto) - descuento;

    // Si el descuento es mayor que el total, el total es 0 (no queremos números negativos)
    const totalFinal = totalRaw < 0 ? 0 : totalRaw;

    // Redondeamos a 2 decimales y convertimos de nuevo a número
    return Number(totalFinal.toFixed(2));
}

module.exports = calcularTotal;