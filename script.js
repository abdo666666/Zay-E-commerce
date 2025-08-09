// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initSmoothScrolling();
    initCarousel();
    initMobileMenu();
    initScrollAnimations();
    initNewsletter();
    initProductCards();
    initSearchFunctionality();
    initShoppingCart();
    initUserLogin();
    initContactForm();
});

// Shopping Cart Functionality
function initShoppingCart() {
    const cartBtn = document.getElementById('cartBtn');
    const cartSidebar = document.getElementById('cartSidebar');
    const closeCart = document.getElementById('closeCart');
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');
    const checkoutBtn = document.querySelector('.checkout-btn');
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Update cart display
    function updateCartDisplay() {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems > 0 ? String(totalItems) : '';
        cartTotal.textContent = `$${cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}`;
        
        // Update cart items
        cartItems.innerHTML = '';
        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <div class="price">$${item.price}</div>
                </div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>
                </div>
                <button class="remove-item" onclick="removeFromCart(${index})">×</button>
            `;
            cartItems.appendChild(cartItem);
        });
        
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    
    // Add to cart function
    window.addToCart = function(productId) {
        const productCard = document.querySelector(`[data-product-id="${productId}"]`);
        const productName = productCard.querySelector('h3').textContent;
        const productPrice = parseFloat(productCard.dataset.price);
        const productImage = productCard.querySelector('img').src;
        
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: productId,
                name: productName,
                price: productPrice,
                image: productImage,
                quantity: 1
            });
        }
        
        updateCartDisplay();
        showNotification('Product added to cart!', 'success');
        // Open cart sidebar after adding
        cartSidebar.classList.add('active');
    };

    // Wire up all Add to Cart buttons
    addToCartButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const id = parseInt(btn.dataset.productId, 10);
            if (!isNaN(id)) {
                window.addToCart(id);
            }
        });
    });
    
    // Update quantity function
    window.updateQuantity = function(index, change) {
        cart[index].quantity += change;
        
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
        
        updateCartDisplay();
    };
    
    // Remove from cart function
    window.removeFromCart = function(index) {
        cart.splice(index, 1);
        updateCartDisplay();
        showNotification('Product removed from cart!', 'success');
    };
    
    // Toggle cart sidebar
    cartBtn.addEventListener('click', () => {
        cartSidebar.classList.add('active');
    });
    
    closeCart.addEventListener('click', () => {
        cartSidebar.classList.remove('active');
    });
    
    // Close cart when clicking outside
    document.addEventListener('click', (e) => {
        if (!cartSidebar.contains(e.target) && !cartBtn.contains(e.target)) {
            cartSidebar.classList.remove('active');
        }
    });
    
    // Checkout functionality
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            showNotification('Your cart is empty!', 'error');
            return;
        }
        
        showNotification('Proceeding to checkout...', 'success');
        // Here you would typically redirect to a checkout page
        setTimeout(() => {
            cart = [];
            updateCartDisplay();
            cartSidebar.classList.remove('active');
        }, 2000);
    });
    
    // Initialize cart display
    updateCartDisplay();
}

// User Login Functionality
function initUserLogin() {
    const userBtn = document.getElementById('userBtn');
    const loginModal = document.getElementById('loginModal');
    const closeLogin = document.getElementById('closeLogin');
    const showRegister = document.getElementById('showRegister');
    const showLogin = document.getElementById('showLogin');
    const loginForm = document.querySelector('.login-form');
    const registerForm = document.querySelector('.register-form');
    
    // Toggle login modal
    userBtn.addEventListener('click', () => {
        loginModal.classList.add('active');
    });
    
    closeLogin.addEventListener('click', () => {
        loginModal.classList.remove('active');
    });
    
    // Close modal when clicking outside
    loginModal.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            loginModal.classList.remove('active');
        }
    });
    
    // Switch between login and register forms
    showRegister.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.style.display = 'none';
        registerForm.style.display = 'flex';
    });
    
    showLogin.addEventListener('click', (e) => {
        e.preventDefault();
        registerForm.style.display = 'none';
        loginForm.style.display = 'flex';
    });
    
    // Handle login form submission
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = loginForm.querySelector('input[type="email"]').value;
        const password = loginForm.querySelector('input[type="password"]').value;
        
        // Simple validation
        if (email && password) {
            showNotification('Login successful!', 'success');
            loginModal.classList.remove('active');
            userBtn.innerHTML = '<i class="fas fa-user"></i><span class="badge"></span>';
        } else {
            showNotification('Please fill in all fields!', 'error');
        }
    });
    
    // Handle register form submission
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = registerForm.querySelector('input[type="text"]').value;
        const email = registerForm.querySelector('input[type="email"]').value;
        const password = registerForm.querySelectorAll('input[type="password"]')[0].value;
        const confirmPassword = registerForm.querySelectorAll('input[type="password"]')[1].value;
        
        // Simple validation
        if (name && email && password && confirmPassword) {
            if (password === confirmPassword) {
                showNotification('Registration successful!', 'success');
                loginModal.classList.remove('active');
                userBtn.innerHTML = '<i class="fas fa-user"></i><span class="badge"></span>';
            } else {
                showNotification('Passwords do not match!', 'error');
            }
        } else {
            showNotification('Please fill in all fields!', 'error');
        }
    });
}

// Contact Form Functionality
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = formData.get('name') || contactForm.querySelector('input[type="text"]').value;
        const email = formData.get('email') || contactForm.querySelector('input[type="email"]').value;
        const subject = formData.get('subject') || contactForm.querySelector('input[placeholder="Subject"]').value;
        const message = formData.get('message') || contactForm.querySelector('textarea').value;
        
        if (name && email && subject && message) {
            showNotification('Message sent successfully!', 'success');
            contactForm.reset();
        } else {
            showNotification('Please fill in all fields!', 'error');
        }
    });
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Carousel Functionality
function initCarousel() {
    const indicators = document.querySelectorAll('.indicator');
    const heroSection = document.querySelector('.hero');
    const AUTOPLAY = true; // auto-rotation enabled
    const INTERVAL = 8000; // 8s for a calmer pace
    let currentSlide = 0;
    let timer = null;

    function goToSlide(index) {
        indicators.forEach(ind => ind.classList.remove('active'));
        indicators[index].classList.add('active');
        currentSlide = index;
        updateHeroContent(index);
    }

    function nextSlide() {
        const next = (currentSlide + 1) % indicators.length;
        goToSlide(next);
    }

    function startAutoplay() {
        if (AUTOPLAY && !timer) {
            timer = setInterval(nextSlide, INTERVAL);
        }
    }

    function stopAutoplay() {
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
    }

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            stopAutoplay();
            goToSlide(index);
            startAutoplay();
        });
    });

    // Pause when hovering over hero
    if (heroSection) {
        heroSection.addEventListener('mouseenter', stopAutoplay);
        heroSection.addEventListener('mouseleave', startAutoplay);
    }

    startAutoplay();
}

// Update Hero Content for Different Slides
function updateHeroContent(slideIndex) {
    const heroText = document.querySelector('.hero-text');
    const heroImage = document.querySelector('.product-showcase img');
    
    const slides = [
        {
            title: 'Proident occaecat',
            subtitle: 'Aliquip ex ea commodo consequat',
            description: 'You are permitted to use this Zay CSS template for your commercial websites. You are not permitted to re-distribute the template ZIP file in any kind of template collection websites.',
            image: 'images/Curology Product.jpg'
        },
        {
            title: 'Premium Quality',
            subtitle: 'Best Products for You',
            description: 'Discover our premium collection of high-quality products designed to enhance your lifestyle and meet your every need.',
            image: 'images/Curology Product.jpg'
        },
        {
            title: 'Special Offers',
            subtitle: 'Limited Time Deals',
            description: 'Take advantage of our special offers and discounts on selected products. Don\'t miss out on these amazing deals!',
            image: 'images/Curology Product.jpg'
        }
    ];
    
    const slide = slides[slideIndex];
    
    // Animate text changes
    heroText.querySelector('h1').style.opacity = '0';
    heroText.querySelector('h3').style.opacity = '0';
    heroText.querySelector('p').style.opacity = '0';
    
    setTimeout(() => {
        heroText.querySelector('h1').textContent = slide.title;
        heroText.querySelector('h3').textContent = slide.subtitle;
        heroText.querySelector('p').textContent = slide.description;
        
        heroText.querySelector('h1').style.opacity = '1';
        heroText.querySelector('h3').style.opacity = '1';
        heroText.querySelector('p').style.opacity = '1';
    }, 300);
    
    // Animate image change
    heroImage.style.transform = 'scale(0.8)';
    heroImage.style.opacity = '0';
    
    setTimeout(() => {
        heroImage.src = slide.image;
        heroImage.style.transform = 'scale(1)';
        heroImage.style.opacity = '1';
    }, 300);
}

// Mobile Menu Toggle
function initMobileMenu() {
    const header = document.querySelector('.header');
    const nav = document.querySelector('.nav');
    
    // Create mobile menu button
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    mobileMenuBtn.style.display = 'none';
    
    header.querySelector('.container').appendChild(mobileMenuBtn);
    
    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
        mobileMenuBtn.innerHTML = nav.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
    
    // Close mobile menu when clicking on a link
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
    
    // Show/hide mobile menu button based on screen size
    function handleResize() {
        if (window.innerWidth <= 768) {
            mobileMenuBtn.style.display = 'block';
            nav.classList.add('mobile');
        } else {
            mobileMenuBtn.style.display = 'none';
            nav.classList.remove('mobile', 'active');
        }
    }
    
    window.addEventListener('resize', handleResize);
    handleResize();
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.category-card, .product-card, .section-header, .feature, .contact-item');
    animateElements.forEach(el => observer.observe(el));
    
    // Header scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        const header = document.querySelector('.header');
        
        if (currentScroll > lastScroll && currentScroll > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        lastScroll = currentScroll;
    });
}

// Newsletter Subscription
function initNewsletter() {
    const newsletterForm = document.querySelector('.newsletter');
    const emailInput = newsletterForm.querySelector('input');
    const subscribeBtn = newsletterForm.querySelector('button');
    
    subscribeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const email = emailInput.value.trim();
        
        if (email && isValidEmail(email)) {
            // Show success message
            showNotification('Thank you for subscribing!', 'success');
            emailInput.value = '';
        } else {
            showNotification('Please enter a valid email address.', 'error');
        }
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    if (type === 'success') {
        notification.style.background = '#20c997';
    } else {
        notification.style.background = '#e74c3c';
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Product Cards Interaction
function initProductCards() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        // Add hover effect
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
        
        // Add click to view details
        card.addEventListener('click', (e) => {
            // Don't trigger if clicking on add to cart button
            if (!e.target.classList.contains('add-to-cart-btn')) {
                const productName = card.querySelector('h3').textContent;
                showProductModal(productName);
            }
        });
    });
}

// Product Modal
function showProductModal(productName) {
    const modal = document.createElement('div');
    modal.className = 'product-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-btn">&times;</span>
            <h2>${productName}</h2>
            <p>This is a detailed view of ${productName}. Here you can see more information about the product, specifications, and purchase options.</p>
            <div class="modal-actions">
                <button class="add-to-cart">Add to Cart</button>
                <button class="view-details">View Details</button>
            </div>
        </div>
    `;
    
    // Style the modal
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.cssText = `
        background: white;
        padding: 30px;
        border-radius: 10px;
        max-width: 500px;
        width: 90%;
        position: relative;
        transform: scale(0.7);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(modal);
    
    // Animate in
    setTimeout(() => {
        modal.style.opacity = '1';
        modalContent.style.transform = 'scale(1)';
    }, 10);
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.close-btn');
    closeBtn.style.cssText = `
        position: absolute;
        top: 10px;
        right: 15px;
        font-size: 24px;
        cursor: pointer;
        color: #666;
    `;
    
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    function closeModal() {
        modal.style.opacity = '0';
        modalContent.style.transform = 'scale(0.7)';
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    }
}

// Search Functionality
function initSearchFunctionality() {
    const searchBtn = document.querySelector('.search-btn');
    
    searchBtn.addEventListener('click', () => {
        showSearchModal();
    });
}

// Search Modal
function showSearchModal() {
    const modal = document.createElement('div');
    modal.className = 'search-modal';
    modal.innerHTML = `
        <div class="search-content">
            <span class="close-btn">&times;</span>
            <h2>Search Products</h2>
            <div class="search-input">
                <input type="text" placeholder="Search for products...">
                <button><i class="fas fa-search"></i></button>
            </div>
            <div class="search-suggestions">
                <h3>Popular Searches</h3>
                <div class="suggestions">
                    <span>Watches</span>
                    <span>Shoes</span>
                    <span>Accessories</span>
                    <span>Gym Equipment</span>
                </div>
            </div>
        </div>
    `;
    
    // Style the search modal
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const searchContent = modal.querySelector('.search-content');
    searchContent.style.cssText = `
        background: white;
        padding: 40px;
        border-radius: 15px;
        max-width: 600px;
        width: 90%;
        position: relative;
        transform: scale(0.7);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(modal);
    
    // Animate in
    setTimeout(() => {
        modal.style.opacity = '1';
        searchContent.style.transform = 'scale(1)';
    }, 10);
    
    // Focus on input
    const searchInput = modal.querySelector('input');
    searchInput.focus();
    
    // Close functionality
    const closeBtn = modal.querySelector('.close-btn');
    closeBtn.style.cssText = `
        position: absolute;
        top: 15px;
        right: 20px;
        font-size: 24px;
        cursor: pointer;
        color: #666;
    `;
    
    closeBtn.addEventListener('click', closeSearchModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeSearchModal();
    });
    
    function closeSearchModal() {
        modal.style.opacity = '0';
        searchContent.style.transform = 'scale(0.7)';
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    }
}

// Add CSS for mobile menu
const mobileMenuCSS = `
    @media (max-width: 768px) {
        .nav.mobile {
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: white;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            transform: translateY(-100%);
            opacity: 0;
            transition: all 0.3s ease;
        }
        
        .nav.mobile.active {
            transform: translateY(0);
            opacity: 1;
        }
        
        .nav.mobile ul {
            flex-direction: column;
            padding: 20px;
        }
        
        .nav.mobile ul li {
            margin: 10px 0;
        }
        
        .mobile-menu-btn {
            background: none;
            border: none;
            font-size: 20px;
            color: #333;
            cursor: pointer;
        }
    }
`;

// Inject mobile menu CSS
const style = document.createElement('style');
style.textContent = mobileMenuCSS;
document.head.appendChild(style); 