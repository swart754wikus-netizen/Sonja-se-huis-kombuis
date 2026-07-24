/* ===== Sonja se Huis Kombuis — shopping basket ===== */

const CART_KEY = 'sonja_cart';
const SHIPPING_FEE = 180;

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  renderCartDrawer();
}

function addToCart(product) {
  const cart = getCart();
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  saveCart(cart);
}

function changeQty(id, delta) {
  const cart = getCart();
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  const updated = item.qty <= 0 ? cart.filter(i => i.id !== id) : cart;
  saveCart(updated);
}

function removeFromCart(id) {
  saveCart(getCart().filter(i => i.id !== id));
}

function cartTotal(cart) {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function cartCount(cart) {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

function formatR(amount) {
  return 'R' + amount.toFixed(2);
}

function renderCartDrawer() {
  const cart = getCart();
  const countEls = document.querySelectorAll('.basket-count');
  countEls.forEach(el => { el.textContent = cartCount(cart); });

  const itemsEl = document.getElementById('cart-items');
  const totalEl = document.getElementById('cart-total');
  if (!itemsEl) return;

  if (cart.length === 0) {
    itemsEl.innerHTML = '<p class="cart-empty">Your basket is empty.</p>';
  } else {
    itemsEl.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div class="thumb">${item.icon || '🍪'}</div>
        <div class="info">
          <div class="name">${item.name}</div>
          <div class="unit-price">${formatR(item.price)} each</div>
          <div class="qty-control">
            <button onclick="changeQty('${item.id}', -1)">-</button>
            <span>${item.qty}</span>
            <button onclick="changeQty('${item.id}', 1)">+</button>
            <span class="remove-btn" onclick="removeFromCart('${item.id}')">Remove</span>
          </div>
        </div>
      </div>
    `).join('');
  }

  if (totalEl) totalEl.textContent = formatR(cartTotal(cart));
}

function openCart() {
  document.getElementById('cart-drawer')?.classList.add('open');
  document.getElementById('overlay')?.classList.add('open');
}

function closeCart() {
  document.getElementById('cart-drawer')?.classList.remove('open');
  document.getElementById('overlay')?.classList.remove('open');
}

function toggleCart() {
  const drawer = document.getElementById('cart-drawer');
  if (drawer && drawer.classList.contains('open')) {
    closeCart();
  } else {
    openCart();
  }
}

function toggleMobileNav() {
  document.getElementById('nav-links')?.classList.toggle('open');
}

document.addEventListener('DOMContentLoaded', () => {
  renderCartDrawer();
  document.querySelectorAll('#nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      document.getElementById('nav-links')?.classList.remove('open');
    });
  });
});
