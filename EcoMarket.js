// Lista de productos
const products = [
  { name: "Manzanas Orgánicas", price: 8.0, img: "Manzanas Orgánicas.avif", category: "fruits" },
  { name: "Lechuga Fresca", price: 5.0, img: "Lechuga Fresca.jpg", category: "vegetables" },
  { name: "Granos de Café", price: 18.0, img: "Granos de Café.jpg", category: "grains" },
  { name: "Tomates Naturales", price: 6.0, img: "Tomates Naturales.jpeg", category: "vegetables" },
  { name: "Aguacates Eco", price: 12.0, img: "Aguacates.jpeg", category: "fruits" },
  { name: "Zanahorias Naturales", price: 5.5, img: "Zanahorias Naturales1.jpeg", category: "vegetables" },
  { name: "Arvejas Verdes", price: 8.5, img: "Arvejas Verdes.jpg", category: "legumes" },
{ name: "Habas Frescas", price: 7.0, img: "Habas Frescas.jpg", category: "legumes" }
];
// Cargar carrito desde localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}
// Mostrar productos
function renderProducts(filteredProducts = products) {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";
  filteredProducts.forEach((product, index) => {
    const productCard = `
      <div class="col-md-3 mb-4 fade-in">
        <div class="card h-100">
          <img src="${product.img}" class="card-img-top" alt="${product.name}" loading="lazy">
          <div class="card-body text-center">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">S/${product.price.toFixed(2)}</p>
            <button class="btn btn-success add-to-cart" data-index="${index}">Agregar al carrito</button>
          </div>
        </div>
      </div>
    `;
    productList.innerHTML += productCard;
  });
  // Re-asignar eventos a los botones
  addCartButtonListeners();
}
// Actualizar contador del carrito
function updateCartCount() {
  const countElements = document.querySelectorAll(".cart-count");
  countElements.forEach((el) => (el.textContent = cart.length));
}
// Mostrar carrito
function renderCart() {
  const cartItemsList = document.getElementById("cart-items-list");
  cartItemsList.innerHTML = "";
  if (cart.length === 0) {
    cartItemsList.innerHTML = "<li>El carrito está vacío 🛒</li>";
  } else {
    cart.forEach((item, index) => {
      const li = document.createElement("li");
      li.className = "cart-item";
      li.innerHTML = `
        ${item.name} - S/${item.price.toFixed(2)}
        <div>
          <button class="btn btn-sm btn-danger remove-item" data-index="${index}">-</button>
        </div>
      `;
      cartItemsList.appendChild(li);
    });
  }
  updateCartTotal();
  addRemoveItemListeners();
}
// Calcular y mostrar total
function updateCartTotal() {
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  document.getElementById("cart-total").textContent = `S/${total.toFixed(2)}`;
}
// Eliminar ítems del carrito
function addRemoveItemListeners() {
  document.querySelectorAll(".remove-item").forEach((button) => {
    button.addEventListener("click", function () {
      const index = this.getAttribute("data-index");
      cart.splice(index, 1);
      saveCart();
      updateCartCount();
      renderCart();
    });
  });
}
// Agregar eventos a los botones de carrito
function addCartButtonListeners() {
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", function () {
      const index = this.getAttribute("data-index");
      const product = products[index];
      cart.push(product);
      saveCart();
      updateCartCount();
      alert(`✅ ${product.name} agregado al carrito.`);
    });
  });
}
// Filtrar y ordenar productos
document.getElementById("categoryFilter")?.addEventListener("change", filterProducts);
document.getElementById("sortFilter")?.addEventListener("change", filterProducts);
function filterProducts() {
  const category = document.getElementById("categoryFilter").value;
  const sort = document.getElementById("sortFilter").value;
  const search = document.getElementById("searchInput").value.toLowerCase();
  let filteredProducts = [...products];
  if (category !== "all") {
    filteredProducts = filteredProducts.filter((p) => p.category === category);
  }
  if (search) {
    filteredProducts = filteredProducts.filter((p) => p.name.toLowerCase().includes(search));
  }
  if (sort === "price") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else {
    filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
  }
  renderProducts(filteredProducts);
}
// Búsqueda
document.getElementById("searchForm")?.addEventListener("submit", function (e) {
  e.preventDefault();
  filterProducts();
});
document.getElementById("searchInput")?.addEventListener("input", filterProducts);
// Validación de formulario de contacto
document.getElementById("contactForm").addEventListener("submit", function (event) {
  event.preventDefault();
  const name = this.querySelector('input[type="text"]').value;
  const email = this.querySelector('input[type="email"]').value;
  const message = this.querySelector("textarea").value;

  if (name && email && message) {
    alert("¡Gracias por tu mensaje! Te responderemos pronto.");
    this.reset();
  } else {
    alert("Por favor, completa todos los campos.");
  }
});
// Validación de newsletter
document.getElementById("newsletterForm")?.addEventListener("submit", function (event) {
  event.preventDefault();
  const email = this.querySelector('input[type="email"]').value;
  if (email) {
    alert("¡Gracias por suscribirte! Recibirás nuestras novedades pronto.");
    this.reset();
  } else {
    alert("Por favor, ingresa un correo válido.");
  }
});
// Mostrar modal del carrito
document.querySelectorAll(".cart-icon, .cart-icon-nav").forEach((el) => {
  el.addEventListener("click", function (e) {
    e.preventDefault();
    renderCart();
    document.getElementById("cartModal").style.display = "block";
  });
});
// Cerrar modal
document.querySelector(".close-button").addEventListener("click", function () {
  document.getElementById("cartModal").style.display = "none";
});
// Cerrar modal al hacer clic fuera
window.addEventListener("click", function (event) {
  const cartModal = document.getElementById("cartModal");
  if (event.target === cartModal) {
    cartModal.style.display = "none";
  }
});
// Proceder al pago
document.getElementById("checkout-btn")?.addEventListener("click", function () {
  if (cart.length === 0) {
    alert("El carrito está vacío.");
  } else {
    alert("Redirigiendo al proceso de pago...");
    // Aquí iría la integración con un sistema de pago
  }
});
// Botón volver arriba
window.addEventListener("scroll", function () {
  const backToTop = document.getElementById("back-to-top");
  if (window.scrollY > 300) {
    backToTop.style.display = "block";
  } else {
    backToTop.style.display = "none";
  }
});
document.getElementById("back-to-top").addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
// Inicializar
renderProducts();
updateCartCount();