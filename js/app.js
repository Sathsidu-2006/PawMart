const products = [
    {
        id: "PTS001",
        name: "Oversized Heavyweight Cotton Tee",
        price: 28.00,
        size: "Medium",
        qty: 45,
        type: "T-Shirt",
        imgUrl: "https://media.cos.com/assets/001/17/55/17559d0d864a1a24ce309233b7577774d604ae5c_xxl-1.jpg?imwidth=2160",
        description: "Relaxed-fit crewneck t-shirt crafted from 240gsm combed organic cotton."
    },
    {
        id: "PTS002",
        name: "Heavyweight Boxy Hoodie",
        price: 58.00,
        size: "Large",
        qty: 12,
        type: "Hoodie",
        imgUrl: "https://media.cos.com/assets/001/17/55/17559d0d864a1a24ce309233b7577774d604ae5c_xxl-1.jpg?imwidth=2160",
        description: "Structured fleece hoodie with drop shoulders."
    }
];

function addProduct(event) {
    if (event) {
        event.preventDefault(); // stops the page from refreshing on form submit
    }

    const fileInput = document.getElementById("add-img");
    const urlInput = document.getElementById("add-img-url");

    let finalImgUrl = urlInput ? urlInput.value.trim() : "";
    if (fileInput && fileInput.files && fileInput.files[0]) {
        finalImgUrl = URL.createObjectURL(fileInput.files[0]);
    }

    const newProduct = {
        id: document.getElementById("add-id")?.value.trim() || `PTS00${products.length + 1}`,
        name: document.getElementById("add-name").value.trim(),
        price: Number(document.getElementById("add-price").value) || 0,
        size: document.getElementById("add-size").value.trim(),
        qty: Number(document.getElementById("add-qty").value) || 0,
        type: document.getElementById("add-type").value.trim(),
        imgUrl: finalImgUrl,
        description: document.getElementById("add-detail").value.trim()
    };

    if (!newProduct.name) {
        alert("Please enter a product name.");
        return;
    }

    products.push(newProduct);
    console.log("Updated products:", products);


    renderProducts(); // updates the DOM cards right away
    document.getElementById("add-product-form")?.reset();
}

function renderProducts() {
    const container = document.getElementById("inventory-container") || document.querySelector(".add-inventory-container");
    if (!container) return;

    container.innerHTML = products.map((item) => `
        <div class="product-container">
            <div class="product-img-container">
                <img src="${item.imgUrl || "assets/logof.png"}" alt="${item.name}" class="product-img">
            </div>
            <div class="product-detail-container">
                <h3 class="product-title">${item.name}</h3>
                <p class="product-price">$${Number(item.price).toFixed(2)}</p>
                <p class="product-desc">${item.description || ""}</p>
                <span class="product-qty">product Size : ${item.size}</span>
                <span class="product-qty">Qty: ${item.qty} in stock</span>
                <span class="product-qty">product type : ${item.type}</span>
            </div>
        </div>
    `).join("");
}

// Attach submit listener cleanly
document.getElementById("add-product-form")?.addEventListener("submit", addProduct);

// Initial render on page load
renderProducts();




function updateProduct(event) {
    event.preventDefault();

    const searchKey = document.getElementById("update-id").value.trim().toLowerCase();
    if (!searchKey) {
        alert("Please enter a Product ID or Name to update.");
        return;
    }

    const target = products.find(
        (item) =>
            String(item.id).toLowerCase() === searchKey ||
            String(item.name).toLowerCase() === searchKey
    );

    if (!target) {
        alert("No matching product found.");
        return;
    }

    const newPriceRaw = document.getElementById("update-price").value.replace(/[^0-9.]/g, "").trim();
    const newQtyRaw = document.getElementById("update-qty").value.replace(/[^0-9]/g, "").trim();
    const newSize = document.getElementById("update-size").value.trim();
    const newType = document.getElementById("update-type").value.trim();
    const newDetail = document.getElementById("update-detail").value.trim();

    const fileInput = document.getElementById("update-img");
    if (fileInput && fileInput.files && fileInput.files[0]) {
        target.imgUrl = URL.createObjectURL(fileInput.files[0]);
    }

    if (newPriceRaw !== "") {
        target.price = Number(newPriceRaw);
    }
    if (newQtyRaw !== "") {
        target.qty = Number(newQtyRaw);
    }
    if (newSize !== "") {
        target.size = newSize;
    }
    if (newType !== "") {
        target.type = newType;
    }
    if (newDetail !== "") {
        target.description = newDetail;
    }

    console.log("Updated product:", target);
    renderProducts();

    document.getElementById("update-product-form").reset();
    if (fileInput) fileInput.value = "";
}

document.getElementById("update-product-form")?.addEventListener("submit", updateProduct);