// Base de datos temporal en memoria (Front)
const inventario = new Map();
const historialVentas = [];

// Elementos de la pantalla (DOM)
const webConsole = document.getElementById('web-console');
const selectProductos = document.getElementById('venta-producto-id');
const resSubtotal = document.getElementById('res-subtotal');
const resImpuesto = document.getElementById('res-impuesto');
const resTotal = document.getElementById('res-total');

// Función auxiliar para escribir en nuestra consola web
function logWeb(mensaje) {
    webConsole.innerHTML += `<br>>> ${mensaje}`;
    webConsole.scrollTop = webConsole.scrollHeight; // Auto scroll hacia abajo
}

// === LÓGICA DE LAS ISSUES ADAPTADAS AL NAVEGADOR ===

function registrarProducto(id, nombre, precio, stock) {
    if (!id || !nombre) {
        throw new Error("El ID y el nombre del producto son obligatorios.");
    }
    inventario.set(id, { id, nombre, precio: parseFloat(precio), stock: parseInt(stock) });
    logWeb(`[INVENTARIO]: Éxito. Producto '${nombre}' registrado.`);
    
    // Actualizar el menú desplegable de ventas
    const opcion = document.createElement('option');
    opcion.value = id;
    opcion.textContent = `${nombre} ($${precio})`;
    selectProductos.appendChild(opcion);
}

function realizarVenta(idProducto, cantidad) {
    cantidad = parseInt(cantidad);
    if (isNaN(cantidad) || cantidad <= 0) {
        throw new Error("La cantidad a vender debe ser mayor a cero.");
    }
    if (!inventario.has(idProducto)) {
        throw new Error("El producto seleccionado no existe.");
    }

    const producto = inventario.get(idProducto);

    if (producto.stock < cantidad) {
        throw new Error(`Stock insuficiente para '${producto.nombre}'. Disponibles: ${producto.stock}`);
    }

    // Restamos stock
    producto.stock -= cantidad;
    const totalOperacion = producto.precio * cantidad;

    const ticketVenta = {
        idVenta: `V-${Date.now()}`,
        productoNombre: producto.nombre,
        cantidadVendida: cantidad,
        precioUnitario: producto.precio,
        total: totalOperacion
    };

    historialVentas.push(ticketVenta);
    logWeb(`💰 [VENTA]: ${producto.nombre} x${cantidad} procesado con éxito.`);
    return ticketVenta;
}

// Funciones de cálculo matemático
function calcularSubtotal(totalVenta) { return totalVenta; }
function calcularImpuesto(subtotal) { return Number((subtotal * 0.21).toFixed(2)); }
function calcularTotal(subtotal, impuesto) { return Number((subtotal + impuesto).toFixed(2)); }

// === CAPTURA DE EVENTOS DE LOS FORMULARIOS ===

// Evento: Guardar Producto
document.getElementById('form-producto').addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('prod-id').value;
    const nombre = document.getElementById('prod-nombre').value;
    const precio = document.getElementById('prod-precio').value;
    const stock = document.getElementById('prod-stock').value;

    try {
        registrarProducto(id, nombre, precio, stock);
        document.getElementById('form-producto').reset();
    } catch (err) {
        logWeb(`❌ Error: ${err.message}`);
    }
});

// Evento: Procesar Venta
document.getElementById('form-venta').addEventListener('submit', (e) => {
    e.preventDefault();
    const idProducto = selectProductos.value;
    const cantidad = document.getElementById('venta-cantidad').value;

    try {
        const ticket = realizarVenta(idProducto, cantidad);
        
        // Actualizar el panel de totales acumulados en la pantalla
        const subtotalActual = parseFloat(resSubtotal.textContent) + ticket.total;
        const impuestoActual = calcularImpuesto(subtotalActual);
        const totalActual = calcularTotal(subtotalActual, impuestoActual);

        resSubtotal.textContent = subtotalActual.toFixed(2);
        resImpuesto.textContent = impuestoActual.toFixed(2);
        resTotal.textContent = totalActual.toFixed(2);

        document.getElementById('form-venta').reset();
    } catch (err) {
        logWeb(`❌ Error de Venta: ${err.message}`);
    }
});

// Evento: Botón Reporte
document.getElementById('btn-reporte').addEventListener('click', () => {
    logWeb("📊 --- REPORTE GENERADO EN LA CONSOLA DEL NAVEGADOR (F12) ---");
    console.log("=== REPORTE TOTAL DE VENTAS ===");
    console.table(historialVentas);
    console.log("Inventario restante:");
    console.log(inventario);
});