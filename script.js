let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(name, price) {
    cart.push({ name, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`${name} added to cart!`);
}

function updateCartCount() {
    const count = document.getElementById('cartCount');
    if (count) {
        count.textContent = cart.length;
    }
    updateCartDisplay();
}

function updateCartDisplay() {
    const items = document.getElementById('cartItems');
    const total = document.getElementById('cartTotal');
    if (items && total) {
        items.innerHTML = '';
        let sum = 0;
        cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - $${item.price}`;
            items.appendChild(li);
            sum += item.price;
        });
        total.textContent = sum.toFixed(2);
    }
}

function clearCart() {
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    document.getElementById('cartModal').classList.add('hidden');
}

function toggleCart() {
    const modal = document.getElementById('cartModal');
    modal.classList.toggle('hidden');
}

// Initialize on load
updateCartCount();

document.addEventListener('click', function(e) {
    const modal = document.getElementById('cartModal');
    const cartLink = e.target.closest('a[onclick="toggleCart()"]');
    if (!cartLink && !modal.contains(e.target)) {
        modal.classList.add('hidden');
    }
});