// Products Data
const products = [
    {
        id: 1,
        name: "DONA Classic TurtleNeck",
        price: 56.99,
        originalPrice: 69.99,
        image: "https://images.unsplash.com/photo-1554568218-0f1715e72254?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        category: "clothing",
        size: "M",
        rating: 8.8,
        reviews: 124,
        badge: "Sale"
    },
    {
        id: 2,
        name: "JONES Tailored Shirt",
        price: 74.79,
        originalPrice: 89.99,
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        category: "clothing",
        size: "M",
        rating: 9.2,
        reviews: 89,
        badge: "Popular"
    },
    {
        id: 3,
        name: "Sleek Duffle Bag",
        price: 31.89,
        originalPrice: 39.99,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        category: "accessories",
        size: "22 x 10 x 9\"",
        rating: 8.3,
        reviews: 67,
        badge: null
    },
    {
        id: 4,
        name: "DONA Monk Strap Shoes",
        price: 56.99,
        originalPrice: 69.99,
        image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        category: "footwear",
        size: "43",
        rating: 8.5,
        reviews: 203,
        badge: "Best Seller"
    },
    {
        id: 5,
        name: "Premium Leather Jacket",
        price: 129.99,
        originalPrice: 159.99,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        category: "clothing",
        size: "L",
        rating: 9.5,
        reviews: 312,
        badge: "Premium"
    },
    {
        id: 6,
        name: "Classic Aviator Sunglasses",
        price: 45.50,
        originalPrice: 59.99,
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        category: "accessories",
        size: "One Size",
        rating: 8.9,
        reviews: 178,
        badge: "New"
    }
];

// Cart State
let cart = JSON.parse(localStorage.getItem('fitplug_cart')) || [];

// WhatsApp Number
const whatsappNumber = "233598446269";

// DOM Elements
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuClose = document.getElementById('mobileMenuClose');
const cartIcon = document.getElementById('cartIcon');
const cartModal = document.getElementById('cartModal');
const cartModalClose = document.getElementById('cartModalClose');
const cartItems = document.getElementById('cartItems');
const cartEmpty = document.getElementById('cartEmpty');
const cartFooter = document.getElementById('cartFooter');
const cartSubtotal = document.querySelector('.cart-subtotal');
const cartTotalAmount = document.querySelector('.cart-total-amount');
const cartCount = document.querySelector('.cart-count');
const checkoutWhatsAppBtn = document.getElementById('checkoutWhatsAppBtn');
const productsGrid = document.getElementById('productsGrid');

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initCart();
    renderProducts();
    updateCartUI();
    
    // Initialize cart from localStorage
    loadCartFromStorage();
});

// Mobile Menu Functionality
function initMobileMenu() {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    mobileMenuClose.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Close menu when clicking on a link
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
}

// Cart Functionality
function initCart() {
    // Open cart modal
    cartIcon.addEventListener('click', (e) => {
        e.preventDefault();
        cartModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    // Close cart modal
    cartModalClose.addEventListener('click', () => {
        cartModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Close cart modal when clicking outside
    cartModal.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Initialize checkout button
    checkoutWhatsAppBtn.addEventListener('click', (e) => {
        e.preventDefault();
        checkoutOnWhatsApp();
    });
}

// Render Products
function renderProducts() {
    if (!productsGrid) return;
    
    productsGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        const discount = product.originalPrice ? 
            Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
        
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                ${discount > 0 ? `<span class="product-badge" style="left:12px;right:auto;background-color:#ff3b30;">-${discount}%</span>` : ''}
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">GH₵ ${product.price.toFixed(2)}</div>
                <div class="product-meta">
                    <div class="product-rating">
                        <i class="fas fa-star" style="color:#f5c518;"></i>
                        <span>${product.rating}</span>
                        <span style="color:var(--dark-gray);margin-left:4px;">(${product.reviews})</span>
                    </div>
                    <div class="product-size">Size: ${product.size}</div>
                </div>
                <div class="product-actions">
                    <button class="btn btn-add-to-cart" data-product-id="${product.id}">
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                    <button class="btn btn-buy-now" data-product-id="${product.id}">
                        <i class="fab fa-whatsapp"></i> Buy Now
                    </button>
                </div>
            </div>
        `;
        
        productsGrid.appendChild(productCard);
    });
    
    // Add event listeners to product buttons
    document.querySelectorAll('.btn-add-to-cart').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-product-id'));
            addToCart(productId);
        });
    });
    
    document.querySelectorAll('.btn-buy-now').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-product-id'));
            buyNow(productId);
        });
    });
}

// Cart Functions
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Check if product already in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1,
            cartId: Date.now() // Unique ID for cart item
        });
    }
    
    updateCartUI();
    saveCartToStorage();
    showNotification(`${product.name} added to cart`);
}

function removeFromCart(cartId) {
    cart = cart.filter(item => item.cartId !== cartId);
    updateCartUI();
    saveCartToStorage();
}

function updateQuantity(cartId, change) {
    const item = cart.find(item => item.cartId === cartId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity < 1) {
        removeFromCart(cartId);
    } else {
        updateCartUI();
        saveCartToStorage();
    }
}

function updateCartUI() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart modal
    if (cart.length === 0) {
        cartEmpty.style.display = 'block';
        cartFooter.style.display = 'none';
        cartItems.innerHTML = '';
        cartItems.appendChild(cartEmpty);
    } else {
        cartEmpty.style.display = 'none';
        cartFooter.style.display = 'block';
        
        // Render cart items
        cartItems.innerHTML = '';
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${item.name}</h4>
                    <div class="cart-item-price">GH₵ ${(item.price * item.quantity).toFixed(2)}</div>
                    <div class="cart-item-meta">
                        <div class="cart-item-size">Size: ${item.size} • Qty: ${item.quantity}</div>
                        <div class="cart-item-actions">
                            <div class="quantity-btn" data-action="decrease" data-cart-id="${item.cartId}">-</div>
                            <span class="cart-item-quantity">${item.quantity}</span>
                            <div class="quantity-btn" data-action="increase" data-cart-id="${item.cartId}">+</div>
                            <div class="cart-item-remove" data-cart-id="${item.cartId}">
                                <i class="fas fa-trash"></i>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            cartItems.appendChild(cartItem);
        });
        
        // Add event listeners to cart item buttons
        document.querySelectorAll('.quantity-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const cartId = parseInt(this.getAttribute('data-cart-id'));
                const action = this.getAttribute('data-action');
                updateQuantity(cartId, action === 'increase' ? 1 : -1);
            });
        });
        
        document.querySelectorAll('.cart-item-remove').forEach(btn => {
            btn.addEventListener('click', function() {
                const cartId = parseInt(this.getAttribute('data-cart-id'));
                removeFromCart(cartId);
            });
        });
        
        // Update totals
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const delivery = 15.00;
        const total = subtotal + delivery;
        
        cartSubtotal.textContent = `GH₵ ${subtotal.toFixed(2)}`;
        cartTotalAmount.textContent = `GH₵ ${total.toFixed(2)}`;
    }
}

function buyNow(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Add to cart first
    addToCart(productId);
    
    // Generate WhatsApp message for this product
    const message = `Hi FitPlug! I'd like to order:\n\n• ${product.name}\n• Size: ${product.size}\n• Price: GH₵ ${product.price.toFixed(2)}\n\nPlease let me know how to proceed with payment and delivery.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
}

function checkoutOnWhatsApp() {
    if (cart.length === 0) return;
    
    // Generate order summary
    let orderSummary = `Hi FitPlug! I'd like to place an order:\n\n`;
    
    cart.forEach((item, index) => {
        orderSummary += `${index + 1}. ${item.name} (Size: ${item.size}) - Qty: ${item.quantity} - GH₵ ${(item.price * item.quantity).toFixed(2)}\n`;
    });
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const delivery = 15.00;
    const total = subtotal + delivery;
    
    orderSummary += `\nSubtotal: GH₵ ${subtotal.toFixed(2)}`;
    orderSummary += `\nDelivery: GH₵ ${delivery.toFixed(2)}`;
    orderSummary += `\nTotal: GH₵ ${total.toFixed(2)}`;
    orderSummary += `\n\nPlease provide payment options and delivery details.`;
    
    // Generate order reference
    const orderRef = `FP${Date.now().toString().slice(-8)}`;
    orderSummary += `\n\nOrder Reference: ${orderRef}`;
    
    // Track order in localStorage
    const order = {
        id: orderRef,
        date: new Date().toISOString(),
        items: [...cart],
        subtotal,
        delivery,
        total,
        status: 'pending'
    };
    
    // Save order to localStorage
    saveOrderToStorage(order);
    
    // Encode message for WhatsApp URL
    const encodedMessage = encodeURIComponent(orderSummary);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Clear cart after checkout
    cart = [];
    updateCartUI();
    saveCartToStorage();
    
    // Close cart modal
    cartModal.classList.remove('active');
    document.body.style.overflow = 'auto';
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Show confirmation
    showNotification(`Order ${orderRef} sent to WhatsApp!`, 'success');
}

// Storage Functions
function saveCartToStorage() {
    localStorage.setItem('fitplug_cart', JSON.stringify(cart));
}

function loadCartFromStorage() {
    const savedCart = localStorage.getItem('fitplug_cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartUI();
    }
}

function saveOrderToStorage(order) {
    const orders = JSON.parse(localStorage.getItem('fitplug_orders')) || [];
    orders.push(order);
    localStorage.setItem('fitplug_orders', JSON.stringify(orders));
}

// Utility Functions
function showNotification(message, type = 'info') {
    // Remove any existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    // Add styles for notification
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: var(--white);
            border-radius: var(--border-radius-sm);
            box-shadow: var(--box-shadow-lg);
            padding: 16px 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            max-width: 350px;
            z-index: 3000;
            transform: translateX(120%);
            animation: slideIn 0.3s forwards;
            border-left: 4px solid var(--accent-color);
        }
        
        .notification-success {
            border-left-color: #34c759;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 10px;
            flex: 1;
        }
        
        .notification-content i {
            font-size: 1.2rem;
        }
        
        .notification-success .notification-content i {
            color: #34c759;
        }
        
        .notification-close {
            background: none;
            border: none;
            font-size: 1rem;
            color: var(--dark-gray);
            cursor: pointer;
            margin-left: 15px;
        }
        
        @keyframes slideIn {
            to { transform: translateX(0); }
        }
        
        @keyframes slideOut {
            from { transform: translateX(0); }
            to { transform: translateX(120%); }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(notification);
    
    // Add close functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s forwards';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s forwards';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Search functionality
const searchInput = document.querySelector('.search-input');
if (searchInput) {
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        
        if (searchTerm.length < 2) {
            renderProducts();
            return;
        }
        
        // Filter products
        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm)
        );
        
        // Update products grid
        if (!productsGrid) return;
        
        productsGrid.innerHTML = '';
        
        if (filteredProducts.length === 0) {
            productsGrid.innerHTML = `
                <div class="no-results" style="grid-column:1/-1;text-align:center;padding:60px 20px;">
                    <i class="fas fa-search" style="font-size:3rem;color:var(--medium-gray);margin-bottom:20px;"></i>
                    <h3 style="margin-bottom:10px;">No products found</h3>
                    <p style="color:var(--text-light);">Try adjusting your search or filter</p>
                </div>
            `;
        } else {
            // Render filtered products
            filteredProducts.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                
                const discount = product.originalPrice ? 
                    Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
                
                productCard.innerHTML = `
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.name}" loading="lazy">
                        ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                        ${discount > 0 ? `<span class="product-badge" style="left:12px;right:auto;background-color:#ff3b30;">-${discount}%</span>` : ''}
                    </div>
                    <div class="product-info">
                        <h3 class="product-title">${product.name}</h3>
                        <div class="product-price">GH₵ ${product.price.toFixed(2)}</div>
                        <div class="product-meta">
                            <div class="product-rating">
                                <i class="fas fa-star" style="color:#f5c518;"></i>
                                <span>${product.rating}</span>
                                <span style="color:var(--dark-gray);margin-left:4px;">(${product.reviews})</span>
                            </div>
                            <div class="product-size">Size: ${product.size}</div>
                        </div>
                        <div class="product-actions">
                            <button class="btn btn-add-to-cart" data-product-id="${product.id}">
                                <i class="fas fa-shopping-cart"></i> Add to Cart
                            </button>
                            <button class="btn btn-buy-now" data-product-id="${product.id}">
                                <i class="fab fa-whatsapp"></i> Buy Now
                            </button>
                        </div>
                    </div>
                `;
                
                productsGrid.appendChild(productCard);
            });
            
            // Re-attach event listeners
            document.querySelectorAll('.btn-add-to-cart').forEach(btn => {
                btn.addEventListener('click', function() {
                    const productId = parseInt(this.getAttribute('data-product-id'));
                    addToCart(productId);
                });
            });
            
            document.querySelectorAll('.btn-buy-now').forEach(btn => {
                btn.addEventListener('click', function() {
                    const productId = parseInt(this.getAttribute('data-product-id'));
                    buyNow(productId);
                });
            });
        }
    });
}