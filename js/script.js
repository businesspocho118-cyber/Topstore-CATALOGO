// TOP STORES - Catálogo Premium v3
// ULTRA-PREMIUM LUXURY JAVASCRIPT

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // Mobile Menu
    // ========================================
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close menu when clicking links
        navMenu.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
    
    // ========================================
    // Header Scroll Effect
    // ========================================
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // ========================================
    // Back to Top
    // ========================================
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        backToTop.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    // ========================================
    // Page Load Animation
    // ========================================
    const cards = document.querySelectorAll('.preview-card');
    cards.forEach(function(card, index) {
        card.style.animationDelay = (index * 0.05) + 's';
    });
});

// ========================================
// Category Switch (HOMBRES / MUJERES)
// ========================================
function switchCategory(category) {
    // Hide all category sections
    document.querySelectorAll('.category-section').forEach(function(section) {
        section.classList.remove('active');
    });
    
    // Show selected category
    var selectedSection = document.getElementById(category);
    if (selectedSection) {
        selectedSection.classList.add('active');
    }
    
    // Update button states
    document.getElementById('btn-hombres').classList.remove('active');
    document.getElementById('btn-mujeres').classList.remove('active');
    document.getElementById('btn-' + category).classList.add('active');
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ========================================
// Toggle Gallery
// ========================================
function toggleGallery(button) {
    var gallery = button.nextElementSibling;
    
    while (gallery && !gallery.classList.contains('gallery-hidden')) {
        gallery = gallery.nextElementSibling;
    }
    
    if (gallery) {
        gallery.classList.toggle('show');
        if (gallery.classList.contains('show')) {
            button.textContent = 'Ver menos ↑';
        } else {
            button.textContent = 'Ver más ↓';
        }
    }
}

// ========================================
// Modal Functions
// ========================================
var currentImages = [];
var currentIndex = 0;

// Update counter display
function updateModalCounter() {
    var modal = document.getElementById('imageModal');
    if (!modal) return;
    
    var counter = modal.querySelector('.modal-counter');
    if (counter && currentImages.length > 0) {
        counter.textContent = (currentIndex + 1) + ' / ' + currentImages.length;
    }
}

function openModal(imgElement) {
    var modal = document.getElementById('imageModal');
    if (!modal) return;
    
    var modalImg = modal.querySelector('.modal-image');
    if (!modalImg) return;
    
    var previewSection = imgElement.closest('.preview-section');
    
    if (previewSection) {
        currentImages = [];
        var previewImg = previewSection.querySelector('.preview-image');
        var galleryImgs = previewSection.querySelectorAll('.gallery-hidden img');
        
        if (previewImg) currentImages.push(previewImg);
        galleryImgs.forEach(function(img) {
            currentImages.push(img);
        });
    } else {
        var grid = imgElement.closest('.preview-grid');
        if (grid) {
            currentImages = Array.from(grid.querySelectorAll('img'));
        } else {
            currentImages = [imgElement];
        }
    }
    
    currentIndex = currentImages.indexOf(imgElement);
    if (currentIndex === -1) currentIndex = 0;
    
    modalImg.src = imgElement.src;
    modalImg.alt = imgElement.alt;
    updateModalCounter();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    var modal = document.getElementById('imageModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function nextImage() {
    var modal = document.getElementById('imageModal');
    if (!modal) return;
    var modalImg = modal.querySelector('.modal-image');
    
    if (currentImages.length > 0) {
        currentIndex = (currentIndex + 1) % currentImages.length;
        modalImg.src = currentImages[currentIndex].src;
        modalImg.alt = currentImages[currentIndex].alt;
        updateModalCounter();
    }
}

function prevImage() {
    var modal = document.getElementById('imageModal');
    if (!modal) return;
    var modalImg = modal.querySelector('.modal-image');
    
    if (currentImages.length > 0) {
        currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
        modalImg.src = currentImages[currentIndex].src;
        modalImg.alt = currentImages[currentIndex].alt;
        updateModalCounter();
    }
}

// ========================================
// Event Listeners
// ========================================
document.addEventListener('click', function(e) {
    var modal = document.getElementById('imageModal');
    
    if (e.target === modal) {
        closeModal();
    }
    
    if (e.target.classList.contains('modal-close')) {
        closeModal();
    }
    
    if (e.target.classList.contains('modal-prev') || e.target.id === 'modalPrev') {
        prevImage();
    }
    if (e.target.classList.contains('modal-next') || e.target.id === 'modalNext') {
        nextImage();
    }
});

document.addEventListener('keydown', function(e) {
    var modal = document.getElementById('imageModal');
    if (!modal || !modal.classList.contains('active')) return;
    
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'Escape') closeModal();
});

// ========================================
// Touch Swipe Support for Modal
// ========================================
(function() {
    var touchStartX = 0;
    var touchEndX = 0;
    var modal = document.getElementById('imageModal');
    
    if (!modal) return;
    
    modal.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    modal.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        var swipeThreshold = 50;
        var diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextImage();
            } else {
                prevImage();
            }
        }
    }
})();

// ========================================
// PRODUCT DETAIL MODAL
// ========================================
var productDetailImages = [];
var productDetailIndex = 0;
var currentProductId = null;
var currentProductColors = [];

// Product data - will be populated from page
var productData = {};

// ========================================
// OPEN PRODUCT QUICK VIEW (from home page)
// ========================================
function openProductQuickView(productId) {
    var modal = document.getElementById('productDetailModal');
    if (!modal) return;
    
    // Find the card with this product ID
    var card = document.querySelector('.product-card[data-product-id="' + productId + '"]');
    if (!card) return;
    
    currentProductId = productId;
    
    // Get product data from data attributes
    var name = card.getAttribute('data-name') || '';
    var description = card.getAttribute('data-description') || '';
    var price = card.getAttribute('data-price') || '';
    var colors = card.getAttribute('data-colors') || '';
    
    // Parse gallery data
    var galleryData = card.getAttribute('data-gallery');
    if (galleryData) {
        try {
            productDetailImages = JSON.parse(galleryData);
        } catch (e) {
            productDetailImages = [];
        }
    } else {
        // Fallback: get image from the card
        var img = card.querySelector('.image-wrapper img');
        if (img) {
            productDetailImages = [{
                src: img.src,
                alt: img.alt || ''
            }];
        }
    }
    
    if (productDetailImages.length === 0) return;
    
    productDetailIndex = 0;
    
    // Populate modal with images
    var mainImage = document.getElementById('detailMainImage');
    var thumbnailsContainer = document.getElementById('detailThumbnails');
    
    if (mainImage) {
        mainImage.src = productDetailImages[0].src;
        mainImage.alt = productDetailImages[0].alt || name;
    }
    
    // Populate thumbnails
    if (thumbnailsContainer) {
        thumbnailsContainer.innerHTML = '';
        productDetailImages.forEach(function(img, index) {
            var thumb = document.createElement('img');
            thumb.src = img.src;
            thumb.alt = img.alt || name;
            thumb.className = index === 0 ? 'active' : '';
            thumb.onclick = function() {
                changeMainImage(img.src, index);
            };
            thumbnailsContainer.appendChild(thumb);
        });
    }
    
    // Populate product details
    var nameEl = document.getElementById('detailProductName');
    var descEl = document.getElementById('detailDescription');
    var priceEl = document.getElementById('detailPrice');
    var colorsEl = document.getElementById('detailColors');
    
    if (nameEl) nameEl.textContent = name;
    if (descEl) descEl.textContent = description;
    if (priceEl) priceEl.textContent = price;
    
    // Populate colors
    if (colorsEl) {
        colorsEl.innerHTML = '';
        if (colors) {
            currentProductColors = colors.split(',').map(function(c) { return c.trim(); });
            currentProductColors.forEach(function(color) {
                var colorInfo = getColorHex(color);
                var colorSwatch = document.createElement('div');
                colorSwatch.className = 'color-swatch';
                colorSwatch.setAttribute('data-color', color);
                colorSwatch.style.backgroundColor = colorInfo.hex;
                if (colorInfo.needsBorder) {
                    colorSwatch.style.border = '1px solid #ddd';
                }
                colorSwatch.title = color;
                colorSwatch.onclick = function() { selectColor(color); };
                colorsEl.appendChild(colorSwatch);
            });
        }
    }
    
    // Update WhatsApp link with product name
    var whatsappBtn = document.getElementById('detailWhatsApp');
    if (whatsappBtn && name) {
        var message = encodeURIComponent('Hola, me interesa este producto: ' + name);
        whatsappBtn.href = 'https://wa.me/3205172484?text=' + message;
    }
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Show initial color label
    updateColorLabel(0);
}

// Select and display a specific color
function selectColor(color) {
    var index = currentProductColors.indexOf(color);
    if (index !== -1) {
        updateColorLabel(index);
    }
}

// Update the color label displayed in the modal
function updateColorLabel(index) {
    var colorLabel = document.getElementById('detailImageColor');
    if (colorLabel && currentProductColors.length > 0) {
        var colorIndex = typeof index === 'number' ? index : 0;
        colorLabel.textContent = 'Color: ' + (currentProductColors[colorIndex] || currentProductColors[0]);
        colorLabel.style.display = 'block';
    }
}

// Update counter display for product detail modal
function updateProductDetailCounter() {
    var modal = document.getElementById('productDetailModal');
    if (!modal) return;
    
    var counter = modal.querySelector('.thumbnail-counter');
    if (counter && productDetailImages.length > 0) {
        counter.textContent = (productDetailIndex + 1) + ' / ' + productDetailImages.length;
    }
}

// Open product detail modal (for collection pages)
function openProductDetail(productId) {
    var modal = document.getElementById('productDetailModal');
    if (!modal) return;
    
    currentProductId = productId;
    
    // Find product item
    var productItem = document.querySelector('.product-item[data-product-id="' + productId + '"]');
    
    // Get product data from data attributes
    var name = '';
    var description = '';
    var price = '';
    var colors = '';
    
    if (productItem) {
        name = productItem.getAttribute('data-name') || productItem.querySelector('.product-name, .subcategory-title')?.textContent || '';
        description = productItem.getAttribute('data-description') || '';
        price = productItem.getAttribute('data-price') || '';
        colors = productItem.getAttribute('data-colors') || '';
    }
    
    // Try to get gallery from data-gallery attribute first
    var galleryDataStr = productItem?.getAttribute('data-gallery');
    if (galleryDataStr) {
        try {
            productDetailImages = JSON.parse(galleryDataStr);
        } catch (e) {
            productDetailImages = [];
        }
    }
    
    // If no data-gallery, try to get from hidden gallery data element
    if (productDetailImages.length === 0) {
        var galleryData = document.getElementById('gallery-' + productId);
        if (galleryData) {
            var galleryItems = galleryData.querySelectorAll('.gallery-item');
            galleryItems.forEach(function(item) {
                var src = item.getAttribute('data-src');
                if (src) {
                    productDetailImages.push({
                        src: src,
                        alt: item.getAttribute('data-alt') || name
                    });
                }
            });
        }
    }
    
    // If still no gallery items, try to get from product item image
    if (productDetailImages.length === 0 && productItem) {
        var mainImg = productItem.querySelector('.product-image-container img');
        if (mainImg) {
            productDetailImages.push({
                src: mainImg.src,
                alt: mainImg.alt || name
            });
        }
    }
    
    if (productDetailImages.length === 0) return;
    
    productDetailIndex = 0;
    
    // Populate modal with images
    var mainImage = document.getElementById('detailMainImage');
    var thumbnailsContainer = document.getElementById('detailThumbnails');
    
    if (mainImage) {
        mainImage.src = productDetailImages[0].src;
        mainImage.alt = productDetailImages[0].alt || name;
    }
    
    // Populate thumbnails
    if (thumbnailsContainer) {
        thumbnailsContainer.innerHTML = '';
        productDetailImages.forEach(function(img, index) {
            var thumb = document.createElement('img');
            thumb.src = img.src;
            thumb.alt = img.alt || name;
            thumb.className = index === 0 ? 'active' : '';
            thumb.onclick = function() {
                changeMainImage(img.src, index);
            };
            thumbnailsContainer.appendChild(thumb);
        });
    }
    
    // Populate product details
    var nameEl = document.getElementById('detailProductName');
    var descEl = document.getElementById('detailDescription');
    var priceEl = document.getElementById('detailPrice');
    var colorsEl = document.getElementById('detailColors');
    
    if (nameEl) nameEl.textContent = name;
    if (descEl) descEl.textContent = description;
    if (priceEl) priceEl.textContent = price;
    
    // Populate colors
    if (colorsEl) {
        colorsEl.innerHTML = '';
        if (colors) {
            currentProductColors = colors.split(',').map(function(c) { return c.trim(); });
            currentProductColors.forEach(function(color) {
                var colorInfo = getColorHex(color);
                var colorSwatch = document.createElement('div');
                colorSwatch.className = 'color-swatch';
                colorSwatch.setAttribute('data-color', color);
                colorSwatch.style.backgroundColor = colorInfo.hex;
                if (colorInfo.needsBorder) {
                    colorSwatch.style.border = '1px solid #ddd';
                }
                colorSwatch.title = color;
                colorSwatch.onclick = function() { selectColor(color); };
                colorsEl.appendChild(colorSwatch);
            });
        }
    }
    
    // Update WhatsApp link with product name
    var whatsappBtn = document.getElementById('detailWhatsApp');
    if (whatsappBtn && name) {
        var message = encodeURIComponent('Hola, me interesa este producto: ' + name);
        whatsappBtn.href = 'https://wa.me/3205172484?text=' + message;
    }
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Show initial color label
    updateColorLabel(0);
    
    // Verificar si tiene guía de tallas
    var btnGuiaTallas = document.getElementById('btnGuiaTallasProducto');
    if (btnGuiaTallas) {
        var btnMujeres = document.getElementById('btn-mujeres');
        var genero = (btnMujeres && btnMujeres.classList.contains('active')) ? 'mujeres' : 'hombres';
        
        var nombreLower = name.toLowerCase();
        var tieneGuia = false;
        
        if (guiasTallas[genero]) {
            for (var key in guiasTallas[genero]) {
                if (nombreLower.includes(key)) {
                    tieneGuia = true;
                    break;
                }
            }
        }
        
        btnGuiaTallas.style.display = tieneGuia ? 'block' : 'none';
    }
}

// Close product detail modal
function closeProductDetail() {
    var modal = document.getElementById('productDetailModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        currentProductId = null;
    }
}

// Change main image from thumbnail
function changeMainImage(src, index) {
    var mainImage = document.getElementById('detailMainImage');
    var thumbnails = document.querySelectorAll('#detailThumbnails img');
    
    if (mainImage) {
        mainImage.src = src;
    }
    
    if (typeof index !== 'undefined') {
        productDetailIndex = index;
        thumbnails.forEach(function(thumb, i) {
            thumb.classList.toggle('active', i === index);
        });
        updateProductDetailCounter();
    }
}

// Navigate gallery - next
function nextProductImage() {
    if (productDetailImages.length > 0) {
        productDetailIndex = (productDetailIndex + 1) % productDetailImages.length;
        var img = productDetailImages[productDetailIndex];
        changeMainImage(img.src, productDetailIndex);
    }
}

// Navigate gallery - previous
function prevProductImage() {
    if (productDetailImages.length > 0) {
        productDetailIndex = (productDetailIndex - 1 + productDetailImages.length) % productDetailImages.length;
        var img = productDetailImages[productDetailIndex];
        changeMainImage(img.src, productDetailIndex);
    }
}

// Get color hex value
function getColorHex(colorName) {
    var colors = {
        'negro': '#000000',
        'blanco': '#FFFFFF',
        'blanca': '#FFFFFF',
        'gris': '#808080',
        'gris oscuro': '#555555',
        'azul': '#1E90FF',
        'azul marino': '#000080',
        'azul oscuro': '#00008B',
        'rojo': '#FF0000',
        'vino tinto': '#722F37',
        'camo': '#4a5d23',
        'rosa': '#FFB6C1',
        'rosado': '#FFB6C1',
        'verde': '#228B22',
        'amarillo': '#FFFF00',
        'naranja': '#FF8C00',
        'morado': '#800080',
        'morado claro': '#D8BFD8',
        'azul claro': '#ADD8E6',
        'verde claro': '#90EE90',
        'lila': '#C8A2C8',
        'morado oscuro': '#4B0082',
        'cafe': '#8B4513',
        'café': '#8B4513',
        'beige': '#F5F5DC',
        'negro/rojo': 'linear-gradient(135deg, #000000 50%, #FF0000 50%)',
        'negro/gris': 'linear-gradient(135deg, #000000 50%, #808080 50%)'
    };
    var hex = colors[colorName.toLowerCase()] || '#808080';
    
    // Add border for white colors
    if (colorName.toLowerCase() === 'blanco' || colorName.toLowerCase() === 'blanca') {
        return { hex: hex, needsBorder: true };
    }
    return { hex: hex, needsBorder: false };
}

// Event listeners for product detail modal
document.addEventListener('click', function(e) {
    var modal = document.getElementById('productDetailModal');
    
    if (e.target === modal) {
        closeProductDetail();
    }
    
    if (e.target.classList.contains('product-detail-close') || 
        e.target.classList.contains('modal-close-btn')) {
        closeProductDetail();
    }
    
    if (e.target.classList.contains('gallery-prev') || e.target.id === 'galleryPrev') {
        prevProductImage();
    }
    if (e.target.classList.contains('gallery-next') || e.target.id === 'galleryNext') {
        nextProductImage();
    }
});

document.addEventListener('keydown', function(e) {
    var modal = document.getElementById('productDetailModal');
    if (!modal || !modal.classList.contains('active')) return;
    
    if (e.key === 'ArrowRight') nextProductImage();
    if (e.key === 'ArrowLeft') prevProductImage();
    if (e.key === 'Escape') closeProductDetail();
});

// Touch swipe for product detail modal
(function() {
    var touchStartX = 0;
    var touchEndX = 0;
    var modal = document.getElementById('productDetailModal');
    
    if (!modal) return;
    
    modal.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    modal.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        if (!modal.classList.contains('active')) return;
        
        var swipeThreshold = 50;
        var diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextProductImage();
            } else {
                prevProductImage();
            }
        }
    }
})();

// ========================================
// PRODUCT CARD CLICK HANDLER (Home Page)
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    // Add click handlers to all product cards on home page
    var productCards = document.querySelectorAll('.product-card');
    productCards.forEach(function(card) {
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking a link
            if (e.target.tagName === 'A' || e.target.closest('a')) return;
            
            var productId = card.getAttribute('data-product-id');
            if (productId) {
                openProductQuickView(productId);
            }
        });
    });
});


// ========================================
// LUXURY SCROLL REVEAL ANIMATIONS
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in-section');
    fadeElements.forEach(el => {
        observer.observe(el);
    });
});

// ========================================
// Guía de Tallas
// ========================================

// Mapa de guías de tallas
const guiasTallas = {
    "mujeres": {
        "short-push-up": "guiadetallas/mujeres/short-push-up.png",
        "short-con-push-up": "guiadetallas/mujeres/short-push-up.png",
        "short": "guiadetallas/mujeres/short-push-up.png",
        "conjunto-short": "guiadetallas/mujeres/conjunto-short.png",
        "conjunto con short": "guiadetallas/mujeres/conjunto-short.png",
        "chaqueta": "guiadetallas/mujeres/chaquetas.png",
        "chaquetas": "guiadetallas/mujeres/chaquetas.png",
        "chaqueta delgada": "guiadetallas/mujeres/chaquetas.png",
        "enterizo-largo": "guiadetallas/mujeres/enterizo-largo.png",
        "enterizo": "guiadetallas/mujeres/enterizo-largo.png",
        "enterizo-corto": "guiadetallas/mujeres/enterizo-corto.png",
        "conjunto-top": "guiadetallas/mujeres/conjunto-top.png",
        "conjunto con top": "guiadetallas/mujeres/conjunto-top.png"
    },
    "hombres": {}
};

let generoActual = 'hombres';

function abrirGuiaTallas() {
    const modal = document.getElementById('guiaTallasModal');
    const img = document.getElementById('guiaImagen');
    const titulo = document.getElementById('guiaTitulo');
    const mensaje = document.getElementById('guiaMensaje');
    
    console.log('Abriendo guía de tallas, modal:', modal);
    
    // Determinar el género actual basado en los botones activos
    const btnMujeres = document.getElementById('btn-mujeres');
    if (btnMujeres && btnMujeres.classList.contains('active')) {
        generoActual = 'mujeres';
        console.log('Género: mujeres');
    } else {
        generoActual = 'hombres';
        console.log('Género: hombres');
    }
    
    // Por defecto mostrar un mensaje
    img.style.display = 'none';
    mensaje.style.display = 'block';
    mensaje.textContent = 'Haz click en un producto para ver su guía de tallas';
    titulo.textContent = 'Guía de Tallas';
    
    modal.classList.add('mostrar');
    document.body.style.overflow = 'hidden';
}

function mostrarGuiaTallas(productoNombre) {
    console.log('mostrarGuiaTallas llamado con:', productoNombre);
    console.log('Género actual:', generoActual);
    console.log('Guias disponibles:', guiasTallas[generoActual]);
    
    if (!productoNombre || !guiasTallas[generoActual]) {
        console.log('No hay guías para este género');
        return;
    }
    
    const img = document.getElementById('guiaImagen');
    const titulo = document.getElementById('guiaTitulo');
    const mensaje = document.getElementById('guiaMensaje');
    
    // Buscar coincidencia en el mapa
    const productoLower = productoNombre.toLowerCase();
    let rutaImg = null;
    let claveEncontrada = '';
    
    console.log('Buscando coincidencia para:', productoLower);
    
    for (const [key, value] of Object.entries(guiasTallas[generoActual])) {
        console.log('Comparando con:', key);
        if (productoLower.includes(key)) {
            rutaImg = value;
            claveEncontrada = key;
            console.log('¡Encontrado!', key, '->', value);
            break;
        }
    }
    
    if (rutaImg) {
        titulo.textContent = 'Guía de Tallas: ' + productoNombre;
        img.src = rutaImg;
        img.onload = function() {
            console.log('Imagen cargada correctamente:', rutaImg);
        };
        img.onerror = function() {
            console.log('Error cargando imagen:', rutaImg);
        };
        img.style.display = 'block';
        mensaje.style.display = 'none';
    } else {
        titulo.textContent = 'Guía de Tallas';
        mensaje.textContent = 'Guía de tallas no disponible para: ' + productoNombre;
        img.style.display = 'none';
        mensaje.style.display = 'block';
        mensaje.textContent = 'Guía de tallas no disponible para este producto';
        titulo.textContent = 'Guía de Tallas';
    }
}

function cerrarGuiaTallas(event) {
    if (event.target.id === 'guiaTallasModal') {
        const modal = document.getElementById('guiaTallasModal');
        modal.classList.remove('mostrar');
        document.body.style.overflow = 'auto';
    }
}

function cerrarGuiaTallasBtn() {
    const modal = document.getElementById('guiaTallasModal');
    modal.classList.remove('mostrar');
    document.body.style.overflow = 'auto';
}

// Función para ver guía de tallas desde el modal de producto
function verGuiaTallasProducto() {
    const titulo = document.getElementById('detailProductName');
    if (titulo) {
        const nombreProducto = titulo.textContent;
        console.log('Producto seleccionado:', nombreProducto);
        abrirGuiaTallas();
        setTimeout(() => {
            mostrarGuiaTallas(nombreProducto);
        }, 100);
    } else {
        console.log('No se encontró el elemento detailProductName');
    }
}
