// Base de datos de productos por categoría
// Base de datos de productos por categoría con imágenes
const productsByCategory = {
    fosfatados: [
        { 
            id: 1, 
            name: "Fosfato Diamónico", 
            category: "FERTILIZANTES FOSFATADOS", 
            price: 45.99,
            image: "fosfato-diamonico.jpg"
        },
        { 
            id: 2, 
            name: "Superfosfato Triple", 
            category: "FERTILIZANTES FOSFATADOS", 
            price: 38.50,
            image: "superfosfato-triple.jpg"
        },
        { 
            id: 3, 
            name: "Fosfato Monoamónico Granular", 
            category: "FERTILIZANTES FOSFATADOS", 
            price: 52.75,
            image: "fosfato-monoamonico.jpg"
        },
        { 
            id: 4, 
            name: "MicroEssentials SZ", 
            category: "FERTILIZANTES FOSFATADOS", 
            price: 67.20,
            image: "microessentials-sz.jpg"
        }
    ],
    magnesicos: [
        { 
            id: 5, 
            name: "K-Mag / Sulpomag", 
            category: "FERTILIZANTES MAGNÉSICOS", 
            price: 25.99,
            image: "k-mag.jpg"
        },
        { 
            id: 6, 
            name: "Kieserita", 
            category: "FERTILIZANTES MAGNÉSICOS", 
            price: 32.50,
            image: "kieserita.jpg"
        },
        { 
            id: 7, 
            name: "Sulfato de Magnesio", 
            category: "FERTILIZANTES MAGNÉSICOS", 
            price: 28.75,
            image: "sulfato-magnesio.jpg"
        },
        { 
            id: 8, 
            name: "Óxido de Magnesio", 
            category: "FERTILIZANTES MAGNÉSICOS", 
            price: 42.30,
            image: "oxido-magnesio.jpg"
        }
    ],
    potasicos: [
        { 
            id: 9, 
            name: "Cloruro de Potasio", 
            category: "FERTILIZANTES POTÁSICOS", 
            price: 29.80,
            image: "cloruro-potasio.jpg"
        },
        { 
            id: 10, 
            name: "Sulfato de Potasio", 
            category: "FERTILIZANTES POTÁSICOS", 
            price: 55.40,
            image: "sulfato-potasio.jpg"
        }
    ],
    nitrogenados: [
        { 
            id: 11, 
            name: "Urea 46%", 
            category: "FERTILIZANTES NITROGENADOS", 
            price: 35.90,
            image: "urea-46.jpg"
        },
        { 
            id: 12, 
            name: "Nitrato de Amonio", 
            category: "FERTILIZANTES NITROGENADOS", 
            price: 48.60,
            image: "nitrato-amonio.jpg"
        }
    ]
};

// Variables globales
let currentCategory = 'fosfatados';
let cart = [];

// ========== SISTEMA DEL CARRITO ==========

// Función para inicializar el carrito desde localStorage
function initializeCartFromStorage() {
    try {
        const savedCart = localStorage.getItem('cart');
        console.log('📦 Carrito guardado en localStorage:', savedCart);
        
        if (savedCart) {
            cart = JSON.parse(savedCart);
            console.log('🛒 Carrito cargado desde localStorage:', cart);
        } else {
            cart = [];
            console.log('🛒 Carrito inicializado vacío');
        }
    } catch (error) {
        console.error('❌ Error al cargar el carrito:', error);
        cart = [];
    }
}

// Función para agregar producto al carrito
function addToCart(id, name, price) {
    console.log('🔄 Intentando agregar producto:', { id, name, price });
    
    // Verificar si el producto ya está en el carrito
    const existingItemIndex = cart.findIndex(item => item.id == id);
    
    if (existingItemIndex !== -1) {
        // Si ya existe, aumentar la cantidad
        cart[existingItemIndex].quantity += 1;
        console.log('📈 Producto existente, cantidad aumentada:', cart[existingItemIndex]);
    } else {
        // Si no existe, agregar nuevo producto
        cart.push({
            id: id,
            name: name,
            price: price,
            quantity: 1
        });
        console.log('🆕 Nuevo producto agregado:', cart[cart.length - 1]);
    }
    
    // Guardar en localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log('💾 Carrito guardado en localStorage:', cart);
    
    // Actualizar interfaz
    updateCartCount();
    updateCartModal();
    
    // Mostrar notificación
    showNotification(`✅ ${name} añadido al carrito`);
}

// Función para eliminar producto del carrito
function removeFromCart(index) {
    console.log('🗑️ Eliminando producto del índice:', index);
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartModal();
    updateCartCount();
}

// Función para actualizar cantidad
function updateQuantity(index, change) {
    console.log('🔢 Actualizando cantidad:', { index, change });
    cart[index].quantity += change;
    
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartModal();
    updateCartCount();
}

// Actualizar contador del carrito
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        console.log('🔢 Contador actualizado:', totalItems, 'productos en el carrito');
    } else {
        console.error('❌ Elemento .cart-count no encontrado');
    }
}

// Actualizar modal del carrito
function updateCartModal() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    console.log('🔄 Actualizando modal del carrito, productos:', cart);
    
    if (!cartItems) {
        console.error('❌ Elemento cart-items no encontrado');
        return;
    }
    
    if (!cartTotal) {
        console.error('❌ Elemento cart-total no encontrado');
        return;
    }
    
    cartItems.innerHTML = '';
    let total = 0;
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart" style="text-align: center; color: #666; padding: 20px;">Tu carrito está vacío</p>';
        if (checkoutBtn) checkoutBtn.disabled = true;
        console.log('📭 Carrito vacío mostrado');
    } else {
        if (checkoutBtn) checkoutBtn.disabled = false;
        
        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            
            // Buscar la imagen del producto en la base de datos
            const product = findProductById(item.id);
            const productImage = product ? product.image : 'placeholder.jpg';
            
            const cartItemElement = document.createElement('div');
            cartItemElement.className = 'cart-item';
            cartItemElement.innerHTML = `
                <div class="cart-item-image">
                    <img src="{{ url_for('static', filename='img/products/${productImage}') }}" 
                         alt="${item.name}" 
                         class="cart-product-image"
                         onerror="this.src='{{ url_for('static', filename='img/products/placeholder.jpg') }}'">
                </div>
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)} c/u</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">-</button>
                        <span style="margin: 0 10px; font-weight: bold;">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>
                    </div>
                </div>
                <button class="remove-item" onclick="removeFromCart(${index})">🗑️</button>
            `;
            
            cartItems.appendChild(cartItemElement);
        });
        
        console.log('📦 Productos mostrados en el modal:', cart.length, 'productos');
    }
    
    cartTotal.textContent = total.toFixed(2);
    console.log('💰 Total calculado: $' + total.toFixed(2));
}

// Función auxiliar para encontrar producto por ID
function findProductById(id) {
    for (const category in productsByCategory) {
        const product = productsByCategory[category].find(item => item.id == id);
        if (product) return product;
    }
    return null;
}

// Función para mostrar notificaciones
function showNotification(message) {
    console.log('🔔 Mostrando notificación:', message);
    
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #2d5016;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 1001;
        font-weight: bold;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Inicializar sistema del carrito
function initializeCart() {
    console.log('🚀 Inicializando sistema del carrito...');
    
    // Cargar carrito desde localStorage
    initializeCartFromStorage();
    
    const cartIcon = document.getElementById('header-cart-icon');
    const cartSystem = document.getElementById('cart-system');
    const closeCart = document.getElementById('close-cart');
    const overlay = document.getElementById('overlay');
    const checkoutBtn = document.getElementById('checkout-btn');

    // Verificar que todos los elementos existan
    if (!cartIcon) console.error('❌ header-cart-icon no encontrado');
    if (!cartSystem) console.error('❌ cart-system no encontrado');
    if (!closeCart) console.error('❌ close-cart no encontrado');
    if (!overlay) console.error('❌ overlay no encontrado');
    if (!checkoutBtn) console.error('❌ checkout-btn no encontrado');

    if (!cartIcon || !cartSystem || !closeCart || !overlay) {
        console.error('❌ Elementos del carrito no encontrados en el DOM');
        return;
    }

    // Abrir carrito
    cartIcon.addEventListener('click', function() {
        console.log('📂 Abriendo carrito...');
        cartSystem.classList.add('open');
        overlay.classList.add('active');
        updateCartModal();
    });

    // Cerrar carrito
    closeCart.addEventListener('click', function() {
        console.log('📁 Cerrando carrito...');
        cartSystem.classList.remove('open');
        overlay.classList.remove('active');
    });

    // Cerrar carrito al hacer clic en el overlay
    overlay.addEventListener('click', function() {
        console.log('📁 Cerrando carrito desde overlay...');
        cartSystem.classList.remove('open');
        overlay.classList.remove('active');
    });

    // Procesar compra
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            if (cart.length === 0) {
                alert('Tu carrito está vacío. Añade algunos productos antes de proceder al pago.');
            } else {
                const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                alert(`Redirigiendo al proceso de pago...\nTotal: $${total.toFixed(2)}`);
                // window.location.href = "{{ url_for('formulario_compra') }}";
            }
        });
    }

    // Actualizar interfaz
    updateCartCount();
    updateCartModal();
    
    console.log('✅ Sistema del carrito inicializado correctamente');
    console.log('🔍 Estado inicial - Carrito:', cart);
    console.log('🔍 Estado inicial - Contador:', document.querySelector('.cart-count')?.textContent);
}

// ========== SISTEMA DE PRODUCTOS Y BÚSQUEDA ==========

// Función para mostrar productos de una categoría
function showCategory(category) {
    console.log('📋 Cambiando a categoría:', category);
    currentCategory = category;
    const products = productsByCategory[category] || [];
    displayProducts(products);
    updateActiveCategory(category);
}

// Función para mostrar productos
function displayProducts(products) {
    const productsGrid = document.getElementById('products-grid');
    if (!productsGrid) {
        console.error('❌ products-grid no encontrado');
        return;
    }
    
    productsGrid.innerHTML = '';

    if (products.length === 0) {
        productsGrid.innerHTML = '<p class="no-products">No hay productos disponibles en esta categoría.</p>';
        return;
    }

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image-container">
                <img src="{{ url_for('static', filename='img/products/${product.image}') }}" 
                    alt="${product.name}" 
                    class="product-image"
                    onerror="this.src='{{ url_for('static', filename='img/products/placeholder.jpg') }}'">
            </div>
            <div class="product-category">${product.category}</div>
            <h3 class="product-name">${product.name}</h3>
            <div class="product-price">$${product.price.toFixed(2)}</div>
            <button class="add-to-cart-btn" onclick="addToCart(${product.id}, '${product.name.replace(/'/g, "\\'")}', ${product.price})">
                AÑADIR AL CARRITO
            </button>
        `;
        productsGrid.appendChild(productCard);
    });
    
    console.log('📦 Productos mostrados:', products.length);
} 


// Función para actualizar categoría activa
function updateActiveCategory(activeCategory) {
    document.querySelectorAll('.categories-list a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('onclick').includes(activeCategory)) {
            link.classList.add('active');
        }
    });
}

// Sistema de búsqueda
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    const suggestionsList = document.getElementById('suggestionsList');

    if (!searchInput || !suggestionsList) {
        console.error('❌ Elementos de búsqueda no encontrados');
        return;
    }

    searchInput.addEventListener('input', function(e) {
        const query = e.target.value.toLowerCase().trim();
        
        if (query.length === 0) {
            suggestionsList.style.display = 'none';
            showCategory(currentCategory);
            return;
        }

        const allProducts = getAllProducts();
        const results = allProducts.filter(product => 
            product.name.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query)
        );

        showSuggestions(results, query);
    });

    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch(this.value);
            suggestionsList.style.display = 'none';
        }
    });

    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !suggestionsList.contains(e.target)) {
            suggestionsList.style.display = 'none';
        }
    });
}

function getAllProducts() {
    const allProducts = [];
    for (const category in productsByCategory) {
        allProducts.push(...productsByCategory[category]);
    }
    return allProducts;
}

function showSuggestions(products, query) {
    const suggestionsList = document.getElementById('suggestionsList');
    suggestionsList.innerHTML = '';
    
    if (products.length === 0) {
        suggestionsList.innerHTML = '<li class="no-results">No se encontraron productos</li>';
    } else {
        products.slice(0, 5).forEach(product => {
            const li = document.createElement('li');
            li.className = 'suggestion-item';
            li.textContent = product.name;
            li.onclick = () => {
                document.getElementById('searchInput').value = product.name;
                performSearch(product.name);
                suggestionsList.style.display = 'none';
            };
            suggestionsList.appendChild(li);
        });
    }
    
    suggestionsList.style.display = 'block';
}

function performSearch(query) {
    const allProducts = getAllProducts();
    const results = allProducts.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
    );
    
    displayProducts(results);
}

// ========== INICIALIZACIÓN ==========
document.addEventListener('DOMContentLoaded', function() {
    console.log('🌐 Página completamente cargada');
    console.log('🔍 Verificando elementos del DOM...');
    
    // Verificar elementos críticos
    console.log('📍 products-grid:', document.getElementById('products-grid') ? '✅ Encontrado' : '❌ No encontrado');
    console.log('📍 header-cart-icon:', document.getElementById('header-cart-icon') ? '✅ Encontrado' : '❌ No encontrado');
    console.log('📍 cart-system:', document.getElementById('cart-system') ? '✅ Encontrado' : '❌ No encontrado');
    console.log('📍 cart-items:', document.getElementById('cart-items') ? '✅ Encontrado' : '❌ No encontrado');
    console.log('📍 cart-total:', document.getElementById('cart-total') ? '✅ Encontrado' : '❌ No encontrado');
    
    // Inicializar sistemas
    showCategory('fosfatados');
    initializeSearch();
    initializeCart();
    
    console.log('🎉 Todos los sistemas inicializados');
    console.log('💡 Para probar: Haz clic en "AÑADIR AL CARRITO" y revisa la consola');
});