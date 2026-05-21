/**
 * Procesa un listado de ventas para generar métricas clave de un reporte.
 * 
 * @param {Array<Object>} ventas - Array de objetos de ventas del período filtrado.
 * @returns {Object} Resumen del reporte con ingresos, impuestos y producto estrella.
 */
function generarReporte(ventas) {
    if (!ventas || ventas.length === 0) {
        return {
            totalIngresos: 0,
            totalImpuestos: 0,
            productoMasVendido: "Sin ventas en este período"
        };
    }

    let ingresosAcumulados = 0;
    let impuestosAcumulados = 0;
    const conteoProductos = {}; // Para trackear cuál es el foco/producto más vendido

    // Recorremos cada venta del período
    ventas.forEach(venta => {
        ingresosAcumulados += venta.total;
        impuestosAcumulados += venta.impuesto;

        // Mapeamos los productos vendidos en esta transacción
        venta.productos.forEach(prod => {
            // prod.id o prod.nombre, y prod.cantidad
            if (conteoProductos[prod.nombre]) {
                conteoProductos[prod.nombre] += prod.cantidad;
            } else {
                conteoProductos[prod.nombre] = prod.cantidad;
            }
        });
    });

    // Encontrar el producto con la mayor cantidad vendida
    let productoEstrella = "";
    let maxCantidad = 0;

    for (const [nombre, cantidad] of Object.entries(conteoProductos)) {
        if (cantidad > maxCantidad) {
            maxCantidad = cantidad;
            productoEstrella = nombre;
        }
    }

    // Retornamos el objeto del reporte con los decimales controlados
    return {
        totalIngresos: Number(ingresosAcumulados.toFixed(2)),
        totalImpuestos: Number(impuestosAcumulados.toFixed(2)),
        productoMasVendido: productoEstrella ? `${productoEstrella} (${maxCantidad} unidades)` : "N/A"
    };
}

module.exports = generarReporte;