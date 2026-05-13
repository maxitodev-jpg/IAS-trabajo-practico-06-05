let proveedores = [];

function registrarProveedor(nombre, email) {
  const proveedor = {
    id: proveedores.length + 1,
    nombre: nombre,
    email: email
  };
  proveedores.push(proveedor);
  console.log("Proveedor registrado:", proveedor);
}

// Ejemplo
registrarProveedor("Empresa SA", "empresa@email.com");