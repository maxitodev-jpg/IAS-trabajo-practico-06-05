// ==========================================
// BASE DE DATOS SIMULADA (Para el proyecto)
// ==========================================
const inventario = new Map(); // Guarda los productos (id -> { nombre, precio, stock })
const historialVentas = [];    // Guarda el registro de cada venta realizada

// ==========================================
// ISSUE: "Registrar producto"
// ==========================================

/**
 * Registra un nuevo producto en el inventario o actualiza el stock si ya existe.
 * @param {string|number} id - Identificador único del producto.
 * @param {string} nombre - Nombre comercial del producto.
 * @param {number} precio - Precio unitario (debe ser mayor a 0).
 * @param {number} stock - Cantidad inicial disponible (debe ser mayor o igual a 0).
 * @returns {object} El producto registrado o actualizado.
 */
function registrarProducto(id, nombre, precio, stock) {
    // Validaciones de seguridad (Defensive Programming)
    if (!id || !nombre) {
        throw new Error("El ID y el nombre del producto son obligatorios.");
    }
    if (typeof precio !== 'number' || precio <= 0) {
        throw new Error("El precio debe ser un número mayor a cero.");
    }
    if (typeof stock !== 'number' || stock < 0) {
        throw new Error("El stock no puede ser un número negativo.");
    }

    // Si el producto ya existe, modificamos/sumamos el stock (opcional, según lógica de negocio)
    if (inventario.has(id)) {
        const productoExistente = inventario.get(id);
        productoExistente.stock += stock;
        productoExistente.precio = precio; // Actualiza al precio más reciente
        console.log(`[INVENTARIO]: Producto existente actualizado. Nuevo stock de '${nombre}': ${productoExistente.stock}`);
        return productoExistente;
    }

    // Si es nuevo, lo creamos
    const nuevoProducto = {
        id,
        nombre,
        precio,
        stock
    };

    inventario.set(id, nuevoProducto);
    console.log(`[INVENTARIO]: Éxito. Producto '${nombre}' registrado correctamente.`);
    return nuevoProducto;
}

module.exports = registrarProducto;