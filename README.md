IAS-trabajo-practico-06-05
Trabajo Práctico - Introduccion al Análisis Sistémico

Integrantes del Grupo

Pepi Jose
Carvajal Martín
Torres Maxi
Barrionuevo Navarro Santiago
Cumar Vinci Merlín Ian
1. Gestión de Stock (Inventario)

US01: Registro de Productos COMO encargado de compras QUIERO dar de alta nuevas lámparas en el sistema PARA mantener el catálogo actualizado.

Criterio de Aceptación:

    DADO que el usuario está en el formulario de "Nuevo Producto", CUANDO ingresa el nombre, tipo de zócalo (E27, GU10), stock inicial y precio, ENTONCES el sistema guarda el registro y genera un código único de seguimiento.
US02: Alerta de Stock Mínimo COMO dueño de negocio QUIERO recibir una notificación cuando una lámpara tenga pocas unidades PARA evitar quiebres de stock y no perder ventas.

Criterio de Aceptación:

    DADO que una lámpara tiene un umbral de stock mínimo de 5 unidades, CUANDO se realiza una venta que deja el inventario en 4, ENTONCES el sistema debe mostrar una alerta visual en el tablero principal.
2. Gestión de Ventas

US03: Registro de Venta Directa COMO vendedor QUIERO procesar la venta de una lámpara de pie PARA entregar el comprobante al cliente y descontar el producto del inventario.

Criterio de Aceptación:

    DADO que el vendedor selecciona un producto y confirma el pago, CUANDO se finaliza la transacción, ENTONCES el sistema debe restar automáticamente las unidades vendidas del stock total y emitir un ticket de venta.
US04: Aplicación de Descuentos por Cantidad COMO vendedor QUIERO aplicar un descuento a partir de 10 unidades (mayorista) PARA incentivar compras grandes de proyectos de iluminación.

Criterio de Aceptación:

    DADO que hay más de 10 lámparas del mismo modelo en el carrito, CUANDO se calcula el total, ENTONCES el sistema debe aplicar un 15% de descuento automáticamente sobre el subtotal de ese ítem.
3. Gestión de Compras y Proveedores

US05: Registro de Orden de Compra COMO encargado de compras QUIERO registrar la llegada de un pedido del proveedor PARA actualizar el costo promedio y la disponibilidad.

Criterio de Aceptación:

    DADO que se recibe un lote de 50 lámparas colgantes, CUANDO el usuario carga la factura del proveedor en el sistema, ENTONCES el stock actual se incrementa y el precio de costo se actualiza si hubo cambios.
4. Reportes y Análisis

US06: Reporte de Rentabilidad COMO dueño de negocio QUIERO generar un informe mensual de ganancias PARA evaluar el rendimiento financiero del local.

Criterio de Aceptación:

    DADO que el usuario selecciona un rango de fechas (mes actual), CUANDO presiona "Generar Reporte", ENTONCES el sistema muestra el total de ingresos menos el costo de mercadería vendida (CMV), desglosando qué categoría de lámparas fue la más rentable.
Resumen de Entidades Sugeridas

Para que este sistema funcione, tu base de datos debería contemplar:

Productos: ID, Modelo, Tipo (LED, Halógena, Incandescente), Material, Zócalo, Stock, Precio Costo, Precio Venta.

Movimientos: ID, Producto_ID, Tipo (Entrada/Salida), Cantidad, Fecha.

Ventas: ID, Fecha, Total, Método de Pago
