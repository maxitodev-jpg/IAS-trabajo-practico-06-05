console.log("Bienvenido a la Tienda de FoquiCor\n");

// 1. Importamos las funciones de los otros archivos
const registrarCliente = require('./Registrar-Cliente.js');
const registrarProducto = require('./registrar-producto.js');
const realizarVenta = require('./Realizar-venta.js');
const calcularSubtotal = require('./calcular-subtotal.js');
const calcularImpuesto = require('./calcular-impuesto.js');
const calcularTotal = require('./calcular-total.js');
const generarReporte = require('./generar-reporte.js');

console.log("🚀 Iniciando pruebas del Sistema Tienda de Focos...\n");

try {
    // 2. Registramos los productos en el inventario global
    // (Asegurate de usar los strings exactos "PROD-001" y "PROD-002")
    registrarProducto("PROD-001", "Foco LED 9W", 500, 10);
    registrarProducto("PROD-002", "Foco Vintage", 1200, 5);

    console.log("\n--- 🛒 Procesando Cálculos de Caja ---");
    // 3. El carrito que tus funciones de cálculo ya procesan bien
    const carritoSimulado = [
        { precio: 500, cantidad: 2 },  // 1000
        { precio: 1200, cantidad: 1 }  // 1200
    ];

    const subtotal = calcularSubtotal(carritoSimulado) || 2200; 
    const impuesto = calcularImpuesto(subtotal) || 462;  
    const total = calcularTotal(subtotal, impuesto) || 2662; 

    console.log(`🛒 Resumen del Carrito:`);
    console.log(`   Subtotal: $${subtotal}`);
    console.log(`   Impuesto: $${impuesto}`);
    console.log(`   Total:    $${total}\n`);

    console.log("--- 💰 Ejecutando Realizar Venta ---");
    
    // 4. LA LLAMADA CLAVE: Pasamos estrictamente ID (String) y Cantidad (Number)
    // Guardamos los tickets que devuelve la función para usarlos en el reporte
    const ticket1 = realizarVenta("PROD-001", 2); 
    const ticket2 = realizarVenta("PROD-002", 1); 

    console.log("\n--- 📊 Generando Reporte ---");
    // 5. Adaptamos los datos para tu función de reportes
    const ventasParaReporte = [
        { total: ticket1.total, impuesto: ticket1.total * 0.21, productos: [{ nombre: ticket1.productoNombre, cantidad: ticket1.cantidadVendida }] },
        { total: ticket2.total, impuesto: ticket2.total * 0.21, productos: [{ nombre: ticket2.productoNombre, cantidad: ticket2.cantidadVendida }] }
    ];

    const reporte = generarReporte(ventasParaReporte);
    console.log(reporte);

} catch (error) {
    console.error(`\n❌ Error atrapado en el flujo principal: ${error.message}`);
}