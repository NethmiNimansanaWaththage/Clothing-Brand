// script.js - Enhanced with Advanced Features & Interactivity

// ===== WAIT FOR DOM TO LOAD =====
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== REMOVE LOADING SPINNER =====
    setTimeout(() => {
        const spinner = document.querySelector('.loading-spinner');
        if (spinner) {
            spinner.classList.add('hide');
            setTimeout(() => {
                if (spinner && spinner.parentNode) {
                    spinner.remove();
                }
            }, 500);
        }
    }, 800);
    
    // ===== CREATE LOADING SPINNER IF NOT EXISTS =====
    if (!document.querySelector('.loading-spinner')) {
        const spinnerDiv = document.createElement('div');
        spinnerDiv.className = 'loading-spinner';
        spinnerDiv.innerHTML = '<div class="spinner"></div>';
        document.body.appendChild(spinnerDiv);
    }
    
    // ===== MOBILE MENU TOGGLE =====
    createMobileMenu();
    
    // ===== SCROLL REVEAL ANIMATION =====
    initScrollReveal();
    
    // ===== ADD TO CART FUNCTIONALITY =====
    initAddToCart();
    
    // ===== CART PAGE FUNCTIONALITY =====
    initCartPage();
    
    // ===== NEWSLETTER SIGNUP =====
    initNewsletterSignup();
    
    // ===== CONTACT FORM SUBMIT =====
    initContactForm();
    
    // ===== PRODUCT IMAGE GALLERY (for sproduct.html) =====
    initProductGallery();
    
    // ===== SMOOTH SCROLLING =====
    initSmoothScroll();
    
    // ===== BACK TO TOP BUTTON =====
    createBackToTopButton();
    
    // ===== UPDATE CART COUNT =====
    updateCartCount();
    
    // ===== FEATURE SECTION INTERACTIONS =====
    initFeatureInteractions();
    
    // ===== BLOG READ MORE TOGGLE =====
    initBlogReadMore();
    
    // ===== PRICE CALCULATION ON SHOP PAGE =====
    initPriceCalculations();
    
    // ===== PRODUCT HOVER EFFECTS =====
    initProductHoverEffects();
    
    // ===== STICKY HEADER ENHANCEMENT =====
    initStickyHeader();
    
    // ===== PARALLAX SCROLL EFFECT =====
    initParallaxEffect();
    
    // ===== ANIMATE ON SCROLL WITH INTERSECTION OBSERVER =====
    initIntersectionObserver();
    
    // ===== TOAST NOTIFICATION SYSTEM =====
    window.showToast = function(message, type = 'success') {
        let toast = document.querySelector('.toast-notification');
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'toast-notification';
            document.body.appendChild(toast);
        }
        
        toast.textContent = message;
        toast.style.background = type === 'success' 
            ? 'linear-gradient(135deg, #1a1a2e, #16213e)' 
            : 'linear-gradient(135deg, #ff4d4d, #cc0000)';
        
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    };
});

// ===== CREATE MOBILE MENU =====
function createMobileMenu() {
    const navbar = document.getElementById('navbar');
    const header = document.getElementById('header');
    
    if (!navbar) return;
    
    // Check if mobile menu button already exists
    if (document.querySelector('.mobile-menu-btn')) return;
    
    const menuBtn = document.createElement('div');
    menuBtn.className = 'mobile-menu-btn';
    menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    menuBtn.style.cssText = `
        display: none;
        font-size: 24px;
        cursor: pointer;
        color: #1a1a1a;
        transition: all 0.3s ease;
    `;
    
    if (header) {
        header.appendChild(menuBtn);
    }
    
    // Close button for mobile menu
    const closeBtn = document.createElement('div');
    closeBtn.className = 'mobile-close-btn';
    closeBtn.innerHTML = '<i class="fas fa-times"></i>';
    closeBtn.style.cssText = `
        position: absolute;
        top: 20px;
        right: 20px;
        font-size: 24px;
        cursor: pointer;
        color: white;
        display: none;
    `;
    navbar.appendChild(closeBtn);
    
    function toggleMenu() {
        navbar.classList.toggle('active');
        closeBtn.style.display = navbar.classList.contains('active') ? 'block' : 'none';
        menuBtn.style.opacity = navbar.classList.contains('active') ? '0.5' : '1';
    }
    
    menuBtn.addEventListener('click', toggleMenu);
    closeBtn.addEventListener('click', toggleMenu);
    
    // Close menu when clicking on a link
    const navLinks = navbar.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 799) {
                navbar.classList.remove('active');
                closeBtn.style.display = 'none';
                menuBtn.style.opacity = '1';
            }
        });
    });
    
    // Responsive check
    function checkScreenSize() {
        if (window.innerWidth <= 799) {
            menuBtn.style.display = 'block';
            navbar.style.position = 'fixed';
        } else {
            menuBtn.style.display = 'none';
            navbar.classList.remove('active');
            closeBtn.style.display = 'none';
            navbar.style.position = 'static';
        }
    }
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
}

// ===== SCROLL REVEAL INITIALIZATION =====
function initScrollReveal() {
    const revealElements = document.querySelectorAll('#feature .fbox, #product1 .pro, #blog .blog-box, #sm-banner .banner-box');
    
    revealElements.forEach(el => {
        el.classList.add('reveal');
    });
    
    const revealOnScroll = () => {
        const reveals = document.querySelectorAll('.reveal');
        
        reveals.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();
}

// ===== ADD TO CART FUNCTIONALITY =====
function initAddToCart() {
    const cartButtons = document.querySelectorAll('#product1 .cart a, .pro .cart a');
    
    cartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const product = this.closest('.pro');
            if (product) {
                const productImg = product.querySelector('img')?.src || '';
                const productTitle = product.querySelector('.design h5')?.innerText || 'Product';
                const productPrice = product.querySelector('.design h4')?.innerText || '$0';
                
                addToCart({
                    id: Date.now() + Math.random(),
                    img: productImg,
                    name: productTitle,
                    price: parseFloat(productPrice.replace('$', '')),
                    quantity: 1
                });
                
                if (window.showToast) {
                    window.showToast(`${productTitle} added to cart!`, 'success');
                } else {
                    alert(`${productTitle} added to cart!`);
                }
            }
        });
    });
}

// ===== CART STORAGE FUNCTIONS =====
function getCart() {
    const cart = localStorage.getItem('ecommerce_cart');
    return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
    localStorage.setItem('ecommerce_cart', JSON.stringify(cart));
    updateCartCount();
}

function addToCart(product) {
    const cart = getCart();
    const existingItem = cart.find(item => item.name === product.name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push(product);
    }
    
    saveCart(cart);
}

function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
    return cart;
}

function updateQuantity(productId, newQuantity) {
    const cart = getCart();
    const item = cart.find(item => item.id === productId);
    if (item && newQuantity > 0) {
        item.quantity = newQuantity;
        saveCart(cart);
    } else if (item && newQuantity <= 0) {
        removeFromCart(productId);
    }
    return cart;
}

function updateCartCount() {
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    let cartIcon = document.querySelector('#navbar li a[href="cart.html"] i, #navbar li a[href="cart.html"]');
    if (cartIcon) {
        const existingCount = cartIcon.parentElement.querySelector('.cart-count');
        
        if (totalItems > 0) {
            if (!existingCount) {
                const countSpan = document.createElement('span');
                countSpan.className = 'cart-count';
                countSpan.style.cssText = `
                    position: absolute;
                    top: -8px;
                    right: -12px;
                    background: #ff6b9d;
                    color: white;
                    border-radius: 50%;
                    width: 18px;
                    height: 18px;
                    font-size: 11px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: bold;
                `;
                cartIcon.parentElement.style.position = 'relative';
                cartIcon.parentElement.appendChild(countSpan);
            }
            const countSpan = cartIcon.parentElement.querySelector('.cart-count');
            if (countSpan) countSpan.textContent = totalItems;
        } else if (existingCount) {
            existingCount.remove();
        }
    }
}

// ===== CART PAGE FUNCTIONALITY =====
function initCartPage() {
    const cartTable = document.querySelector('#cart table tbody');
    if (!cartTable) return;
    
    function renderCart() {
        const cart = getCart();
        
        if (cart.length === 0) {
            cartTable.innerHTML = `<tr><td colspan="6" style="text-align: center; padding: 60px;">
                <i class="fas fa-shopping-bag" style="font-size: 48px; color: #ddd;"></i>
                <p style="margin-top: 20px;">Your cart is empty</p>
                <a href="shop.html" style="display: inline-block; margin-top: 15px; padding: 12px 25px; background: linear-gradient(135deg, #ff6b9d, #ff4d7a); color: white; border-radius: 50px; text-decoration: none;">Continue Shopping</a>
            </td></tr>`;
            
            const subtotalDiv = document.querySelector('#subtotal');
            if (subtotalDiv) {
                subtotalDiv.style.display = 'none';
            }
            return;
        }
        
        const subtotalDiv = document.querySelector('#subtotal');
        if (subtotalDiv) {
            subtotalDiv.style.display = 'block';
        }
        
        cartTable.innerHTML = '';
        let total = 0;
        
        cart.forEach(item => {
            const subtotal = item.price * item.quantity;
            total += subtotal;
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><a href="#"><i class="fa-solid fa-trash" data-id="${item.id}"></i></a></td>
                <td><img src="${item.img}" alt="" style="width: 70px; border-radius: 15px;"></td>
                <td>${item.name}</td>
                <td>$${item.price}</td>
                <td><input type="number" value="${item.quantity}" min="1" data-id="${item.id}"></td>
                <td>$${subtotal.toFixed(2)}</td>
            `;
            cartTable.appendChild(row);
        });
        
        // Calculate shipping and total
        const shipping = total > 100 ? 0 : 15;
        const grandTotal = total + shipping;
        
        const subtotalDisplay = document.querySelector('#subtotal table');
        if (subtotalDisplay) {
            subtotalDisplay.innerHTML = `
                <tr><td>Cart Subtotal</td><td>$${total.toFixed(2)}</td></tr>
                <tr><td>Shipping</td><td>${shipping === 0 ? 'Free' : `$${shipping}`}</td></tr>
                <tr><td><strong>Total</strong></td><td><strong>$${grandTotal.toFixed(2)}</strong></td></tr>
            `;
        }
        
        // Add event listeners for remove buttons
        document.querySelectorAll('#cart .fa-trash').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const id = parseInt(btn.dataset.id);
                removeFromCart(id);
                renderCart();
                if (window.showToast) {
                    window.showToast('Item removed from cart', 'success');
                }
            });
        });
        
        // Add event listeners for quantity inputs
        document.querySelectorAll('#cart input[type="number"]').forEach(input => {
            input.addEventListener('change', (e) => {
                const id = parseInt(input.dataset.id);
                const newQty = parseInt(input.value);
                updateQuantity(id, newQty);
                renderCart();
            });
        });
    }
    
    renderCart();
    
    // Checkout button
    const checkoutBtn = document.querySelector('#subtotal button');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            const cart = getCart();
            if (cart.length === 0) {
                if (window.showToast) {
                    window.showToast('Your cart is empty!', 'error');
                } else {
                    alert('Your cart is empty!');
                }
            } else {
                if (window.showToast) {
                    window.showToast('Proceeding to checkout...', 'success');
                }
                setTimeout(() => {
                    alert('Thank you for your order! (Demo)');
                }, 1000);
            }
        });
    }
}

// ===== NEWSLETTER SIGNUP =====
function initNewsletterSignup() {
    const newsletterBtn = document.querySelector('#newsletter button');
    const newsletterInput = document.querySelector('#newsletter input');
    
    if (newsletterBtn && newsletterInput) {
        newsletterBtn.addEventListener('click', () => {
            const email = newsletterInput.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!email) {
                if (window.showToast) {
                    window.showToast('Please enter your email address', 'error');
                } else {
                    alert('Please enter your email address');
                }
                return;
            }
            
            if (!emailRegex.test(email)) {
                if (window.showToast) {
                    window.showToast('Please enter a valid email address', 'error');
                } else {
                    alert('Please enter a valid email address');
                }
                return;
            }
            
            // Save to localStorage
            const subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
            if (!subscribers.includes(email)) {
                subscribers.push(email);
                localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers));
            }
            
            newsletterInput.value = '';
            
            if (window.showToast) {
                window.showToast('Successfully subscribed to newsletter!', 'success');
            } else {
                alert('Successfully subscribed to newsletter!');
            }
        });
    }
}

// ===== CONTACT FORM SUBMIT =====
function initContactForm() {
    const contactForm = document.querySelector('#form-details form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = contactForm.querySelector('input[placeholder="your name"]')?.value.trim();
            const email = contactForm.querySelector('input[placeholder="email"]')?.value.trim();
            const subject = contactForm.querySelector('input[placeholder="subject"]')?.value.trim();
            const message = contactForm.querySelector('textarea')?.value.trim();
            
            if (!name || !email || !subject || !message) {
                if (window.showToast) {
                    window.showToast('Please fill in all fields', 'error');
                } else {
                    alert('Please fill in all fields');
                }
                return;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                if (window.showToast) {
                    window.showToast('Please enter a valid email address', 'error');
                } else {
                    alert('Please enter a valid email address');
                }
                return;
            }
            
            // Save message to localStorage
            const messages = JSON.parse(localStorage.getItem('contact_messages') || '[]');
            messages.push({
                name,
                email,
                subject,
                message,
                date: new Date().toISOString()
            });
            localStorage.setItem('contact_messages', JSON.stringify(messages));
            
            contactForm.reset();
            
            if (window.showToast) {
                window.showToast('Message sent successfully! We\'ll get back to you soon.', 'success');
            } else {
                alert('Message sent successfully! We\'ll get back to you soon.');
            }
        });
    }
}

// ===== PRODUCT GALLERY (for sproduct.html) =====
function initProductGallery() {
    const MainImg = document.getElementById('MainImg');
    const smallImgs = document.getElementsByClassName('small-img');
    
    if (MainImg && smallImgs.length > 0) {
        for (let i = 0; i < smallImgs.length; i++) {
            smallImgs[i].onclick = function() {
                MainImg.src = this.src;
                MainImg.style.animation = 'none';
                setTimeout(() => {
                    MainImg.style.animation = 'fadeInUp 0.3s ease';
                }, 10);
            };
        }
    }
}

// ===== SMOOTH SCROLLING =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===== BACK TO TOP BUTTON =====
function createBackToTopButton() {
    if (document.querySelector('.back-to-top')) return;
    
    const btn = document.createElement('button');
    btn.className = 'back-to-top';
    btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    btn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #ff6b9d, #ff4d7a);
        color: white;
        border: none;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    `;
    
    document.body.appendChild(btn);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            btn.style.opacity = '1';
            btn.style.visibility = 'visible';
        } else {
            btn.style.opacity = '0';
            btn.style.visibility = 'hidden';
        }
    });
    
    btn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== FEATURE INTERACTIONS =====
function initFeatureInteractions() {
    const features = document.querySelectorAll('#feature .fbox');
    
    features.forEach(feature => {
        feature.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        feature.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        feature.addEventListener('click', function() {
            const text = this.querySelector('h6')?.innerText || '';
            if (window.showToast) {
                window.showToast(`Learn more about ${text}`, 'success');
            }
        });
    });
}

// ===== BLOG READ MORE =====
function initBlogReadMore() {
    const readMoreLinks = document.querySelectorAll('#blog .blog-details a');
    
    readMoreLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const blogBox = link.closest('.blog-box');
            const title = blogBox?.querySelector('h4')?.innerText || 'Blog post';
            
            if (window.showToast) {
                window.showToast(`Reading: ${title}`, 'success');
            } else {
                alert(`Reading: ${title}`);
            }
        });
    });
}

// ===== PRICE CALCULATIONS =====
function initPriceCalculations() {
    // Format all prices to 2 decimal places
    const prices = document.querySelectorAll('#product1 .design h4');
    prices.forEach(price => {
        const currentPrice = price.innerText;
        if (currentPrice && currentPrice.includes('$')) {
            const num = parseFloat(currentPrice.replace('$', ''));
            if (!isNaN(num)) {
                price.innerText = `$${num.toFixed(2)}`;
            }
        }
    });
}

// ===== PRODUCT HOVER EFFECTS =====
function initProductHoverEffects() {
    const products = document.querySelectorAll('#product1 .pro');
    
    products.forEach(product => {
        const img = product.querySelector('img');
        const cartIcon = product.querySelector('.cart');
        
        if (img) {
            const originalSrc = img.src;
            product.addEventListener('mouseenter', () => {
                img.style.transform = 'scale(1.02)';
            });
            
            product.addEventListener('mouseleave', () => {
                img.style.transform = 'scale(1)';
            });
        }
        
        if (cartIcon) {
            cartIcon.addEventListener('mouseenter', () => {
                cartIcon.style.transform = 'scale(1.1)';
            });
            
            cartIcon.addEventListener('mouseleave', () => {
                cartIcon.style.transform = 'scale(1)';
            });
        }
    });
}

// ===== STICKY HEADER ENHANCEMENT =====
function initStickyHeader() {
    const header = document.getElementById('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            if (header) {
                header.style.background = 'rgba(248, 248, 248, 0.98)';
                header.style.boxShadow = '0 5px 25px rgba(0,0,0,0.1)';
            }
        } else {
            if (header) {
                header.style.background = 'rgba(248, 248, 248, 0.95)';
                header.style.boxShadow = '0 5px 15px rgba(0,0,0,0.06)';
            }
        }
        
        lastScroll = currentScroll;
    });
}

// ===== PARALLAX SCROLL EFFECT =====
function initParallaxEffect() {
    const hero = document.getElementById('hero');
    const banner = document.getElementById('banner');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        if (hero) {
            hero.style.backgroundPositionY = `${scrolled * 0.3}px`;
        }
        
        if (banner && !window.matchMedia('(max-width: 768px)').matches) {
            banner.style.backgroundPositionY = `${scrolled * 0.2}px`;
        }
    });
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
function initIntersectionObserver() {
    const animatedElements = document.querySelectorAll('#feature .fbox, #product1 .pro, #blog .blog-box, #sm-banner .banner-box, .blog-img, .blog-details');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                entry.target.style.opacity = '1';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

// ===== HERO BUTTON SHOP NOW =====
const shopNowBtn = document.querySelector('#hero button');
if (shopNowBtn) {
    shopNowBtn.addEventListener('click', () => {
        window.location.href = 'shop.html';
    });
}

// ===== BANNER BUTTONS =====
const exploreBtn = document.querySelector('#banner button');
if (exploreBtn) {
    exploreBtn.addEventListener('click', () => {
        window.location.href = 'shop.html';
    });
}

// ===== SMALL BANNER BUTTONS =====
const learnMoreBtns = document.querySelectorAll('#sm-banner button');
learnMoreBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        if (window.showToast) {
            window.showToast('Check out our amazing deals!', 'success');
        } else {
            alert('Check out our amazing deals!');
        }
    });
});

// ===== PRODUCT CLICK REDIRECT (for shop.html) =====
const productPro = document.querySelectorAll('#product1 .pro');
productPro.forEach(product => {
    product.addEventListener('click', (e) => {
        // Don't redirect if clicking on cart button
        if (e.target.closest('.cart')) return;
        
        const onclickAttr = product.getAttribute('onclick');
        if (onclickAttr && onclickAttr.includes('sproduct.html')) {
            // Allow the existing onclick to handle it
            return;
        }
        
        // If no existing redirect, show toast
        if (window.showToast) {
            const productName = product.querySelector('.design h5')?.innerText || 'Product';
            window.showToast(`Viewing ${productName}`, 'success');
        }
    });
});

// ===== FIX HTML ERRORS (missing space in ahref) =====
document.querySelectorAll('ahref').forEach(el => {
    const newEl = document.createElement('a');
    newEl.href = el.getAttribute('href') || '#';
    newEl.innerHTML = el.innerHTML;
    newEl.className = el.className;
    if (el.parentNode) {
        el.parentNode.replaceChild(newEl, el);
    }
});

document.querySelectorAll('a[href="index.html"] i.fa-bag-shopping').forEach(icon => {
    const parent = icon.closest('a');
    if (parent && parent.getAttribute('href') === 'index.html') {
        parent.setAttribute('href', 'cart.html');
    }
});

console.log('E-commerce website enhanced with Bootstrap & advanced features!');