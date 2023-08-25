const productsContainer = document.getElementById('products');
const collectionContainer = document.getElementById('collection');
const productDetailsContainer = document.getElementById('product-details');

let userCollection = JSON.parse(localStorage.getItem('userCollection')) || [];

async function fetchProducts() {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

function displayProducts(products) {
  productsContainer.innerHTML = '';

  products.forEach(product => {
    const productElement = document.createElement('div');
    productElement.classList.add('col-4', 'mb-4', 'product');
    productElement.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <div class="product-info">
        <h3 class="product-title">${product.title}</h3>
        <p class="product-price">$${product.price.toFixed(2)}</p>
      </div>
    `;

    productElement.addEventListener('click', () => displayProductDetails(product));
    productsContainer.appendChild(productElement);
  });
}

function displayCollection() {
  collectionContainer.innerHTML = '';

  userCollection.forEach(product => {
    const collectionItem = document.createElement('div');
    collectionItem.classList.add('collection-item');
    collectionItem.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <p>${product.title}</p>
    `;
    collectionItem.addEventListener('click', () => displayProductDetails(product));
    collectionContainer.appendChild(collectionItem);
  });
}

function displayProductDetails(product) {
  productDetailsContainer.innerHTML = `
    <h2>${product.title}</h2>
    <img src="${product.image}" alt="${product.title}">
    <p>Category: ${product.category}</p>
    <p>Description: ${product.description}</p>
    <p>Price: $${product.price.toFixed(2)}</p>
    <button id="addToCollection">Add to Collection</button>
  `;
  productDetailsContainer.style.display = 'block';

  const addToCollectionButton = document.getElementById('addToCollection');
  addToCollectionButton.addEventListener('click', () => addToCollection(product));
}

function addToCollection(product) {
  if (!userCollection.find(item => item.id === product.id)) {
    userCollection.push(product);
    localStorage.setItem('userCollection', JSON.stringify(userCollection));
    displayCollection();
  }
}

async function main() {
  const products = await fetchProducts();
  displayProducts(products);
  displayCollection();
}

main();
