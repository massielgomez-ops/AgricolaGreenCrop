// Base de datos de productos por categoría
const productsByCategory = {
    inicio: [  // FERTILIZANTES INICIO Y PRE-FLORACIÓN
        { 
            id: 1, 
            name: "Poly-Feed 8-52-17", 
            category: "FERTILIZANTES INICIO Y PRE-FLORACIÓN", 
            price: 45.99,
            // ¡IMPORTANTE! El archivo en la imagen se llama poly-feed.jpeg, pero el ID 1 usa poly-feed-8-52-17.jpg. 
            // Usaré el nombre del JS, pero podrías tener que renombrar tu archivo.
            image: "poly-feed.jpeg" 
        },
        { 
            id: 2, 
            name: "Starter Plus 12-40-12", 
            category: "FERTILIZANTES INICIO Y PRE-FLORACIÓN", 
            price: 42.50,
            image: "2.jpeg" // Usando 2.jpeg de la estructura de carpetas
        }
    ],
    fosfatados: [
        { 
            id: 3, 
            name: "Fosfato Diamónico", 
            category: "FERTILIZANTES FOSFATADOS", 
            price: 45.99,
            image: "fosfato.png" // Usando fosfato.png de la estructura de carpetas
        },
        { 
            id: 4, 
            name: "Superfosfato Triple", 
            category: "FERTILIZANTES FOSFATADOS", 
            price: 38.50,
            image: "3.jpg" // Usando 3.jpg de la estructura de carpetas
        },
        { 
            id: 5, 
            name: "Fosfato Monoamónico", 
            category: "FERTILIZANTES FOSFATADOS", 
            price: 52.75,
            image: "5.jpg" // Usando 5.jpg de la estructura de carpetas
        }
    ],
    vegetativo: [  // DESARROLLO VEGETATIVO
        { 
            id: 6, 
            name: "Nitro Grow 20-10-10", 
            category: "DESARROLLO VEGETATIVO", 
            price: 35.99,
            image: "6.webp"
        },
        { 
            id: 7, 
            name: "Veggie Boost 15-5-15", 
            category: "DESARROLLO VEGETATIVO", 
            price: 40.25,
            image: "7.webp"
        }
    ],
    potasicos: [
        { 
            id: 8, 
            name: "Cloruro de Potasio", 
            category: "FERTILIZANTES POTÁSICOS", 
            price: 29.80,
            image: "8.jpeg"
        },
        { 
            id: 9, 
            name: "Sulfato de Potasio", 
            category: "FERTILIZANTES POTÁSICOS", 
            price: 55.40,
            image: "9.gif"
        }
    ],
    multiproposito: [
        { 
            id: 10, 
            name: "All Purpose 10-10-10", 
            category: "MULTIPROPÓSITO", 
            price: 32.99,
            image: "10.jpg"
        },
        { 
            id: 11, 
            name: "Universal Mix 12-12-12", 
            category: "MULTIPROPÓSITO", 
            price: 35.75,
            image: "huerto.jpeg" // Ejemplo de uso
        }
    ],
    magnesicos: [
        { 
            id: 12, 
            name: "K-Mag / Sulpomag", 
            category: "FERTILIZANTES MAGNÉSICOS", 
            price: 25.99,
            image: "magnesio.jpeg"
        },
        { 
            id: 13, 
            name: "Sulfato de Magnesio", 
            category: "FERTILIZANTES MAGNÉSICOS", 
            price: 28.75,
            image: "descarga.jpeg" // Ejemplo de uso
        }
    ],
    fruto: [  // DESARROLLO Y LLENADO DE FRUTO
        { 
            id: 14, 
            name: "Fruit Fill 5-15-30", 
            category: "DESARROLLO Y LLENADO DE FRUTO", 
            price: 44.99,
            image: "papa.jpeg" // Ejemplo de uso
        },
        { 
            id: 15, 
            name: "Bloom Booster 2-10-20", 
            category: "DESARROLLO Y LLENADO DE FRUTO", 
            price: 47.25,
            image: "compuesto.jpeg" // Ejemplo de uso
        }
    ],
    micronutrientes: [
        { 
            id: 16, 
            name: "Micro Mix Complete", 
            category: "MICRONUTRIENTES", 
            price: 28.99,
            image: "micronutrientes.jpeg"
        },
        { 
            id: 17, 
            name: "Zinc Chelate", 
            category: "MICRONUTRIENTES", 
            price: 34.50,
            image: "images (2).jpeg" // Ejemplo de uso
        }
    ],
    compuestos: [
        { 
            id: 18, 
            name: "NPK Compound 15-15-15", 
            category: "FERTILIZANTES COMPUESTOS", 
            price: 43.99,
            image: "images (1).jpeg" // Ejemplo de uso
        },
        { 
            id: 19, 
            name: "Complex Blend 8-8-8", 
            category: "FERTILIZANTES COMPUESTOS", 
            price: 39.50,
            image: "images.jpeg" // Ejemplo de uso
        }
    ],
    molinax: [
        { 
            id: 20, 
            name: "MolinaX Special", 
            category: "MEZCLAS MOLINAX", 
            price: 52.99,
            image: "descarga.jpeg" 
        },
        { 
            id: 21, 
            name: "MolinaX Premium", 
            category: "MEZCLAS MOLINAX", 
            price: 58.75,
            image: "descarga.jpeg"
        }
    ],
    especificas: [
        { 
            id: 22, 
            name: "Tomato Special Mix", 
            category: "MEZCLAS ESPECÍFICAS", 
            price: 47.99,
            image: "descarga.jpeg"
        },
        { 
            id: 23, 
            name: "Corn Formula", 
            category: "MEZCLAS ESPECÍFICAS", 
            price: 44.50,
            image: "descarga.jpeg"
        }
    ],
    quimicas: [
        { 
            id: 24, 
            name: "Chemical Formula A", 
            category: "MEZCLAS QUÍMICAS Y FORMULACIONES", 
            price: 55.99,
            image: "descarga.jpeg"
        },
        { 
            id: 25, 
            name: "Advanced Formula B", 
            category: "MEZCLAS QUÍMICAS Y FORMULACIONES", 
            price: 62.50,
            image: "descarga.jpeg"
        }
    ],
    hidrosolubles: [
        { 
            id: 26, 
            name: "Hydro Grow 20-20-20", 
            category: "FERTILIZANTES HIDROSOLUBLES", 
            price: 36.99,
            image: "hidrosoluble.jpeg"
        },
        { 
            id: 27, 
            name: "Water Soluble Bloom", 
            category: "FERTILIZANTES HIDROSOLUBLES", 
            price: 41.25,
            image: "descarga.jpeg"
        }
    ],
    foliares: [
        { 
            id: 28, 
            name: "Foliar Feed Plus", 
            category: "FERTILIZANTES FOLIARES", 
            price: 29.99,
            image: "foliares.jpeg"
        },
        { 
            id: 29, 
            name: "Leaf Nutrition Spray", 
            category: "FERTILIZANTES FOLIARES", 
            price: 33.75,
            image: "descarga.jpeg"
        }
    ],
    nitrogenados: [
        { 
            id: 30, 
            name: "Urea 46%", 
            category: "FERTILIZANTES NITROGENADOS", 
            price: 35.90,
            image: "descarga.jpeg"
        },
        { 
            id: 31, 
            name: "Nitrato de Amonio", 
            category: "FERTILIZANTES NITROGENADOS", 
            price: 48.60,
            image: "descarga.jpeg"
        }
    ]
};

// Variables globales
let currentCategory = 'fosfatados';
let cart = [];

// Ruta base para las imágenes (ajustada a la estructura de carpetas 'static/img')
const IMAGE_BASE_PATH = 'static/img/';
const PLACEHOLDER_IMAGE = 'placeholder.jpg'; // Asegúrate de tener esta imagen en static/img/

// Función para obtener la ruta de la imagen, reemplazando la lógica de url_for
function getImagePath(imageFileName) {
    // Si la ruta del JS es diferente a la raíz, ajusta la ruta.
    // Asumiendo que el JS está en una carpeta y 'static' está al mismo nivel.
    // Ejemplo: /js/script.js -> ../static/img/filename
    // Si el JS está en la raíz, es: static/img/filename
    // Usaremos la ruta absoluta desde la raíz para evitar problemas: /static/img/filename
    return `/${IMAGE_BASE_PATH}${imageFileName}`;
}

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
    // Asegurarse de que el índice es válido
    if (index >= 0 && index < cart.length) {
        cart[index].quantity += change;
        
        if (cart[index].quantity <= 0) {
            // Eliminar si la cantidad llega a 0 o menos
            cart.splice(index, 1);
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartModal();
        updateCartCount();
    } else {
        console.error('❌ Índice de carrito inválido:', index);
    }
}

// Actualizar contador del carrito
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        console.log('🔢 Contador actualizado:', totalItems, 'productos en el carrito');
    } else {
        // Este error puede ser esperado si el JS se carga antes de que el HTML esté listo
        console.error('❌ Elemento .cart-count no encontrado');
    }
}

// Actualizar modal del carrito
function updateCartModal() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    console.log('🔄 Actualizando modal del carrito, productos:', cart);
    
    if (!cartItems || !cartTotal) {
        // Puede que no estemos en la página que tiene el modal
        console.warn('⚠️ Elementos del modal (cart-items o cart-total) no encontrados. Saltando actualización del modal.');
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
            const productImageName = product ? product.image : PLACEHOLDER_IMAGE;
            
            const cartItemElement = document.createElement('div');
            cartItemElement.className = 'cart-item';
            
            // Reemplazo de {{ url_for(...) }} por getImagePath()
            const imagePath = getImagePath(productImageName);
            const placeholderPath = getImagePath(PLACEHOLDER_IMAGE);

            cartItemElement.innerHTML = `
                <div class="cart-item-image">
                    <img src="${imagePath}" 
                        alt="${item.name}" 
                        class="cart-product-image"
                        onerror="this.src='${placeholderPath}'">
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
    // Convertir el ID a número ya que los IDs en el carrito pueden ser strings
    const productId = parseInt(id); 
    for (const category in productsByCategory) {
        // Usar triple igualdad (===) si se asegura que todos los IDs son números.
        const product = productsByCategory[category].find(item => item.id === productId);
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
        transition: opacity 0.5s ease-in-out;
        opacity: 0; /* Empieza oculto para la animación */
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Iniciar animación de entrada
    setTimeout(() => {
        notification.style.opacity = 1;
    }, 10); // Pequeño retraso para que el navegador aplique 'opacity: 0'

    // Retardo para la eliminación
    setTimeout(() => {
        notification.style.opacity = 0; // Iniciar animación de salida
        setTimeout(() => {
            notification.remove();
        }, 500); // Esperar que termine la transición de salida
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

    // Manejo de errores para elementos que pueden no estar en todas las páginas
    const cartElementsExist = cartIcon && cartSystem && closeCart && overlay;

    if (!cartElementsExist) {
        console.warn('⚠️ No se encontraron todos los elementos del carrito (Icono, Modal, Cierre, Overlay). El sistema del carrito se inicializa parcialmente para el conteo y localStorage.');
        updateCartCount(); // Asegurarse de que el contador se actualice si existe
        return; // Salir si falta un elemento crítico para la interfaz del modal
    }

    // Abrir carrito
    cartIcon.addEventListener('click', function() {
        console.log('📂 Abriendo carrito...');
        cartSystem.classList.add('open');
        overlay.classList.add('active');
        updateCartModal(); // Asegurarse de que el modal esté al día
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
                // **NOTA:** El redireccionamiento a 'formulario_compra' es una función de backend.
                // Aquí solo se mostrará el alert para mantener el código solo JS de frontend.
                // window.location.href = "/formulario_compra"; // Descomentar y ajustar ruta si es necesario
            }
        });
    }

    // Actualizar interfaz
    updateCartCount();
    updateCartModal();
    
    console.log('✅ Sistema del carrito inicializado correctamente');
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
        
        // Reemplazo de {{ url_for(...) }} por getImagePath()
        const imagePath = getImagePath(product.image);
        const placeholderPath = getImagePath(PLACEHOLDER_IMAGE);

        // Escapar comillas en el nombre del producto para la función onclick
        const escapedProductName = product.name.replace(/'/g, "\\'");

        productCard.innerHTML = `
            <div class="product-image-container">
                <img src="${imagePath}" 
                    alt="${product.name}" 
                    class="product-image"
                    onerror="this.src='${placeholderPath}'">
            </div>
            <div class="product-category">${product.category}</div>
            <h3 class="product-name">${product.name}</h3>
            <div class="product-price">$${product.price.toFixed(2)}</div>
            <button class="add-to-cart-btn" onclick="addToCart(${product.id}, '${escapedProductName}', ${product.price})">
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
        // Buscar el nombre de la categoría en el atributo onclick
        if (link.getAttribute('onclick') && link.getAttribute('onclick').includes(`showCategory('${activeCategory}')`)) {
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
            // Volver a mostrar la categoría actual cuando la búsqueda se borra
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
        // Cierra las sugerencias al hacer clic fuera del input y la lista
        if (!searchInput.contains(e.target) && !suggestionsList.contains(e.target)) {
            suggestionsList.style.display = 'none';
        }
    });
}

function getAllProducts() {
    const allProducts = [];
    for (const category in productsByCategory) {
        // Asegurarse de que el valor sea un array antes de hacer spread
        if (Array.isArray(productsByCategory[category])) {
            allProducts.push(...productsByCategory[category]);
        }
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
    
    // Al buscar, desactiva la categoría activa visualmente
    document.querySelectorAll('.categories-list a').forEach(link => {
        link.classList.remove('active');
    });
    
    displayProducts(results);
}

// ========== INICIALIZACIÓN ==========
document.addEventListener('DOMContentLoaded', function() {
    console.log('🌐 Página completamente cargada');
    console.log('🔍 Verificando elementos del DOM...');
    
    // Inicializar sistemas
    initializeSearch();
    initializeCart();
    
    // Mostrar la categoría por defecto (fosfatados)
    // Esto debe hacerse después de la inicialización si la función showCategory
    // necesita que el DOM esté completamente cargado.
    showCategory('fosfatados');
    
    console.log('🎉 Todos los sistemas inicializados');
    console.log('💡 Para probar: Haz clic en "AÑADIR AL CARRITO" y revisa la consola');
});