fetch('products.json')
  .then(response => response.json())
  .then(products => {
    const container = document.getElementById('product-container');
    products.forEach(product => {
      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <p class="price">${product.price}</p>
      `;
      container.appendChild(card);
    });
  })
  .catch(error => {
    console.error('Failed to load products:', error);
  });
