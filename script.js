function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

// Збереження кошика в localStorage
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Додавання товару в кошик
function addToCart(title, price, image) {
    let cart = getCart();
    let existingItem = cart.find(item => item.title === title);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ title, price: Number(price), image, quantity: 1 });
    }

    saveCart(cart);
    alert(`Товар "${title}" додано в кошик!`);
}

// Відображення кошика (на сторінці Untitled-11.html)
function renderCart() {
    const cartContainer = document.getElementById('cart-items');
    const totalPriceEl = document.getElementById('total-price');
    if (!cartContainer) return;

    let cart = getCart();
    cartContainer.innerHTML = '';

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p style="text-align: center;">Ваш кошик порожній</p>';
        if (totalPriceEl) totalPriceEl.innerText = '0 грн';
        return;
    }

    let total = 0;

    cart.forEach((item, index) => {
        let itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartItemHTML = `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.title}" style="width: 100px; height: auto;">
                <div class="cart-details">
                    <h3>${item.title}</h3>
                    <p>Ціна: ${item.price} грн</p>
                    <div class="quantity-controls">
                        <button onclick="changeQuantity(${index}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="changeQuantity(${index}, 1)">+</button>
                    </div>
                </div>
                <div>
                    <p>Сума: ${itemTotal} грн</p>
                    <button onclick="removeFromCart(${index})" class="remove-btn">Видалити</button>
                </div>
            </div>
        `;
        cartContainer.innerHTML += cartItemHTML;
    });

    if (totalPriceEl) totalPriceEl.innerText = `${total} грн`;
}

// Зміна кількості
function changeQuantity(index, delta) {
    let cart = getCart();
    if (cart[index]) {
        cart[index].quantity += delta;
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
        saveCart(cart);
        renderCart();
    }
}

// Видалення товару
function removeFromCart(index) {
    let cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
    renderCart();
}

// Очищення кошика
function clearCart() {
    localStorage.removeItem('cart');
    renderCart();
}

// Автоматичний рендер кошика при завантаженні сторінки
document.addEventListener('DOMContentLoaded', renderCart);