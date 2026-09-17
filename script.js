// ==========================================
// LUXE SHOPPING CART
// SpireX Foundation - Task 12
// ==========================================

let cart = JSON.parse(localStorage.getItem("luxeCart")) || [];

const cartButton = document.getElementById("cartButton");
const cartDrawer = document.getElementById("cartDrawer");
const closeCart = document.getElementById("closeCart");
const overlay = document.getElementById("overlay");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const subtotal = document.getElementById("subtotal");
const total = document.getElementById("total");
const toast = document.getElementById("toast");
const checkoutBtn = document.getElementById("checkoutBtn");


// ==========================================
// OPEN CART
// ==========================================

function openCart() {
    cartDrawer.classList.add("active");
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
}


// ==========================================
// CLOSE CART
// ==========================================

function closeCartDrawer() {
    cartDrawer.classList.remove("active");
    overlay.classList.remove("active");
    document.body.style.overflow = "";
}

cartButton.addEventListener("click", openCart);

closeCart.addEventListener("click", closeCartDrawer);

overlay.addEventListener("click", closeCartDrawer);


// ==========================================
// ADD PRODUCTS
// ==========================================

document.querySelectorAll(".add-btn").forEach(button => {

    button.addEventListener("click", () => {

        const id = button.dataset.id;
        const name = button.dataset.name;
        const price = Number(button.dataset.price);
        const image = button.dataset.image;

        const existingProduct = cart.find(item => item.id === id);

        if (existingProduct) {
            existingProduct.quantity++;
        } else {

            cart.push({
                id,
                name,
                price,
                image,
                quantity: 1
            });

        }

        saveCart();
        updateCart();

        showToast(`${name} added to cart`);

    });

});


// ==========================================
// UPDATE CART
// ==========================================

function updateCart() {

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">
                <div class="icon">🛒</div>
                <h3>Your cart is empty</h3>
                <p>Add something you love to get started.</p>
            </div>
        `;

    } else {

        cart.forEach(item => {

            const cartItem = document.createElement("div");

            cartItem.className = "cart-item";

            cartItem.innerHTML = `

                <img src="${item.image}" alt="${item.name}">

                <div class="cart-item-info">

                    <h4>${item.name}</h4>

                    <p>$${item.price.toFixed(2)} each</p>

                    <div class="quantity">

                        <button onclick="changeQuantity('${item.id}', -1)">
                            −
                        </button>

                        <span>${item.quantity}</span>

                        <button onclick="changeQuantity('${item.id}', 1)">
                            +
                        </button>

                    </div>

                    <button
                        class="remove-item"
                        onclick="removeItem('${item.id}')">
                        Remove
                    </button>

                </div>

                <div class="item-price">
                    $${(item.price * item.quantity).toFixed(2)}
                </div>
            `;

            cartItems.appendChild(cartItem);

        });

    }

    updateTotals();

}


// ==========================================
// CHANGE QUANTITY
// ==========================================

function changeQuantity(id, amount) {

    const item = cart.find(product => product.id === id);

    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {
        cart = cart.filter(product => product.id !== id);
    }

    saveCart();
    updateCart();

}


// ==========================================
// REMOVE ITEM
// ==========================================

function removeItem(id) {

    cart = cart.filter(item => item.id !== id);

    saveCart();
    updateCart();

    showToast("Item removed from cart");

}


// ==========================================
// CALCULATE TOTALS
// ==========================================

function updateTotals() {

    let totalItems = 0;
    let totalPrice = 0;

    cart.forEach(item => {

        totalItems += item.quantity;

        totalPrice += item.price * item.quantity;

    });

    cartCount.textContent = totalItems;

    subtotal.textContent = `$${totalPrice.toFixed(2)}`;

    total.textContent = `$${totalPrice.toFixed(2)}`;

}


// ==========================================
// LOCAL STORAGE
// ==========================================

function saveCart() {

    localStorage.setItem("luxeCart", JSON.stringify(cart));

}


// ==========================================
// TOAST MESSAGE
// ==========================================

function showToast(message) {

    toast.textContent = `✓ ${message}`;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2200);

}


// ==========================================
// CHECKOUT
// ==========================================

checkoutBtn.addEventListener("click", () => {

    if (cart.length === 0) {

        showToast("Your cart is empty");

        return;

    }

    showToast("Checkout demo — order ready!");

});


// ==========================================
// INITIAL LOAD
// ==========================================

updateCart();
