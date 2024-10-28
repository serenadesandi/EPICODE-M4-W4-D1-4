// Configurazione API
const API_URL = "https://striveschool-api.herokuapp.com/api/product/";
const AUTH_TOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzFmNDdhM2FmNWE2MjAwMTVlZWJhMDAiLCJpYXQiOjE3MzAxMDMyMDMsImV4cCI6MTczMTMxMjgwM30.vzCYuIWV4PQhH-UcXvwZ9Dp1GzvOG0HRL4F8nYn1hB0";


// Funzione per ottenere tutti i prodotti
async function loadProducts() {
    try {
        const response = await fetch(API_URL, {
            headers: {
                "Authorization": AUTH_TOKEN
            }
        });
        const products = await response.json();
        displayProducts(products, "products-container");
    } catch (error) {
        console.error("Errore nel caricamento dei prodotti:", error);
    }
}

// Funzione per mostrare i prodotti sulla pagina
function displayProducts(products, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";
    products.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.className = "product";
        productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>Brand: ${product.brand}</p>
            <p>€${product.price}</p>
            <img src="${product.imageUrl}" alt="${product.name}" width="100">
            <button onclick="window.location.href='product.html?id=${product._id}'">Vedi Dettagli</button>
        `;
        container.appendChild(productDiv);
    });
}

// Funzione per caricare i dettagli di un singolo prodotto
async function loadProductDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");
    try {
        const response = await fetch(API_URL + productId, {
            headers: {
                "Authorization": AUTH_TOKEN
            }
        });
        const product = await response.json();
        displayProductDetails(product);
    } catch (error) {
        console.error("Errore nel caricamento dei dettagli del prodotto:", error);
    }
}

// Funzione per mostrare i dettagli di un prodotto
function displayProductDetails(product) {
    const detailsContainer = document.getElementById("product-details");
    detailsContainer.innerHTML = `
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p>Brand: ${product.brand}</p>
        <p>€${product.price}</p>
        <img src="${product.imageUrl}" alt="${product.name}" width="200">
    `;
}


// Funzione per aggiungere un nuovo prodotto
async function addProduct() {
    // Prende i valori dai campi di input
    const name = document.getElementById("product-name-input").value;
    const description = document.getElementById("product-description-input").value;
    const brand = document.getElementById("product-brand-input").value;
    const imageUrl = document.getElementById("product-imageUrl-input").value;
    const price = parseFloat(document.getElementById("product-price-input").value);

    const newProduct = {
        name,
        description,
        brand,
        imageUrl,
        price
    };

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": AUTH_TOKEN
            },
            body: JSON.stringify(newProduct)
        });

        if (response.ok) {
            alert("Prodotto aggiunto con successo!");
            // Aggiorna la lista prodotti o ricarica la pagina per vedere il nuovo prodotto
            loadProducts(); // Assicurati che la funzione loadProducts() sia presente e aggiorni l'elenco
        } else {
            const errorData = await response.json();
            alert(`Errore nell'aggiunta del prodotto: ${errorData.message}`);
        }
    } catch (error) {
        console.error("Errore durante l'aggiunta del prodotto:", error);
        alert("Errore di connessione all'API.");
    }
}


// Funzione per aggiungere un nuovo prodotto
async function addProduct() {
    // Prende i valori dai campi di input
    const name = document.getElementById("product-name-input").value;
    const description = document.getElementById("product-description-input").value;
    const brand = document.getElementById("product-brand-input").value;
    const imageUrl = document.getElementById("product-imageUrl-input").value;
    const price = parseFloat(document.getElementById("product-price-input").value);

    const newProduct = {
        name,
        description,
        brand,
        imageUrl,
        price
    };

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": AUTH_TOKEN
            },
            body: JSON.stringify(newProduct)
        });

        if (response.ok) {
            alert("Prodotto aggiunto con successo!");
            // Aggiorna la lista prodotti o ricarica la pagina per vedere il nuovo prodotto
            loadProducts(); // Assicurati che la funzione loadProducts() sia presente e aggiorni l'elenco
        } else {
            const errorData = await response.json();
            alert(`Errore nell'aggiunta del prodotto: ${errorData.message}`);
        }
    } catch (error) {
        console.error("Errore durante l'aggiunta del prodotto:", error);
        alert("Errore di connessione all'API.");
    }
}





// Funzione per caricare i prodotti nel backoffice
async function loadBackofficeProducts() {
    await loadProducts();
}

// Gestisce l'invio del form per aggiungere/modificare un prodotto
async function handleProductFormSubmit(event) {
    event.preventDefault();
    const productData = {
        name: document.getElementById("name").value,
        description: document.getElementById("description").value,
        brand: document.getElementById("brand").value,
        imageUrl: document.getElementById("imageUrl").value,
        price: parseFloat(document.getElementById("price").value)
    };

    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": AUTH_TOKEN
        },
        body: JSON.stringify(productData)
    });
    if (response.ok) {
        alert("Prodotto aggiunto con successo!");
        loadBackofficeProducts();
    } else {
        console.error("Errore nell'aggiunta del prodotto");
    }
}

// Funzione per eliminare un prodotto
async function deleteProduct(productId) {
    try {
        await fetch(API_URL + productId, {
            method: "DELETE",
            headers: {
                "Authorization": AUTH_TOKEN
            }
        });
        alert("Prodotto eliminato!");
        loadBackofficeProducts();
    } catch (error) {
        console.error("Errore nella cancellazione del prodotto:", error);
    }
}

// Funzione per precompilare il form di modifica con i dati del prodotto selezionato
function populateEditForm(product) {
    document.getElementById("edit-product-id").value = product._id;
    document.getElementById("edit-name").value = product.name;
    document.getElementById("edit-description").value = product.description;
    document.getElementById("edit-brand").value = product.brand;
    document.getElementById("edit-imageUrl").value = product.imageUrl;
    document.getElementById("edit-price").value = product.price;
}

// Funzione per mostrare la tabella di modifica
function showEditTable() {
    const editTable = document.getElementById("edit-table");
    editTable.style.display = editTable.style.display === "none" ? "table" : "none";
}

// Funzione per salvare le modifiche del prodotto
async function updateProduct() {
    const productId = new URLSearchParams(window.location.search).get("id");
    const updatedProductData = {
        name: document.getElementById("edit-name").value,
        description: document.getElementById("edit-description").value,
        brand: document.getElementById("edit-brand").value,
        imageUrl: document.getElementById("edit-imageUrl").value,
        price: parseFloat(document.getElementById("edit-price").value)
    };

    try {
        const response = await fetch(`${API_URL}${productId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": AUTH_TOKEN
            },
            body: JSON.stringify(updatedProductData)
        });
        
        if (response.ok) {
            alert("Prodotto modificato con successo!");
            loadProduct(productId); // Ricarica i dati aggiornati del prodotto
            document.getElementById("edit-table").style.display = "none"; // Nasconde la tabella di modifica
        } else {
            const errorData = await response.json();
            alert(`Errore nella modifica del prodotto: ${errorData.message}`);
        }
    } catch (error) {
        console.error("Errore nella modifica del prodotto:", error);
        alert("Errore di connessione all'API.");
    }
}

// Carica i dati del prodotto al caricamento della pagina
document.addEventListener("DOMContentLoaded", () => {
    const productId = new URLSearchParams(window.location.search).get("id");
    loadProduct(productId);
});