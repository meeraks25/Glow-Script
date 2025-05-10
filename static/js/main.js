// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Cart functionality
let cart = [];
const cartSidebar = document.querySelector('.cart-sidebar');
const cartIcon = document.querySelector('.cart-icon');
const cartCount = document.querySelector('.cart-count');
const cartItems = document.querySelector('.cart-items');
const totalPrice = document.querySelector('.total-price');
const closeCart = document.querySelector('.close-cart');

// Toggle cart sidebar
cartIcon.addEventListener('click', (e) => {
    e.preventDefault();
    cartSidebar.classList.add('active');
    updateCart();
});

closeCart.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
});

// Close cart when clicking outside
document.addEventListener('click', (e) => {
    if (!cartSidebar.contains(e.target) && !cartIcon.contains(e.target)) {
        cartSidebar.classList.remove('active');
    }
});

// Product data with categories
const products = [
    {
        id: 1,
        name: 'Maybeline Foundation',
        price: 454.00,
        originalPrice: 600.00,
        discount: '24% off',
        offer: '2 offers',
        rating: 4.3,
        reviewCount: 447,
        image: '/static/assets/foundation.jpg',
        description: 'Lightweight foundation with buildable coverage',
        category: 'face'
    },
    {
        id: 2,
        name: 'Mars Skyline eyelinear',
        price: 188.99,
        originalPrice: 250.00,
        discount: '25% off',
        offer: '2 offers',
        rating: 4.1,
        reviewCount: 1340,
        image:'/static/assets/eyelinear.jpg',
        description: '12-shade palette with matte and shimmer finishes',
        category: 'eyes'
    },
    {
        id: 3,
        name: 'Mamaearth lipstick',
        price: 443.26,
        originalPrice: 599.00,
        discount: '26% off',
        offer: '1 offer',
        rating: 4.5,
        reviewCount: 716,
        image: '/static/assets/lipstick.jpg',
        description: 'Long-lasting, moisturizing lipstick',
        category: 'lips'
    },
    {
        id: 4,
        name: 'Blush Palette',
        price: 455.36,
        originalPrice: 650.00,
        discount: '30% off',
        offer: '2 offers',
        rating: 4.2,
        reviewCount: 252,
        image: '/static/assets/blush.jpg',
        description: '6-shade blush palette for a natural glow',
        category: 'face'
    },
    {
        id: 5,
        name: 'Lakame Mascara',
        price: 328.50,
        originalPrice: 399.00,
        discount: '18% off',
        offer: 'Best Seller',
        rating: 4.4,
        reviewCount: 105,
        image: '/static/assets/mascara.jpg',
        description: 'Volumizing and lengthening mascara',
        category: 'eyes'
    },
    {
        id: 6,
        name: 'Swiss beauty Lip Gloss',
        price: 169.15,
        originalPrice: 199.00,
        discount: '15% off',
        offer: 'Free Gift',
        rating: 4.0,
        reviewCount: 88,
        image: '/static/assets/lip_gloss.jpg',
        description: 'Shiny, non-sticky lip gloss , swiss beauty product',
        category: 'lips'
    },
    {
        id: 7,
        name: 'Dr.Shethes Sunscreen',
        price: 212.99,
        originalPrice: 299.00,
        discount: '29% off',
        offer: 'Free Rosemary Spray',
        rating: 4.3,
        reviewCount: 252,
        image: '/static/assets/sunscreen.jpg',
        description: 'Spa 50++ , super sun protection sunscreen',
        category: 'face'
    },
    {
        id: 8,
        name: 'Maybeline Eyeshadow',
        price: 675.17,
        originalPrice: 899.00,
        discount: '25% off',
        offer: '2 offers',
        rating: 4.2,
        reviewCount: 716,
        image:'/static/assets/eyeshadow.jpg',
        description: 'Shiny , nude eyeshadow , Maybeline product',
        category: 'eyes'
    },
    {
        id: 9,
        name: 'Stobe cream',
        price: 675.17,
        originalPrice: 975.00,
        discount: '25% off',
        offer: '2 offers',
        rating: 4.2,
        reviewCount: 716,
        image:'/static/assets/stobe cream.webp',
        description: 'Shiny , nude eyeshadow , Maybeline product',
        category: 'face'
    },
    {
        id: 10,
        name: 'Fit me Foundation',
        price: 190.00,
        originalPrice: 300.00,
        discount: '25% off',
        offer: '2 offers',
        rating: 4.2,
        reviewCount: 716,
        image:'/static/assets/fitme.webp',
        description: 'Maybelline New York Fit Me Matte Poreless Liquid Foundation',
        category: 'face'
    },
    {
        id: 11,
        name: 'Pixi blush',
        price: 1600,
        originalPrice: 1955,
        discount: '30% off',
        offer: '1 offer',
        rating: 4.2,
        reviewCount: 716,
        image:'/static/assets/pixie.webp',
        description: 'Pixi On-The-Glow Blush',
        category: 'face'
    },
    {
        id: 12,
        name: 'Alps goodness rosemary water',
        price: 200.17,
        originalPrice: 265.00,
        discount: '15% off',
        offer: 'Best Seller',
        rating: 4.2,
        reviewCount: 716,
        image:'/static/assets/rosmary.webp',
        description: 'Alps Goodness Rosemary Water (100 ml) | Rosemary water for hair ',
        category: 'hair'
    },
];

// Example: Add images and reviews to product data
// (You can expand this for each product as needed)
products.forEach(product => {
    if (!product.images) {
        product.images = [product.image];
    }
    if (!product.rating) {
        product.rating = 5;
    }
    if (!product.reviewCount) {
        product.reviewCount = 105;
    }
});

// Reviews data
const reviews = [
    {
        name: 'Sheeja viju',
        rating: 5,
        comment: 'The foundation is amazing! Perfect coverage and feels light on the skin.'
    },
    {
        name: 'Sheena k.p',
        rating: 4,
        comment: 'Love the eyeshadow palette. The colors are so pigmented!'
    },
    {
        name: 'Jameela krishnakumar',
        rating: 3,
        comment: 'Pixie Blush is a great product for a natural glow. It goes on smoothly and blends well.'
    },
    {
        name: 'Meenu k.s',
        rating: 4,
        comment: 'Sunscreen protects my skin from the sun and helps me look younger.'
    },
    {
        name: 'Sindhu m.k',
        rating: 5,
        comment: 'Rosemary Water gives me my thick hair !. trust this product'
    },
    {
        name: 'Aswani a.a',
        rating: 4,
        comment: 'fit me foundation is my favorite foundation. It goes on smoothly and blends well.'
    },
    {
        name: 'Devika viju',
        rating: 5,
        comment: 'Best eyelinear i ever used. this my favorite product'
    }


];

// Product Modal
const productModal = document.querySelector('.product-modal');
const closeModal = document.querySelector('.close-modal');
const modalWishlist = document.querySelector('.modal-wishlist');

function openProductModal(product) {
    const modal = document.querySelector('.product-modal');
    const modalContent = modal.querySelector('.modal-content');
    const modalProduct = modalContent.querySelector('.modal-product');
    
    // Update modal content
    modalProduct.querySelector('.modal-product-image img').src = product.image;
    modalProduct.querySelector('.modal-product-name').textContent = product.name;
    modalProduct.querySelector('.modal-product-price').textContent = `₹${product.price.toFixed(2)}`;
    modalProduct.querySelector('.modal-product-description').textContent = product.description;
    modalProduct.querySelector('.modal-product-category').textContent = product.category;
    
    // Update wishlist button state
    const wishlist = getWishlist();
    const isWishlisted = wishlist.includes(product.id);
    modalWishlist.classList.toggle('active', isWishlisted);
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProductModal() {
    productModal.classList.remove('active');
    document.body.style.overflow = '';
}

// Close modal when clicking outside
productModal.addEventListener('click', (e) => {
    if (e.target === productModal) {
        closeProductModal();
    }
});

closeModal.addEventListener('click', closeProductModal);

// Handle modal wishlist button
modalWishlist.addEventListener('click', (e) => {
    e.preventDefault();
    const productId = parseInt(modalWishlist.dataset.id);
    const wishlist = getWishlist();
    const isWishlisted = wishlist.includes(productId);
    
    if (isWishlisted) {
        removeFromWishlist(productId);
        modalWishlist.classList.remove('active');
        showNotification('Removed from wishlist');
    } else {
        addToWishlist(productId);
        modalWishlist.classList.add('active');
        showNotification('Added to wishlist');
    }
    
    updateWishlistCount();
});

// Function to render products
function renderProducts(filteredProducts = products) {
    const productGrid = document.querySelector('.product-grid');
    if (!productGrid) return;

    productGrid.innerHTML = filteredProducts.map(product => `
        <div class="product-card" data-id="${product.id}">
            <div class="product-wishlist" data-id="${product.id}"><i class="fas fa-heart"></i></div>
            <div class="product-badge">${product.offer || ''}</div>
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <div class="product-price-row">
                <span class="product-price">₹${product.price.toFixed(2)}</span>
                <span class="product-original-price">${product.originalPrice ? '₹' + product.originalPrice.toFixed(2) : ''}</span>
                <span class="product-discount">${product.discount || ''}</span>
            </div>
            <div class="product-rating-row">
                <span class="product-rating">${product.rating ? product.rating.toFixed(1) : '5.0'}</span>
                <span class="product-stars">${'★'.repeat(Math.round(product.rating || 5))}${'☆'.repeat(5 - Math.round(product.rating || 5))}</span>
                <span class="product-review-count">(${product.reviewCount || 0})</span>
            </div>
            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        </div>
    `).join('');

    // Add click event to product cards
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', (e) => {
            // Don't trigger if clicking the wishlist icon or add to cart button
            if (!e.target.closest('.product-wishlist') && !e.target.classList.contains('add-to-cart')) {
                const productId = parseInt(card.dataset.id);
                const product = products.find(p => p.id === productId);
                if (product) {
                    openProductModal(product);
                }
            }
        });
    });
}

// Function to render reviews
function renderReviews() {
    const reviewsContainer = document.querySelector('.reviews-container');
    if (!reviewsContainer) return;

    reviewsContainer.innerHTML = reviews.map(review => `
        <div class="review-card">
            <div class="review-header">
                <h4>${review.name}</h4>
                <div class="rating">
                    ${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}
                </div>
            </div>
            <p>${review.comment}</p>
        </div>
    `).join('');
}

// Function to update cart
function updateCart() {
    const cart = getCart();
    const items = products.filter(p => cart.includes(p.id));
    
    if (items.length === 0) {
        cartItems.innerHTML = '<div class="cart-empty">Your cart is empty</div>';
        document.querySelector('.total-price').textContent = '₹0.00';
        return;
    }
    
    cartItems.innerHTML = items.map(item => `
        <div class="cart-item" data-id="${item.id}">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">₹${item.price.toFixed(2)}</div>
                <button class="remove-item" data-id="${item.id}">×</button>
            </div>
        </div>
    `).join('');
    
    const total = items.reduce((sum, item) => sum + item.price, 0);
    document.querySelector('.total-price').textContent = `₹${total.toFixed(2)}`;
    
    // Update cart count
    const cartCount = document.querySelector('.cart-count');
    cartCount.textContent = items.length;
    cartCount.style.display = items.length > 0 ? 'block' : 'none';
    
    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const productId = parseInt(button.dataset.id);
            removeFromCart(productId);
            updateCart();
            const product = products.find(p => p.id === productId);
            showNotification(`${product.name} removed from cart`);
        });
    });
}

// Add to cart function
function addToCart(productId) {
    const cart = getCart();
    if (!cart.includes(productId)) {
        cart.push(productId);
        setCart(cart);
        updateCart();
        showNotification('Added to cart');
    }
}

// Remove from cart function
function removeFromCart(productId) {
    const cart = getCart();
    const index = cart.indexOf(productId);
    if (index > -1) {
        cart.splice(index, 1);
        setCart(cart);
    }
}

// Quantity selector logic
const modalQtySelector = document.querySelector('.modal-qty-selector');
if (modalQtySelector) {
    modalQtySelector.addEventListener('click', function(e) {
        const qtyValue = modalQtySelector.querySelector('.qty-value');
        let qty = parseInt(qtyValue.textContent);
        if (e.target.classList.contains('qty-plus')) {
            qty++;
        } else if (e.target.classList.contains('qty-minus')) {
            qty = Math.max(1, qty - 1);
        }
        qtyValue.textContent = qty;
    });
}

// Update add to cart functionality to use selected quantity from modal
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('add-to-cart') || e.target.closest('.add-to-cart')) {
        e.preventDefault();
        const button = e.target.classList.contains('add-to-cart') ? e.target : e.target.closest('.add-to-cart');
        const productId = parseInt(button.dataset.id);
        
        // Add to cart
        addToCart(productId);
        
        // Open cart sidebar
        cartSidebar.classList.add('active');
        
        // Show notification
        const product = products.find(p => p.id === productId);
        showNotification(`${product.name} added to cart`);
    }
});

// Filter functionality
const categoryFilter = document.getElementById('category-filter');
const priceFilter = document.getElementById('price-filter');

function applyFilters() {
    let filteredProducts = [...products];
    
    // Category filter
    if (categoryFilter.value !== 'all') {
        filteredProducts = filteredProducts.filter(product => 
            product.category === categoryFilter.value
        );
    }
    
    // Price filter
    if (priceFilter.value === 'low') {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (priceFilter.value === 'high') {
        filteredProducts.sort((a, b) => b.price - a.price);
    }
    
    renderProducts(filteredProducts);
}

categoryFilter.addEventListener('change', applyFilters);
priceFilter.addEventListener('change', applyFilters);

// Form submission handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        console.log('Form submitted:', data);
        alert('Thank you for your message! We will get back to you soon.☺️❤️❤️');
        this.reset();
    });
}

// Newsletter form handling
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        console.log('Newsletter subscription:', email);
        alert('Thank you for subscribing to our newsletter!');
        this.reset();
    });
}

// Mobile menu functionality
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-links') && !e.target.closest('.mobile-menu-btn')) {
        navLinks.classList.remove('active');
    }
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    renderReviews();
    updateCart();
    
    // Add scroll event listener for header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        } else {
            header.style.backgroundColor = '#fff';
        }
    });

    const slides = document.querySelectorAll('.offer-slide');
    const leftArrow = document.querySelector('.offer-arrow-left');
    const rightArrow = document.querySelector('.offer-arrow-right');
    let current = 0;
    let autoSlideInterval;

    function showSlide(idx) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === idx);
        });
    }

    function nextSlide() {
        current = (current + 1) % slides.length;
        showSlide(current);
    }

    function prevSlide() {
        current = (current - 1 + slides.length) % slides.length;
        showSlide(current);
    }

    leftArrow.addEventListener('click', function() {
        prevSlide();
        resetAutoSlide();
    });

    rightArrow.addEventListener('click', function() {
        nextSlide();
        resetAutoSlide();
    });

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 3000); // 3 seconds
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    showSlide(current);
    startAutoSlide();
});

// Add search functionality
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

if (searchForm && searchInput) {
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const query = searchInput.value.trim().toLowerCase();
        if (query === '') {
            renderProducts(products);
        } else {
            const filtered = products.filter(product => product.name.toLowerCase().includes(query));
            renderProducts(filtered);
        }
    });
}

// Add search suggestions functionality
const searchBar = document.querySelector('.search-bar');
let suggestionBox = document.createElement('div');
suggestionBox.className = 'search-suggestions';
searchBar.appendChild(suggestionBox);

searchInput.addEventListener('input', function() {
    const query = searchInput.value.trim().toLowerCase();
    suggestionBox.innerHTML = '';
    if (query.length === 0) {
        suggestionBox.style.display = 'none';
        return;
    }
    const matches = products.filter(product => product.name.toLowerCase().includes(query)).slice(0, 5);
    if (matches.length === 0) {
        suggestionBox.style.display = 'none';
        return;
    }
    matches.forEach(product => {
        const item = document.createElement('div');
        item.className = 'suggestion-item';
        item.textContent = product.name;
        item.addEventListener('mousedown', function(e) {
            e.preventDefault();
            searchInput.value = product.name;
            searchForm.dispatchEvent(new Event('submit'));
            suggestionBox.style.display = 'none';
        });
        suggestionBox.appendChild(item);
    });
    suggestionBox.style.display = 'block';
});

document.addEventListener('click', function(e) {
    if (!searchBar.contains(e.target)) {
        suggestionBox.style.display = 'none';
    }
});

// Scroll to header wishlist icon when clicking product wishlist
document.addEventListener('click', function(e) {
    if (e.target.closest('.product-wishlist')) {
        e.preventDefault();
        const headerWishlist = document.getElementById('header-wishlist');
        if (headerWishlist) {
            headerWishlist.scrollIntoView({ behavior: 'smooth', block: 'center' });
            headerWishlist.classList.add('wishlist-highlight');
            setTimeout(() => headerWishlist.classList.remove('wishlist-highlight'), 1200);
        }
    }
});

// Utility functions for localStorage
function getWishlist() {
    return JSON.parse(localStorage.getItem('wishlist') || '[]');
}
function setWishlist(items) {
    localStorage.setItem('wishlist', JSON.stringify(items));
}
function getCart() {
    return JSON.parse(localStorage.getItem('cart') || '[]');
}
function setCart(items) {
    localStorage.setItem('cart', JSON.stringify(items));
}

// Function to add to wishlist
function addToWishlist(productId) {
    let wishlist = getWishlist();
    if (!wishlist.includes(productId)) {
        wishlist.push(productId);
        setWishlist(wishlist);
    }
}

// Function to remove from wishlist
function removeFromWishlist(productId) {
    let wishlist = getWishlist();
    wishlist = wishlist.filter(id => id !== productId);
    setWishlist(wishlist);
}

// Enhanced wishlist functionality
document.addEventListener('click', function(e) {
    if (e.target.closest('.product-wishlist')) {
        e.preventDefault();
        const wishlistBtn = e.target.closest('.product-wishlist');
        const productId = parseInt(wishlistBtn.dataset.id);
        const wishlist = getWishlist();
        const isWishlisted = wishlist.includes(productId);
        const product = products.find(p => p.id === productId);
        
        if (isWishlisted) {
            // Remove from wishlist
            removeFromWishlist(productId);
            wishlistBtn.classList.remove('active');
            showNotification(`${product.name} removed from wishlist`);
        } else {
            // Add to wishlist
            addToWishlist(productId);
            wishlistBtn.classList.add('active');
            
            // Open wishlist sidebar
            wishlistSidebar.classList.add('active');
            
            // Show notification
            showNotification(`${product.name} added to wishlist`);
        }
        
        updateWishlistCount();
        updateWishlistItems();
    }
});

// Function to initialize wishlist icons
function initializeWishlistIcons() {
    const wishlist = getWishlist();
    document.querySelectorAll('.product-wishlist').forEach(icon => {
        const productId = parseInt(icon.dataset.id);
        if (wishlist.includes(productId)) {
            icon.classList.add('active');
        } else {
            icon.classList.remove('active');
        }
    });
}

// Initialize wishlist icons when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeWishlistIcons();
    updateWishlistCount();
});

// Function to show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'wishlist-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-heart"></i>
            <div class="notification-text">
                <p>${message}</p>
            </div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Function to update wishlist count in header with animation
function updateWishlistCount() {
    const wishlist = getWishlist();
    const wishlistCount = document.querySelector('.wishlist-count');
    if (wishlistCount) {
        wishlistCount.textContent = wishlist.length;
        if (wishlist.length > 0) {
            wishlistCount.style.display = 'block';
            wishlistCount.classList.add('count-animate');
            setTimeout(() => {
                wishlistCount.classList.remove('count-animate');
            }, 300);
        } else {
            wishlistCount.style.display = 'none';
        }
    }
}

// Wishlist Sidebar
const wishlistSidebar = document.querySelector('.wishlist-sidebar');
const closeWishlist = document.querySelector('.close-wishlist');
const wishlistItems = document.querySelector('.wishlist-items');
const headerWishlist = document.getElementById('header-wishlist');

// Toggle wishlist sidebar
headerWishlist.addEventListener('click', (e) => {
    e.preventDefault();
    wishlistSidebar.classList.add('active');
    updateWishlistItems();
});

closeWishlist.addEventListener('click', () => {
    wishlistSidebar.classList.remove('active');
});

// Close wishlist when clicking outside
document.addEventListener('click', (e) => {
    if (!wishlistSidebar.contains(e.target) && !headerWishlist.contains(e.target)) {
        wishlistSidebar.classList.remove('active');
    }
});

// Function to update wishlist items display
function updateWishlistItems() {
    const wishlist = getWishlist();
    const items = products.filter(p => wishlist.includes(p.id));
    
    if (items.length === 0) {
        wishlistItems.innerHTML = '<div class="wishlist-empty">Your wishlist is empty</div>';
        return;
    }
    
    wishlistItems.innerHTML = items.map(item => `
        <div class="wishlist-item" data-id="${item.id}">
            <img src="${item.image}" alt="${item.name}">
            <div class="wishlist-item-details">
                <div class="wishlist-item-name">${item.name}</div>
                <div class="wishlist-item-price">₹${item.price.toFixed(2)}</div>
                <div class="wishlist-item-actions">
                    <button class="add-to-cart" data-id="${item.id}">Add to Cart</button>
                    <button class="remove" data-id="${item.id}">×</button>
                </div>
            </div>
        </div>
    `).join('');
    
    // Add event listeners to remove buttons
    document.querySelectorAll('.wishlist-item .remove').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const productId = parseInt(this.dataset.id);
            const product = products.find(p => p.id === productId);
            
            // Remove from wishlist
            removeFromWishlist(productId);
            
            // Update the product card wishlist icon
            const productCard = document.querySelector(`.product-card[data-id="${productId}"] .product-wishlist`);
            if (productCard) {
                productCard.classList.remove('active');
            }
            
            // Update wishlist sidebar
            updateWishlistItems();
            
            // Update wishlist count
            updateWishlistCount();
            
            // Show notification
            showNotification(`${product.name} removed from wishlist`);
        });
    });
    
    // Add event listeners to add to cart buttons
    document.querySelectorAll('.wishlist-item .add-to-cart').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const productId = parseInt(this.dataset.id);
            addToCart(productId);
            showNotification('Added to cart');
        });
    });
} 