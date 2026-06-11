// Dummy Product Data
const PRODUCTS = [
    { id: 1, name: "Handmade Scented Candle Set", price: 24.99, icon: "🕯️", desc: "Premium organic soy wax candles with essential oils." },
    { id: 2, name: "Customized Photo Leather Journal", price: 19.99, icon: "📔", desc: "Engraved genuine leather journal notebook." },
    { id: 3, name: "Galaxy Glow Glass Orbs", price: 34.50, icon: "🔮", desc: "A mesmerizing miniature universe glowing via USB power." },
    { id: 4, name: "Luxury Chocolate Gift Box", price: 29.99, icon: "🍫", desc: "16 assortments of artisanal Swiss chocolates." },
    { id: 5, name: "Preserved Eternal Rose Bouquet", price: 45.00, icon: "🌹", desc: "Real roses treated to last up to 3 years without water." },
    { id: 6, name: "Cute Ceramic Mug Trio", price: 15.99, icon: "☕", desc: "Three custom minimalist animal themed stackable mugs." }
];

// App State
let cart = [];
let currentUser = null;

// On Initial Load
document.addEventListener("DOMContentLoaded", () => {
    loadProducts();
    updateCartUI();
});

// SPA routing helper
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
}

// Render product catalog
function loadProducts() {
    const container = document.getElementById('products-container');
    container.innerHTML = PRODUCTS.map(product => `
        <div class="product-card" onclick="openProductDetails(${product.id})">
            <div class="product-img">${product.icon}</div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <button class="btn" onclick="event.stopPropagation(); addToCart(${product.id})">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

// Product Details Modal Logic
function openProductDetails(id) {
    const product = PRODUCTS.find(p => p.id === id);
    const modal = document.getElementById('product-modal');
    const content = document.getElementById('modal-product-details');
    
    content.innerHTML = `
        <div class="modal-grid">
            <div class="product-img" style="font-size:6rem; height:250px;">${product.icon}</div>
            <div>
                <h2>${product.name}</h2>
                <p class="product-price" style="margin: 1rem 0;">$${product.price.toFixed(2)}</p>
                <p style="margin-bottom: 1.5rem; color:#718096;">${product.desc}</p>
                <button class="btn" onclick="addToCart(${product.id}); closeModal();">Add To Cart</button>
            </div>
        </div>
    `;
    modal.style.display = "flex";
}

function closeModal() {
    document.getElementById('product-modal').style.display = "none";
}

// Cart System Logics
function addToCart(id) {
    const product = PRODUCTS.find(p => p.id === id);
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCartUI();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
}

function updateCartUI() {
    // Nav count item update
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').innerText = totalCount;

    // Cart details page update
    const cartContainer = document.getElementById('cart-items-container');
    if(cart.length === 0) {
        cartContainer.innerHTML = `<p style="padding:2rem; text-align:center;">Your cart is empty.</p>`;
    } else {
        cartContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <small>$${item.price} x ${item.quantity}</small>
                </div>
                <div>
                    <span style="font-weight:600; margin-right:15px;">$${(item.price * item.quantity).toFixed(2)}</span>
                    <button class="remove-item-btn" onclick="removeFromCart(${item.id})"><i class="fas fa-trash"></i></button>
                </div>
            </div>
        `).join('');
    }

    // Totals Calculations
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('cart-subtotal').innerText = `$${subtotal.toFixed(2)}`;
    document.getElementById('cart-total').innerText = `$${subtotal.toFixed(2)}`;
}

// Order Processing Simulation
function processOrder() {
    if(cart.length === 0) {
        alert("Your cart is empty! Add items to place an order.");
        return;
    }
    if(!currentUser) {
        alert("Please login or register an account before checking out.");
        showPage('auth-page');
        return;
    }
    
    alert(`Thank you, ${currentUser}! Your order has been processed successfully. 🎉`);
    cart = [];
    updateCartUI();
    showPage('products-page');
}

// User Registration/Login System
function switchAuthMode(mode) {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const loginTab = document.getElementById('login-tab');
    const registerTab = document.getElementById('register-tab');

    if(mode === 'login') {
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
    } else {
        loginForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
        loginTab.classList.remove('active');
        registerTab.classList.add('active');
    }
}

function handleAuth(event, type) {
    event.preventDefault();
    const form = event.target;
    const email = form.querySelector('input[type="email"]').value;
    
    // Simulating authentication context
    currentUser = email.split('@')[0]; // Grabbing handle name
    document.getElementById('auth-nav-btn').innerText = `Hi, ${currentUser}`;
    
    alert(`${type === 'login' ? 'Logged in' : 'Registered'} successfully as ${currentUser}!`);
    form.reset();
    showPage('products-page');
}