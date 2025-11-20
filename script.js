
let globalCart = [];


var MenuItems = document.getElementById("MenuItems");
if (MenuItems) {
    MenuItems.style.maxHeight = "0px";
}

function menutoggle() {
    if (MenuItems && MenuItems.style.maxHeight === "0px") {
        MenuItems.style.maxHeight = "200px";
    } else if (MenuItems) {
        MenuItems.style.maxHeight = "0px";
    }
}

// Initialize cart on page load
document.addEventListener('DOMContentLoaded', function() {
    // Try to load from sessionStorage first, then fallback
    try {
        const storedCart = sessionStorage.getItem('cart');
        if (storedCart) {
            globalCart = JSON.parse(storedCart);
        }
    } catch (e) {
        console.log('Storage not available, using memory only');
        globalCart = [];
    }
    
    // Load cart if we're on cart page
    if (document.getElementById('cart-content')) {
        loadCart();
    }
    
    // Initialize payment method selection
    const paymentMethods = document.querySelectorAll('.payment-method');
    paymentMethods.forEach(method => {
        method.addEventListener('click', function() {
            paymentMethods.forEach(m => m.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Add contact form interactions
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Get cart data
function getCartData() {
    return globalCart;
}

// Save cart data
function saveCartData(cart) {
    globalCart = cart;
    try {
        sessionStorage.setItem('cart', JSON.stringify(cart));
    } catch (e) {
        console.log('Storage not available, cart saved in memory only');
    }
}

// Add to cart functionality
function addToCart(button, productName, price) {
    let cart = getCartData();
    
    // Check if product already exists in cart
    let existingProduct = cart.find(item => item.name === productName);
    
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        // Add new product to cart
        cart.push({
            name: productName,
            price: parseFloat(price),
            quantity: 1
        });
    }
    
    // Save cart
    saveCartData(cart);
    
    // Update button text and style
    if (button) {
        button.innerText = "Added to Cart!";
        button.style.backgroundColor = "#28a745";
        button.disabled = true;
        
        // Reset button after 2 seconds
        setTimeout(function() {
            button.innerText = "Add to Cart";
            button.style.backgroundColor = "#ff523b";
            button.disabled = false;
        }, 2000);
    }
    
    // Show notification
    alert(productName + " has been added to your cart!");
    
    // Refresh cart display if on cart page
    if (document.getElementById('cart-content')) {
        loadCart();
    }
}

// Add to cart for main product (product details page)
function addMainProductToCart() {
    const sizeSelect = document.getElementById("sizeSelect");
    const quantityInput = document.getElementById("quantityInput");
    const size = sizeSelect ? sizeSelect.value : null;
    const quantity = quantityInput ? parseInt(quantityInput.value) : 1;
    
    if (sizeSelect && !size) {
        alert("Please select a size before adding to cart.");
        return;
    }
    
    let cart = getCartData();
    
    const product = {
        name: 'Red Printed T-Shirt by HRX',
        price: 50.00,
        size: size,
        quantity: quantity
    };
    
    // Check if same product with same size exists
    const existingProduct = cart.find(item => 
        item.name === product.name && item.size === product.size
    );
    
    if (existingProduct) {
        existingProduct.quantity += product.quantity;
    } else {
        cart.push(product);
    }
    
    saveCartData(cart);
    
    const sizeText = size ? ` (Size: ${size})` : '';
    alert(`${product.name}${sizeText} has been added to your cart!`);
}

// Add to cart for related products
function addRelatedToCart(button, productName, price) {
    let cart = getCartData();
    
    // Check if product already exists in cart
    let existingProduct = cart.find(item => item.name === productName);
    
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        // Add new product to cart
        cart.push({
            name: productName,
            price: parseFloat(price),
            quantity: 1
        });
    }
    
    // Save cart
    saveCartData(cart);
    
    // Update button text and style
    if (button) {
        button.innerText = "Added to Cart!";
        button.style.backgroundColor = "#28a745";
        button.disabled = true;
        
        // Reset button after 2 seconds
        setTimeout(function() {
            button.innerText = "Add to Cart";
            button.style.backgroundColor = "#ff523b";
            button.disabled = false;
        }, 2000);
    }
    
    // Show notification
    alert(productName + " has been added to your cart!");
}

// Sample product images
const productImages = {
    'Red Printed T-Shirt': 'images/product-1.jpg',
    'Black Sports Shoes': 'images/product-2.jpg',
    'Gray Trackpants': 'images/product-3.jpg',
    'Blue T-Shirt': 'images/product-4.jpg',
    'White Sneakers': 'images/product-5.jpg',
    'Black T-Shirt': 'images/product-6.jpg',
    'Casual Socks': 'images/product-7.jpg',
    'Black Watch': 'images/product-8.jpg',
    'Red T-Shirt': 'images/product-9.jpg',
    'Sports Shoes': 'images/product-10.jpg',
    'Gray Shoes': 'images/product-11.jpg',
    'Blue Shorts': 'images/product-12.jpg',
    'Red Printed T-Shirt by HRX': 'images/gallery-1.jpg'
};

// Load and display cart
function loadCart() {
    const cart = getCartData();
    const cartContent = document.getElementById('cart-content');
    
    if (!cartContent) return;
    
    if (cart.length === 0) {
        cartContent.innerHTML = `
            <div class="empty-cart" style="text-align: center; padding: 50px;">
                <i class="fa fa-shopping-cart" style="font-size: 4em; color: #ccc; margin-bottom: 20px;"></i>
                <h3>Your cart is empty</h3>
                <p>Add some products to your cart to see them here.</p>
                <a href="products.html" class="btn" style="margin-top: 20px;">Continue Shopping</a>
            </div>
        `;
        return;
    }

    let cartHTML = `
        <table class="cart-table" style="width: 100%; border-collapse: collapse;">
            <thead>
                <tr style="background-color: #f8f9fa;">
                    <th style="padding: 15px; text-align: left; border-bottom: 2px solid #dee2e6;">Product</th>
                    <th style="padding: 15px; text-align: center; border-bottom: 2px solid #dee2e6;">Quantity</th>
                    <th style="padding: 15px; text-align: right; border-bottom: 2px solid #dee2e6;">Subtotal</th>
                </tr>
            </thead>
            <tbody>
    `;

    let total = 0;

    cart.forEach((item, index) => {
        const subtotal = item.price * item.quantity;
        total += subtotal;
        
        const imageSrc = productImages[item.name] || 'images/product-1.jpg';
        
        cartHTML += `
            <tr style="border-bottom: 1px solid #dee2e6;">
                <td style="padding: 15px;">
                    <div class="cart-info" style="display: flex; align-items: center;">
                        <img src="${imageSrc}" alt="${item.name}" style="width: 80px; height: 80px; object-fit: cover; margin-right: 15px; border-radius: 5px;">
                        <div class="product-details">
                            <h4 style="margin: 0 0 5px 0; font-size: 16px;">${item.name}</h4>
                            <p style="margin: 0; color: #ff523b; font-weight: bold;">Price: $${item.price.toFixed(2)}</p>
                            ${item.size ? `<p style="margin: 5px 0 0 0; color: #666;">Size: ${item.size}</p>` : ''}
                            <button class="remove-btn" onclick="removeFromCart(${index})" 
                                style="margin-top: 10px; padding: 5px 10px; background: #dc3545; color: white; border: none; border-radius: 3px; cursor: pointer;">
                                <i class="fa fa-trash"></i> Remove
                            </button>
                        </div>
                    </div>
                </td>
                <td style="padding: 15px; text-align: center;">
                    <input type="number" 
                           value="${item.quantity}" 
                           min="1" 
                           max="10" 
                           class="quantity-input"
                           onchange="updateQuantity(${index}, this.value)"
                           style="width: 60px; padding: 5px; text-align: center; border: 1px solid #ddd; border-radius: 3px;">
                </td>
                <td style="padding: 15px; text-align: right; font-weight: bold;">$${subtotal.toFixed(2)}</td>
            </tr>
        `;
    });

    cartHTML += `
            </tbody>
        </table>
        
        <div class="total-price" style="margin-top: 30px; max-width: 400px; margin-left: auto;">
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">Subtotal</td>
                    <td style="padding: 10px; text-align: right; border-bottom: 1px solid #ddd;">$${total.toFixed(2)}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">Tax (10%)</td>
                    <td style="padding: 10px; text-align: right; border-bottom: 1px solid #ddd;">$${(total * 0.1).toFixed(2)}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">Shipping</td>
                    <td style="padding: 10px; text-align: right; border-bottom: 1px solid #ddd;">$${total > 100 ? '0.00' : '10.00'}</td>
                </tr>
                <tr class="final-total" style="font-weight: bold; font-size: 18px;">
                    <td style="padding: 15px; border-top: 2px solid #333;">Total</td>
                    <td style="padding: 15px; text-align: right; border-top: 2px solid #333;">$${(total + (total * 0.1) + (total > 100 ? 0 : 10)).toFixed(2)}</td>
                </tr>
            </table>
        </div>
        
        <div style="text-align: center; margin-top: 30px;">
            <button onclick="showCheckout()" class="btn" 
                style="margin-right: 15px; padding: 12px 30px; background: #ff523b; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 16px;">
                Proceed to Checkout
            </button>
            <a href="products.html" class="btn" 
                style="padding: 12px 30px; background: #6c757d; color: white; text-decoration: none; border-radius: 5px; font-size: 16px;">
                Continue Shopping
            </a>
        </div>
    `;

    cartContent.innerHTML = cartHTML;
}

// Update quantity
function updateQuantity(index, quantity) {
    const cart = getCartData();
    const newQuantity = parseInt(quantity);
    if (newQuantity > 0 && newQuantity <= 10) {
        cart[index].quantity = newQuantity;
        saveCartData(cart);
        loadCart();
    }
}

// Remove from cart
function removeFromCart(index) {
    if (confirm('Are you sure you want to remove this item from your cart?')) {
        const cart = getCartData();
        cart.splice(index, 1);
        saveCartData(cart);
        loadCart();
    }
}

// Show checkout section
function showCheckout() {
    const checkoutSection = document.getElementById('checkout-section');
    if (checkoutSection) {
        checkoutSection.style.display = 'block';
        checkoutSection.scrollIntoView({ 
            behavior: 'smooth' 
        });
    } else {
        // If checkout section doesn't exist, redirect to checkout page
        window.location.href = 'checkout.html';
    }
}

// Calculate total
function calculateTotal(cart) {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.1;
    const shipping = subtotal > 100 ? 0 : 10;
    return subtotal + tax + shipping;
}

// Proceed to buy/checkout
function proceedToBuy() {
    const form = document.getElementById('checkout-form');
    if (!form) {
        alert('Checkout form not found');
        return;
    }
    
    const formData = new FormData(form);
    
    // Basic form validation
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'zipCode'];
    let isValid = true;
    
    for (let field of requiredFields) {
        const input = document.getElementById(field);
        if (input && !input.value.trim()) {
            input.style.borderColor = '#ff523b';
            isValid = false;
        } else if (input) {
            input.style.borderColor = '#ddd';
        }
    }
    
    if (!isValid) {
        alert('Please fill in all required fields.');
        return;
    }

    // Get selected payment method
    const selectedPaymentElement = document.querySelector('.payment-method.active');
    const selectedPayment = selectedPaymentElement ? 
        selectedPaymentElement.dataset.method || 'Credit Card' : 'Credit Card';
    
    // Get cart data
    const cart = getCartData();
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    const total = calculateTotal(cart);
    
    // Create order object
    const order = {
        orderNumber: 'ORD-' + Date.now(),
        date: new Date().toISOString(),
        customer: {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            address: formData.get('address'),
            city: formData.get('city'),
            zipCode: formData.get('zipCode')
        },
        items: cart,
        paymentMethod: selectedPayment,
        total: total,
        notes: formData.get('notes') || ''
    };

    // Simulate order processing
    const proceedBtn = document.querySelector('.proceed-btn');
    if (proceedBtn) {
        proceedBtn.disabled = true;
        proceedBtn.innerHTML = 'Processing Order...';
    }

    setTimeout(() => {
        // Save order to memory (in real app, send to server)
        console.log('Order processed:', order);
        
        // Clear cart
        saveCartData([]);
        
        // Show success message
        alert(`Order placed successfully! 

Order Number: ${order.orderNumber}
Total: $${total.toFixed(2)}
Payment Method: ${selectedPayment}

Thank you for shopping with RedStore!`);
        
        // Redirect to home page
        window.location.href = 'index.html';
    }, 2000);
}

// Handle contact form submission
function handleContactForm(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const contactData = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        phone: formData.get('phone') || 'Not provided',
        subject: formData.get('subject'),
        message: formData.get('message'),
        timestamp: new Date().toISOString()
    };
    
    console.log('Contact form submitted:', contactData);
    alert(`Thank you ${contactData.firstName}! Your message has been sent successfully. We'll get back to you soon at ${contactData.email}.`);
    
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.reset();
    }
}

// Login/Register form switching
var LoginForm = document.getElementById("LoginForm");
var RegForm = document.getElementById("RegForm");
var Indicator = document.getElementById("Indicator");

function register() {
    if (RegForm && LoginForm && Indicator) {
        RegForm.style.transform = "translateX(0px)";
        LoginForm.style.transform = "translateX(0px)";
        Indicator.style.transform = "translateX(100px)";
    }
}

function login() {
    if (RegForm && LoginForm && Indicator) {
        RegForm.style.transform = "translateX(300px)";
        LoginForm.style.transform = "translateX(300px)";
        Indicator.style.transform = "translateX(0px)";
    }
}

// Handle login form submission
function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    
    if (username && password) {
        // Store user data in memory
        console.log('User logged in:', {
            username: username,
            loginTime: new Date().toISOString()
        });
        
        alert('Login successful! Welcome ' + username);
        window.location.href = 'index.html';
    } else {
        alert('Please fill in all fields');
    }
}

// Handle register form submission
function handleRegister(event) {
    event.preventDefault();
    
    const username = document.getElementById('regUsername').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    
    if (username && email && password) {
        // In a real app, this would validate against existing users
        console.log('User registered:', {
            username: username,
            email: email,
            registrationDate: new Date().toISOString()
        });
        
        alert('Registration successful! You can now login with your credentials.');
        
        // Switch to login form
        login();
        
        // Clear the registration form
        const regForm = document.getElementById('RegForm');
        if (regForm) {
            regForm.reset();
        }
        
    } else {
        alert('Please fill in all fields');
    }
}

// Handle forgot password
function forgotPassword() {
    const email = prompt('Please enter your email address:');
    if (email) {
        alert('Password reset instructions have been sent to: ' + email);
    }
}

// Product image gallery functionality
var ProductImg = document.getElementById("ProductImg");
var SmallImg = document.getElementsByClassName("small-img");

if (ProductImg && SmallImg.length > 0) {
    SmallImg[0].onclick = function() {
        ProductImg.src = SmallImg[0].src;
    }
    if (SmallImg[1]) {
        SmallImg[1].onclick = function() {
            ProductImg.src = SmallImg[1].src;
        }
    }
    if (SmallImg[2]) {
        SmallImg[2].onclick = function() {
            ProductImg.src = SmallImg[2].src;
        }
    }
    if (SmallImg[3]) {
        SmallImg[3].onclick = function() {
            ProductImg.src = SmallImg[3].src;
        }
    }
}

// Sort products functionality
function sortProducts(sortBy) {
    const products = document.querySelectorAll('.row .col-4');
    const container = products[0]?.parentNode;
    
    if (container && (sortBy === 'price-low' || sortBy === 'price-high')) {
        const productsArray = Array.from(products);
        productsArray.sort((a, b) => {
            const priceA = parseFloat(a.querySelector('p').textContent.replace('$', ''));
            const priceB = parseFloat(b.querySelector('p').textContent.replace('$', ''));
            return sortBy === 'price-low' ? priceA - priceB : priceB - priceA;
        });
        
        productsArray.forEach(product => container.appendChild(product));
    }
    
    alert('Products sorted by ' + sortBy);
}

// Page navigation
let currentPage = 1;
function loadPage(page) {
    if (page === 'next') {
        currentPage = currentPage < 4 ? currentPage + 1 : 1;
    } else {
        currentPage = page;
    }
    
    // Update active page button
    const pageButtons = document.querySelectorAll('.page-btn span');
    pageButtons.forEach(span => {
        span.classList.remove('active');
    });
    
    if (page !== 'next' && pageButtons[page - 1]) {
        pageButtons[page - 1].classList.add('active');
    }
    
    alert('Loading page ' + currentPage);
}