let cart = JSON.parse(localStorage.getItem('myCart')) || [];
updateUI();

function addToCart(name, price, qtyId) {
    const qty = parseInt(document.getElementById(qtyId).value);
    const existing = cart.find(item => item.name === name);

    if (existing) {
        existing.qty += qty;
    } else {
        cart.push({ name, price, qty });
    }
    
    saveAndRefresh();
}

function saveAndRefresh() {
    localStorage.setItem('myCart', JSON.stringify(cart));
    updateUI();
}

function updateUI() {
    const content = document.getElementById('cart-content');
    const badge = document.getElementById('cart-badge');
    const totalEl = document.getElementById('cart-total');
    
    content.innerHTML = '';
    let total = 0;
    let count = 0;

    cart.forEach((item, index) => {
        total += item.price * item.qty;
        count += item.qty;
        content.innerHTML += `
            <div class="flex justify-between items-center border-b pb-2">
                <div>
                    <p class="font-bold">${item.name}</p>
                    <p class="text-sm">${item.qty} x ${item.price}€</p>
                </div>
                <button onclick="removeItem(${index})" class="text-red-500">Supprimer</button>
            </div>
        `;
    });

    badge.innerText = count;
    totalEl.innerText = total + '€';
}

function removeItem(index) {
    cart.splice(index, 1);
    saveAndRefresh();
}

function openCart() { document.getElementById('cart-sidebar').style.display = 'flex'; }
function closeCart() { document.getElementById('cart-sidebar').style.display = 'none'; }

// Envoi de la commande au PHP
async function processOrder() {
    if (cart.length === 0) return alert("Votre panier est vide");

    const response = await fetch('traitement.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            commande: cart,
            total: cart.reduce((s, i) => s + (i.price * i.qty), 0)
        })
    });

    if (response.ok) {
        alert("Commande transmise au client !");
        cart = [];
        saveAndRefresh();
        closeCart();
    } else {
        alert("Erreur lors de la commande.");
    }
}
