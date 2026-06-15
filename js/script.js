/**
 * Gift Shop Application Script
 * 
 * This file handles:
 * 1. Product Database (with Category & Subcategory tags)
 * 2. Shopping Cart System (backed by LocalStorage)
 * 3. Page Routing (for SPA pages on the Homepage)
 * 4. Header Search Bar (Live filtering, multi-field matching, text highlighting)
 * 5. Category page dynamic rendering and filter pills
 */

// Product Dataset containing general and specific categories of gifts
const PRODUCTS = [
    // Existing base products (tagged for category/subcategory mapping)
    { id: 1, name: "Handmade Scented Candle Set", price: 24.99, icon: "🕯️", desc: "Premium organic soy wax candles with essential oils.", category: "trending", subcategory: "Best Sellers" },
    { id: 2, name: "Customized Photo Leather Journal", price: 19.99, icon: "📔", desc: "Engraved genuine leather journal notebook.", category: "customized", subcategory: "Name Gifts" },
    { id: 3, name: "Galaxy Glow Glass Orbs", price: 34.50, icon: "🔮", desc: "A mesmerizing miniature universe glowing via USB power.", category: "trending", subcategory: "Best Sellers" },
    { id: 4, name: "Luxury Chocolate Gift Box", price: 29.99, icon: "🍫", desc: "16 assortments of artisanal Swiss chocolates.", category: "trending", subcategory: "Most Loved Gifts" },
    { id: 5, name: "Preserved Eternal Rose Bouquet", price: 45.00, icon: "🌹", desc: "Real roses treated to last up to 3 years without water.", category: "relationship", subcategory: "For Wife" },
    { id: 6, name: "Cute Ceramic Mug Trio", price: 15.99, icon: "☕", desc: "Three custom minimalist animal themed stackable mugs.", category: "trending", subcategory: "Most Loved Gifts" },

    // Core Sample Products requested by user
    { id: 101, name: "Photo Mug", price: 14.99, icon: "☕", desc: "A customizable ceramic mug printed with your favorite memory.", category: "customized", subcategory: "Photo Mugs" },
    { id: 102, name: "Personalized Keychain", price: 9.99, icon: "🔑", desc: "Engraved metal keychain with custom name or initials.", category: "customized", subcategory: "Custom Keychains" },
    { id: 103, name: "Teddy Bear", price: 18.50, icon: "🧸", desc: "Soft, cuddly teddy bear perfect to express comfort and love.", category: "emotion", subcategory: "Get Well Soon Gifts" },
    { id: 104, name: "Travel Kit", price: 34.99, icon: "🧳", desc: "Premium travel accessories set including passport cover and organizer.", category: "personality", subcategory: "For Travelers" },
    { id: 105, name: "Coffee Hamper", price: 42.00, icon: "☕", desc: "Curated selection of single-origin coffee beans, mug, and cookies.", category: "personality", subcategory: "For Coffee Lovers" },
    { id: 106, name: "Festival Gift Hamper", price: 49.99, icon: "🎉", desc: "Deluxe holiday sweets, snacks, and lights combination.", category: "festival", subcategory: "New Year Gifts" },
    { id: 107, name: "Chocolate Gift Box", price: 25.00, icon: "🍫", desc: "Decadent box of fine milk and dark chocolate truffles.", category: "trending", subcategory: "Best Sellers" },

    // Relationship Page Products
    { id: 7, name: "Best Mom Ever Hand-painted Mug", price: 18.90, icon: "☕", desc: "A charming, hand-glazed ceramic mug crafted specifically for moms.", category: "relationship", subcategory: "For Mom" },
    { id: 8, name: "Preserved Orchid Gift Set", price: 42.00, icon: "🌸", desc: "Exquisite preserved orchids in a premium glass bell jar.", category: "relationship", subcategory: "For Mom" },
    { id: 9, name: "Gold Heart Pendant Necklace", price: 65.00, icon: "💖", desc: "18k gold-plated heart necklace that symbolizes pure love.", category: "relationship", subcategory: "For Mom" },
    { id: 10, name: "Engraved Leather Wallet", price: 28.50, icon: "💼", desc: "Slim genuine leather wallet engraved with a personal message.", category: "relationship", subcategory: "For Dad" },
    { id: 11, name: "Premium Beard Grooming Kit", price: 32.00, icon: "🧔", desc: "Organic beard oils, wooden comb, and stainless steel scissors.", category: "relationship", subcategory: "For Dad" },
    { id: 12, name: "Wooden Smart Docking Station", price: 38.00, icon: "📱", desc: "Keep watch, keys, wallet, and phone organized on his desk.", category: "relationship", subcategory: "For Dad" },
    { id: 13, name: "RGB Gaming Headset Stand", price: 24.99, icon: "🎧", desc: "Sleek aluminum stand with customizable underglow options.", category: "relationship", subcategory: "For Brother" },
    { id: 14, name: "Adventure Canvas Backpack", price: 45.99, icon: "🎒", desc: "Rugged, water-resistant canvas pack perfect for daily commute.", category: "relationship", subcategory: "For Brother" },
    { id: 15, name: "Self-Care Spa Bath Basket", price: 49.90, icon: "🧼", desc: "Includes aromatic bath bombs, body scrubs, and plush towel.", category: "relationship", subcategory: "For Sister" },
    { id: 16, name: "Custom Name Script Necklace", price: 29.99, icon: "📿", desc: "Elegantly scripted stainless steel name necklace.", category: "relationship", subcategory: "For Sister" },
    { id: 17, name: "Friendship Photo Collage Frame", price: 22.00, icon: "🖼️", desc: "Displays 5 of your favorite moments together with custom text.", category: "relationship", subcategory: "For Best Friend" },
    { id: 18, name: "Aura Color-Changing Lamp", price: 35.00, icon: "💡", desc: "Touch-activated color changing ambiance light.", category: "relationship", subcategory: "For Best Friend" },
    { id: 19, name: "Silk Pajama Lounge Set", price: 55.00, icon: "👚", desc: "Ultra-comfortable mulberry silk sleepwear set.", category: "relationship", subcategory: "For Wife" },
    { id: 20, name: "Fossil Chronograph Watch", price: 120.00, icon: "⌚", desc: "Classic stainless steel watch with timeless style.", category: "relationship", subcategory: "For Husband" },
    { id: 21, name: "Engraved Whiskey Decanter Set", price: 68.00, icon: "🥃", desc: "Premium crystal decanter with 2 matching glasses.", category: "relationship", subcategory: "For Husband" },

    // Personality Page Products
    { id: 22, name: "Premium Oak Book Nook Insert", price: 45.00, icon: "📚", desc: "An architectural miniature shelf divider with warm LED lights.", category: "personality", subcategory: "For Book Lovers" },
    { id: 23, name: "Embossed Leather Bookmarks", price: 12.99, icon: "🔖", desc: "Hand-tooled full-grain leather bookmarks, set of 3.", category: "personality", subcategory: "For Book Lovers" },
    { id: 24, name: "Ergonomic Mechanical Keyboard", price: 89.00, icon: "⌨️", desc: "Hot-swappable tactile keys with gorgeous RGB backlighting.", category: "personality", subcategory: "For Gamers" },
    { id: 25, name: "Classic Retro Arcade Mini Cabinet", price: 99.00, icon: "🕹️", desc: "Play 200 built-in retro games on a crisp 3-inch LCD screen.", category: "personality", subcategory: "For Gamers" },
    { id: 26, name: "Scratch-off World Map Poster", price: 19.99, icon: "🗺️", desc: "Track your journeys by scratching away the gold foil layer.", category: "personality", subcategory: "For Travelers" },
    { id: 27, name: "Monogrammed Passport Holder", price: 24.50, icon: "🛄", desc: "Handcrafted leather cover with handy card slots.", category: "personality", subcategory: "For Travelers" },
    { id: 28, name: "Smart Water Bottle", price: 39.99, icon: "💧", desc: "Reminds you to drink water and sterilizes using UV-C light.", category: "personality", subcategory: "For Fitness Lovers" },
    { id: 29, name: "Deep Tissue Massage Gun", price: 79.99, icon: "🔋", desc: "Includes 6 dynamic massage heads for targeted muscle relief.", category: "personality", subcategory: "For Fitness Lovers" },
    { id: 30, name: "Smart Temperature Control Mug", price: 95.00, icon: "🥛", desc: "Keeps your brew at the perfect temperature all day.", category: "personality", subcategory: "For Coffee Lovers" },
    { id: 31, name: "Artisanal Coffee Bean Sampler", price: 34.00, icon: "☕", desc: "Six different whole bean single-origin coffees from global roasters.", category: "personality", subcategory: "For Coffee Lovers" },
    { id: 32, name: "Vintage Bluetooth Turntable", price: 110.00, icon: "📻", desc: "Classic suitcase record player with high-fidelity stereo speakers.", category: "personality", subcategory: "For Music Lovers" },
    { id: 33, name: "Guitar Pick Punch Kit", price: 18.50, icon: "🎸", desc: "Punch your own custom guitar picks from old credit cards.", category: "personality", subcategory: "For Music Lovers" },

    // Emotion Page Products
    { id: 34, name: "Grateful Heart Succulent Garden", price: 29.99, icon: "🪴", desc: "A beautifully arranged pot of live micro-succulents.", category: "emotion", subcategory: "Thank You Gifts" },
    { id: 35, name: "Thank You Scented Soy Candle", price: 18.00, icon: "🕯️", desc: "Lavender and vanilla infused therapeutic candle.", category: "emotion", subcategory: "Thank You Gifts" },
    { id: 36, name: "Sweet Apology Chocolate Box", price: 22.00, icon: "🍫", desc: "Assortment of dark truffles spell-out 'SORRY' in style.", category: "emotion", subcategory: "Sorry Gifts" },
    { id: 37, name: "Handmade Lavender Mist Duo", price: 16.90, icon: "🧴", desc: "Calming essential oil sprays to soothe and refresh.", category: "emotion", subcategory: "Sorry Gifts" },
    { id: 38, name: "Four-Leaf Clover Silver Keychain", price: 12.00, icon: "🍀", desc: "Real dried four-leaf clover encased in a resin keychain.", category: "emotion", subcategory: "Good Luck Gifts" },
    { id: 39, name: "Amethyst Feng Shui Gem Tree", price: 34.99, icon: "🌲", desc: "Brings positive energy, prosperity, and focus to your room.", category: "emotion", subcategory: "Good Luck Gifts" },
    { id: 40, name: "Pop the Bubbly Champagne Flutes", price: 39.00, icon: "🥂", desc: "Hand-blown crystal glasses with gold-dipped bases.", category: "emotion", subcategory: "Congratulations Gifts" },
    { id: 41, name: "Gourmet Celebration Snack Hamper", price: 55.00, icon: "🧺", desc: "Filled with cheeses, crackers, olives, and premium nuts.", category: "emotion", subcategory: "Congratulations Gifts" },
    { id: 42, name: "Cozy Fleece & Fuzzy Socks Set", price: 35.00, icon: "🧦", desc: "Luxuriously soft blanket paired with thermal crew socks.", category: "emotion", subcategory: "Get Well Soon Gifts" },
    { id: 43, name: "Eucalyptus Therapeutic Bath Salts", price: 19.99, icon: "🧂", desc: "Mineral-rich sea salts blended with pure essential oils.", category: "emotion", subcategory: "Get Well Soon Gifts" },

    // Festival Page Products
    { id: 44, name: "Premium Handcrafted Clay Diyas", price: 15.00, icon: "🪔", desc: "Set of 6 hand-painted terracotta lamps for home decoration.", category: "festival", subcategory: "Diwali Gifts" },
    { id: 45, name: "Artisanal Sweets & Dry Fruit Box", price: 39.90, icon: "🍬", desc: "Traditional luxury festive sweet treats assortment.", category: "festival", subcategory: "Diwali Gifts" },
    { id: 46, name: "Custom Holiday Monogram Stocking", price: 14.99, icon: "🧦", desc: "Embroidered felt stocking with festive reindeer patterns.", category: "festival", subcategory: "Christmas Gifts" },
    { id: 47, name: "Gourmet Hot Chocolate Bomb Kit", price: 24.00, icon: "☕", desc: "Four chocolate bombs packed with marshmallows.", category: "festival", subcategory: "Christmas Gifts" },
    { id: 48, name: "Premium Goal Planner & Pen Set", price: 29.99, icon: "📓", desc: "2027 daily planner with faux-leather cover and ballpoint pen.", category: "festival", subcategory: "New Year Gifts" },
    { id: 49, name: "925 Silver Rakhi Combo Set", price: 18.00, icon: "🎗️", desc: "Elegantly designed silver thread Rakhi with roli-chawal pack.", category: "festival", subcategory: "Raksha Bandhan Gifts" },
    { id: 50, name: "Traditional Mango Leaf Brass Toran", price: 32.50, icon: "🍃", desc: "Auspicious door decoration set for Ugadi and new beginnings.", category: "festival", subcategory: "Ugadi Gifts" },

    // Customized Page Products
    { id: 51, name: "Engraved Wooden Photo Frame", price: 24.90, icon: "🖼️", desc: "Solid pine wood frame engraved with your chosen date/quote.", category: "customized", subcategory: "Photo Frames" },
    { id: 52, name: "Led-Lighted Acrylic Photo Stand", price: 34.00, icon: "💡", desc: "Custom photo printed on clear acrylic with a wooden LED base.", category: "customized", subcategory: "Photo Frames" },
    { id: 53, name: "Magic Heat-Sensitive Photo Mug", price: 16.99, icon: "☕", desc: "Add hot liquid to reveal your secret custom photo print.", category: "customized", subcategory: "Photo Mugs" },
    { id: 54, name: "Custom Name Ceramic Coffee Mug", price: 14.50, icon: "🥛", desc: "Minimalist ceramic mug with custom calligraphy lettering.", category: "customized", subcategory: "Photo Mugs" },
    { id: 55, name: "Engraved Handwriting Keychain", price: 14.99, icon: "🔑", desc: "Stainless steel key tag engraved with your actual handwriting.", category: "customized", subcategory: "Custom Keychains" },
    { id: 56, name: "Leather Photo Filmstrip Keychain", price: 19.99, icon: "🎞️", desc: "Pocket leather sleeve containing a pull-out photos strip.", category: "customized", subcategory: "Custom Keychains" },
    { id: 57, name: "Personalized Portrait Embroidered Tee", price: 39.00, icon: "👕", desc: "Send in a photo, get a custom line-art embroidery shirt.", category: "customized", subcategory: "Custom T-Shirts" },
    { id: 58, name: "Custom Wooden Name Decor Sign", price: 29.99, icon: "🪵", desc: "Laser-cut script name decoration for bedroom wall or door.", category: "customized", subcategory: "Name Gifts" }
];

// Subcategory definitions for category page generation
const SUBCATEGORIES = {
    relationship: ["For Mom", "For Dad", "For Brother", "For Sister", "For Best Friend", "For Wife", "For Husband"],
    personality: ["For Book Lovers", "For Gamers", "For Travelers", "For Fitness Lovers", "For Coffee Lovers", "For Music Lovers"],
    emotion: ["Thank You Gifts", "Sorry Gifts", "Good Luck Gifts", "Congratulations Gifts", "Get Well Soon Gifts"],
    festival: ["Diwali Gifts", "Christmas Gifts", "New Year Gifts", "Raksha Bandhan Gifts", "Ugadi Gifts"],
    customized: ["Photo Frames", "Photo Mugs", "Custom Keychains", "Custom T-Shirts", "Name Gifts"],
    trending: ["Best Sellers", "Most Loved Gifts", "New Arrivals", "Top Rated Gifts"]
};

// Global Application State variables
let cart = [];
let currentUser = null;
let activeSearchQuery = ""; // Tracks the user's active search query

// Run initialization code once the page DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    loadCartAndSession();
    
    // Check if we are currently on the homepage (which contains products-container)
    const isHomePage = document.getElementById('products-container') !== null;
    
    if (isHomePage) {
        loadProducts();
        handleURLParams();
    } else {
        // We are on a specific category subpage
        initCategoryPage();
    }
    
    updateCartUI();
});

// Load Cart list and User Session values from the browser's LocalStorage
function loadCartAndSession() {
    const savedCart = localStorage.getItem('giftshop_cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
    
    const savedUser = localStorage.getItem('giftshop_user');
    if (savedUser) {
        currentUser = savedUser;
        const navBtn = document.getElementById('auth-nav-btn');
        if (navBtn) {
            navBtn.innerText = `Hi, ${currentUser}`;
        }
    }
}

// Write the current cart array to LocalStorage to maintain consistency across reloads
function saveCart() {
    localStorage.setItem('giftshop_cart', JSON.stringify(cart));
}

// Handle query parameters (e.g. index.html?page=cart) for cross-page redirection
function handleURLParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const pageParam = urlParams.get('page');
    if (pageParam === 'cart') {
        showPage('cart-page');
    } else if (pageParam === 'auth') {
        showPage('auth-page');
    } else {
        showPage('products-page');
    }
}

// SPA routing helper (Used on index.html to toggle section tabs)
function showPage(pageId) {
    const pageElement = document.getElementById(pageId);
    if (!pageElement) return;
    
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    pageElement.classList.add('active');
    
    // Clean up query parameters from the browser address bar
    window.history.pushState({}, document.title, window.location.pathname);
}

/**
 * Text Highlight Utility
 * Wraps characters matching the search query with <mark class="highlight"> elements.
 * Preserves case-sensitivity of the original source text.
 */
function highlightText(text, query) {
    if (!query) return text;
    // Escape regex boundary characters
    const escapedQuery = query.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(`(${escapedQuery})`, 'gi');
    return text.replace(regex, `<mark class="highlight">$1</mark>`);
}

/**
 * Instant Search Input Handler
 * Fired as the user types in the header search input field.
 * Synchronizes inputs and filters the DOM grid dynamically.
 */
window.handleSearch = function(query) {
    activeSearchQuery = query.trim();
    
    // Sync all header search inputs across the DOM
    document.querySelectorAll('.search-input').forEach(input => {
        if (input.value !== query) {
            input.value = query;
        }
    });

    const isHomePage = document.getElementById('products-container') !== null;
    if (isHomePage) {
        // Automatically switch back to catalog view to show search results
        showPage('products-page');
        loadProducts();
    } else {
        const category = document.body.getAttribute('data-category');
        const activePill = document.querySelector('.subcategory-pill.active');
        const activeSubcategory = activePill ? activePill.innerText.trim() : null;
        filterCategoryProducts(category, activeSubcategory);
    }
}

// Render the homepage products catalog with optional search query filter
function loadProducts() {
    const container = document.getElementById('products-container');
    if (!container) return;
    
    // Filter matching results in Name, Description, Category, or Subcategory
    const filtered = PRODUCTS.filter(product => {
        const query = activeSearchQuery.toLowerCase();
        return (
            product.name.toLowerCase().includes(query) ||
            product.desc.toLowerCase().includes(query) ||
            (product.category && product.category.toLowerCase().includes(query)) ||
            (product.subcategory && product.subcategory.toLowerCase().includes(query))
        );
    });

    // Fallback: If no products matched, show beginner-friendly error block
    if (filtered.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 4rem 2rem; color: #a0aec0;">
                <span style="font-size: 3.5rem; display: block; margin-bottom: 1rem;">🔍</span>
                <h3 style="color: var(--secondary-color); font-size: 1.4rem; font-weight: 700;">No products found</h3>
                <p style="font-size: 0.95rem; margin-top: 0.5rem;">We couldn't find any gifts matching "${activeSearchQuery}". Please try checking your spelling or search terms!</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = filtered.map(product => {
        // Highlight matching characters in product title
        const highlightedName = highlightText(product.name, activeSearchQuery);
        return `
            <div class="product-card" onclick="openProductDetails(${product.id})">
                <div class="product-img">${product.icon}</div>
                <div class="product-info">
                    <h3 class="product-title">${highlightedName}</h3>
                    <p class="product-price">$${product.price.toFixed(2)}</p>
                    <button class="btn" onclick="event.stopPropagation(); addToCart(${product.id})">Add to Cart</button>
                </div>
            </div>
        `;
    }).join('');
}

// Initialize Category Subpage tabs and layouts
function initCategoryPage() {
    const category = document.body.getAttribute('data-category');
    if (!category || !SUBCATEGORIES[category]) return;
    
    const subcats = SUBCATEGORIES[category];
    const navContainer = document.getElementById('subcategories-container');
    
    if (navContainer) {
        // Render subcategory tabs
        navContainer.innerHTML = subcats.map((sub, index) => `
            <button class="subcategory-pill ${index === 0 ? 'active' : ''}" onclick="selectSubcategory('${category}', '${sub}', this)">
                ${sub}
            </button>
        `).join('');
    }
    
    // Load products of the first subcategory by default
    if (subcats.length > 0) {
        filterCategoryProducts(category, subcats[0]);
    }
}

// Click Handler for Subcategory selection
function selectSubcategory(category, subcategory, element) {
    // Update active pill styling
    document.querySelectorAll('.subcategory-pill').forEach(pill => {
        pill.classList.remove('active');
    });
    element.classList.add('active');
    
    // Trigger fade-in refresh animation
    const gridContainer = document.getElementById('category-products-container');
    if (gridContainer) {
        gridContainer.classList.remove('animate-fade-in');
        void gridContainer.offsetWidth; // Reflow reset
        gridContainer.classList.add('animate-fade-in');
    }
    
    filterCategoryProducts(category, subcategory);
}

// Filter and render products for category subpages
function filterCategoryProducts(category, subcategory) {
    const container = document.getElementById('category-products-container');
    if (!container) return;
    
    // Filter matching products by category, active subcategory, and header search query
    const filtered = PRODUCTS.filter(product => {
        const matchesCategory = product.category === category;
        const matchesSubcategory = subcategory ? product.subcategory === subcategory : true;
        
        const query = activeSearchQuery.toLowerCase();
        const matchesSearch = 
            product.name.toLowerCase().includes(query) ||
            product.desc.toLowerCase().includes(query) ||
            (product.subcategory && product.subcategory.toLowerCase().includes(query));
            
        return matchesCategory && matchesSubcategory && matchesSearch;
    });
    
    // Fallback: If no products matched, show beginner-friendly error block
    if (filtered.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 4rem 2rem; color: #a0aec0;">
                <span style="font-size: 3.5rem; display: block; margin-bottom: 1rem;">🔍</span>
                <h3 style="color: var(--secondary-color); font-size: 1.4rem; font-weight: 700;">No products found</h3>
                <p style="font-size: 0.95rem; margin-top: 0.5rem;">No gifts match "${activeSearchQuery}" in this subcategory.</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = filtered.map(product => {
        // Highlight matching characters in product title
        const highlightedName = highlightText(product.name, activeSearchQuery);
        return `
            <div class="product-card" onclick="openProductDetails(${product.id})">
                <div class="product-img">${product.icon}</div>
                <div class="product-info">
                    <h3 class="product-title">${highlightedName}</h3>
                    <p class="product-price">$${product.price.toFixed(2)}</p>
                    <button class="btn" onclick="event.stopPropagation(); addToCart(${product.id})">Add to Cart</button>
                </div>
            </div>
        `;
    }).join('');
}

// Open modal showing complete description of the selected product
function openProductDetails(id) {
    const product = PRODUCTS.find(p => p.id === id);
    if (!product) return;
    
    const modal = document.getElementById('product-modal');
    const content = document.getElementById('modal-product-details');
    if (!modal || !content) return;
    
    content.innerHTML = `
        <div class="modal-grid">
            <div class="product-img" style="font-size:6rem; height:250px;">${product.icon}</div>
            <div>
                <h2 style="font-weight: 800; line-height: 1.2; color: var(--secondary-color);">${product.name}</h2>
                <p class="product-price" style="margin: 1rem 0; font-size: 1.5rem;">$${product.price.toFixed(2)}</p>
                <p style="margin-bottom: 1.5rem; color:#718096; line-height: 1.5;">${product.desc}</p>
                <button class="btn" onclick="addToCart(${product.id}); closeModal();">Add To Cart</button>
            </div>
        </div>
    `;
    modal.style.display = "flex";
}

// Close active product modal
function closeModal() {
    const modal = document.getElementById('product-modal');
    if (modal) {
        modal.style.display = "none";
    }
}

// Add a single quantity of product item to the shopping cart array
function addToCart(id) {
    const product = PRODUCTS.find(p => p.id === id);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    saveCart();
    updateCartUI();
    
    // Visual Toast confirmation notification popup
    showToast(`Added ${product.name} to cart! 🛒`);
}

// Completely remove a product type from the shopping cart array
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    updateCartUI();
}

// Refresh navigation cart badge count and home cart item summary views
function updateCartUI() {
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const countEl = document.getElementById('cart-count');
    if (countEl) {
        countEl.innerText = totalCount;
    }

    const cartContainer = document.getElementById('cart-items-container');
    if (cartContainer) {
        if (cart.length === 0) {
            cartContainer.innerHTML = `<p style="padding:2rem; text-align:center;">Your cart is empty.</p>`;
        } else {
            cartContainer.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <div class="cart-item-details">
                        <h4 style="font-weight: 700;">${item.name}</h4>
                        <small>$${item.price.toFixed(2)} x ${item.quantity}</small>
                    </div>
                    <div>
                        <span style="font-weight:600; margin-right:15px;">$${(item.price * item.quantity).toFixed(2)}</span>
                        <button class="remove-item-btn" onclick="removeFromCart(${item.id})"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
            `).join('');
        }
    }

    const subtotalEl = document.getElementById('cart-subtotal');
    const totalEl = document.getElementById('cart-total');
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    if (subtotalEl) subtotalEl.innerText = `$${subtotal.toFixed(2)}`;
    if (totalEl) totalEl.innerText = `$${subtotal.toFixed(2)}`;
}

// Process Order action check block
function processOrder() {
    if (cart.length === 0) {
        alert("Your cart is empty! Add items to place an order.");
        return;
    }
    if (!currentUser) {
        alert("Please login or register an account before checking out.");
        showPage('auth-page');
        return;
    }
    
    alert(`Thank you, ${currentUser}! Your order has been processed successfully. 🎉`);
    cart = [];
    saveCart();
    updateCartUI();
    showPage('products-page');
}

// Toggle authentication forms visual layouts
function switchAuthMode(mode) {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const loginTab = document.getElementById('login-tab');
    const registerTab = document.getElementById('register-tab');

    if (!loginForm || !registerForm) return;

    if (mode === 'login') {
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

// Authentication submit handle block
function handleAuth(event, type) {
    event.preventDefault();
    const form = event.target;
    const email = form.querySelector('input[type="email"]').value;
    
    currentUser = email.split('@')[0]; // Set username handle
    localStorage.setItem('giftshop_user', currentUser);
    
    const navBtn = document.getElementById('auth-nav-btn');
    if (navBtn) {
        navBtn.innerText = `Hi, ${currentUser}`;
    }
    
    alert(`${type === 'login' ? 'Logged in' : 'Registered'} successfully as ${currentUser}!`);
    form.reset();
    showPage('products-page');
}

// Display self-closing visual toast notification elements
function showToast(message) {
    let toast = document.getElementById('toast-notification');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast-notification';
        toast.style.position = 'fixed';
        toast.style.bottom = '20px';
        toast.style.right = '20px';
        toast.style.backgroundColor = '#2d3748';
        toast.style.color = '#ffffff';
        toast.style.padding = '0.8rem 1.5rem';
        toast.style.borderRadius = '8px';
        toast.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        toast.style.zIndex = '9999';
        toast.style.fontFamily = "'Outfit', sans-serif";
        toast.style.fontWeight = '500';
        toast.style.transition = 'all 0.3s ease';
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        document.body.appendChild(toast);
    }
    
    toast.innerText = message;
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
    }, 3000);
}