/* ===== Sonja se Huis Kombuis — product list (edit prices/items here) ===== */

const PRODUCTS = [
  { id: 'crunchies', name: 'Crunchies', unit: '1 Dozen', description: 'Home-baked crunchies, sold per dozen.', price: 35, icon: '🍪', photo: 'assets/products/crunchies.jpg', category: 'Cookies' },
  { id: 'gemmerkoekies', name: 'Ginger Cookies', unit: '1 Dozen', description: 'Classic spiced ginger cookies, sold per dozen.', price: 35, icon: '🍪', photo: 'assets/products/gemmerkoekies.jpg', category: 'Cookies' },
  { id: 'vlakoekies', name: 'Custard Cookies', unit: '1 Dozen', description: 'Soft custard-cream sandwich cookies, sold per dozen.', price: 50, icon: '🍪', photo: 'assets/products/vlakoekies.jpg', category: 'Cookies' },
  { id: 'kondensmelkkoekies', name: 'Condensed Milk Cookies', unit: '1 Dozen', description: 'Rich condensed milk cookies, sold per dozen.', price: 55, icon: '🍪', photo: 'assets/products/kondensmelkkoekies.jpg', category: 'Cookies' },
  { id: 'romany-creamkoekies', name: 'Romany Cream Cookies', unit: '1 Dozen', description: 'Chocolate-cream filled Romany creams, sold per dozen.', price: 55, icon: '🍪', photo: 'assets/products/romany-creamkoekies.jpg', category: 'Cookies' },
  { id: 'karringmelkbeskuit', name: 'Buttermilk Rusks', unit: 'Bag', description: 'Traditional oven-dried buttermilk rusks.', price: 65, icon: '🥖', photo: 'assets/products/karringmelkbeskuit.jpg', category: 'Rusks' },
  { id: 'growwe-bosbessiebeskuit', name: 'Coarse Blueberry Rusks', unit: 'Bag', description: 'Hearty rusks packed with blueberries.', price: 78, icon: '🥖', photo: 'assets/products/growwe-bosbessiebeskuit.jpg', category: 'Rusks' },
];

function productCardHTML(p) {
  return `
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
  `;
}

function renderProducts() {
  const grid = document.getElementById('product-grid');
  if (grid) grid.innerHTML = PRODUCTS.map(productCardHTML).join('');

  const featured = document.getElementById('featured-grid');
  if (featured) {
    const ids = ['karringmelkbeskuit', 'gemmerkoekies', 'romany-creamkoekies', 'growwe-bosbessiebeskuit'];
    const items = ids.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);
    featured.innerHTML = items.map(productCardHTML).join('');
  }
}

document.addEventListener('DOMContentLoaded', renderProducts);
