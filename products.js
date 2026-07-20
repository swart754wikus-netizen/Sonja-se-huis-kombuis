/* ===== Sonja se Huis Kombuis — product list (edit prices/items here) ===== */

const PRODUCTS = [
  { id: 'crunchies', name: 'Crunchies', unit: '1 Dosyn', description: 'Home-baked crunchies, sold per dozen.', price: 35, icon: '🍪', category: 'Koekies' },
  { id: 'gemmerkoekies', name: 'Gemmerkoekies', unit: '1 Dosyn', description: 'Ginger cookies, sold per dozen.', price: 35, icon: '🍪', category: 'Koekies' },
  { id: 'koffiekoekies', name: 'Koffiekoekies', unit: '1 Dosyn', description: 'Coffee cookies, sold per dozen.', price: 40, icon: '🍪', category: 'Koekies' },
  { id: 'vlakoekies', name: 'Vlakoekies', unit: '1 Dosyn', description: 'Custard cookies, sold per dozen.', price: 50, icon: '🍪', category: 'Koekies' },
  { id: 'kondensmelkkoekies', name: 'Kondensmelkkoekies', unit: '1 Dosyn', description: 'Condensed milk cookies, sold per dozen.', price: 55, icon: '🍪', category: 'Koekies' },
  { id: 'romany-creamkoekies', name: 'Romany Creamkoekies', unit: '1 Dosyn', description: 'Romany cream cookies, sold per dozen.', price: 55, icon: '🍪', category: 'Koekies' },
  { id: 'karringmelkbeskuit', name: 'Karringmelkbeskuit', unit: null, description: 'Traditional buttermilk rusks.', price: 65, icon: '🥖', category: 'Beskuit' },
  { id: 'growwe-bosbessiebeskuit', name: 'Growwe Bosbessiebeskuit', unit: null, description: 'Coarse blueberry rusks.', price: 78, icon: '🥖', category: 'Beskuit' },
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
          <span class="price-wrap">
            <span class="price">${formatR(p.price)}</span>
            ${p.unit ? `<span class="unit">per ${p.unit}</span>` : ''}
          </span>
          <button class="add-btn" onclick='addToCart(${JSON.stringify({ id: p.id, name: p.name, price: p.price, icon: p.icon })})'>Add to Basket</button>
        </div>
      </div>
    </div>
  `).join('');
}

document.addEventListener('DOMContentLoaded', renderProducts);
