// registroProveedor.js

let proveedoresLocal = []; // Cache local para validaciones y listado rápido

async function registrarProveedor(event) {
  event.preventDefault();
  const msg = document.getElementById('msgProveedor');

  const razonSocial = document.getElementById('razonSocial').value.trim();
  const nit = document.getElementById('nit').value.trim();
  const direccion = document.getElementById('direccion').value.trim();
  const telefono = document.getElementById('telefonoProv').value.trim();
  const correo = document.getElementById('correoProv').value.trim();

  // 1. Validar campos obligatorios
  if (!razonSocial || !nit || !direccion || !telefono || !correo) {
    return mostrarMsg(msg, 'Completa todos los campos.', 'error');
  }

  // 2. Validar formato de correo
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
    return mostrarMsg(msg, 'Correo no válido.', 'error');
  }

  // 3. Validar NIT único (local + backend)
  if (proveedoresLocal.some(p => p.nit === nit)) {
    return mostrarMsg(msg, 'El NIT ya está registrado.', 'error');
  }

  const datos = { razonSocial, nit, direccion, telefono, correo };

  try {
    // 4. Endpoint POST /api/proveedores
    const res = await fetch('/api/proveedores', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos)
    });
    const respuesta = await res.json();

    if (res.ok) {
      proveedoresLocal.push(respuesta.proveedor || datos);
      mostrarMsg(msg, respuesta.mensaje || 'Proveedor registrado correctamente.', 'exito');
      document.getElementById('formProveedor').reset();
      listarProveedores(); // Actualiza la tabla/lista automáticamente
    } else {
      mostrarMsg(msg, respuesta.error || 'Error al registrar.', 'error');
    }
  } catch {
    mostrarMsg(msg, 'Sin conexión al servidor.', 'error');
  }
}

async function listarProveedores() {
  const contenedor = document.getElementById('listaProveedores');
  if (!contenedor) return;

  try {
    // Si tu backend tiene GET /api/proveedores, usa fetch. Si no, usa el array local.
    const res = await fetch('/api/proveedores');
    const data = res.ok ? await res.json() : proveedoresLocal;
    proveedoresLocal = data;

    contenedor.innerHTML = '';
    data.forEach(p => {
      const item = document.createElement('li');
      item.textContent = `${p.razonSocial} | NIT: ${p.nit}`;
      contenedor.appendChild(item);
    });
  } catch {
    // Fallback si no hay backend aún
    contenedor.innerHTML = '';
    proveedoresLocal.forEach(p => {
      const item = document.createElement('li');
      item.textContent = `${p.razonSocial} | NIT: ${p.nit}`;
      contenedor.appendChild(item);
    });
  }
}

function mostrarMsg(el, texto, tipo) {
  el.textContent = texto;
  el.style.color = tipo === 'exito' ? '#166534' : '#991b1b';
  el.style.display = 'block';
  setTimeout(() => (el.style.display = 'none'), 4000);
}

// Auto-inicialización
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formProveedor');
  if (form) form.addEventListener('submit', registrarProveedor);
  listarProveedores();
});