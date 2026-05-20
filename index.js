console.log("Proyecto Tienda de Focos iniciado");
/**
 * Procesa la venta de un producto restando la cantidad del inventario.
 * @param {string} productoId - ID del producto a vender.
 * @param {number} cantidad - Cantidad de unidades a vender.
 * @returns {Promise<Object>} Detalle de la venta realizada.
 */
async function realizarVenta(productoId, cantidad) {
  if (cantidad <= 0) {
    throw new Error("La cantidad a vender debe ser mayor a 0.");
  }

  // 1. Simulación de buscar el producto en la base de datos
  // En la vida real sería: const producto = await db.productos.findById(productoId);
  const producto = await buscarProductoPorIdSimulado(productoId); 

  if (!producto) {
    throw new Error("El producto solicitado no existe.");
  }

  // 2. Control de Stock
  if (producto.stock < cantidad) {
    throw new Error(`Stock insuficiente. Solo quedan ${producto.stock} unidades de ${producto.nombre}.`);
  }

  // 3. Modificar el stock (Lógica de inventario)
  // En tu DB harías un update: producto.stock -= cantidad; await producto.save();
  producto.stock -= cantidad; 

  // 4. Calcular el total de la transacción
  const totalVenta = producto.precio * cantidad;

  // 5. Retornar el comprobante o registro de la venta
  return {
    ventaId: `venta_${Math.random().toString(36).substr(2, 9)}`,
    productoId: producto.id,
    nombreProducto: producto.nombre,
    cantidad,
    total: totalVenta,
    fechaVenta: new Date()
  };
}

// Función auxiliar para que el ejemplo de arriba funcione si lo testeas
async function buscarProductoPorIdSimulado(id) {
  // Simulamos que encontró un termo en la base de datos
  return { id: "prod_123", nombre: "Termo Lumilagro", precio: 2500, stock: 10 };
}