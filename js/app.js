const STORAGE_KEY = "fashionRackProducts";
const SALES_STORAGE_KEY = "fashionRackSales";

const defaultProducts = [
    {
        id: "TS001S",
        name: "T-Shirts",
        price: 18.00,
        size: "Small",
        qty: 50,
        type: "T-Shirt",
        imgUrl: "https://image.hm.com/assets/hm/fb/1e/fb1ec5f3e79a3009b91bc9f12dc45156f01ded57.jpg?imwidth=768",
        description: "A comfortable, stylish cotton T-shirt designed. Made with soft, breathable fabric and a regular fit, Available in multiple colors and sizes."
    },
    {
        id: "TS001M",
        name: "T-Shirts",
        price: 20.00,
        size: "Medium",
        qty: 50,
        type: "T-Shirt",
        imgUrl: "https://image.hm.com/assets/hm/fb/1e/fb1ec5f3e79a3009b91bc9f12dc45156f01ded57.jpg?imwidth=768",
        description: "A comfortable, stylish cotton T-shirt designed. Made with soft, breathable fabric and a regular fit, Available in multiple colors and sizes."
    },
    {
        id: "TS001L",
        name: "T-Shirts",
        price: 25.00,
        size: "Large",
        qty: 50,
        type: "T-Shirt",
        imgUrl: "https://image.hm.com/assets/hm/fb/1e/fb1ec5f3e79a3009b91bc9f12dc45156f01ded57.jpg?imwidth=768",
        description: "A comfortable, stylish cotton T-shirt designed. Made with soft, breathable fabric and a regular fit, Available in multiple colors and sizes."
    },
    {
        id: "TS001XL",
        name: "T-Shirts",
        price: 28.00,
        size: "Extra Large",
        qty: 50,
        type: "T-Shirt",
        imgUrl: "https://image.hm.com/assets/hm/fb/1e/fb1ec5f3e79a3009b91bc9f12dc45156f01ded57.jpg?imwidth=768",
        description: "A comfortable, stylish cotton T-shirt designed. Made with soft, breathable fabric and a regular fit, Available in multiple colors and sizes."
    },
    {
        id: "SK001M",
        name: "Skirts",
        price: 15.00,
        size: "Medium",
        qty: 50,
        type: "Skirt",
        imgUrl: "https://media.centrepointstores.com/i/centrepoint/PB00046Indigo-PB00046CP26122025_01-2100.jpg?$prodimg-d-prt-pdp$&$quality-standard$&fmt=auto&sm=c",
        description: "A stylish, lightweight skirt perfect for casual wear and special occasions. Available in various colors and sizes"
    },
    {
        id: "SK001L",
        name: "Skirts",
        price: 20.00,
        size: "Large",
        qty: 50,
        type: "Skirt",
        imgUrl: "https://media.centrepointstores.com/i/centrepoint/PB00046Indigo-PB00046CP26122025_01-2100.jpg?$prodimg-d-prt-pdp$&$quality-standard$&fmt=auto&sm=c",
        description: "A stylish, lightweight skirt perfect for casual wear and special occasions. Available in various colors and sizes"
    },
    {
        id: "TR001L",
        name: "Trousers",
        price: 30.00,
        size: "Large",
        qty: 50,
        type: "Trousers",
        imgUrl: "https://signature-lk.b-cdn.net/wp-content/uploads/2026/07/SIGNATUREMENSSLIMFITFORMALICONBLACKCOLORTROUSER4.jpg",
        description: "Comfortable and stylish trousers perfect for everyday and formal wear. Available in various colors and sizes."
    },
    {
        id: "TR001M",
        name: "Trousers",
        price: 28.00,
        size: "Medium",
        qty: 50,
        type: "Trousers",
        imgUrl: "https://signature-lk.b-cdn.net/wp-content/uploads/2026/07/SIGNATUREMENSSLIMFITFORMALICONBLACKCOLORTROUSER4.jpg",
        description: "Comfortable and stylish trousers perfect for everyday and formal wear. Available in various colors and sizes."
    },
    {
        id: "S001M",
        name: "Shirts",
        price: 15.00,
        size: "Medium",
        qty: 50,
        type: "Shirts",
        imgUrl: "https://signature-lk.b-cdn.net/wp-content/uploads/2026/07/signature-mens-formal-shirt-25-scaled-1.jpg",
        description: "Stylish and comfortable shirts suitable for casual and formal occasions. Available in various colors and sizes."
    },
    {
        id: "S001L",
        name: "Shirts",
        price: 18.00,
        size: "Large",
        qty: 50,
        type: "Shirts",
        imgUrl: "https://signature-lk.b-cdn.net/wp-content/uploads/2026/07/signature-mens-formal-shirt-25-scaled-1.jpg",
        description: "Stylish and comfortable shirts suitable for casual and formal occasions. Available in various colors and sizes."
    }
];

function loadProducts() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        try {
            return JSON.parse(saved);
        } catch (err) {
            console.error("Failed to parse saved products:", err);
        }
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProducts));
    return [...defaultProducts];
}

function saveProducts() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

function loadSalesHistory() {
    const saved = localStorage.getItem(SALES_STORAGE_KEY);
    if (saved) {
        try {
            return JSON.parse(saved);
        } catch (err) {
            console.error("Failed to parse sales history:", err);
        }
    }
    return [];
}

function saveSalesHistory() {
    localStorage.setItem(SALES_STORAGE_KEY, JSON.stringify(salesHistory));
}

function readImageFileAsDataUrl(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

let products = loadProducts();
let salesHistory = loadSalesHistory();
let selectedProduct = null;
let cart = [];

// ==========================================
// 1. INVENTORY RENDER & CRUD
// ==========================================
function renderProducts() {
    const container =
        document.getElementById("inventory-container") ||
        document.querySelector(".add-inventory-container");
    if (!container) return;

    container.innerHTML = products.map((item) => {
        const cleanPrice = String(item.price).replace(/[^0-9.]/g, "");
        const formattedPrice = Number(cleanPrice || 0).toFixed(2);

        return `
            <div class="product-container">
                <div class="product-img-container">
                    <img src="${item.imgUrl || "assets/logof.png"}" alt="${item.name}" class="product-img">
                </div>
                <div class="product-detail-container">
                    <h3 class="product-title">${item.name} (${item.id})</h3>
                    <p class="product-price">$${formattedPrice}</p>
                    <p class="product-desc">${item.description || ""}</p>
                    <span class="product-qty">product Size : ${item.size}</span>
                    <span class="product-qty">Qty: ${item.qty} in stock</span>
                    <span class="product-qty">product type : ${item.type}</span>
                </div>
            </div>
        `;
    }).join("");
}

async function addProduct(event) {
    if (event) event.preventDefault();

    const fileInput = document.getElementById("add-img");
    const urlInput = document.getElementById("add-img-url");

    let finalImgUrl = urlInput ? urlInput.value.trim() : "";
    if (fileInput && fileInput.files && fileInput.files[0]) {
        finalImgUrl = await readImageFileAsDataUrl(fileInput.files[0]);
    }

    const rawPrice = document.getElementById("add-price")?.value.replace(/[^0-9.]/g, "") || "0";

    const newProduct = {
        id: document.getElementById("add-id")?.value.trim() || `PTS00${products.length + 1}`,
        name: document.getElementById("add-name")?.value.trim() || "",
        price: Number(rawPrice) || 0,
        size: document.getElementById("add-size")?.value.trim() || "",
        qty: Number(document.getElementById("add-qty")?.value) || 0,
        type: document.getElementById("add-type")?.value.trim() || "",
        imgUrl: finalImgUrl,
        description: document.getElementById("add-detail")?.value.trim() || ""
    };

    if (!newProduct.name) {
        alert("Please enter a product name.");
        return;
    }

    products.push(newProduct);
    saveProducts();
    renderProducts();
    renderReports();

    document.getElementById("add-product-form")?.reset();
    if (fileInput) fileInput.value = "";
}

async function updateProduct(event) {
    if (event) event.preventDefault();

    const searchKey = document.getElementById("update-id")?.value.trim().toLowerCase() || "";
    if (!searchKey) {
        alert("Please enter a Product ID or Name to update.");
        return;
    }

    const target = products.find((item) => {
        const itemId = String(item.id || "").trim().toLowerCase();
        const itemName = String(item.name || "").trim().toLowerCase();
        return itemId === searchKey || itemName === searchKey;
    });

    if (!target) {
        alert(`No product found matching "${searchKey}".`);
        return;
    }

    const newPriceRaw = document.getElementById("update-price")?.value.replace(/[^0-9.]/g, "").trim() || "";
    const newQtyRaw = document.getElementById("update-qty")?.value.replace(/[^0-9]/g, "").trim() || "";
    const newSize = document.getElementById("update-size")?.value.trim() || "";
    const newType = document.getElementById("update-type")?.value.trim() || "";
    const newDetail = document.getElementById("update-detail")?.value.trim() || "";

    const fileInput = document.getElementById("update-img");
    if (fileInput && fileInput.files && fileInput.files[0]) {
        target.imgUrl = await readImageFileAsDataUrl(fileInput.files[0]);
    }

    if (newPriceRaw !== "") target.price = Number(newPriceRaw);
    if (newQtyRaw !== "") target.qty = Number(newQtyRaw);
    if (newSize !== "") target.size = newSize;
    if (newType !== "") target.type = newType;
    if (newDetail !== "") target.description = newDetail;

    saveProducts();
    renderProducts();
    renderReports();

    document.getElementById("update-product-form")?.reset();
    if (fileInput) fileInput.value = "";
}

function deleteProduct(event) {
    if (event) event.preventDefault();

    const idInput = document.getElementById("delete-id");
    const reasonInput = document.getElementById("delete-reason");
    const fileInput = document.getElementById("delete-img");

    const searchKey = idInput ? idInput.value.trim().toLowerCase() : "";
    const reason = reasonInput ? reasonInput.value.trim() : "";

    if (!searchKey) {
        alert("Please enter a Product ID or Name to delete.");
        return;
    }

    const targetIndex = products.findIndex((item) => {
        const itemId = String(item.id || "").trim().toLowerCase();
        const itemName = String(item.name || "").trim().toLowerCase();
        return itemId === searchKey || itemName === searchKey;
    });

    if (targetIndex === -1) {
        alert(`No product found matching "${searchKey}".`);
        return;
    }

    const [removedProduct] = products.splice(targetIndex, 1);
    console.log("Deleted product:", removedProduct, reason ? `Reason: ${reason}` : "");

    saveProducts();
    renderProducts();
    renderReports();

    document.getElementById("delete-product-form")?.reset();
    if (fileInput) fileInput.value = "";
}

// ==========================================
// 2. POS SEARCH, CART & CHECKOUT
// ==========================================
function searchProduct(event) {
    if (event) event.preventDefault();

    const query = document.getElementById("searchtxt")?.value.trim().toLowerCase() || "";
    const tempContainer = document.querySelector(".temp-product-container");
    if (!tempContainer) return;

    if (!query) {
        selectedProduct = null;
        tempContainer.innerHTML = `<p class="temp-empty">Enter a Product ID or Name to preview.</p>`;
        return;
    }

    const found = products.find((item) => {
        const itemId = String(item.id || "").trim().toLowerCase();
        const itemName = String(item.name || "").trim().toLowerCase();
        return itemId === query || itemName.includes(query);
    });

    if (!found) {
        selectedProduct = null;
        tempContainer.innerHTML = `<p class="temp-empty">No product found for "${query}".</p>`;
        return;
    }

    selectedProduct = found;
    tempContainer.innerHTML = `
        <div class="temp-card">
            <img src="${found.imgUrl || "assets/logof.png"}" alt="${found.name}" class="temp-img">
            <div class="temp-info">
                <h4>${found.name}</h4>
                <span>ID: ${found.id} | Size: ${found.size} | Type: ${found.type}</span>
                <strong>$${Number(found.price).toFixed(2)}</strong>
                <small>Available Stock: ${found.qty}</small>
            </div>
        </div>
    `;
}

function addToCart() {
    const queryInput = document.getElementById("searchtxt");
    if (!selectedProduct && queryInput?.value.trim()) {
        searchProduct();
    }

    if (!selectedProduct) {
        alert("Please search and select a valid product first.");
        return;
    }

    const qtyInput = document.getElementById("product-cart-qty");
    const buyQty = Number(qtyInput?.value.trim());

    if (!Number.isInteger(buyQty) || buyQty <= 0) {
        alert("Please enter a valid positive quantity.");
        return;
    }

    if (buyQty > selectedProduct.qty) {
        alert(`Only ${selectedProduct.qty} units available in stock.`);
        return;
    }

    selectedProduct.qty -= buyQty;
    saveProducts();
    renderProducts();
    renderReports();

    const existingCartItem = cart.find((item) => item.id === selectedProduct.id);
    if (existingCartItem) {
        existingCartItem.cartQty += buyQty;
    } else {
        cart.push({
            id: selectedProduct.id,
            name: selectedProduct.name,
            price: Number(selectedProduct.price),
            size: selectedProduct.size,
            type: selectedProduct.type,
            imgUrl: selectedProduct.imgUrl,
            description: selectedProduct.description,
            cartQty: buyQty
        });
    }

    renderCart();
    searchProduct();
    if (qtyInput) qtyInput.value = "";
}

function renderCart() {
    const cartContainer = document.querySelector(".addcart-container");
    if (!cartContainer) return;

    if (cart.length === 0) {
        cartContainer.innerHTML = `<p class="cart-empty">No items in cart yet.</p>`;
        return;
    }

    cartContainer.innerHTML = cart.map((item) => {
        const lineTotal = (Number(item.price) * Number(item.cartQty)).toFixed(2);
        return `
            <div class="product-container">
                <div class="product-img-container">
                    <img src="${item.imgUrl || "assets/logof.png"}" alt="${item.name}" class="product-img">
                </div>
                <div class="product-detail-container">
                    <h3 class="product-title">${item.name}</h3>
                    <p class="product-price">$${lineTotal}</p>
                    <p class="product-desc">${item.description || ""}</p>
                    <span class="product-qty">Product ID : ${item.id}</span>
                    <span class="product-qty">product Size : ${item.size}</span>
                    <span class="product-qty">Cart Qty: ${item.cartQty} ($${Number(item.price).toFixed(2)} each)</span>
                    <span class="product-qty">product type : ${item.type}</span>
                </div>
            </div>
        `;
    }).join("");
}

function buyNow() {
    const billContainer = document.querySelector(".bill-container");
    if (!billContainer) return;

    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    let grandTotal = 0;
    const rowsHtml = cart.map((item) => {
        const subtotal = Number(item.price) * Number(item.cartQty);
        grandTotal += subtotal;
        return `
            <tr>
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.cartQty}</td>
                <td>$${Number(item.price).toFixed(2)}</td>
                <td>$${subtotal.toFixed(2)}</td>
            </tr>
        `;
    }).join("");

    const billNo = `FR-${Date.now().toString().slice(-6)}`;
    const dateStr = new Date().toLocaleString();

    salesHistory.unshift({
        billNo,
        date: dateStr,
        total: grandTotal,
        items: cart.map((item) => ({
            id: item.id,
            name: item.name,
            type: item.type,
            size: item.size,
            price: Number(item.price),
            qty: Number(item.cartQty),
            subtotal: Number(item.price) * Number(item.cartQty)
        }))
    });
    saveSalesHistory();
    renderReports();

    billContainer.innerHTML = `
        <div class="bill-receipt" id="printable-bill">
            <div class="bill-header">
                <h3>FashionRack POS Bill</h3>
                <span>Bill #: ${billNo}</span>
                <small>${dateStr}</small>
            </div>
            <table class="bill-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Product</th>
                        <th>Qty</th>
                        <th>Unit</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    ${rowsHtml}
                </tbody>
            </table>
            <div class="bill-total-row">
                <strong>Total Price:</strong>
                <strong class="bill-grand-total">$${grandTotal.toFixed(2)}</strong>
            </div>
            <button type="button" class="btn-download-pdf" onclick="downloadBillPDF()">
                Download PDF Bill
            </button>
        </div>
    `;

    cart = [];
    renderCart();
}

function downloadBillPDF() {
    const billEl = document.getElementById("printable-bill");
    if (!billEl) return;

    const printWindow = window.open("", "_blank", "width=700,height=800");
    if (!printWindow) {
        alert("Please allow pop-ups to download the PDF bill.");
        return;
    }

    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>FashionRack Bill</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 24px; color: #111; }
                table { width: 100%; border-collapse: collapse; margin: 16px 0; }
                th, td { border-bottom: 1px solid #ccc; padding: 8px; text-align: left; }
            </style>
        </head>
        <body>
            ${billEl.innerHTML.replace(/<button[\s\S]*?<\/button>/i, "")}
            <script>
                window.onload = function () { window.print(); };
            <\/script>
        </body>
        </html>
    `);
    printWindow.document.close();
}

// ==========================================
// 3. REPORTS LIVE CALCULATION & EXPORT
// ==========================================
function renderReports() {
    const revenueEl = document.getElementById("rep-total-revenue");
    if (!revenueEl) return;

    products = loadProducts();
    salesHistory = loadSalesHistory();

    const selectedCategory = document.getElementById("report-category-filter")?.value || "all";

    const filteredProducts = selectedCategory === "all"
        ? products
        : products.filter((p) => String(p.type).toLowerCase() === selectedCategory.toLowerCase());

    const soldByProductId = {};
    let totalRevenue = 0;
    let totalUnitsSold = 0;

    salesHistory.forEach((bill) => {
        (bill.items || []).forEach((soldItem) => {
            if (selectedCategory !== "all" && String(soldItem.type).toLowerCase() !== selectedCategory.toLowerCase()) {
                return;
            }
            if (!soldByProductId[soldItem.id]) {
                soldByProductId[soldItem.id] = { qty: 0, revenue: 0, name: soldItem.name };
            }
            soldByProductId[soldItem.id].qty += Number(soldItem.qty);
            soldByProductId[soldItem.id].revenue += Number(soldItem.subtotal);
            totalRevenue += Number(soldItem.subtotal);
            totalUnitsSold += Number(soldItem.qty);
        });
    });

    let stockValuation = 0;
    let totalStockUnits = 0;
    let lowStockCount = 0;

    filteredProducts.forEach((p) => {
        const qty = Number(p.qty) || 0;
        const price = Number(p.price) || 0;
        stockValuation += qty * price;
        totalStockUnits += qty;
        if (qty < 15) lowStockCount++;
    });

    let topSellerLabel = "—";
    let maxSold = 0;
    Object.entries(soldByProductId).forEach(([id, info]) => {
        if (info.qty > maxSold) {
            maxSold = info.qty;
            topSellerLabel = `${info.name} (${id})`;
        }
    });

    revenueEl.textContent = `$${totalRevenue.toFixed(2)}`;
    document.getElementById("rep-total-orders").textContent = `${salesHistory.length} completed bill(s)`;
    document.getElementById("rep-stock-valuation").textContent = `$${stockValuation.toFixed(2)}`;
    document.getElementById("rep-total-units").textContent = `${totalStockUnits} units in stock`;
    document.getElementById("rep-units-sold").textContent = `${totalUnitsSold}`;
    document.getElementById("rep-top-seller").textContent = `Top: ${topSellerLabel}`;
    document.getElementById("rep-low-stock").textContent = `${lowStockCount}`;

    const categoryStats = {};
    filteredProducts.forEach((p) => {
        const cat = p.type || "Other";
        if (!categoryStats[cat]) {
            categoryStats[cat] = { stockQty: 0, stockVal: 0, soldQty: 0, soldRev: 0 };
        }
        const qty = Number(p.qty) || 0;
        const price = Number(p.price) || 0;
        const soldInfo = soldByProductId[p.id] || { qty: 0, revenue: 0 };

        categoryStats[cat].stockQty += qty;
        categoryStats[cat].stockVal += qty * price;
        categoryStats[cat].soldQty += soldInfo.qty;
        categoryStats[cat].soldRev += soldInfo.revenue;
    });

    const categoryBody = document.getElementById("rep-category-body");
    if (categoryBody) {
        const rows = Object.entries(categoryStats);
        categoryBody.innerHTML = rows.length
            ? rows.map(([cat, st]) => `
                <tr>
                    <td class="cell-primary">${cat}</td>
                    <td>${st.stockQty}</td>
                    <td>$${st.stockVal.toFixed(2)}</td>
                    <td>${st.soldQty}</td>
                    <td class="amount-cell">$${st.soldRev.toFixed(2)}</td>
                </tr>
            `).join("")
            : `<tr><td colspan="5">No category data available.</td></tr>`;
    }

    const sizeTotals = { Small: 0, Medium: 0, Large: 0, "Extra Large": 0 };
    filteredProducts.forEach((p) => {
        const sz = p.size || "";
        if (sizeTotals[sz] !== undefined) {
            sizeTotals[sz] += Number(p.qty) || 0;
        }
    });

    const sizeGrid = document.getElementById("rep-size-grid");
    if (sizeGrid) {
        const shortLabels = { Small: "S", Medium: "M", Large: "L", "Extra Large": "XL" };
        sizeGrid.innerHTML = Object.entries(sizeTotals).map(([full, count]) => {
            const pct = totalStockUnits > 0 ? Math.round((count / totalStockUnits) * 100) : 0;
            return `
                <div class="size-box">
                    <span class="size-tag">${shortLabels[full]}</span>
                    <strong>${count}</strong>
                    <small>${pct}% stock</small>
                </div>
            `;
        }).join("");
    }

    const billsBody = document.getElementById("rep-bills-body");
    if (billsBody) {
        billsBody.innerHTML = salesHistory.length
            ? salesHistory.slice(0, 5).map((b) => `
                <tr>
                    <td class="cell-primary">${b.billNo}</td>
                    <td>${b.items.reduce((sum, i) => sum + i.qty, 0)} pcs</td>
                    <td class="amount-cell">$${Number(b.total).toFixed(2)}</td>
                </tr>
            `).join("")
            : `<tr><td colspan="3">No POS bills recorded yet.</td></tr>`;
    }

    const productsBody = document.getElementById("rep-products-body");
    document.getElementById("rep-product-count").textContent = `${filteredProducts.length} product(s)`;

    if (productsBody) {
        productsBody.innerHTML = filteredProducts.map((p) => {
            const qty = Number(p.qty) || 0;
            const price = Number(p.price) || 0;
            const sold = soldByProductId[p.id] || { qty: 0, revenue: 0 };

            let badgeHtml = `<span class="status-badge active">Healthy</span>`;
            if (qty === 0) {
                badgeHtml = `<span class="status-badge inactive">Out of Stock</span>`;
            } else if (qty < 15) {
                badgeHtml = `<span class="status-badge restock">Low Stock</span>`;
            }

            return `
                <tr>
                    <td>${p.id}</td>
                    <td class="cell-primary">${p.name}</td>
                    <td>${p.size}</td>
                    <td>${p.type}</td>
                    <td>$${price.toFixed(2)}</td>
                    <td>${qty}</td>
                    <td>${sold.qty}</td>
                    <td class="amount-cell">$${sold.revenue.toFixed(2)}</td>
                    <td>${badgeHtml}</td>
                </tr>
            `;
        }).join("");
    }
}

function exportReportsCSV() {
    const rows = [["ID", "Product", "Size", "Type", "Unit Price", "In Stock", "Stock Value"]];
    products.forEach((p) => {
        const qty = Number(p.qty) || 0;
        const price = Number(p.price) || 0;
        rows.push([p.id, `"${p.name}"`, p.size, p.type, price.toFixed(2), qty, (qty * price).toFixed(2)]);
    });

    const csvContent = "data:text/csv;charset=utf-8," + rows.map((r) => r.join(",")).join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "FashionRack_Inventory_Sales_Report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

window.addProduct = addProduct;
window.updateProduct = updateProduct;
window.deleteProduct = deleteProduct;
window.searchProduct = searchProduct;
window.addToCart = addToCart;
window.buyNow = buyNow;
window.downloadBillPDF = downloadBillPDF;
window.renderReports = renderReports;

window.addEventListener("storage", (e) => {
    if (e.key === STORAGE_KEY || e.key === SALES_STORAGE_KEY) {
        products = loadProducts();
        salesHistory = loadSalesHistory();
        renderProducts();
        renderReports();
    }
});

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("add-product-form")?.addEventListener("submit", addProduct);
    document.getElementById("update-product-form")?.addEventListener("submit", updateProduct);
    document.getElementById("delete-product-form")?.addEventListener("submit", deleteProduct);
    document.querySelector(".search-btn")?.addEventListener("click", searchProduct);
    document.getElementById("searchtxt")?.addEventListener("input", searchProduct);

    document.getElementById("report-category-filter")?.addEventListener("change", renderReports);
    document.getElementById("export-csv-btn")?.addEventListener("click", exportReportsCSV);
    document.getElementById("print-report-btn")?.addEventListener("click", () => window.print());

    renderProducts();
    renderCart();
    renderReports();
});