<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ma Boutique Vitrine</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://kit.fontawesome.com/a076d05399.js" crossorigin="anonymous"></script>
</head>
<body class="bg-gray-50 font-sans">

    <nav class="fixed w-full z-50 bg-white/80 backdrop-blur-md shadow-sm p-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-blue-600 tracking-tight">SHOP.VIBE</h1>
        
        <div class="flex items-center gap-6">
            <div class="relative hidden md:block">
                <input type="text" placeholder="Rechercher un produit..." class="pl-10 pr-4 py-2 border rounded-full focus:ring-2 focus:ring-blue-400 outline-none transition-all">
                <span class="absolute left-3 top-2.5 text-gray-400">🔍</span>
            </div>
            <button onclick="toggleCart()" class="relative p-2 hover:bg-gray-100 rounded-full transition">
                <span class="text-2xl">🛒</span>
                <span id="cart-count" class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">0</span>
            </button>
        </div>
    </nav>

    <header class="relative h-screen flex items-center justify-center overflow-hidden">
        <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1600" 
             alt="Accueil" class="absolute inset-0 w-full h-full object-cover">
        <div class="absolute inset-0 bg-black/40"></div>
        <div class="relative z-10 text-center text-white px-4">
            <h2 class="text-5xl md:text-7xl font-extrabold mb-6">Nouvelle Collection 2026</h2>
            <p class="text-lg md:text-xl mb-8 opacity-90">Découvrez nos produits exclusifs sélectionnés pour vous.</p>
            <a href="#produits" class="bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-blue-600 hover:text-white transition-all">Découvrir</a>
        </div>
    </header>

    <section id="produits" class="max-w-7xl mx-auto py-20 px-4">
        <h3 class="text-3xl font-bold mb-10 text-center">Nos Incontournables</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="bg-white rounded-2xl shadow-lg overflow-hidden group">
                <div class="relative overflow-hidden cursor-zoom-in">
                    <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800" 
                         alt="Produit" class="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110">
                </div>
                <div class="p-6">
                    <h4 class="text-xl font-bold">Montre Premium</h4>
                    <p class="text-gray-500 text-sm mt-2">Élégante, résistante et connectée. Le futur à votre poignet.</p>
                    <div class="mt-4 flex justify-between items-center">
                        <span class="text-2xl font-bold text-blue-600">199.00 €</span>
                        <div class="flex items-center gap-2">
                            <input type="number" id="qty-1" value="1" min="1" class="w-12 border rounded text-center">
                            <button onclick="addToCart('Montre Premium', 199, 'qty-1')" class="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition">Ajouter</button>
                        </div>
                    </div>
                </div>
            </div>
            </div>
    </section>

    <div id="cart-sidebar" class="fixed top-0 right-0 h-full w-full md:w-96 bg-white shadow-2xl z-[60] transform translate-x-full transition-transform duration-300 p-6 overflow-y-auto">
        <div class="flex justify-between items-center mb-8 border-b pb-4">
            <h2 class="text-2xl font-bold">Votre Panier</h2>
            <button onclick="toggleCart()" class="text-3xl">&times;</button>
        </div>
        
        <div id="cart-items" class="space-y-4 mb-8">
            </div>

        <div class="border-t pt-4">
            <div class="flex justify-between text-xl font-bold mb-6">
                <span>Total :</span>
                <span id="cart-total">0.00 €</span>
            </div>
            
            <div class="space-y-3">
                <button onclick="checkout('Carte')" class="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition">Payer par Carte</button>
                <button onclick="checkout('ApplePay')" class="w-full bg-black text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-900 transition">
                     Pay
                </button>
            </div>
        </div>
    </div>

    <script>
        let cart = [];

        function toggleCart() {
            const sidebar = document.getElementById('cart-sidebar');
            sidebar.classList.toggle('translate-x-full');
        }

        function addToCart(name, price, qtyId) {
            const qty = parseInt(document.getElementById(qtyId).value);
            const item = { name, price, qty };
            
            // Vérifier si déjà présent
            const existing = cart.find(i => i.name === name);
            if (existing) {
                existing.qty += qty;
            } else {
                cart.push(item);
            }
            updateCartUI();
        }

        function updateCartUI() {
            const container = document.getElementById('cart-items');
            const count = document.getElementById('cart-count');
            const totalDisplay = document.getElementById('cart-total');
            
            container.innerHTML = '';
            let total = 0;
            let totalQty = 0;

            cart.forEach((item, index) => {
                total += item.price * item.qty;
                totalQty += item.qty;
                container.innerHTML += `
                    <div class="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                        <div>
                            <p class="font-bold">${item.name}</p>
                            <p class="text-sm text-gray-500">${item.qty} x ${item.price}€</p>
                        </div>
                        <button onclick="removeItem(${index})" class="text-red-500">🗑️</button>
                    </div>
                `;
            });

            count.innerText = totalQty;
            totalDisplay.innerText = total.toFixed(2) + " €";
        }

        function removeItem(index) {
            cart.splice(index, 1);
            updateCartUI();
        }

        function checkout(method) {
            if(cart.length === 0) return alert("Votre panier est vide !");
            alert(`Redirection vers le paiement sécurisé ${method}... (A intégrer avec Stripe ou Apple Pay API)`);
        }
    </script>
</body>
</html>
