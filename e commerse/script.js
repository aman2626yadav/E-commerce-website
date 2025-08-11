// Mock API endpoint (Replace with your API endpoint)
const API_URL = 'https://fakestoreapi.com/products';

const productsContainer = document.getElementById('products');
const cartButton = document.getElementById('cartButton');
const cartModal = document.getElementById('cartModal');
const cartItemsContainer = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const closeModal = document.querySelector('.close');
const searchBar = document.getElementById('searchBar');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

let cart = [];
let productsData = []; // Store fetched products

// Fetch products from API
async function fetchProducts() {
    try {
        const response = await fetch(API_URL);
        const products = await response.json();
        productsData = products; // Store products for filtering
        displayProducts(productsData);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

// Display products on the page
function displayProducts(products) {
    productsContainer.innerHTML = ''; // Clear current products
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product');
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id}, '${product.title}', ${product.price})">Add to Cart</button>
        `;
        productsContainer.appendChild(productCard);
    });
}

// Add product to cart
function addToCart(id, title, price) {
    const item = cart.find(product => product.id === id);
    if (item) {
        item.quantity += 1;
    } else {
        cart.push({ id, title, price, quantity: 1 });
    }
    updateCartCount();
}

// Update cart item count
function updateCartCount() {
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
}

// Display cart items
function displayCart() {
    cartItemsContainer.innerHTML = '';
    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.title} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}`;
        cartItemsContainer.appendChild(listItem);
    });
    cartModal.classList.remove('hidden');
}

// Close cart modal
closeModal.addEventListener('click', () => {
    cartModal.classList.add('hidden');
});

// Toggle hamburger menu
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Filter products by search query
function filterProducts(query) {
    const filteredProducts = productsData.filter(product =>
        product.title.toLowerCase().includes(query.toLowerCase())
    );
    displayProducts(filteredProducts);
}

// Add event listener to search bar
searchBar.addEventListener('input', event => {
    const query = event.target.value;
    filterProducts(query);
});

// Show cart modal
cartButton.addEventListener('click', displayCart);

// Fetch products on page load
fetchProducts();
