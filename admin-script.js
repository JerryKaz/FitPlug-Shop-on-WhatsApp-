// Admin Panel JavaScript - Complete with Login, Dashboard, and All Features

// ============================
// CONFIGURATION
// ============================
const CONFIG = {
    ADMIN_USERNAME: 'jerrykaz',
    ADMIN_PASSWORD: '10310341',
    WHATSAPP_NUMBER: '233598446269',
    STORE_NAME: 'FitPlug',
    CURRENCY: 'GH₵',
    ITEMS_PER_PAGE: 10
};

// ============================
// DATA STORAGE
// ============================
let storeData = {
    products: [],
    orders: [],
    customers: [],
    inventory: [],
    notifications: [],
    whatsappMessages: [],
    settings: {},
    analytics: {},
    currentUser: null,
    isLoggedIn: false
};

// Initialize with sample data
function initializeData() {
    // Load from localStorage or create default data
    const savedData = localStorage.getItem('fitplug_admin_data');
    
    if (savedData) {
        storeData = JSON.parse(savedData);
    } else {
        // Create sample data
        storeData.products = [
            {
                id: 1,
                name: "DONA Classic TurtleNeck",
                price: 56.99,
                originalPrice: 69.99,
                category: "clothing",
                sizes: ["S", "M", "L", "XL"],
                colors: ["Black", "Navy", "Gray"],
                stock: 24,
                sold: 142,
                rating: 4.2,
                reviews: 124,
                description: "Premium quality turtleneck made from 100% organic cotton.",
                images: ["https://images.unsplash.com/photo-1554568218-0f1715e72254?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"],
                status: "active",
                createdAt: "2023-11-15",
                sku: "FP001"
            },
            {
                id: 2,
                name: "JONES Tailored Shirt",
                price: 74.79,
                originalPrice: 89.99,
                category: "clothing",
                sizes: ["M", "L", "XL"],
                colors: ["White", "Blue", "Gray"],
                stock: 12,
                sold: 89,
                rating: 4.5,
                reviews: 89,
                description: "Premium tailored shirt for formal occasions.",
                images: ["https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"],
                status: "active",
                createdAt: "2023-11-20",
                sku: "FP002"
            },
            {
                id: 3,
                name: "Sleek Duffle Bag",
                price: 31.89,
                originalPrice: 39.99,
                category: "accessories",
                sizes: ["One Size"],
                colors: ["Black", "Navy", "Gray"],
                stock: 42,
                sold: 203,
                rating: 4.3,
                reviews: 67,
                description: "Durable and stylish duffle bag for everyday use.",
                images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"],
                status: "active",
                createdAt: "2023-10-15",
                sku: "FP003"
            },
            {
                id: 4,
                name: "DONA Monk Strap Shoes",
                price: 56.99,
                originalPrice: 69.99,
                category: "footwear",
                sizes: ["40", "41", "42", "43", "44"],
                colors: ["Brown", "Black"],
                stock: 8,
                sold: 56,
                rating: 4.7,
                reviews: 203,
                description: "Classic monk strap shoes made from genuine leather.",
                images: ["https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"],
                status: "active",
                createdAt: "2023-11-10",
                sku: "FP004"
            },
            {
                id: 5,
                name: "Premium Leather Jacket",
                price: 129.99,
                originalPrice: 159.99,
                category: "clothing",
                sizes: ["S", "M", "L", "XL"],
                colors: ["Black", "Brown"],
                stock: 5,
                sold: 32,
                rating: 4.9,
                reviews: 312,
                description: "Genuine leather jacket with premium stitching.",
                images: ["https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"],
                status: "active",
                createdAt: "2023-12-01",
                sku: "FP005"
            }
        ];

        storeData.orders = [
            {
                id: "FP12345678",
                customerId: 1,
                customerName: "Kwame Mensah",
                customerPhone: "+233551234567",
                customerEmail: "kwame@example.com",
                items: [
                    { productId: 1, name: "DONA Classic TurtleNeck", size: "M", color: "Black", quantity: 1, price: 56.99 },
                    { productId: 3, name: "Sleek Duffle Bag", size: "One Size", color: "Black", quantity: 1, price: 31.89 }
                ],
                subtotal: 88.88,
                delivery: 15.00,
                total: 103.88,
                status: "delivered",
                paymentMethod: "Mobile Money",
                paymentStatus: "paid",
                deliveryAddress: "123 Main St, Accra, Ghana",
                notes: "Leave at gate",
                createdAt: "2023-12-09 10:30:00",
                deliveredAt: "2023-12-10 14:15:00"
            },
            {
                id: "FP12345679",
                customerId: 2,
                customerName: "Ama Serwaa",
                customerPhone: "+233552345678",
                customerEmail: "ama@example.com",
                items: [
                    { productId: 2, name: "JONES Tailored Shirt", size: "M", color: "White", quantity: 1, price: 74.79 }
                ],
                subtotal: 74.79,
                delivery: 15.00,
                total: 89.79,
                status: "shipped",
                paymentMethod: "Card",
                paymentStatus: "paid",
                deliveryAddress: "456 Oak Ave, Kumasi, Ghana",
                notes: "",
                createdAt: "2023-12-09 09:15:00",
                shippedAt: "2023-12-09 16:30:00"
            },
            {
                id: "FP12345680",
                customerId: 3,
                customerName: "Kofi Ansah",
                customerPhone: "+233553456789",
                customerEmail: "kofi@example.com",
                items: [
                    { productId: 4, name: "DONA Monk Strap Shoes", size: "43", color: "Brown", quantity: 1, price: 56.99 },
                    { productId: 5, name: "Premium Leather Jacket", size: "L", color: "Black", quantity: 1, price: 129.99 }
                ],
                subtotal: 186.98,
                delivery: 15.00,
                total: 201.98,
                status: "confirmed",
                paymentMethod: "Cash on Delivery",
                paymentStatus: "pending",
                deliveryAddress: "789 Pine Rd, Takoradi, Ghana",
                notes: "Call before delivery",
                createdAt: "2023-12-08 14:45:00"
            }
        ];

        storeData.customers = [
            {
                id: 1,
                name: "Kwame Mensah",
                phone: "+233551234567",
                email: "kwame@example.com",
                totalOrders: 5,
                totalSpent: 450.50,
                lastOrder: "2023-12-09",
                joinDate: "2023-10-15",
                whatsapp: true
            },
            {
                id: 2,
                name: "Ama Serwaa",
                phone: "+233552345678",
                email: "ama@example.com",
                totalOrders: 3,
                totalSpent: 210.75,
                lastOrder: "2023-12-09",
                joinDate: "2023-11-05",
                whatsapp: true
            },
            {
                id: 3,
                name: "Kofi Ansah",
                phone: "+233553456789",
                email: "kofi@example.com",
                totalOrders: 2,
                totalSpent: 320.99,
                lastOrder: "2023-12-08",
                joinDate: "2023-11-20",
                whatsapp: false
            }
        ];

        storeData.notifications = [
            {
                id: 1,
                title: "New Order Received",
                message: "Order #FP12345680 from Kofi Ansah",
                type: "order",
                read: false,
                createdAt: "2023-12-08 14:45:00"
            },
            {
                id: 2,
                title: "Low Stock Alert",
                message: "Premium Leather Jacket is running low (5 left)",
                type: "inventory",
                read: false,
                createdAt: "2023-12-08 10:30:00"
            },
            {
                id: 3,
                title: "WhatsApp Message",
                message: "New message from Ama Serwaa",
                type: "whatsapp",
                read: true,
                createdAt: "2023-12-08 09:15:00"
            }
        ];

        storeData.whatsappMessages = [
            {
                id: 1,
                sender: "Kwame Mensah",
                phone: "+233551234567",
                message: "Hi, when will my order be delivered?",
                status: "read",
                replied: true,
                timestamp: "2023-12-09 10:30:00"
            },
            {
                id: 2,
                sender: "Ama Serwaa",
                phone: "+233552345678",
                message: "Do you have the shirt in blue color?",
                status: "read",
                replied: true,
                timestamp: "2023-12-09 09:45:00"
            },
            {
                id: 3,
                sender: "New Customer",
                phone: "+233554567890",
                message: "Hi, I'd like to place an order",
                status: "unread",
                replied: false,
                timestamp: "2023-12-09 09:15:00"
            }
        ];

        storeData.settings = {
            storeName: "FitPlug",
            currency: "GH₵",
            whatsappNumber: "233598446269",
            deliveryFee: 15.00,
            freeDeliveryThreshold: 100.00,
            taxRate: 0,
            notifications: true,
            lowStockThreshold: 10
        };

        saveData();
    }

    // Update badge counts
    updateBadgeCounts();
}

// Save data to localStorage
function saveData() {
    localStorage.setItem('fitplug_admin_data', JSON.stringify(storeData));
}

// Update badge counts
function updateBadgeCounts() {
    const productsCount = storeData.products.length;
    const ordersCount = storeData.orders.length;
    const customersCount = storeData.customers.length;
    const unreadMessages = storeData.whatsappMessages.filter(m => m.status === 'unread').length;
    const unreadNotifications = storeData.notifications.filter(n => !n.read).length;

    // Update badge elements if they exist
    if (document.getElementById('productsCount')) {
        document.getElementById('productsCount').textContent = productsCount;
    }
    if (document.getElementById('ordersCount')) {
        document.getElementById('ordersCount').textContent = ordersCount;
    }
    if (document.getElementById('customersCount')) {
        document.getElementById('customersCount').textContent = customersCount;
    }
    if (document.getElementById('whatsappCount')) {
        document.getElementById('whatsappCount').textContent = unreadMessages;
    }
    if (document.getElementById('unreadMessages')) {
        document.getElementById('unreadMessages').textContent = unreadMessages;
    }
    if (document.querySelector('.topbar-action .badge')) {
        document.querySelector('.topbar-action .badge').textContent = unreadNotifications;
    }
}

// ============================
// AUTHENTICATION
// ============================
function checkAuth() {
    const isLoggedIn = localStorage.getItem('fitplug_admin_logged_in');
    const currentUser = localStorage.getItem('fitplug_admin_user');
    
    if (isLoggedIn === 'true' && currentUser) {
        storeData.isLoggedIn = true;
        storeData.currentUser = JSON.parse(currentUser);
        showDashboard();
    } else {
        showLogin();
    }
}

function login(username, password) {
    if (username === CONFIG.ADMIN_USERNAME && password === CONFIG.ADMIN_PASSWORD) {
        storeData.isLoggedIn = true;
        storeData.currentUser = {
            username: username,
            name: 'Admin User',
            role: 'Store Manager',
            loginTime: new Date().toISOString()
        };
        
        localStorage.setItem('fitplug_admin_logged_in', 'true');
        localStorage.setItem('fitplug_admin_user', JSON.stringify(storeData.currentUser));
        
        showDashboard();
        showNotification('Login successful!', 'success');
        return true;
    } else {
        showNotification('Invalid username or password', 'error');
        return false;
    }
}

function logout() {
    storeData.isLoggedIn = false;
    storeData.currentUser = null;
    
    localStorage.removeItem('fitplug_admin_logged_in');
    localStorage.removeItem('fitplug_admin_user');
    
    showLogin();
    showNotification('Logged out successfully', 'success');
}

// ============================
// PAGE MANAGEMENT
// ============================
const PAGES = {
    dashboard: {
        title: 'Dashboard',
        template: dashboardTemplate,
        breadcrumb: 'Dashboard'
    },
    products: {
        title: 'Products',
        template: productsTemplate,
        breadcrumb: 'Products'
    },
    orders: {
        title: 'Orders',
        template: ordersTemplate,
        breadcrumb: 'Orders'
    },
    inventory: {
        title: 'Inventory',
        template: inventoryTemplate,
        breadcrumb: 'Inventory'
    },
    customers: {
        title: 'Customers',
        template: customersTemplate,
        breadcrumb: 'Customers'
    },
    whatsapp: {
        title: 'WhatsApp',
        template: whatsappTemplate,
        breadcrumb: 'WhatsApp'
    },
    analytics: {
        title: 'Analytics',
        template: analyticsTemplate,
        breadcrumb: 'Analytics'
    },
    media: {
        title: 'Media',
        template: mediaTemplate,
        breadcrumb: 'Media'
    },
    settings: {
        title: 'Settings',
        template: settingsTemplate,
        breadcrumb: 'Settings'
    }
};

function showPage(pageId) {
    if (!storeData.isLoggedIn) {
        showLogin();
        return;
    }

    const page = PAGES[pageId];
    if (!page) return;

    // Update UI
    document.getElementById('pageTitle').textContent = page.title;
    document.getElementById('breadcrumbCurrent').textContent = page.breadcrumb;
    
    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === pageId) {
            link.classList.add('active');
        }
    });

    // Render page content
    document.getElementById('pageContent').innerHTML = page.template();
    
    // Initialize page-specific functionality
    initializePage(pageId);
}

function initializePage(pageId) {
    switch(pageId) {
        case 'dashboard':
            initDashboard();
            break;
        case 'products':
            initProducts();
            break;
        case 'orders':
            initOrders();
            break;
        case 'inventory':
            initInventory();
            break;
        case 'customers':
            initCustomers();
            break;
        case 'whatsapp':
            initWhatsApp();
            break;
        case 'analytics':
            initAnalytics();
            break;
        case 'media':
            initMedia();
            break;
        case 'settings':
            initSettings();
            break;
    }
}

// ============================
// PAGE TEMPLATES
// ============================
function dashboardTemplate() {
    const totalRevenue = storeData.orders.reduce((sum, order) => sum + order.total, 0);
    const todayRevenue = storeData.orders
        .filter(order => order.createdAt.startsWith(new Date().toISOString().split('T')[0]))
        .reduce((sum, order) => sum + order.total, 0);
    
    const totalProducts = storeData.products.length;
    const lowStockProducts = storeData.products.filter(p => p.stock < 10).length;
    
    const totalCustomers = storeData.customers.length;
    const newCustomers = storeData.customers
        .filter(c => new Date(c.joinDate) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))
        .length;

    const pendingOrders = storeData.orders.filter(o => o.status === 'pending' || o.status === 'confirmed').length;
    const unreadMessages = storeData.whatsappMessages.filter(m => m.status === 'unread').length;

    return `
        <div class="page-content">
            <!-- Stats Cards -->
            <div class="stats-grid">
                <div class="stat-card" onclick="showPage('orders')">
                    <div class="stat-icon" style="background-color: #25D36620; color: #25D366;">
                        <i class="fas fa-shopping-cart"></i>
                    </div>
                    <div class="stat-info">
                        <h3 class="stat-value">${CONFIG.CURRENCY} ${totalRevenue.toFixed(2)}</h3>
                        <p class="stat-label">Total Revenue</p>
                        <span class="stat-change positive">+12.5%</span>
                    </div>
                </div>
                
                <div class="stat-card" onclick="showPage('orders')">
                    <div class="stat-icon" style="background-color: #4F46E520; color: #4F46E5;">
                        <i class="fas fa-shopping-bag"></i>
                    </div>
                    <div class="stat-info">
                        <h3 class="stat-value">${storeData.orders.length}</h3>
                        <p class="stat-label">Total Orders</p>
                        <span class="stat-change positive">+8.2%</span>
                    </div>
                </div>
                
                <div class="stat-card" onclick="showPage('customers')">
                    <div class="stat-icon" style="background-color: #10B98120; color: #10B981;">
                        <i class="fas fa-users"></i>
                    </div>
                    <div class="stat-info">
                        <h3 class="stat-value">${totalCustomers}</h3>
                        <p class="stat-label">Total Customers</p>
                        <span class="stat-change positive">+5.3%</span>
                    </div>
                </div>
                
                <div class="stat-card" onclick="showPage('products')">
                    <div class="stat-icon" style="background-color: #F59E0B20; color: #F59E0B;">
                        <i class="fas fa-boxes"></i>
                    </div>
                    <div class="stat-info">
                        <h3 class="stat-value">${totalProducts}</h3>
                        <p class="stat-label">Total Products</p>
                        <span class="stat-change ${lowStockProducts > 0 ? 'negative' : 'positive'}">${lowStockProducts} low stock</span>
                    </div>
                </div>
            </div>

            <!-- Charts and Recent Orders -->
            <div class="content-grid">
                <!-- Revenue Chart -->
                <div class="content-card">
                    <div class="card-header">
                        <h3 class="card-title">Revenue Overview</h3>
                        <select class="period-select" id="revenuePeriod">
                            <option value="7">Last 7 days</option>
                            <option value="30" selected>Last 30 days</option>
                            <option value="90">Last 90 days</option>
                        </select>
                    </div>
                    <div class="card-body">
                        <div class="chart-placeholder">
                            <canvas id="revenueChart"></canvas>
                        </div>
                    </div>
                </div>
                
                <!-- Recent Orders -->
                <div class="content-card">
                    <div class="card-header">
                        <h3 class="card-title">Recent Orders</h3>
                        <a href="#" class="btn-link" onclick="showPage('orders'); return false;">View All</a>
                    </div>
                    <div class="card-body">
                        <div class="table-container">
                            <table class="data-table">
                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Customer</th>
                                        <th>Date</th>
                                        <th>Amount</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody id="recentOrdersTable">
                                    ${storeData.orders.slice(0, 5).map(order => `
                                        <tr>
                                            <td><strong>${order.id}</strong></td>
                                            <td>${order.customerName}</td>
                                            <td>${formatDate(order.createdAt)}</td>
                                            <td><strong>${CONFIG.CURRENCY} ${order.total.toFixed(2)}</strong></td>
                                            <td><span class="status-badge status-${order.status}">${formatStatus(order.status)}</span></td>
                                            <td>
                                                <div class="table-actions">
                                                    <button class="btn-icon view" onclick="viewOrder('${order.id}')" title="View Order">
                                                        <i class="fas fa-eye"></i>
                                                    </button>
                                                    <button class="btn-icon whatsapp" onclick="messageCustomer('${order.customerPhone}', '${order.customerName}')" title="Message on WhatsApp">
                                                        <i class="fab fa-whatsapp"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                
                <!-- Low Stock Products -->
                <div class="content-card">
                    <div class="card-header">
                        <h3 class="card-title">Low Stock Products</h3>
                        <button class="btn btn-primary btn-sm" onclick="showPage('inventory')">
                            Manage Inventory
                        </button>
                    </div>
                    <div class="card-body">
                        <div class="products-list" id="lowStockProducts">
                            ${storeData.products.filter(p => p.stock < 10).slice(0, 5).map(product => `
                                <div class="product-item">
                                    <div class="product-image-sm">
                                        <img src="${product.images[0] || 'https://via.placeholder.com/60x60'}" alt="${product.name}">
                                    </div>
                                    <div class="product-info-sm">
                                        <div class="product-name-sm">${product.name}</div>
                                        <div class="product-meta-sm">
                                            <span class="product-price-sm">${CONFIG.CURRENCY} ${product.price.toFixed(2)}</span>
                                            <span>SKU: ${product.sku}</span>
                                        </div>
                                    </div>
                                    <span class="product-stock stock-low">${product.stock} left</span>
                                </div>
                            `).join('')}
                            ${storeData.products.filter(p => p.stock < 10).length === 0 ? `
                                <div class="empty-state">
                                    <i class="fas fa-check-circle"></i>
                                    <p>All products are well stocked!</p>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                </div>
                
                <!-- Recent WhatsApp Messages -->
                <div class="content-card">
                    <div class="card-header">
                        <h3 class="card-title">Recent WhatsApp Messages</h3>
                        <button class="btn btn-whatsapp btn-sm" onclick="showPage('whatsapp')">
                            <i class="fab fa-whatsapp"></i> View All
                        </button>
                    </div>
                    <div class="card-body">
                        <div class="whatsapp-messages">
                            ${storeData.whatsappMessages.slice(0, 3).map(msg => `
                                <div class="whatsapp-message ${msg.status === 'unread' ? 'unread' : ''}">
                                    <div class="message-header">
                                        <span class="message-sender">${msg.sender}</span>
                                        <span class="message-time">${formatTime(msg.timestamp)}</span>
                                    </div>
                                    <div class="message-content">${msg.message}</div>
                                    <div class="message-actions">
                                        <button class="btn btn-sm ${msg.replied ? 'btn-outline' : 'btn-whatsapp'}" onclick="replyToMessage('${msg.phone}', '${msg.sender}')">
                                            ${msg.replied ? 'Replied' : 'Reply'}
                                        </button>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>

            <!-- Quick Stats -->
            <div class="content-card">
                <div class="card-header">
                    <h3 class="card-title">Quick Stats</h3>
                </div>
                <div class="card-body">
                    <div class="stats-grid">
                        <div class="stat-card">
                            <div class="stat-info">
                                <h3 class="stat-value">${CONFIG.CURRENCY} ${todayRevenue.toFixed(2)}</h3>
                                <p class="stat-label">Today's Revenue</p>
                            </div>
                        </div>
                        
                        <div class="stat-card">
                            <div class="stat-info">
                                <h3 class="stat-value">${pendingOrders}</h3>
                                <p class="stat-label">Pending Orders</p>
                            </div>
                        </div>
                        
                        <div class="stat-card">
                            <div class="stat-info">
                                <h3 class="stat-value">${newCustomers}</h3>
                                <p class="stat-label">New Customers (30 days)</p>
                            </div>
                        </div>
                        
                        <div class="stat-card">
                            <div class="stat-info">
                                <h3 class="stat-value">${unreadMessages}</h3>
                                <p class="stat-label">Unread Messages</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function productsTemplate() {
    return `
        <div class="page-content">
            <div class="action-bar">
                <h2 class="page-title">Products Management</h2>
                <div class="action-buttons">
                    <button class="btn btn-primary" id="addProductBtn">
                        <i class="fas fa-plus"></i> Add Product
                    </button>
                    <button class="btn btn-outline" id="exportProductsBtn">
                        <i class="fas fa-download"></i> Export
                    </button>
                </div>
            </div>

            <div class="filters">
                <select class="filter-select" id="categoryFilter">
                    <option value="">All Categories</option>
                    <option value="clothing">Clothing</option>
                    <option value="footwear">Footwear</option>
                    <option value="accessories">Accessories</option>
                    <option value="jewelry">Jewelry</option>
                    <option value="beauty">Beauty</option>
                    <option value="food">Food</option>
                </select>
                
                <select class="filter-select" id="statusFilter">
                    <option value="">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="outofstock">Out of Stock</option>
                </select>
                
                <select class="filter-select" id="sortFilter">
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="name">Name A-Z</option>
                </select>
                
                <div class="search-box" style="width: 200px;">
                    <i class="fas fa-search"></i>
                    <input type="text" id="productSearch" placeholder="Search products...">
                </div>
            </div>

            <div class="content-card">
                <div class="card-body">
                    <div class="table-container">
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>SKU</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>Stock</th>
                                    <th>Sold</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody id="productsTable">
                                <!-- Products will be loaded dynamically -->
                            </tbody>
                        </table>
                    </div>
                    
                    <div class="pagination" id="productsPagination">
                        <!-- Pagination will be loaded dynamically -->
                    </div>
                </div>
            </div>
        </div>
    `;
}

function ordersTemplate() {
    return `
        <div class="page-content">
            <div class="action-bar">
                <h2 class="page-title">Orders Management</h2>
                <div class="action-buttons">
                    <button class="btn btn-outline" id="exportOrdersBtn">
                        <i class="fas fa-download"></i> Export Orders
                    </button>
                </div>
            </div>

            <div class="filters">
                <select class="filter-select" id="orderStatusFilter">
                    <option value="">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                </select>
                
                <select class="filter-select" id="orderDateFilter">
                    <option value="">All Time</option>
                    <option value="today">Today</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                    <option value="year">This Year</option>
                </select>
                
                <div class="search-box" style="width: 250px;">
                    <i class="fas fa-search"></i>
                    <input type="text" id="orderSearch" placeholder="Search by order ID or customer...">
                </div>
            </div>

            <div class="content-card">
                <div class="card-body">
                    <div class="table-container">
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Customer</th>
                                    <th>Date</th>
                                    <th>Items</th>
                                    <th>Total</th>
                                    <th>Payment</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody id="ordersTable">
                                <!-- Orders will be loaded dynamically -->
                            </tbody>
                        </table>
                    </div>
                    
                    <div class="pagination" id="ordersPagination">
                        <!-- Pagination will be loaded dynamically -->
                    </div>
                </div>
            </div>
        </div>
    `;
}

function inventoryTemplate() {
    return `
        <div class="page-content">
            <div class="action-bar">
                <h2 class="page-title">Inventory Management</h2>
                <div class="action-buttons">
                    <button class="btn btn-primary" id="updateInventoryBtn">
                        <i class="fas fa-sync"></i> Update Inventory
                    </button>
                    <button class="btn btn-outline" id="exportInventoryBtn">
                        <i class="fas fa-download"></i> Export
                    </button>
                </div>
            </div>

            <div class="filters">
                <select class="filter-select" id="inventoryFilter">
                    <option value="">All Stock Levels</option>
                    <option value="low">Low Stock (< 10)</option>
                    <option value="medium">Medium Stock (10-50)</option>
                    <option value="high">High Stock (> 50)</option>
                    <option value="out">Out of Stock</option>
                </select>
                
                <select class="filter-select" id="inventoryCategoryFilter">
                    <option value="">All Categories</option>
                    <option value="clothing">Clothing</option>
                    <option value="footwear">Footwear</option>
                    <option value="accessories">Accessories</option>
                </select>
                
                <div class="search-box" style="width: 200px;">
                    <i class="fas fa-search"></i>
                    <input type="text" id="inventorySearch" placeholder="Search products...">
                </div>
            </div>

            <div class="inventory-grid" id="inventoryGrid">
                <!-- Inventory items will be loaded dynamically -->
            </div>
            
            <div class="pagination" id="inventoryPagination">
                <!-- Pagination will be loaded dynamically -->
            </div>
        </div>
    `;
}

function customersTemplate() {
    return `
        <div class="page-content">
            <div class="action-bar">
                <h2 class="page-title">Customers</h2>
                <div class="action-buttons">
                    <button class="btn btn-outline" id="exportCustomersBtn">
                        <i class="fas fa-download"></i> Export
                    </button>
                </div>
            </div>

            <div class="filters">
                <select class="filter-select" id="customerFilter">
                    <option value="">All Customers</option>
                    <option value="whatsapp">WhatsApp Users</option>
                    <option value="recent">Recent (30 days)</option>
                    <option value="vip">VIP Customers</option>
                </select>
                
                <div class="search-box" style="width: 250px;">
                    <i class="fas fa-search"></i>
                    <input type="text" id="customerSearch" placeholder="Search by name or phone...">
                </div>
            </div>

            <div class="content-card">
                <div class="card-body">
                    <div class="table-container">
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>Customer</th>
                                    <th>Contact</th>
                                    <th>Total Orders</th>
                                    <th>Total Spent</th>
                                    <th>Last Order</th>
                                    <th>Join Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody id="customersTable">
                                <!-- Customers will be loaded dynamically -->
                            </tbody>
                        </table>
                    </div>
                    
                    <div class="pagination" id="customersPagination">
                        <!-- Pagination will be loaded dynamically -->
                    </div>
                </div>
            </div>
        </div>
    `;
}

function whatsappTemplate() {
    return `
        <div class="page-content">
            <div class="action-bar">
                <h2 class="page-title">WhatsApp Management</h2>
                <div class="action-buttons">
                    <button class="btn btn-whatsapp" id="sendBroadcastBtn">
                        <i class="fas fa-bullhorn"></i> Send Broadcast
                    </button>
                    <button class="btn btn-primary" id="createTemplateBtn">
                        <i class="fas fa-comment-alt"></i> Create Template
                    </button>
                </div>
            </div>

            <div class="content-grid">
                <!-- Message Templates -->
                <div class="content-card">
                    <div class="card-header">
                        <h3 class="card-title">Message Templates</h3>
                        <button class="btn btn-sm btn-outline" id="addTemplateBtn">
                            <i class="fas fa-plus"></i> Add Template
                        </button>
                    </div>
                    <div class="card-body">
                        <div class="templates-list" id="templatesList">
                            <div class="template-item">
                                <div class="template-header">
                                    <h4>Order Confirmation</h4>
                                    <span class="badge">Active</span>
                                </div>
                                <div class="template-content">
                                    Hi {customer_name}! Your order #{order_id} has been confirmed. Total: {order_total}. Delivery in 24-48 hours.
                                </div>
                                <div class="template-actions">
                                    <button class="btn btn-sm btn-outline">Edit</button>
                                    <button class="btn btn-sm btn-whatsapp">Use</button>
                                </div>
                            </div>
                            
                            <div class="template-item">
                                <div class="template-header">
                                    <h4>Payment Request</h4>
                                    <span class="badge">Active</span>
                                </div>
                                <div class="template-content">
                                    Hi {customer_name}! Please complete payment for order #{order_id}. Amount: {order_total}. Payment options: Mobile Money, Card, Cash on Delivery.
                                </div>
                                <div class="template-actions">
                                    <button class="btn btn-sm btn-outline">Edit</button>
                                    <button class="btn btn-sm btn-whatsapp">Use</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Recent Messages -->
                <div class="content-card">
                    <div class="card-header">
                        <h3 class="card-title">Recent Messages</h3>
                        <button class="btn btn-sm btn-outline" onclick="refreshWhatsAppMessages()">
                            <i class="fas fa-sync"></i> Refresh
                        </button>
                    </div>
                    <div class="card-body">
                        <div class="whatsapp-messages" id="whatsappMessagesList">
                            ${storeData.whatsappMessages.map(msg => `
                                <div class="whatsapp-message ${msg.status === 'unread' ? 'unread' : ''}">
                                    <div class="message-header">
                                        <span class="message-sender">${msg.sender}</span>
                                        <span class="message-time">${formatTime(msg.timestamp)}</span>
                                    </div>
                                    <div class="message-content">${msg.message}</div>
                                    <div class="message-actions">
                                        <button class="btn btn-sm ${msg.replied ? 'btn-outline' : 'btn-whatsapp'}" onclick="replyToMessage('${msg.phone}', '${msg.sender}')">
                                            ${msg.replied ? 'Replied' : 'Reply Now'}
                                        </button>
                                        <button class="btn btn-sm btn-outline" onclick="viewMessageDetails('${msg.id}')">
                                            Details
                                        </button>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
                
                <!-- WhatsApp Stats -->
                <div class="content-card">
                    <div class="card-header">
                        <h3 class="card-title">WhatsApp Statistics</h3>
                    </div>
                    <div class="card-body">
                        <div class="stats-grid">
                            <div class="stat-card">
                                <div class="stat-info">
                                    <h3 class="stat-value">${storeData.whatsappMessages.filter(m => m.status === 'unread').length}</h3>
                                    <p class="stat-label">Unread Messages</p>
                                </div>
                            </div>
                            
                            <div class="stat-card">
                                <div class="stat-info">
                                    <h3 class="stat-value">${storeData.whatsappMessages.filter(m => m.replied).length}</h3>
                                    <p class="stat-label">Replied Messages</p>
                                </div>
                            </div>
                            
                            <div class="stat-card">
                                <div class="stat-info">
                                    <h3 class="stat-value">${storeData.customers.filter(c => c.whatsapp).length}</h3>
                                    <p class="stat-label">WhatsApp Users</p>
                                </div>
                            </div>
                            
                            <div class="stat-card">
                                <div class="stat-info">
                                    <h3 class="stat-value">15 min</h3>
                                    <p class="stat-label">Avg Response Time</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Quick Actions -->
                <div class="content-card">
                    <div class="card-header">
                        <h3 class="card-title">Quick Actions</h3>
                    </div>
                    <div class="card-body">
                        <div class="quick-actions-grid">
                            <button class="quick-action-btn" onclick="sendOrderUpdate()">
                                <div class="quick-action-icon" style="background-color: #25D36620; color: #25D366;">
                                    <i class="fas fa-truck"></i>
                                </div>
                                <span>Send Delivery Update</span>
                            </button>
                            
                            <button class="quick-action-btn" onclick="sendPaymentReminder()">
                                <div class="quick-action-icon" style="background-color: #4F46E520; color: #4F46E5;">
                                    <i class="fas fa-money-bill-wave"></i>
                                </div>
                                <span>Send Payment Reminder</span>
                            </button>
                            
                            <button class="quick-action-btn" onclick="sendNewArrivalAlert()">
                                <div class="quick-action-icon" style="background-color: #10B98120; color: #10B981;">
                                    <i class="fas fa-bell"></i>
                                </div>
                                <span>New Arrival Alert</span>
                            </button>
                            
                            <button class="quick-action-btn" onclick="sendSpecialOffer()">
                                <div class="quick-action-icon" style="background-color: #F59E0B20; color: #F59E0B;">
                                    <i class="fas fa-gift"></i>
                                </div>
                                <span>Special Offer</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function analyticsTemplate() {
    return `
        <div class="page-content">
            <div class="action-bar">
                <h2 class="page-title">Analytics Dashboard</h2>
                <div class="action-buttons">
                    <select class="filter-select" id="analyticsPeriod">
                        <option value="7">Last 7 Days</option>
                        <option value="30" selected>Last 30 Days</option>
                        <option value="90">Last 90 Days</option>
                        <option value="365">Last Year</option>
                    </select>
                    <button class="btn btn-outline" id="exportAnalyticsBtn">
                        <i class="fas fa-download"></i> Export Data
                    </button>
                </div>
            </div>

            <div class="analytics-grid">
                <!-- Sales Chart -->
                <div class="analytics-card">
                    <h3>Sales Performance</h3>
                    <div class="chart-placeholder">
                        <canvas id="salesChart"></canvas>
                    </div>
                </div>
                
                <!-- Top Products -->
                <div class="analytics-card">
                    <h3>Top Selling Products</h3>
                    <div class="products-list">
                        ${storeData.products.sort((a, b) => b.sold - a.sold).slice(0, 5).map(product => `
                            <div class="product-item">
                                <div class="product-image-sm">
                                    <img src="${product.images[0] || 'https://via.placeholder.com/60x60'}" alt="${product.name}">
                                </div>
                                <div class="product-info-sm">
                                    <div class="product-name-sm">${product.name}</div>
                                    <div class="product-meta-sm">
                                        <span>Sold: ${product.sold}</span>
                                        <span>Revenue: ${CONFIG.CURRENCY} ${(product.sold * product.price).toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <!-- Customer Analytics -->
                <div class="analytics-card">
                    <h3>Customer Insights</h3>
                    <div class="chart-placeholder">
                        <canvas id="customerChart"></canvas>
                    </div>
                </div>
                
                <!-- Order Status Distribution -->
                <div class="analytics-card">
                    <h3>Order Status Distribution</h3>
                    <div class="chart-placeholder">
                        <canvas id="orderStatusChart"></canvas>
                    </div>
                </div>
                
                <!-- Revenue by Category -->
                <div class="analytics-card">
                    <h3>Revenue by Category</h3>
                    <div class="chart-placeholder">
                        <canvas id="categoryChart"></canvas>
                    </div>
                </div>
                
                <!-- Key Metrics -->
                <div class="analytics-card">
                    <h3>Key Metrics</h3>
                    <div class="stats-grid" style="grid-template-columns: 1fr;">
                        <div class="stat-card">
                            <div class="stat-info">
                                <h3 class="stat-value">${calculateAverageOrderValue().toFixed(2)}</h3>
                                <p class="stat-label">Average Order Value</p>
                            </div>
                        </div>
                        
                        <div class="stat-card">
                            <div class="stat-info">
                                <h3 class="stat-value">${calculateConversionRate()}%</h3>
                                <p class="stat-label">Conversion Rate</p>
                            </div>
                        </div>
                        
                        <div class="stat-card">
                            <div class="stat-info">
                                <h3 class="stat-value">${calculateCustomerLifetimeValue().toFixed(2)}</h3>
                                <p class="stat-label">Customer Lifetime Value</p>
                            </div>
                        </div>
                        
                        <div class="stat-card">
                            <div class="stat-info">
                                <h3 class="stat-value">${calculateRepeatCustomerRate()}%</h3>
                                <p class="stat-label">Repeat Customer Rate</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function mediaTemplate() {
    return `
        <div class="page-content">
            <div class="action-bar">
                <h2 class="page-title">Media Library</h2>
                <div class="action-buttons">
                    <button class="btn btn-primary" id="uploadMediaBtn">
                        <i class="fas fa-upload"></i> Upload Media
                    </button>
                    <button class="btn btn-outline" id="bulkUploadBtn">
                        <i class="fas fa-folder-plus"></i> Bulk Upload
                    </button>
                </div>
            </div>

            <div class="filters">
                <select class="filter-select" id="mediaTypeFilter">
                    <option value="">All Types</option>
                    <option value="image">Images</option>
                    <option value="video">Videos</option>
                </select>
                
                <select class="filter-select" id="mediaCategoryFilter">
                    <option value="">All Categories</option>
                    <option value="products">Products</option>
                    <option value="banners">Banners</option>
                    <option value="videos">Product Videos</option>
                </select>
                
                <div class="search-box" style="width: 200px;">
                    <i class="fas fa-search"></i>
                    <input type="text" id="mediaSearch" placeholder="Search media...">
                </div>
            </div>

            <div class="content-card">
                <div class="card-body">
                    <div class="media-grid" id="mediaGrid">
                        <!-- Media items will be loaded dynamically -->
                    </div>
                    
                    <div class="pagination" id="mediaPagination">
                        <!-- Pagination will be loaded dynamically -->
                    </div>
                </div>
            </div>
        </div>
    `;
}

function settingsTemplate() {
    return `
        <div class="page-content">
            <div class="action-bar">
                <h2 class="page-title">Settings</h2>
                <div class="action-buttons">
                    <button class="btn btn-primary" id="saveSettingsBtn">
                        <i class="fas fa-save"></i> Save Changes
                    </button>
                </div>
            </div>

            <div class="settings-grid">
                <!-- General Settings -->
                <div class="settings-section">
                    <h3>General Settings</h3>
                    
                    <div class="setting-item">
                        <label for="storeName">Store Name</label>
                        <input type="text" id="storeName" value="${storeData.settings.storeName}">
                    </div>
                    
                    <div class="setting-item">
                        <label for="storeCurrency">Currency</label>
                        <select id="storeCurrency">
                            <option value="GH₵" ${storeData.settings.currency === 'GH₵' ? 'selected' : ''}>Ghana Cedi (GH₵)</option>
                            <option value="$" ${storeData.settings.currency === '$' ? 'selected' : ''}>US Dollar ($)</option>
                            <option value="€" ${storeData.settings.currency === '€' ? 'selected' : ''}>Euro (€)</option>
                            <option value="£" ${storeData.settings.currency === '£' ? 'selected' : ''}>Pound (£)</option>
                        </select>
                    </div>
                    
                    <div class="setting-item">
                        <label for="whatsappNumber">WhatsApp Number</label>
                        <input type="text" id="whatsappNumber" value="${storeData.settings.whatsappNumber}">
                        <div class="setting-help">Include country code without + sign</div>
                    </div>
                </div>
                
                <!-- Delivery Settings -->
                <div class="settings-section">
                    <h3>Delivery Settings</h3>
                    
                    <div class="setting-item">
                        <label for="deliveryFee">Delivery Fee (${storeData.settings.currency})</label>
                        <input type="number" id="deliveryFee" step="0.01" value="${storeData.settings.deliveryFee}">
                    </div>
                    
                    <div class="setting-item">
                        <label for="freeDeliveryThreshold">Free Delivery Threshold (${storeData.settings.currency})</label>
                        <input type="number" id="freeDeliveryThreshold" step="0.01" value="${storeData.settings.freeDeliveryThreshold}">
                        <div class="setting-help">Free delivery for orders above this amount</div>
                    </div>
                    
                    <div class="setting-item">
                        <label for="taxRate">Tax Rate (%)</label>
                        <input type="number" id="taxRate" step="0.01" value="${storeData.settings.taxRate}">
                    </div>
                </div>
                
                <!-- Inventory Settings -->
                <div class="settings-section">
                    <h3>Inventory Settings</h3>
                    
                    <div class="setting-item">
                        <label for="lowStockThreshold">Low Stock Threshold</label>
                        <input type="number" id="lowStockThreshold" value="${storeData.settings.lowStockThreshold}">
                        <div class="setting-help">Send alert when stock falls below this number</div>
                    </div>
                    
                    <div class="setting-item">
                        <label for="autoReorder">Auto Reorder</label>
                        <select id="autoReorder">
                            <option value="true">Enabled</option>
                            <option value="false" ${storeData.settings.autoReorder === false ? 'selected' : ''}>Disabled</option>
                        </select>
                    </div>
                    
                    <div class="setting-item">
                        <label for="reorderQuantity">Default Reorder Quantity</label>
                        <input type="number" id="reorderQuantity" value="${storeData.settings.reorderQuantity || 50}">
                    </div>
                </div>
                
                <!-- Notification Settings -->
                <div class="settings-section">
                    <h3>Notification Settings</h3>
                    
                    <div class="setting-item">
                        <label class="checkbox-label">
                            <input type="checkbox" id="emailNotifications" ${storeData.settings.emailNotifications ? 'checked' : ''}>
                            <span>Email Notifications</span>
                        </label>
                    </div>
                    
                    <div class="setting-item">
                        <label class="checkbox-label">
                            <input type="checkbox" id="whatsappNotifications" ${storeData.settings.whatsappNotifications ? 'checked' : ''}>
                            <span>WhatsApp Notifications</span>
                        </label>
                    </div>
                    
                    <div class="setting-item">
                        <label class="checkbox-label">
                            <input type="checkbox" id="lowStockAlerts" ${storeData.settings.lowStockAlerts !== false ? 'checked' : ''}>
                            <span>Low Stock Alerts</span>
                        </label>
                    </div>
                    
                    <div class="setting-item">
                        <label class="checkbox-label">
                            <input type="checkbox" id="newOrderAlerts" ${storeData.settings.newOrderAlerts !== false ? 'checked' : ''}>
                            <span>New Order Alerts</span>
                        </label>
                    </div>
                </div>
                
                <!-- Integration Settings -->
                <div class="settings-section">
                    <h3>Integration Settings</h3>
                    
                    <div class="setting-item">
                        <label for="googleAnalyticsId">Google Analytics ID</label>
                        <input type="text" id="googleAnalyticsId" value="${storeData.settings.googleAnalyticsId || ''}">
                    </div>
                    
                    <div class="setting-item">
                        <label for="facebookPixelId">Facebook Pixel ID</label>
                        <input type="text" id="facebookPixelId" value="${storeData.settings.facebookPixelId || ''}">
                    </div>
                    
                    <div class="setting-item">
                        <label for="paymentGateway">Payment Gateway</label>
                        <select id="paymentGateway">
                            <option value="manual" ${storeData.settings.paymentGateway === 'manual' ? 'selected' : ''}>Manual (WhatsApp)</option>
                            <option value="stripe" ${storeData.settings.paymentGateway === 'stripe' ? 'selected' : ''}>Stripe</option>
                            <option value="paypal" ${storeData.settings.paymentGateway === 'paypal' ? 'selected' : ''}>PayPal</option>
                        </select>
                    </div>
                </div>
                
                <!-- Backup & Export -->
                <div class="settings-section">
                    <h3>Backup & Export</h3>
                    
                    <div class="setting-item">
                        <label>Export Data</label>
                        <div class="action-buttons" style="margin-top: 10px;">
                            <button class="btn btn-outline btn-sm" onclick="exportData('products')">
                                Export Products
                            </button>
                            <button class="btn btn-outline btn-sm" onclick="exportData('orders')">
                                Export Orders
                            </button>
                            <button class="btn btn-outline btn-sm" onclick="exportData('customers')">
                                Export Customers
                            </button>
                        </div>
                    </div>
                    
                    <div class="setting-item">
                        <label>Backup Data</label>
                        <div class="action-buttons" style="margin-top: 10px;">
                            <button class="btn btn-primary btn-sm" onclick="createBackup()">
                                Create Backup
                            </button>
                            <button class="btn btn-outline btn-sm" onclick="restoreBackup()">
                                Restore Backup
                            </button>
                        </div>
                    </div>
                    
                    <div class="setting-item">
                        <label>Danger Zone</label>
                        <div class="action-buttons" style="margin-top: 10px;">
                            <button class="btn btn-error btn-sm" onclick="clearAllData()">
                                Clear All Data
                            </button>
                            <button class="btn btn-error btn-sm" onclick="resetToDefault()">
                                Reset to Default
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// ============================
// PAGE INITIALIZATION FUNCTIONS
// ============================
function initDashboard() {
    // Initialize revenue chart
    initRevenueChart();
    
    // Initialize event listeners
    document.getElementById('revenuePeriod').addEventListener('change', function() {
        initRevenueChart(this.value);
    });
}

function initProducts() {
    renderProductsTable();
    
    // Event listeners for filters
    document.getElementById('categoryFilter').addEventListener('change', renderProductsTable);
    document.getElementById('statusFilter').addEventListener('change', renderProductsTable);
    document.getElementById('sortFilter').addEventListener('change', renderProductsTable);
    document.getElementById('productSearch').addEventListener('input', renderProductsTable);
    
    // Event listeners for buttons
    document.getElementById('addProductBtn').addEventListener('click', showAddProductModal);
    document.getElementById('exportProductsBtn').addEventListener('click', exportProducts);
}

function initOrders() {
    renderOrdersTable();
    
    // Event listeners for filters
    document.getElementById('orderStatusFilter').addEventListener('change', renderOrdersTable);
    document.getElementById('orderDateFilter').addEventListener('change', renderOrdersTable);
    document.getElementById('orderSearch').addEventListener('input', renderOrdersTable);
    
    // Event listeners for buttons
    document.getElementById('exportOrdersBtn').addEventListener('click', exportOrders);
}

function initInventory() {
    renderInventoryGrid();
    
    // Event listeners for filters
    document.getElementById('inventoryFilter').addEventListener('change', renderInventoryGrid);
    document.getElementById('inventoryCategoryFilter').addEventListener('change', renderInventoryGrid);
    document.getElementById('inventorySearch').addEventListener('input', renderInventoryGrid);
    
    // Event listeners for buttons
    document.getElementById('updateInventoryBtn').addEventListener('click', showUpdateInventoryModal);
    document.getElementById('exportInventoryBtn').addEventListener('click', exportInventory);
}

function initCustomers() {
    renderCustomersTable();
    
    // Event listeners for filters
    document.getElementById('customerFilter').addEventListener('change', renderCustomersTable);
    document.getElementById('customerSearch').addEventListener('input', renderCustomersTable);
    
    // Event listeners for buttons
    document.getElementById('exportCustomersBtn').addEventListener('click', exportCustomers);
}

function initWhatsApp() {
    // Event listeners for buttons
    document.getElementById('sendBroadcastBtn').addEventListener('click', sendBroadcast);
    document.getElementById('createTemplateBtn').addEventListener('click', createTemplate);
    document.getElementById('addTemplateBtn').addEventListener('click', addTemplate);
}

function initAnalytics() {
    // Initialize charts
    initSalesChart();
    initCustomerChart();
    initOrderStatusChart();
    initCategoryChart();
    
    // Event listeners
    document.getElementById('analyticsPeriod').addEventListener('change', function() {
        initSalesChart(this.value);
        initCustomerChart(this.value);
        initOrderStatusChart();
        initCategoryChart();
    });
    
    document.getElementById('exportAnalyticsBtn').addEventListener('click', exportAnalytics);
}

function initMedia() {
    renderMediaGrid();
    
    // Event listeners for filters
    document.getElementById('mediaTypeFilter').addEventListener('change', renderMediaGrid);
    document.getElementById('mediaCategoryFilter').addEventListener('change', renderMediaGrid);
    document.getElementById('mediaSearch').addEventListener('input', renderMediaGrid);
    
    // Event listeners for buttons
    document.getElementById('uploadMediaBtn').addEventListener('click', uploadMedia);
    document.getElementById('bulkUploadBtn').addEventListener('click', bulkUpload);
}

function initSettings() {
    // Event listener for save button
    document.getElementById('saveSettingsBtn').addEventListener('click', saveSettings);
}

// ============================
// RENDER FUNCTIONS
// ============================
function renderProductsTable(page = 1) {
    const categoryFilter = document.getElementById('categoryFilter')?.value || '';
    const statusFilter = document.getElementById('statusFilter')?.value || '';
    const sortFilter = document.getElementById('sortFilter')?.value || 'newest';
    const searchQuery = document.getElementById('productSearch')?.value.toLowerCase() || '';
    
    // Filter products
    let filteredProducts = storeData.products.filter(product => {
        // Category filter
        if (categoryFilter && product.category !== categoryFilter) return false;
        
        // Status filter
        if (statusFilter === 'active' && product.status !== 'active') return false;
        if (statusFilter === 'inactive' && product.status !== 'inactive') return false;
        if (statusFilter === 'outofstock' && product.stock > 0) return false;
        
        // Search filter
        if (searchQuery && !product.name.toLowerCase().includes(searchQuery) && 
            !product.sku.toLowerCase().includes(searchQuery) &&
            !product.description.toLowerCase().includes(searchQuery)) {
            return false;
        }
        
        return true;
    });
    
    // Sort products
    switch(sortFilter) {
        case 'newest':
            filteredProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            break;
        case 'oldest':
            filteredProducts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'name':
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
    }
    
    // Pagination
    const totalPages = Math.ceil(filteredProducts.length / CONFIG.ITEMS_PER_PAGE);
    const startIndex = (page - 1) * CONFIG.ITEMS_PER_PAGE;
    const endIndex = startIndex + CONFIG.ITEMS_PER_PAGE;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
    
    // Render table
    const tableBody = document.getElementById('productsTable');
    if (!tableBody) return;
    
    tableBody.innerHTML = paginatedProducts.map(product => `
        <tr>
            <td>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <img src="${product.images[0] || 'https://via.placeholder.com/40x40'}" 
                         alt="${product.name}" 
                         style="width: 40px; height: 40px; border-radius: 6px; object-fit: cover;">
                    <div>
                        <strong>${product.name}</strong>
                        <div style="font-size: 0.8rem; color: var(--text-light);">${product.description.substring(0, 50)}...</div>
                    </div>
                </div>
            </td>
            <td>${product.sku}</td>
            <td>
                <span class="status-badge" style="background-color: rgba(37, 211, 102, 0.1); color: #25D366;">
                    ${product.category}
                </span>
            </td>
            <td><strong>${CONFIG.CURRENCY} ${product.price.toFixed(2)}</strong></td>
            <td>
                <span class="stock-badge ${getStockLevelClass(product.stock)}">
                    ${product.stock} units
                </span>
            </td>
            <td>${product.sold}</td>
            <td>
                <span class="status-badge status-${product.status === 'active' ? (product.stock > 0 ? 'confirmed' : 'cancelled') : 'cancelled'}">
                    ${product.status === 'active' ? (product.stock > 0 ? 'Active' : 'Out of Stock') : 'Inactive'}
                </span>
            </td>
            <td>
                <div class="table-actions">
                    <button class="btn-icon view" onclick="viewProduct(${product.id})" title="View">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn-icon edit" onclick="editProduct(${product.id})" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon delete" onclick="deleteProduct(${product.id})" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                    <button class="btn-icon whatsapp" onclick="shareProductOnWhatsApp(${product.id})" title="Share on WhatsApp">
                        <i class="fab fa-whatsapp"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
    
    // Render pagination
    renderPagination('productsPagination', page, totalPages, renderProductsTable);
}

function renderOrdersTable(page = 1) {
    const statusFilter = document.getElementById('orderStatusFilter')?.value || '';
    const dateFilter = document.getElementById('orderDateFilter')?.value || '';
    const searchQuery = document.getElementById('orderSearch')?.value.toLowerCase() || '';
    
    // Filter orders
    let filteredOrders = storeData.orders.filter(order => {
        // Status filter
        if (statusFilter && order.status !== statusFilter) return false;
        
        // Date filter
        const orderDate = new Date(order.createdAt);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (dateFilter === 'today' && orderDate < today) return false;
        if (dateFilter === 'week') {
            const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
            if (orderDate < weekAgo) return false;
        }
        if (dateFilter === 'month') {
            const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
            if (orderDate < monthAgo) return false;
        }
        if (dateFilter === 'year') {
            const yearAgo = new Date(today.getTime() - 365 * 24 * 60 * 60 * 1000);
            if (orderDate < yearAgo) return false;
        }
        
        // Search filter
        if (searchQuery && 
            !order.id.toLowerCase().includes(searchQuery) && 
            !order.customerName.toLowerCase().includes(searchQuery) &&
            !order.customerPhone.includes(searchQuery.replace(/\D/g, ''))) {
            return false;
        }
        
        return true;
    });
    
    // Sort by date (newest first)
    filteredOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    // Pagination
    const totalPages = Math.ceil(filteredOrders.length / CONFIG.ITEMS_PER_PAGE);
    const startIndex = (page - 1) * CONFIG.ITEMS_PER_PAGE;
    const endIndex = startIndex + CONFIG.ITEMS_PER_PAGE;
    const paginatedOrders = filteredOrders.slice(startIndex, endIndex);
    
    // Render table
    const tableBody = document.getElementById('ordersTable');
    if (!tableBody) return;
    
    tableBody.innerHTML = paginatedOrders.map(order => `
        <tr>
            <td><strong>${order.id}</strong></td>
            <td>
                <div>
                    <strong>${order.customerName}</strong>
                    <div style="font-size: 0.8rem; color: var(--text-light);">${order.customerPhone}</div>
                </div>
            </td>
            <td>${formatDate(order.createdAt)}</td>
            <td>${order.items.length} items</td>
            <td><strong>${CONFIG.CURRENCY} ${order.total.toFixed(2)}</strong></td>
            <td>
                <span class="status-badge ${order.paymentStatus === 'paid' ? 'status-confirmed' : 'status-pending'}">
                    ${order.paymentStatus}
                </span>
            </td>
            <td>
                <span class="status-badge status-${order.status}">
                    ${formatStatus(order.status)}
                </span>
            </td>
            <td>
                <div class="table-actions">
                    <button class="btn-icon view" onclick="viewOrder('${order.id}')" title="View Order">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn-icon edit" onclick="editOrder('${order.id}')" title="Edit Order">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon whatsapp" onclick="messageCustomer('${order.customerPhone}', '${order.customerName}')" title="Message Customer">
                        <i class="fab fa-whatsapp"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
    
    // Render pagination
    renderPagination('ordersPagination', page, totalPages, renderOrdersTable);
}

function renderInventoryGrid(page = 1) {
    const stockFilter = document.getElementById('inventoryFilter')?.value || '';
    const categoryFilter = document.getElementById('inventoryCategoryFilter')?.value || '';
    const searchQuery = document.getElementById('inventorySearch')?.value.toLowerCase() || '';
    
    // Filter products
    let filteredProducts = storeData.products.filter(product => {
        // Stock filter
        if (stockFilter === 'low' && product.stock >= 10) return false;
        if (stockFilter === 'medium' && (product.stock < 10 || product.stock > 50)) return false;
        if (stockFilter === 'high' && product.stock <= 50) return false;
        if (stockFilter === 'out' && product.stock > 0) return false;
        
        // Category filter
        if (categoryFilter && product.category !== categoryFilter) return false;
        
        // Search filter
        if (searchQuery && !product.name.toLowerCase().includes(searchQuery)) return false;
        
        return true;
    });
    
    // Sort by stock level (lowest first)
    filteredProducts.sort((a, b) => a.stock - b.stock);
    
    // Pagination
    const totalPages = Math.ceil(filteredProducts.length / 8); // 8 items per page for grid
    const startIndex = (page - 1) * 8;
    const endIndex = startIndex + 8;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
    
    // Render grid
    const grid = document.getElementById('inventoryGrid');
    if (!grid) return;
    
    grid.innerHTML = paginatedProducts.map(product => `
        <div class="inventory-card">
            <div class="inventory-header">
                <h4 class="inventory-title">${product.name}</h4>
                <span class="stock-badge ${getStockLevelClass(product.stock)}">
                    ${getStockLevelText(product.stock)}
                </span>
            </div>
            
            <div class="inventory-stock ${getStockLevelClass(product.stock)}">
                <div class="stock-bar">
                    <div class="stock-fill" style="width: ${Math.min((product.stock / 100) * 100, 100)}%"></div>
                </div>
                <span class="stock-value">${product.stock}</span>
            </div>
            
            <div class="product-meta-sm" style="margin-bottom: 15px;">
                <span>SKU: ${product.sku}</span>
                <span>Category: ${product.category}</span>
            </div>
            
            <div class="inventory-actions">
                <button class="btn btn-sm btn-outline" onclick="updateProductStock(${product.id})">
                    Update Stock
                </button>
                <button class="btn btn-sm btn-primary" onclick="reorderProduct(${product.id})">
                    Reorder
                </button>
            </div>
        </div>
    `).join('');
    
    // Render pagination
    renderPagination('inventoryPagination', page, totalPages, renderInventoryGrid);
}

function renderCustomersTable(page = 1) {
    const filter = document.getElementById('customerFilter')?.value || '';
    const searchQuery = document.getElementById('customerSearch')?.value.toLowerCase() || '';
    
    // Filter customers
    let filteredCustomers = storeData.customers.filter(customer => {
        // Filter by type
        if (filter === 'whatsapp' && !customer.whatsapp) return false;
        if (filter === 'recent') {
            const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
            if (new Date(customer.joinDate) < thirtyDaysAgo) return false;
        }
        if (filter === 'vip' && customer.totalSpent < 500) return false;
        
        // Search filter
        if (searchQuery && 
            !customer.name.toLowerCase().includes(searchQuery) && 
            !customer.phone.includes(searchQuery.replace(/\D/g, '')) &&
            !customer.email.toLowerCase().includes(searchQuery)) {
            return false;
        }
        
        return true;
    });
    
    // Sort by total spent (highest first)
    filteredCustomers.sort((a, b) => b.totalSpent - a.totalSpent);
    
    // Pagination
    const totalPages = Math.ceil(filteredCustomers.length / CONFIG.ITEMS_PER_PAGE);
    const startIndex = (page - 1) * CONFIG.ITEMS_PER_PAGE;
    const endIndex = startIndex + CONFIG.ITEMS_PER_PAGE;
    const paginatedCustomers = filteredCustomers.slice(startIndex, endIndex);
    
    // Render table
    const tableBody = document.getElementById('customersTable');
    if (!tableBody) return;
    
    tableBody.innerHTML = paginatedCustomers.map(customer => `
        <tr>
            <td>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <div class="customer-avatar">
                        <i class="fas fa-user"></i>
                    </div>
                    <div>
                        <strong>${customer.name}</strong>
                        <div style="font-size: 0.8rem; color: var(--text-light);">
                            ${customer.email}
                        </div>
                    </div>
                </div>
            </td>
            <td>
                <div>
                    <div>${customer.phone}</div>
                    <div style="font-size: 0.8rem; color: var(--text-light);">
                        ${customer.whatsapp ? 'WhatsApp User' : 'SMS Only'}
                    </div>
                </div>
            </td>
            <td>${customer.totalOrders}</td>
            <td><strong>${CONFIG.CURRENCY} ${customer.totalSpent.toFixed(2)}</strong></td>
            <td>${customer.lastOrder ? formatDate(customer.lastOrder) : 'No orders'}</td>
            <td>${formatDate(customer.joinDate)}</td>
            <td>
                <div class="table-actions">
                    <button class="btn-icon view" onclick="viewCustomer(${customer.id})" title="View">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn-icon whatsapp" onclick="messageCustomer('${customer.phone}', '${customer.name}')" title="Message">
                        <i class="fab fa-whatsapp"></i>
                    </button>
                    <button class="btn-icon edit" onclick="editCustomer(${customer.id})" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
    
    // Render pagination
    renderPagination('customersPagination', page, totalPages, renderCustomersTable);
}

function renderMediaGrid() {
    // This would normally load actual media files
    // For demo, we'll use product images
    const mediaItems = storeData.products.map(product => ({
        id: product.id,
        name: product.name,
        url: product.images[0] || 'https://via.placeholder.com/150x150',
        type: 'image',
        size: '2.4 MB',
        category: 'products'
    }));
    
    const grid = document.getElementById('mediaGrid');
    if (!grid) return;
    
    grid.innerHTML = mediaItems.map(media => `
        <div class="media-item">
            <img src="${media.url}" alt="${media.name}">
            <div class="media-actions">
                <button class="btn-icon edit" title="Edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-icon delete" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
            <div class="media-info">
                <div class="media-name">${media.name.substring(0, 15)}...</div>
                <div class="media-size">${media.size} • ${media.type}</div>
            </div>
        </div>
    `).join('');
}

function renderPagination(containerId, currentPage, totalPages, callback) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    if (totalPages <= 1) {
        container.innerHTML = '';
        return;
    }
    
    let paginationHTML = `
        <button class="pagination-btn" ${currentPage === 1 ? 'disabled' : ''} onclick="${callback.name}(${currentPage - 1})">
            <i class="fas fa-chevron-left"></i>
        </button>
        
        <div class="pagination-pages">
    `;
    
    // Show first page, current page, and last page
    const pagesToShow = [];
    
    if (totalPages <= 5) {
        for (let i = 1; i <= totalPages; i++) {
            pagesToShow.push(i);
        }
    } else {
        pagesToShow.push(1);
        
        if (currentPage > 3) pagesToShow.push('...');
        
        for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
            if (!pagesToShow.includes(i)) pagesToShow.push(i);
        }
        
        if (currentPage < totalPages - 2) pagesToShow.push('...');
        
        if (!pagesToShow.includes(totalPages)) pagesToShow.push(totalPages);
    }
    
    pagesToShow.forEach(page => {
        if (page === '...') {
            paginationHTML += `<span class="pagination-page">...</span>`;
        } else {
            paginationHTML += `
                <button class="pagination-page ${page === currentPage ? 'active' : ''}" onclick="${callback.name}(${page})">
                    ${page}
                </button>
            `;
        }
    });
    
    paginationHTML += `
        </div>
        
        <button class="pagination-btn" ${currentPage === totalPages ? 'disabled' : ''} onclick="${callback.name}(${currentPage + 1})">
            <i class="fas fa-chevron-right"></i>
        </button>
    `;
    
    container.innerHTML = paginationHTML;
}

// ============================
// CHART FUNCTIONS
// ============================
function initRevenueChart(days = 30) {
    const ctx = document.getElementById('revenueChart');
    if (!ctx) return;
    
    // Generate sample data for the last N days
    const labels = [];
    const revenueData = [];
    
    for (let i = days - 1; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        labels.push(formatDate(date.toISOString(), 'short'));
        
        // Generate random revenue between 500 and 3000
        const dailyRevenue = storeData.orders
            .filter(order => order.createdAt.startsWith(date.toISOString().split('T')[0]))
            .reduce((sum, order) => sum + order.total, 0);
        
        revenueData.push(dailyRevenue || Math.floor(Math.random() * 2500) + 500);
    }
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Revenue',
                data: revenueData,
                backgroundColor: 'rgba(37, 211, 102, 0.1)',
                borderColor: 'rgba(37, 211, 102, 1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        callback: function(value) {
                            return CONFIG.CURRENCY + ' ' + value;
                        }
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                }
            }
        }
    });
}

function initSalesChart(days = 30) {
    const ctx = document.getElementById('salesChart');
    if (!ctx) return;
    
    // Similar to revenue chart but for sales volume
    const labels = [];
    const salesData = [];
    
    for (let i = days - 1; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        labels.push(formatDate(date.toISOString(), 'short'));
        
        const dailyOrders = storeData.orders
            .filter(order => order.createdAt.startsWith(date.toISOString().split('T')[0]))
            .length;
        
        salesData.push(dailyOrders || Math.floor(Math.random() * 10) + 1);
    }
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Orders',
                data: salesData,
                backgroundColor: 'rgba(59, 130, 246, 0.5)',
                borderColor: 'rgba(59, 130, 246, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

function initCustomerChart() {
    const ctx = document.getElementById('customerChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['New Customers', 'Returning Customers', 'VIP Customers'],
            datasets: [{
                data: [45, 30, 25],
                backgroundColor: [
                    'rgba(37, 211, 102, 0.8)',
                    'rgba(59, 130, 246, 0.8)',
                    'rgba(245, 158, 11, 0.8)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

function initOrderStatusChart() {
    const ctx = document.getElementById('orderStatusChart');
    if (!ctx) return;
    
    const statusCounts = {
        pending: storeData.orders.filter(o => o.status === 'pending').length,
        confirmed: storeData.orders.filter(o => o.status === 'confirmed').length,
        shipped: storeData.orders.filter(o => o.status === 'shipped').length,
        delivered: storeData.orders.filter(o => o.status === 'delivered').length,
        cancelled: storeData.orders.filter(o => o.status === 'cancelled').length
    };
    
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'],
            datasets: [{
                data: [
                    statusCounts.pending,
                    statusCounts.confirmed,
                    statusCounts.shipped,
                    statusCounts.delivered,
                    statusCounts.cancelled
                ],
                backgroundColor: [
                    'rgba(245, 158, 11, 0.8)',
                    'rgba(37, 211, 102, 0.8)',
                    'rgba(59, 130, 246, 0.8)',
                    'rgba(16, 185, 129, 0.8)',
                    'rgba(239, 68, 68, 0.8)'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

function initCategoryChart() {
    const ctx = document.getElementById('categoryChart');
    if (!ctx) return;
    
    // Calculate revenue by category
    const categoryRevenue = {};
    storeData.orders.forEach(order => {
        order.items.forEach(item => {
            const product = storeData.products.find(p => p.name === item.name);
            if (product) {
                categoryRevenue[product.category] = (categoryRevenue[product.category] || 0) + (item.price * item.quantity);
            }
        });
    });
    
    const categories = Object.keys(categoryRevenue);
    const revenues = Object.values(categoryRevenue);
    
    new Chart(ctx, {
        type: 'polarArea',
        data: {
            labels: categories,
            datasets: [{
                data: revenues,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(255, 206, 86, 0.7)',
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(153, 102, 255, 0.7)',
                    'rgba(255, 159, 64, 0.7)'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// ============================
// PRODUCT MANAGEMENT FUNCTIONS
// ============================
function showAddProductModal() {
    document.getElementById('addProductModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function editProduct(productId) {
    const product = storeData.products.find(p => p.id === productId);
    if (!product) return;
    
    // For now, just show notification
    showNotification(`Editing ${product.name}`, 'info');
    // In a real app, you would open an edit modal with the product data
}

function viewProduct(productId) {
    const product = storeData.products.find(p => p.id === productId);
    if (!product) return;
    
    // Create product details view
    const modal = document.getElementById('orderDetailsModal');
    const content = document.getElementById('orderDetailsContent');
    
    content.innerHTML = `
        <div class="product-detail-view">
            <div style="display: flex; gap: 20px; margin-bottom: 20px;">
                <img src="${product.images[0] || 'https://via.placeholder.com/200x200'}" 
                     alt="${product.name}" 
                     style="width: 200px; height: 200px; object-fit: cover; border-radius: 10px;">
                
                <div style="flex: 1;">
                    <h3 style="margin-bottom: 10px;">${product.name}</h3>
                    <div style="display: flex; gap: 15px; margin-bottom: 15px;">
                        <span class="status-badge status-confirmed">${product.category}</span>
                        <span class="stock-badge ${getStockLevelClass(product.stock)}">
                            ${product.stock} in stock
                        </span>
                        <span>SKU: ${product.sku}</span>
                    </div>
                    
                    <div style="font-size: 1.2rem; font-weight: bold; margin-bottom: 15px;">
                        ${CONFIG.CURRENCY} ${product.price.toFixed(2)}
                    </div>
                    
                    <div style="margin-bottom: 15px;">
                        <strong>Description:</strong>
                        <p>${product.description}</p>
                    </div>
                </div>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                <div>
                    <h4>Product Details</h4>
                    <table style="width: 100%;">
                        <tr>
                            <td><strong>Category:</strong></td>
                            <td>${product.category}</td>
                        </tr>
                        <tr>
                            <td><strong>Status:</strong></td>
                            <td>${product.status === 'active' ? 'Active' : 'Inactive'}</td>
                        </tr>
                        <tr>
                            <td><strong>Created:</strong></td>
                            <td>${formatDate(product.createdAt)}</td>
                        </tr>
                        <tr>
                            <td><strong>Rating:</strong></td>
                            <td>${product.rating} ⭐ (${product.reviews} reviews)</td>
                        </tr>
                    </table>
                </div>
                
                <div>
                    <h4>Inventory & Sales</h4>
                    <table style="width: 100%;">
                        <tr>
                            <td><strong>Current Stock:</strong></td>
                            <td>${product.stock} units</td>
                        </tr>
                        <tr>
                            <td><strong>Units Sold:</strong></td>
                            <td>${product.sold} units</td>
                        </tr>
                        <tr>
                            <td><strong>Total Revenue:</strong></td>
                            <td>${CONFIG.CURRENCY} ${(product.sold * product.price).toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td><strong>Sizes:</strong></td>
                            <td>${product.sizes.join(', ')}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    `;
    
    // Update modal title
    modal.querySelector('.modal-title').textContent = `Product: ${product.name}`;
    
    // Update footer buttons
    const footer = modal.querySelector('.modal-footer');
    footer.innerHTML = `
        <button class="btn btn-outline" onclick="shareProductOnWhatsApp(${product.id})">
            <i class="fab fa-whatsapp"></i> Share on WhatsApp
        </button>
        <button class="btn btn-primary" onclick="editProduct(${product.id})">
            <i class="fas fa-edit"></i> Edit Product
        </button>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function deleteProduct(productId) {
    if (confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
        storeData.products = storeData.products.filter(p => p.id !== productId);
        saveData();
        renderProductsTable();
        showNotification('Product deleted successfully', 'success');
    }
}

function shareProductOnWhatsApp(productId) {
    const product = storeData.products.find(p => p.id === productId);
    if (!product) return;
    
    const message = `Check out this product from ${CONFIG.STORE_NAME}:\n\n` +
                   `*${product.name}*\n` +
                   `Price: ${CONFIG.CURRENCY} ${product.price.toFixed(2)}\n` +
                   `${product.description.substring(0, 100)}...\n\n` +
                   `Order now on WhatsApp!`;
    
    const whatsappUrl = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// ============================
// ORDER MANAGEMENT FUNCTIONS
// ============================
function viewOrder(orderId) {
    const order = storeData.orders.find(o => o.id === orderId);
    if (!order) return;
    
    const content = document.getElementById('orderDetailsContent');
    
    content.innerHTML = `
        <div class="order-details">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
                <div>
                    <h4>Order Information</h4>
                    <table style="width: 100%;">
                        <tr>
                            <td><strong>Order ID:</strong></td>
                            <td>${order.id}</td>
                        </tr>
                        <tr>
                            <td><strong>Order Date:</strong></td>
                            <td>${formatDate(order.createdAt, 'full')}</td>
                        </tr>
                        <tr>
                            <td><strong>Status:</strong></td>
                            <td><span class="status-badge status-${order.status}">${formatStatus(order.status)}</span></td>
                        </tr>
                        <tr>
                            <td><strong>Payment Method:</strong></td>
                            <td>${order.paymentMethod}</td>
                        </tr>
                        <tr>
                            <td><strong>Payment Status:</strong></td>
                            <td><span class="status-badge ${order.paymentStatus === 'paid' ? 'status-confirmed' : 'status-pending'}">${order.paymentStatus}</span></td>
                        </tr>
                    </table>
                </div>
                
                <div>
                    <h4>Customer Information</h4>
                    <table style="width: 100%;">
                        <tr>
                            <td><strong>Name:</strong></td>
                            <td>${order.customerName}</td>
                        </tr>
                        <tr>
                            <td><strong>Phone:</strong></td>
                            <td>${order.customerPhone}</td>
                        </tr>
                        <tr>
                            <td><strong>Email:</strong></td>
                            <td>${order.customerEmail}</td>
                        </tr>
                        <tr>
                            <td><strong>Delivery Address:</strong></td>
                            <td>${order.deliveryAddress}</td>
                        </tr>
                    </table>
                </div>
            </div>
            
            <h4>Order Items</h4>
            <div style="border: 1px solid var(--light-gray); border-radius: 8px; overflow: hidden; margin-bottom: 20px;">
                ${order.items.map(item => `
                    <div style="padding: 15px; border-bottom: 1px solid var(--light-gray); display: flex; align-items: center; gap: 15px;">
                        <div style="flex: 1;">
                            <strong>${item.name}</strong>
                            <div style="font-size: 0.9rem; color: var(--text-light);">
                                ${item.size ? `Size: ${item.size} • ` : ''}${item.color ? `Color: ${item.color} • ` : ''}Qty: ${item.quantity}
                            </div>
                        </div>
                        <div style="font-weight: bold;">
                            ${CONFIG.CURRENCY} ${(item.price * item.quantity).toFixed(2)}
                        </div>
                    </div>
                `).join('')}
                
                <div style="padding: 15px; background-color: var(--light-gray);">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                        <span>Subtotal:</span>
                        <span>${CONFIG.CURRENCY} ${order.subtotal.toFixed(2)}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                        <span>Delivery:</span>
                        <span>${CONFIG.CURRENCY} ${order.delivery.toFixed(2)}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 1.1rem;">
                        <span>Total:</span>
                        <span>${CONFIG.CURRENCY} ${order.total.toFixed(2)}</span>
                    </div>
                </div>
            </div>
            
            ${order.notes ? `
                <div>
                    <h4>Order Notes</h4>
                    <div style="padding: 15px; background-color: rgba(245, 158, 11, 0.1); border-radius: 8px;">
                        ${order.notes}
                    </div>
                </div>
            ` : ''}
        </div>
    `;
    
    // Update modal title
    document.getElementById('orderDetailsModal').querySelector('.modal-title').textContent = `Order: ${order.id}`;
    
    // Show modal
    document.getElementById('orderDetailsModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function editOrder(orderId) {
    const order = storeData.orders.find(o => o.id === orderId);
    if (!order) return;
    
    // Create a simple status update modal
    const modal = document.getElementById('inventoryModal');
    const form = document.getElementById('inventoryForm');
    
    form.innerHTML = `
        <div class="form-group">
            <label>Order Status</label>
            <select id="orderStatusUpdate" class="filter-select">
                <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>Pending</option>
                <option value="confirmed" ${order.status === 'confirmed' ? 'selected' : ''}>Confirmed</option>
                <option value="shipped" ${order.status === 'shipped' ? 'selected' : ''}>Shipped</option>
                <option value="delivered" ${order.status === 'delivered' ? 'selected' : ''}>Delivered</option>
                <option value="cancelled" ${order.status === 'cancelled' ? 'selected' : ''}>Cancelled</option>
            </select>
        </div>
        
        <div class="form-group">
            <label>Payment Status</label>
            <select id="paymentStatusUpdate" class="filter-select">
                <option value="pending" ${order.paymentStatus === 'pending' ? 'selected' : ''}>Pending</option>
                <option value="paid" ${order.paymentStatus === 'paid' ? 'selected' : ''}>Paid</option>
                <option value="refunded" ${order.paymentStatus === 'refunded' ? 'selected' : ''}>Refunded</option>
            </select>
        </div>
        
        <div class="form-group">
            <label>Notes (Optional)</label>
            <textarea id="orderNotesUpdate" rows="3" placeholder="Add any notes about this order...">${order.notes || ''}</textarea>
        </div>
        
        <input type="hidden" id="orderIdToUpdate" value="${orderId}">
    `;
    
    // Update modal title
    modal.querySelector('.modal-title').textContent = `Update Order: ${orderId}`;
    
    // Update save button text
    modal.querySelector('#saveInventoryBtn').textContent = 'Update Order';
    
    // Remove existing event listeners and add new one
    const saveBtn = modal.querySelector('#saveInventoryBtn');
    saveBtn.replaceWith(saveBtn.cloneNode(true));
    
    modal.querySelector('#saveInventoryBtn').addEventListener('click', function() {
        const newStatus = document.getElementById('orderStatusUpdate').value;
        const newPaymentStatus = document.getElementById('paymentStatusUpdate').value;
        const notes = document.getElementById('orderNotesUpdate').value;
        
        order.status = newStatus;
        order.paymentStatus = newPaymentStatus;
        order.notes = notes;
        
        // Add timestamp for status changes
        if (newStatus === 'shipped' && !order.shippedAt) {
            order.shippedAt = new Date().toISOString();
        } else if (newStatus === 'delivered' && !order.deliveredAt) {
            order.deliveredAt = new Date().toISOString();
        }
        
        saveData();
        renderOrdersTable();
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        showNotification(`Order ${orderId} updated successfully`, 'success');
    });
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// ============================
// INVENTORY FUNCTIONS
// ============================
function showUpdateInventoryModal() {
    const modal = document.getElementById('inventoryModal');
    const form = document.getElementById('inventoryForm');
    
    form.innerHTML = `
        <div class="form-group">
            <label>Select Product</label>
            <select id="productToUpdate" class="filter-select">
                <option value="">Select a product...</option>
                ${storeData.products.map(product => `
                    <option value="${product.id}">${product.name} (Current: ${product.stock} units)</option>
                `).join('')}
            </select>
        </div>
        
        <div class="form-group">
            <label>Update Type</label>
            <select id="updateType" class="filter-select">
                <option value="set">Set to specific amount</option>
                <option value="add">Add stock</option>
                <option value="remove">Remove stock</option>
            </select>
        </div>
        
        <div class="form-group">
            <label>Quantity</label>
            <input type="number" id="updateQuantity" min="1" value="1">
        </div>
        
        <div class="form-group">
            <label>Reason (Optional)</label>
            <select id="updateReason" class="filter-select">
                <option value="">Select reason...</option>
                <option value="restock">Restock</option>
                <option value="damaged">Damaged Items</option>
                <option value="return">Customer Return</option>
                <option value="adjustment">Inventory Adjustment</option>
                <option value="other">Other</option>
            </select>
        </div>
        
        <div class="form-group">
            <label>Notes (Optional)</label>
            <textarea id="updateNotes" rows="2" placeholder="Add any notes about this update..."></textarea>
        </div>
    `;
    
    // Reset modal title and button
    modal.querySelector('.modal-title').textContent = 'Update Inventory';
    modal.querySelector('#saveInventoryBtn').textContent = 'Update Stock';
    
    // Remove existing event listeners and add new one
    const saveBtn = modal.querySelector('#saveInventoryBtn');
    saveBtn.replaceWith(saveBtn.cloneNode(true));
    
    modal.querySelector('#saveInventoryBtn').addEventListener('click', updateStock);
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function updateStock() {
    const productId = parseInt(document.getElementById('productToUpdate').value);
    const updateType = document.getElementById('updateType').value;
    const quantity = parseInt(document.getElementById('updateQuantity').value);
    const reason = document.getElementById('updateReason').value;
    const notes = document.getElementById('updateNotes').value;
    
    if (!productId || !quantity) {
        showNotification('Please select a product and enter quantity', 'error');
        return;
    }
    
    const product = storeData.products.find(p => p.id === productId);
    if (!product) {
        showNotification('Product not found', 'error');
        return;
    }
    
    let newStock = product.stock;
    
    switch(updateType) {
        case 'set':
            newStock = quantity;
            break;
        case 'add':
            newStock += quantity;
            break;
        case 'remove':
            newStock = Math.max(0, newStock - quantity);
            break;
    }
    
    const oldStock = product.stock;
    product.stock = newStock;
    
    // Add inventory log
    storeData.inventory.push({
        productId: product.id,
        productName: product.name,
        date: new Date().toISOString(),
        type: updateType,
        quantity: quantity,
        oldStock: oldStock,
        newStock: newStock,
        reason: reason,
        notes: notes
    });
    
    saveData();
    renderInventoryGrid();
    renderProductsTable();
    
    document.getElementById('inventoryModal').classList.remove('active');
    document.body.style.overflow = 'auto';
    
    showNotification(`Inventory updated for ${product.name}: ${oldStock} → ${newStock} units`, 'success');
}

function updateProductStock(productId) {
    const product = storeData.products.find(p => p.id === productId);
    if (!product) return;
    
    const modal = document.getElementById('inventoryModal');
    const form = document.getElementById('inventoryForm');
    
    form.innerHTML = `
        <div class="form-group">
            <label>Product</label>
            <input type="text" value="${product.name}" readonly>
        </div>
        
        <div class="form-group">
            <label>Current Stock</label>
            <input type="number" value="${product.stock}" readonly>
        </div>
        
        <div class="form-group">
            <label>New Stock Quantity</label>
            <input type="number" id="newStockQuantity" min="0" value="${product.stock}">
        </div>
        
        <div class="form-group">
            <label>Reason for Update</label>
            <select id="stockUpdateReason" class="filter-select">
                <option value="restock">Restock</option>
                <option value="damaged">Damaged Items</option>
                <option value="sold">Sold Items</option>
                <option value="adjustment">Inventory Adjustment</option>
                <option value="other">Other</option>
            </select>
        </div>
        
        <div class="form-group">
            <label>Notes (Optional)</label>
            <textarea id="stockUpdateNotes" rows="2" placeholder="Add any notes..."></textarea>
        </div>
        
        <input type="hidden" id="productIdToUpdate" value="${productId}">
    `;
    
    modal.querySelector('.modal-title').textContent = `Update Stock: ${product.name}`;
    
    // Update save button
    const saveBtn = modal.querySelector('#saveInventoryBtn');
    saveBtn.textContent = 'Update Stock';
    saveBtn.replaceWith(saveBtn.cloneNode(true));
    
    modal.querySelector('#saveInventoryBtn').addEventListener('click', function() {
        const newQuantity = parseInt(document.getElementById('newStockQuantity').value);
        const reason = document.getElementById('stockUpdateReason').value;
        const notes = document.getElementById('stockUpdateNotes').value;
        
        if (isNaN(newQuantity) || newQuantity < 0) {
            showNotification('Please enter a valid quantity', 'error');
            return;
        }
        
        const oldStock = product.stock;
        product.stock = newQuantity;
        
        // Log the change
        storeData.inventory.push({
            productId: product.id,
            productName: product.name,
            date: new Date().toISOString(),
            type: 'set',
            quantity: Math.abs(newQuantity - oldStock),
            oldStock: oldStock,
            newStock: newQuantity,
            reason: reason,
            notes: notes
        });
        
        saveData();
        renderInventoryGrid();
        renderProductsTable();
        
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        showNotification(`Stock updated for ${product.name}: ${oldStock} → ${newQuantity} units`, 'success');
    });
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function reorderProduct(productId) {
    const product = storeData.products.find(p => p.id === productId);
    if (!product) return;
    
    const reorderQuantity = Math.max(50, Math.ceil(product.sold / 2)); // Simple reorder logic
    
    if (confirm(`Reorder ${reorderQuantity} units of ${product.name}?`)) {
        product.stock += reorderQuantity;
        saveData();
        renderInventoryGrid();
        showNotification(`Ordered ${reorderQuantity} units of ${product.name}`, 'success');
    }
}

// ============================
// CUSTOMER FUNCTIONS
// ============================
function viewCustomer(customerId) {
    const customer = storeData.customers.find(c => c.id === customerId);
    if (!customer) return;
    
    const customerOrders = storeData.orders.filter(o => o.customerId === customerId);
    
    const modal = document.getElementById('orderDetailsModal');
    const content = document.getElementById('orderDetailsContent');
    
    content.innerHTML = `
        <div class="customer-details">
            <div style="display: flex; align-items: center; gap: 20px; margin-bottom: 30px;">
                <div class="customer-avatar" style="width: 80px; height: 80px; font-size: 2rem;">
                    <i class="fas fa-user-circle"></i>
                </div>
                <div>
                    <h3 style="margin-bottom: 5px;">${customer.name}</h3>
                    <div style="display: flex; gap: 15px; margin-bottom: 10px;">
                        <span><i class="fas fa-phone"></i> ${customer.phone}</span>
                        <span><i class="fas fa-envelope"></i> ${customer.email}</span>
                        <span class="status-badge ${customer.whatsapp ? 'status-confirmed' : 'status-pending'}">
                            ${customer.whatsapp ? 'WhatsApp User' : 'SMS Only'}
                        </span>
                    </div>
                    <div style="color: var(--text-light);">
                        Customer since ${formatDate(customer.joinDate)}
                    </div>
                </div>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; margin-bottom: 30px;">
                <div style="background-color: var(--light-gray); padding: 15px; border-radius: 8px; text-align: center;">
                    <div style="font-size: 1.5rem; font-weight: bold; margin-bottom: 5px;">${customer.totalOrders}</div>
                    <div style="font-size: 0.9rem; color: var(--text-light);">Total Orders</div>
                </div>
                
                <div style="background-color: var(--light-gray); padding: 15px; border-radius: 8px; text-align: center;">
                    <div style="font-size: 1.5rem; font-weight: bold; margin-bottom: 5px;">${CONFIG.CURRENCY} ${customer.totalSpent.toFixed(2)}</div>
                    <div style="font-size: 0.9rem; color: var(--text-light);">Total Spent</div>
                </div>
                
                <div style="background-color: var(--light-gray); padding: 15px; border-radius: 8px; text-align: center;">
                    <div style="font-size: 1.5rem; font-weight: bold; margin-bottom: 5px;">${CONFIG.CURRENCY} ${(customer.totalSpent / customer.totalOrders).toFixed(2)}</div>
                    <div style="font-size: 0.9rem; color: var(--text-light);">Avg. Order Value</div>
                </div>
                
                <div style="background-color: var(--light-gray); padding: 15px; border-radius: 8px; text-align: center;">
                    <div style="font-size: 1.5rem; font-weight: bold; margin-bottom: 5px;">${customer.lastOrder ? formatDate(customer.lastOrder, 'short') : 'N/A'}</div>
                    <div style="font-size: 0.9rem; color: var(--text-light);">Last Order</div>
                </div>
            </div>
            
            <h4>Recent Orders</h4>
            ${customerOrders.length > 0 ? `
                <div style="border: 1px solid var(--light-gray); border-radius: 8px; overflow: hidden;">
                    ${customerOrders.slice(0, 3).map(order => `
                        <div style="padding: 15px; border-bottom: 1px solid var(--light-gray); display: flex; justify-content: space-between; align-items: center;">
                            <div>
                                <strong>${order.id}</strong>
                                <div style="font-size: 0.9rem; color: var(--text-light);">
                                    ${formatDate(order.createdAt)} • ${order.items.length} items
                                </div>
                            </div>
                            <div style="display: flex; gap: 10px; align-items: center;">
                                <span style="font-weight: bold;">${CONFIG.CURRENCY} ${order.total.toFixed(2)}</span>
                                <span class="status-badge status-${order.status}">${formatStatus(order.status)}</span>
                                <button class="btn btn-sm btn-outline" onclick="viewOrder('${order.id}')">View</button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            ` : `
                <div style="text-align: center; padding: 30px; color: var(--text-light);">
                    <i class="fas fa-shopping-bag" style="font-size: 2rem; margin-bottom: 10px;"></i>
                    <p>No orders yet</p>
                </div>
            `}
        </div>
    `;
    
    modal.querySelector('.modal-title').textContent = `Customer: ${customer.name}`;
    
    // Update footer buttons
    const footer = modal.querySelector('.modal-footer');
    footer.innerHTML = `
        <button class="btn btn-outline" onclick="messageCustomer('${customer.phone}', '${customer.name}')">
            <i class="fab fa-whatsapp"></i> Message Customer
        </button>
        <button class="btn btn-primary" onclick="editCustomer(${customer.id})">
            <i class="fas fa-edit"></i> Edit Customer
        </button>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function editCustomer(customerId) {
    const customer = storeData.customers.find(c => c.id === customerId);
    if (!customer) return;
    
    // For demo, just show notification
    showNotification(`Editing customer: ${customer.name}`, 'info');
    // In real app, open edit modal
}

// ============================
// WHATSAPP FUNCTIONS
// ============================
function messageCustomer(phone, name) {
    const message = `Hi ${name}! This is ${CONFIG.STORE_NAME}. How can I help you today?`;
    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

function replyToMessage(phone, name) {
    const message = `Hi ${name}! Thanks for your message. How can I assist you?`;
    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    // Mark as replied in data
    const msg = storeData.whatsappMessages.find(m => m.phone === phone);
    if (msg) {
        msg.replied = true;
        msg.status = 'read';
        saveData();
        updateBadgeCounts();
    }
}

function sendBroadcast() {
    showNotification('Broadcast feature would open in a real implementation', 'info');
}

function createTemplate() {
    showNotification('Template creation would open in a real implementation', 'info');
}

function addTemplate() {
    showNotification('Add template feature would open in a real implementation', 'info');
}

function sendOrderUpdate() {
    showNotification('Order update feature would open in a real implementation', 'info');
}

function sendPaymentReminder() {
    showNotification('Payment reminder feature would open in a real implementation', 'info');
}

function sendNewArrivalAlert() {
    showNotification('New arrival alert feature would open in a real implementation', 'info');
}

function sendSpecialOffer() {
    showNotification('Special offer feature would open in a real implementation', 'info');
}

function refreshWhatsAppMessages() {
    showNotification('Refreshing WhatsApp messages...', 'info');
    // In real app, this would fetch new messages from API
}

function viewMessageDetails(messageId) {
    showNotification(`Viewing message details for ID: ${messageId}`, 'info');
}

// ============================
// SETTINGS FUNCTIONS
// ============================
function saveSettings() {
    const settings = {
        storeName: document.getElementById('storeName').value,
        currency: document.getElementById('storeCurrency').value,
        whatsappNumber: document.getElementById('whatsappNumber').value,
        deliveryFee: parseFloat(document.getElementById('deliveryFee').value),
        freeDeliveryThreshold: parseFloat(document.getElementById('freeDeliveryThreshold').value),
        taxRate: parseFloat(document.getElementById('taxRate').value),
        lowStockThreshold: parseInt(document.getElementById('lowStockThreshold').value),
        autoReorder: document.getElementById('autoReorder').value === 'true',
        reorderQuantity: parseInt(document.getElementById('reorderQuantity').value),
        emailNotifications: document.getElementById('emailNotifications').checked,
        whatsappNotifications: document.getElementById('whatsappNotifications').checked,
        lowStockAlerts: document.getElementById('lowStockAlerts').checked,
        newOrderAlerts: document.getElementById('newOrderAlerts').checked,
        googleAnalyticsId: document.getElementById('googleAnalyticsId').value,
        facebookPixelId: document.getElementById('facebookPixelId').value,
        paymentGateway: document.getElementById('paymentGateway').value
    };
    
    storeData.settings = settings;
    saveData();
    
    // Update config
    CONFIG.CURRENCY = settings.currency;
    CONFIG.WHATSAPP_NUMBER = settings.whatsappNumber;
    
    showNotification('Settings saved successfully', 'success');
}

function exportData(type) {
    let data, filename;
    
    switch(type) {
        case 'products':
            data = storeData.products;
            filename = `fitplug-products-${new Date().toISOString().split('T')[0]}.json`;
            break;
        case 'orders':
            data = storeData.orders;
            filename = `fitplug-orders-${new Date().toISOString().split('T')[0]}.json`;
            break;
        case 'customers':
            data = storeData.customers;
            filename = `fitplug-customers-${new Date().toISOString().split('T')[0]}.json`;
            break;
        default:
            return;
    }
    
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification(`${type.charAt(0).toUpperCase() + type.slice(1)} exported successfully`, 'success');
}

function createBackup() {
    const backup = {
        timestamp: new Date().toISOString(),
        data: storeData
    };
    
    const json = JSON.stringify(backup, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `fitplug-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification('Backup created successfully', 'success');
}

function restoreBackup() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = function(e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        
        reader.onload = function(e) {
            try {
                const backup = JSON.parse(e.target.result);
                
                if (confirm('Are you sure you want to restore from backup? This will replace all current data.')) {
                    storeData = backup.data;
                    saveData();
                    showNotification('Backup restored successfully', 'success');
                    
                    // Refresh current page
                    const activePage = document.querySelector('.nav-link.active').getAttribute('data-page');
                    showPage(activePage);
                }
            } catch (error) {
                showNotification('Error restoring backup: Invalid file format', 'error');
            }
        };
        
        reader.readAsText(file);
    };
    
    input.click();
}

function clearAllData() {
    if (confirm('WARNING: This will delete ALL data including products, orders, and customers. This action cannot be undone. Are you sure?')) {
        if (confirm('Are you REALLY sure? This will permanently delete everything.')) {
            storeData = {
                products: [],
                orders: [],
                customers: [],
                inventory: [],
                notifications: [],
                whatsappMessages: [],
                settings: {},
                analytics: {},
                currentUser: storeData.currentUser,
                isLoggedIn: storeData.isLoggedIn
            };
            
            saveData();
            showPage('dashboard');
            showNotification('All data has been cleared', 'success');
        }
    }
}

function resetToDefault() {
    if (confirm('Reset to default settings? This will keep your data but restore default settings.')) {
        storeData.settings = {
            storeName: "FitPlug",
            currency: "GH₵",
            whatsappNumber: "233598446269",
            deliveryFee: 15.00,
            freeDeliveryThreshold: 100.00,
            taxRate: 0,
            notifications: true,
            lowStockThreshold: 10
        };
        
        saveData();
        showPage('settings');
        showNotification('Settings reset to default', 'success');
    }
}

// ============================
// EXPORT FUNCTIONS
// ============================
function exportProducts() {
    const csvRows = [];
    
    // Add header row
    csvRows.push(['ID', 'Name', 'SKU', 'Category', 'Price', 'Stock', 'Sold', 'Status', 'Description']);
    
    // Add data rows
    storeData.products.forEach(product => {
        csvRows.push([
            product.id,
            product.name,
            product.sku,
            product.category,
            product.price,
            product.stock,
            product.sold,
            product.status,
            product.description.replace(/,/g, ';') // Replace commas to avoid CSV issues
        ]);
    });
    
    downloadCSV(csvRows, `fitplug-products-${new Date().toISOString().split('T')[0]}.csv`);
}

function exportOrders() {
    const csvRows = [];
    
    csvRows.push(['Order ID', 'Customer', 'Date', 'Items', 'Subtotal', 'Delivery', 'Total', 'Status', 'Payment Method', 'Payment Status']);
    
    storeData.orders.forEach(order => {
        csvRows.push([
            order.id,
            order.customerName,
            formatDate(order.createdAt),
            order.items.map(i => `${i.name} (${i.quantity})`).join('; '),
            order.subtotal,
            order.delivery,
            order.total,
            order.status,
            order.paymentMethod,
            order.paymentStatus
        ]);
    });
    
    downloadCSV(csvRows, `fitplug-orders-${new Date().toISOString().split('T')[0]}.csv`);
}

function exportInventory() {
    const csvRows = [];
    
    csvRows.push(['Product', 'SKU', 'Category', 'Current Stock', 'Low Stock Level', 'Status']);
    
    storeData.products.forEach(product => {
        csvRows.push([
            product.name,
            product.sku,
            product.category,
            product.stock,
            storeData.settings.lowStockThreshold,
            product.stock < storeData.settings.lowStockThreshold ? 'Low Stock' : 'OK'
        ]);
    });
    
    downloadCSV(csvRows, `fitplug-inventory-${new Date().toISOString().split('T')[0]}.csv`);
}

function exportCustomers() {
    const csvRows = [];
    
    csvRows.push(['Name', 'Phone', 'Email', 'Total Orders', 'Total Spent', 'Last Order', 'Join Date', 'WhatsApp User']);
    
    storeData.customers.forEach(customer => {
        csvRows.push([
            customer.name,
            customer.phone,
            customer.email,
            customer.totalOrders,
            customer.totalSpent,
            customer.lastOrder || 'N/A',
            customer.joinDate,
            customer.whatsapp ? 'Yes' : 'No'
        ]);
    });
    
    downloadCSV(csvRows, `fitplug-customers-${new Date().toISOString().split('T')[0]}.csv`);
}

function exportAnalytics() {
    const csvRows = [];
    
    // Add analytics data
    csvRows.push(['Metric', 'Value']);
    csvRows.push(['Total Revenue', storeData.orders.reduce((sum, order) => sum + order.total, 0)]);
    csvRows.push(['Total Orders', storeData.orders.length]);
    csvRows.push(['Total Customers', storeData.customers.length]);
    csvRows.push(['Total Products', storeData.products.length]);
    csvRows.push(['Average Order Value', calculateAverageOrderValue()]);
    csvRows.push(['Conversion Rate', calculateConversionRate() + '%']);
    csvRows.push(['Customer Lifetime Value', calculateCustomerLifetimeValue()]);
    csvRows.push(['Repeat Customer Rate', calculateRepeatCustomerRate() + '%']);
    
    downloadCSV(csvRows, `fitplug-analytics-${new Date().toISOString().split('T')[0]}.csv`);
}

function downloadCSV(rows, filename) {
    const csvContent = rows.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification(`File downloaded: ${filename}`, 'success');
}

// ============================
// ANALYTICS CALCULATION FUNCTIONS
// ============================
function calculateAverageOrderValue() {
    if (storeData.orders.length === 0) return 0;
    const totalRevenue = storeData.orders.reduce((sum, order) => sum + order.total, 0);
    return totalRevenue / storeData.orders.length;
}

function calculateConversionRate() {
    // This is a simplified version - in real app, you'd track visitors
    const totalCustomers = storeData.customers.length;
    const estimatedVisitors = totalCustomers * 10; // Assume 10% conversion rate
    return ((totalCustomers / estimatedVisitors) * 100).toFixed(1);
}

function calculateCustomerLifetimeValue() {
    if (storeData.customers.length === 0) return 0;
    const totalRevenue = storeData.orders.reduce((sum, order) => sum + order.total, 0);
    return totalRevenue / storeData.customers.length;
}

function calculateRepeatCustomerRate() {
    const repeatCustomers = storeData.customers.filter(c => c.totalOrders > 1).length;
    return ((repeatCustomers / storeData.customers.length) * 100).toFixed(1);
}

// ============================
// MEDIA FUNCTIONS
// ============================
function uploadMedia() {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = 'image/*,video/*';
    
    input.onchange = function(e) {
        const files = Array.from(e.target.files);
        showNotification(`Uploading ${files.length} files...`, 'info');
        
        // In real app, upload to server
        setTimeout(() => {
            showNotification('Files uploaded successfully!', 'success');
            renderMediaGrid();
        }, 2000);
    };
    
    input.click();
}

function bulkUpload() {
    showNotification('Bulk upload feature would open in a real implementation', 'info');
}

// ============================
// UTILITY FUNCTIONS
// ============================
function formatDate(dateString, format = 'short') {
    const date = new Date(dateString);
    
    if (format === 'short') {
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    } else if (format === 'full') {
        return date.toLocaleDateString('en-GB', {
            weekday: 'long',
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
    
    return date.toLocaleDateString();
}

function formatTime(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} mins ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays < 7) return `${diffDays} days ago`;
    
    return formatDate(dateString, 'short');
}

function formatStatus(status) {
    const statusMap = {
        'pending': 'Pending',
        'confirmed': 'Confirmed',
        'shipped': 'Shipped',
        'delivered': 'Delivered',
        'cancelled': 'Cancelled'
    };
    
    return statusMap[status] || status;
}

function getStockLevelClass(stock) {
    if (stock === 0) return 'stock-low';
    if (stock < 10) return 'stock-low';
    if (stock < 50) return 'stock-medium';
    return 'stock-ok';
}

function getStockLevelText(stock) {
    if (stock === 0) return 'Out of Stock';
    if (stock < 10) return 'Low Stock';
    if (stock < 50) return 'Medium Stock';
    return 'High Stock';
}

function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.admin-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `admin-notification notification-${type}`;
    
    // Set icon based on type
    let icon = 'info-circle';
    if (type === 'success') icon = 'check-circle';
    if (type === 'error') icon = 'exclamation-circle';
    if (type === 'warning') icon = 'exclamation-triangle';
    
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${icon}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    // Add styles if not already added
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .admin-notification {
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
                border-left-color: #10B981;
            }
            
            .notification-error {
                border-left-color: #EF4444;
            }
            
            .notification-warning {
                border-left-color: #F59E0B;
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
                color: #10B981;
            }
            
            .notification-error .notification-content i {
                color: #EF4444;
            }
            
            .notification-warning .notification-content i {
                color: #F59E0B;
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
        document.head.appendChild(styles);
    }
    
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

function showLogin() {
    document.getElementById('loginContainer').style.display = 'block';
    document.getElementById('adminContainer').style.display = 'none';
}

function showDashboard() {
    document.getElementById('loginContainer').style.display = 'none';
    document.getElementById('adminContainer').style.display = 'block';
    
    // Update username display
    if (storeData.currentUser) {
        document.getElementById('adminUsername').textContent = storeData.currentUser.username;
    }
    
    // Load dashboard by default
    showPage('dashboard');
}

// ============================
// INITIALIZATION
// ============================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize data
    initializeData();
    
    // Check authentication
    checkAuth();
    
    // Login form submission
    document.getElementById('loginForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        if (login(username, password)) {
            // Success - handled by login function
        }
    });
    
    // Logout button
    document.getElementById('logoutBtn')?.addEventListener('click', logout);
    
    // Sidebar toggle
    document.getElementById('sidebarToggle')?.addEventListener('click', function() {
        document.getElementById('adminSidebar').classList.toggle('collapsed');
    });
    
    // Navigation clicks
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            if (page) {
                showPage(page);
            }
        });
    });
    
    // Global search
    document.getElementById('globalSearch')?.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        
        if (query.length >= 2) {
            // In a real app, you would implement search across all pages
            showNotification(`Searching for: ${query}`, 'info');
        }
    });
    
    // Refresh button
    document.getElementById('refreshBtn')?.addEventListener('click', function() {
        // Reload current page
        const activePage = document.querySelector('.nav-link.active').getAttribute('data-page');
        showPage(activePage);
        showNotification('Data refreshed', 'success');
    });
    
    // Notifications button
    document.getElementById('notificationsBtn')?.addEventListener('click', function() {
        // Show notifications modal
        showNotification('Notifications feature would open in a real implementation', 'info');
    });
    
    // WhatsApp button
    document.getElementById('whatsappBtn')?.addEventListener('click', function() {
        showNotification('WhatsApp messages feature would open in a real implementation', 'info');
    });
    
    // Modal close buttons
    document.querySelectorAll('.modal-close, .btn-outline').forEach(btn => {
        if (btn.id.includes('cancel') || btn.id.includes('close')) {
            btn.addEventListener('click', function() {
                this.closest('.modal').classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        }
    });
    
    // Close modals on outside click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });
    
    // Add product modal save button
    document.getElementById('saveProductBtn')?.addEventListener('click', function(e) {
        e.preventDefault();
        
        const productData = {
            id: storeData.products.length > 0 ? Math.max(...storeData.products.map(p => p.id)) + 1 : 1,
            name: document.getElementById('productName').value,
            price: parseFloat(document.getElementById('productPrice').value),
            category: document.getElementById('productCategory').value,
            stock: parseInt(document.getElementById('productStock').value),
            description: document.getElementById('productDescription').value,
            sizes: document.getElementById('productSizes').value.split(',').map(s => s.trim()).filter(s => s),
            colors: document.getElementById('productColors').value.split(',').map(c => c.trim()).filter(c => c),
            images: ['https://via.placeholder.com/400x400?text=New+Product'],
            sold: 0,
            rating: 0,
            reviews: 0,
            status: 'active',
            createdAt: new Date().toISOString(),
            sku: `FP${String(storeData.products.length + 1).padStart(3, '0')}`
        };
        
        if (!productData.name || !productData.price || !productData.category || !productData.stock) {
            showNotification('Please fill all required fields', 'error');
            return;
        }
        
        storeData.products.push(productData);
        saveData();
        
        document.getElementById('addProductModal').classList.remove('active');
        document.body.style.overflow = 'auto';
        document.getElementById('productForm').reset();
        
        showNotification('Product added successfully!', 'success');
        
        // Refresh products page if active
        if (document.querySelector('.nav-link.active[data-page="products"]')) {
            showPage('products');
        }
    });
    
    // Image upload preview for product form
    const imageUploadInput = document.getElementById('productImages');
    const imagePreview = document.getElementById('imagePreview');
    
    if (imageUploadInput && imagePreview) {
        imageUploadInput.addEventListener('change', function() {
            imagePreview.innerHTML = '';
            
            Array.from(this.files).forEach((file, index) => {
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    
                    reader.onload = function(e) {
                        const previewDiv = document.createElement('div');
                        previewDiv.className = 'preview-image';
                        previewDiv.innerHTML = `
                            <img src="${e.target.result}" alt="Preview ${index + 1}">
                            <div class="preview-remove" data-index="${index}">×</div>
                        `;
                        
                        imagePreview.appendChild(previewDiv);
                        
                        // Add remove functionality
                        previewDiv.querySelector('.preview-remove').addEventListener('click', function() {
                            previewDiv.remove();
                        });
                    };
                    
                    reader.readAsDataURL(file);
                }
            });
        });
    }
    
    // Initialize default page
    if (storeData.isLoggedIn) {
        showPage('dashboard');
    }
});