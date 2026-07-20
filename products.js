/* ===== Sonja se Huis Kombuis — product list (edit prices/items here) ===== */

const PRODUCTS = [
  { id: 'crunchies', name: 'Crunchies', unit: '1 Dosyn', description: 'Home-baked crunchies, sold per dozen.', price: 35, icon: '🍪', photo: 'assets/products/crunchies.jpg', category: 'Koekies' },
  { id: 'gemmerkoekies', name: 'Gemmerkoekies', unit: '1 Dosyn', description: 'Ginger cookies, sold per dozen.', price: 35, icon: '🍪', photo: 'assets/products/gemmerkoekies.jpg', category: 'Koekies' },
  { id: 'vlakoekies', name: 'Vlakoekies', unit: '1 Dosyn', description: 'Custard cookies, sold per dozen.', price: 50, icon: '🍪', photo: 'assets/products/vlakoekies.jpg', category: 'Koekies' },
  { id: 'kondensmelkkoekies', name: 'Kondensmelkkoekies', unit: '1 Dosyn', description: 'Condensed milk cookies, sold per dozen.', price: 55, icon: '🍪', photo: 'assets/products/kondensmelkkoekies.jpg', category: 'Koekies' },
  { id: 'romany-creamkoekies', name: 'Romany Creamkoekies', unit: '1 Dosyn', description: 'Romany cream cookies, sold per dozen.', price: 55, icon: '🍪', photo: 'assets/products/romany-creamkoekies.jpg', category: 'Koekies' },
  { id: 'karringmelkbeskuit', name: 'Karringmelkbeskuit', unit: null, description: 'Traditional buttermilk rusks.', price: 65, icon: '🥖', photo: 'assets/products/karringmelkbeskuit.jpg', category: 'Beskuit' },
  { id: 'growwe-bosbessiebeskuit', name: 'Growwe Bosbessiebeskuit', unit: null, description: 'Coarse blueberry rusks.', price: 78, icon: '🥖', photo: 'assets/products/growwe-bosbessiebeskuit.jpg', category: 'Beskuit' },
];

function renderProducts() {
  const grid = document.getElementById('product-grid');
  if (!grid) return;
  grid.innerHTML = PRODUCTS.map(p => `
    <div class="product-card">
      <div class="product-thumb">${p.photo ? `<img src="${p.photo}" alt="${p.name}" loading="lazy">` : p.icon}</div>
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
