// carrito.js

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// ELEMENTOS (solo existen en carrito.html)
const listaCarrito = document.getElementById("lista-carrito");
const total = document.getElementById("total");
const btnVaciar = document.getElementById("vaciar");
const btnFinalizar = document.getElementById("finalizar");

// ==================== FUNCIONES PRINCIPALES ====================

function renderCarrito() {
  if (!listaCarrito || !total) return;

  listaCarrito.innerHTML = "";
  let totalCompra = 0;

  carrito.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.nombre} - x${item.cantidad} → €${item.precioTotal.toFixed(2)}`;
    listaCarrito.appendChild(li);
    totalCompra += item.precioTotal;
  });

  total.textContent = `Total: €${totalCompra.toFixed(2)}`;
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function agregarAlCarrito(nombre, precio) {
  const existente = carrito.find((item) => item.nombre === nombre);

  if (existente) {
    // La primera vale 100%, las demás 50%
    const precioExtra = precio * 0.5;
    existente.cantidad++;
    existente.precioTotal += precioExtra;
  } else {
    // Primera vez que se agrega
    carrito.push({
      nombre,
      precio,              // precio original por referencia
      cantidad: 1,
      precioTotal: precio  // total hasta ahora
    });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  renderCarrito();
  mostrarToast("✅ Producto agregado al carrito");
}

// ==================== BOTONES ====================

if (btnVaciar) {
  btnVaciar.addEventListener("click", () => {
    if (carrito.length === 0) {
      mostrarToast("⚠️ El carrito ya está vacío");
      return;
    }
    carrito = [];
    renderCarrito();
    mostrarToast("🗑️ Carrito vaciado");
  });
}

if (btnFinalizar) {
  btnFinalizar.addEventListener("click", () => {
    if (carrito.length === 0) {
      mostrarToast("⚠️ Tu carrito está vacío");
      return;
    }

    carrito = [];
    renderCarrito();
    mostrarToast("🎉 ¡Compra finalizada con éxito!");
  });
}

renderCarrito();

// ==================== NOTIFICACIONES (TOAST) ====================

function mostrarToast(mensaje) {
  // Crear contenedor si no existe
  let contenedor = document.getElementById("toast-container");
  if (!contenedor) {
    contenedor = document.createElement("div");
    contenedor.id = "toast-container";
    document.body.appendChild(contenedor);
  }

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = mensaje;
  contenedor.appendChild(toast);

  // Mostrar animación
  setTimeout(() => toast.classList.add("visible"), 100);

  // Eliminar tras 2 segundos
  setTimeout(() => {
    toast.classList.remove("visible");
    setTimeout(() => toast.remove(), 300);
  }, 2000);
}