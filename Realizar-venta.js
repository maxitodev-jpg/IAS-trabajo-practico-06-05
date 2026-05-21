// ==========================================
// ISSUE: "Realizar venta"
// ==========================================

/**
 * Procesa la venta de un producto, descuenta el stock y genera un ticket/registro.
 * @param {string|number} idProducto - ID del producto a vender.
 * @param {number} cantidad - Cantidad de unidades a comprar.
 * @returns {object} Detalle de la venta realizada (Ticket).
 */
function realizarVenta(idProducto, cantidad) {
    // Validar entrada
    if (typeof cantidad !== 'number' || cantidad <= 0) {
        throw new Error("La cantidad a vender debe ser mayor a cero.");
    }

    // Verificar si el producto existe en el inventario
    if (!inventario.has(idProducto)) {
        throw new Error(`Error de Venta: El producto con ID ${idProducto} no existe en el inventario.`);
    }

    const producto = inventario.get(idProducto);

    // Verificar disponibilidad de Stock
    if (producto.stock < cantidad) {
        throw new Error(`Stock insuficiente para '${producto.nombre}'. Disponible: ${producto.stock}, Solicitado: ${cantidad}`);
    }

    // Reducir el stock en el inventario
    producto.stock -= cantidad;

    // Calcular el total de la operación
    const totalOperacion = producto.precio * cantidad;

    // Crear el registro de la venta (Ticket)
    const ticketVenta = {
        idVenta: `V-${Date.now()}-${Math.floor(Math.random() * 1000)}`, // ID único temporal
        fecha: new Date().toLocaleString(),
        productoId: producto.id,
        productoNombre: producto.nombre,
        cantidadVendida: cantidad,
        precioUnitario: producto.precio,
        total: totalOperacion
    };

    // Guardar en el historial global del proyecto
    historialVentas.push(ticketVenta);

    console.log(`💰 [VENTA]: Procesada con éxito. Ticket: ${ticketVenta.idVenta} | Total: $${totalOperacion}`);
    return ticketVenta;
}

// ==========================================
// EJEMPLO DE USO / PRUEBA EN CONSOLA
// ==========================================

try {
    console.log("--- 1. Ejecutando Issue: Registrar producto ---");
    registrarProducto("PROD-001", "Proteína Whey 1kg", 45.00, 20);
    registrarProducto("PROD-002", "Shaker / Mezclador", 12.50, 50);

    console.log("\n--- 2. Ejecutando Issue: Realizar venta (Éxito) ---");
    const miTicket = realizarVenta("PROD-001", 3); // Compra 3 proteínas
    console.log("Datos devueltos del ticket:", miTicket);

    console.log("\n--- 3. Comprobando actualización de Stock ---");
    console.log("Estado actual del Producto 001:", inventario.get("PROD-001"));

    console.log("\n--- 4. Forzando un error de Stock Insuficiente ---");
    realizarVenta("PROD-001", 50); // Debería lanzar el error automáticamente

} catch (error) {
    console.error(`❌ Ha ocurrido un error controlado: ${error.message}`);
}