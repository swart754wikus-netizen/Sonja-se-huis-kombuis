/* ===== Sonja se Huis Kombuis — product list (edit prices/items here) ===== */

const PRODUCTS = [
  { id: 'rusk-buttermilk', name: 'Buttermilk Rusks', description: 'Traditional oven-dried buttermilk rusks, perfect with coffee.', price: 65, icon: '🥖', category: 'Rusks' },
  { id: 'rusk-aniseed', name: 'Aniseed Rusks', description: 'A classic favourite with a hint of aniseed.', price: 65, icon: '🥖', category: 'Rusks' },
  { id: 'rusk-muesli', name: 'Muesli & Seed Rusks', description: 'Wholesome rusks packed with muesli and mixed seeds.', price: 70, icon: '🌾', category: 'Rusks' },
  { id: 'rusk-choc', name: 'Chocolate Rusks', description: 'Rich chocolate rusks for the sweet tooth.', price: 70, icon: '🍫', category: 'Rusks' },
  { id: 'cookie-oatmeal', name: 'Oatmeal Cookies', description: 'Soft-baked oatmeal cookies, lightly spiced.', price: 45, icon: '🍪', category: 'Cookies' },
  { id: 'cookie-chocchip', name: 'Choc-Chip Cookies', description: 'A house favourite, loaded with chocolate chips.', price: 45, icon: '🍪', category: 'Cookies' },
  { id: 'cookie-ginger', name: 'Ginger Biscuits', description: 'Crisp, spiced ginger biscuits.', price: 40, icon: '🫚', category: 'Cookies' },
  { id: 'cookie-coconut', name: 'Coconut Macaroons', description: 'Chewy coconut macaroons, freshly baked.', price: 50, icon: '🥥', category: 'Cookies' },
];

function renderProducts() {
  const grid = document.getElementById('product-grid');
  if (!grid) return;
  grid.innerHTML = PRODUCTS.map(p => `
    <div class="product-card">
      <div class="product-thumb">${p.icon}</div>
      <div class="product-body">
        <h3>${p.name}</h3>
        <p>${p.description}</p>
        <div class="product-footer">
          <span class="price">${formatR(p.price)}</span>
          <button class="add-btn" onclick='addToCart(${JSON.stringify({ id: p.id, name: p.name, price: p.price, icon: p.icon })})'>Add to Basket</button>
        </div>
      </div>
    </div>
  `).join('');
}

document.addEventListener('DOMContentLoaded', renderProducts);
