import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 1. Ta Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCtvhBRWKOstReRzzVa4M7Zbpqh2gs3rWo",
  authDomain: "l-excellence-cbd.firebaseapp.com",
  projectId: "l-excellence-cbd",
  storageBucket: "l-excellence-cbd.firebasestorage.app",
  messagingSenderId: "739325084650",
  appId: "1:739325084650:web:a70723b34511ea526de893",
  measurementId: "G-704HYQV95Q"
};

// 2. Initialisation
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
let cart = JSON.parse(localStorage.getItem('excellence_cart')) || [];

// --- PARTIE IMPORTATION (À utiliser une seule fois) ---
const listeCBD = [
    { nom: "Huile CBD 5% Full Spectrum", prix: 29.90, description: "Idéale pour débuter.", categorie: "Huiles" },
    { nom: "Huile CBD 20% Intense", prix: 59.90, description: "Concentration élevée pour un apaisement profond.", categorie: "Huiles" },
    { nom: "Fleur Amnesia Haze", prix: 10.00, description: "Arômes citronnés et boisés.", categorie: "Fleurs" },
    { nom: "Fleur Gorilla Glue", prix: 12.00, description: "Notes terreuses et sucrées.", categorie: "Fleurs" },
    { nom: "Résine Moonrock 50%", prix: 18.00, description: "Fleur trempée dans l'huile et pollen.", categorie: "Résines" },
    { nom: "Baume CBD Musculaire", prix: 24.50, description: "Apaise après le sport.", categorie: "Soins" },
    { nom: "Tisane Nuit Calme", prix: 12.90, description: "Chanvre et camomille.", categorie: "Thés" },
    { nom: "Résine Gold Hash", prix: 15.00, description: "Texture crémeuse.", categorie: "Résines" },
    { nom: "Huile CBD Animaux", prix: 19.90, description: "Pour le stress des chiens et chats.", categorie: "Animaux" },
    { nom: "E-liquide CBD Menthe", prix: 15.00, description: "Frais et relaxant.", categorie: "Vape" },
    { nom: "Crème Visage Chanvre", prix: 28.00, description: "Hydratation intense.", categorie: "Soins" },
    { nom: "Fleur Orange Bud", prix: 9.00, description: "Notes d'agrumes prononcées.", categorie: "Fleurs" },
    { nom: "Tisane Vitalité", prix: 12.50, description: "Chanvre et gingembre.", categorie: "Thés" },
    { nom: "Huile CBG + CBD 10%", prix: 45.00, description: "Synergie de molécules.", categorie: "Huiles" },
    { nom: "Bonbons CBD Miel", prix: 9.90, description: "Pause détente gourmande.", categorie: "Épicerie" },
    { nom: "Fleur White Widow", prix: 11.00, description: "Puissante et cristalline.", categorie: "Fleurs" },
    { nom: "Sérum Barbe", prix: 19.00, description: "Nourrit et apaise.", categorie: "Soins" },
    { nom: "Crumble CBD 99%", prix: 25.00, description: "Pur pour vaporisation.", categorie: "Extraits" },
    { nom: "Chocolat au Chanvre", prix: 6.50, description: "Bio et vegan.", categorie: "Épicerie" },
    { nom: "Vape Pen Jetable", prix: 19.90, description: "Prêt à l'emploi.", categorie: "Vape" },
    { nom: "Huile CBD 30% Premium", prix: 79.00, description: "Grade le plus haut.", categorie: "Huiles" },
    { nom: "Fleur Gelato", prix: 13.00, description: "Saveurs de fruits rouges.", categorie: "Fleurs" },
    { nom: "Résine Ketama", prix: 7.00, description: "Méthode traditionnelle.", categorie: "Résines" },
    { nom: "Bougie Massage", prix: 22.00, description: "Cire tiède nourrissante.", categorie: "Accessoires" },
    { nom: "Fleur Strawberry", prix: 10.50, description: "Arôme fraise des bois.", categorie: "Fleurs" },
    { nom: "Patchs CBD 24h", prix: 29.00, description: "Diffusion lente.", categorie: "Compléments" },
    { nom: "Miel au CBD Bio", prix: 16.50, description: "Miel de fleurs infusé.", categorie: "Épicerie" },
    { nom: "Fleur Purple Haze", prix: 11.50, description: "Reflets violets et épicés.", categorie: "Fleurs" },
    { nom: "Spray Buccal Menthe", prix: 21.00, description: "Action instantanée.", categorie: "Compléments" },
    { nom: "Lait Corps Hydratant", prix: 14.90, description: "Texture non grasse.", categorie: "Soins" }
];

async function importerProduits() {
    console.log("Tentative d'importation...");
    const colRef = collection(db, "produits");
    for (const p of listeCBD) {
        try {
            await addDoc(colRef, p);
            console.log(`✅ Ajouté : ${p.nom}`);
        } catch (e) {
            console.error("Erreur : ", e);
        }
    }
    alert("Importation terminée ! Vérifie ta console Firebase.");
}

// DÉCOMMENTE la ligne suivante pour remplir ta base, puis RE-COMMENTE la :
// importerProduits();

// --- LOGIQUE D'AFFICHAGE DU CATALOGUE ---
async function fetchProducts() {
    const grid = document.getElementById('product-grid');
    const querySnapshot = await getDocs(collection(db, "produits"));
    grid.innerHTML = "";
    querySnapshot.forEach((doc) => {
        const p = doc.data();
        grid.innerHTML += `
            <div class="bg-white rounded-2xl p-5 shadow-sm border border-stone-100 hover:shadow-xl transition-all group">
                <div class="h-64 overflow-hidden rounded-xl mb-4 bg-stone-50">
                    <img src="https://images.unsplash.com/photo-1611073113567-28205469964a?auto=format&fit=crop&q=80&w=400" 
                         class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
                </div>
                <h3 class="font-serif text-xl text-[#2D3A2D] mb-2">${p.nom}</h3>
                <p class="text-xs text-stone-400 mb-4 line-clamp-2">${p.description}</p>
                <div class="flex justify-between items-center">
                    <span class="font-bold text-emerald-900">${p.prix.toFixed(2)} €</span>
                    <button onclick="addToCart('${p.nom}', ${p.prix})" class="bg-[#2D3A2D] text-white text-xs px-5 py-2 rounded-full hover:bg-emerald-950 transition shadow-md">Ajouter</button>
                </div>
            </div>`;
    });
}

// --- GESTION DU PANIER ---
window.addToCart = (name, price) => {
    const item = cart.find(i => i.name === name);
    if (item) item.qty++;
    else cart.push({ name, price, qty: 1 });
    renderCart();
};

window.renderCart = () => {
    localStorage.setItem('excellence_cart', JSON.stringify(cart));
    const container = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total');
    const countEl = document.getElementById('cart-count');
    
    let total = 0;
    container.innerHTML = "";
    cart.forEach((item, index) => {
        total += item.price * item.qty;
        container.innerHTML += `
            <div class="flex justify-between items-center bg-stone-50 p-4 rounded-xl">
                <div><p class="font-bold text-sm text-[#2D3A2D]">${item.name}</p><p class="text-xs text-stone-500">${item.qty} x ${item.price}€</p></div>
                <button onclick="remove(${index})" class="text-red-400 text-lg">&times;</button>
            </div>`;
    });
    totalEl.innerText = total.toFixed(2) + " €";
    countEl.innerText = cart.reduce((a, b) => a + b.qty, 0);
};

window.remove = (index) => {
    cart.splice(index, 1);
    renderCart();
};

// --- ENVOI COMMANDE ---
window.validerCommande = async () => {
    if (cart.length === 0) return alert("Le panier est vide !");
    try {
        await addDoc(collection(db, "commandes"), {
            items: cart,
            total: cart.reduce((a, b) => a + (b.price * b.qty), 0),
            date: new Date().toLocaleString(),
            client: "Fatima Ezzohra Dadi" // Identité récupérée dynamiquement
        });
        alert("Commande envoyée ! Ton client la recevra sur sa console Firebase.");
        cart = [];
        renderCart();
    } catch (e) { console.error(e); }
};

// Lancement
fetchProducts();
renderCart();
