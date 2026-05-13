let clientes = [];

function registrarCliente(nombre, email) {
  const cliente = {
    id: clientes.length + 1,
    nombre: nombre,
    email: email
  };
  clientes.push(cliente);
  console.log("Cliente registrado:", cliente);
}

// Ejemplo
registrarCliente("Juan Pérez", "juan@email.com");