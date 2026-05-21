// registroCliente.js

// Array local para validar duplicados antes de llamar al backend
const clientesDB = [];

async function registrarCliente(event) {
  event.preventDefault();

  // 1. Obtener valores
  const nombre = document.getElementById('nombre').value.trim();
  const identificacion = document.getElementById('identificacion').value.trim();
  const telefono = document.getElementById('telefono').value.trim();
  const correo = document.getElementById('correo').value.trim();
  const msg = document.getElementById('mensaje');

  // 2. Validar campos obligatorios
  if (!nombre || !identificacion || !telefono || !correo) {
    mostrarMensaje(msg, 'Todos los campos son obligatorios.', 'error');
    return;
  }

  // 3. Validar formato de correo
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(correo)) {
    mostrarMensaje(msg, 'El correo no tiene un formato válido.', 'error');
    return;
  }

  // 4. Validar identificación duplicada (cliente + backend)
  if (clientesDB.some(c => c.identificacion === identificacion)) {
    mostrarMensaje(msg, 'Esta identificación ya está registrada.', 'error');
    return;
  }

  const datos = { nombre, identificacion, telefono, correo };

  try {
    // 5. Guardar en BD vía endpoint POST /api/clientes
    const res = await fetch('/api/clientes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos)
    });

    const respuesta = await res.json();

    if (res.ok) {
      clientesDB.push(datos); // Refuerzo local para próximas validaciones
      mostrarMensaje(msg, respuesta.mensaje || 'Cliente registrado con éxito.', 'exito');
      document.getElementById('formRegistro').reset();
    } else {
      mostrarMensaje(msg, respuesta.error || 'Error al registrar el cliente.', 'error');
    }
  } catch {
    mostrarMensaje(msg, 'No se pudo conectar con el servidor.', 'error');
  }
}

// Función auxiliar para mostrar feedback visual
function mostrarMensaje(elemento, texto, tipo) {
  elemento.textContent = texto;
  elemento.style.color = tipo === 'exito' ? 'green' : 'red';
  elemento.style.display = 'block';
}

// Vincular el evento al formulario
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formRegistro');
  if (form) form.addEventListener('submit', registrarCliente);
});