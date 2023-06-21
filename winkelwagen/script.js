function showProduct() {
    const shoppingCart = JSON.parse(localStorage.getItem("shopping_cart")) || [];
    const tableBody = document.getElementById("winkelwagen-body");
    const totalElement = document.getElementById("totaal");
    let total = 0;
    tableBody.innerHTML = "";
    if (shoppingCart.length > 0) {
        shoppingCart.forEach((product) => {
            const row = document.createElement("tr");
            const productNameCell = document.createElement("td");
            productNameCell.textContent = product.name;
            row.appendChild(productNameCell);
            const priceCell = document.createElement("td");
            priceCell.textContent = product.price;
            row.appendChild(priceCell);
            total += parseFloat(product.price);
            tableBody.appendChild(row);
        });
        totalElement.textContent = "Totaal: €" + total;
        totalElement.style.display = "block";
    } else {
        totalElement.style.display = "none";
    }
    document.getElementById('afrekenen').addEventListener("click", () => {
        if (total != 0) { window.location.href = ('bevestiging.html'); }
    });
}

function saveOrderTotal() {
    const shoppingCart = JSON.parse(localStorage.getItem("shopping_cart")) || [];
    let total = 0;
    if (shoppingCart.length > 0) {
        shoppingCart.forEach((product) => {
            total += parseFloat(product.price);
        });
        const orderDateTime = new Date();
        const options = {
            month: 'numeric',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
        };
        const formattedDateTime = orderDateTime.toLocaleString('en-US', options);
        let orders = JSON.parse(localStorage.getItem("orders")) || [];
        orders.push({ total: total, dateTime: formattedDateTime });
        localStorage.setItem("orders", JSON.stringify(orders));
    }
}
function clearLocalStorage() {
    localStorage.removeItem("shopping_cart");
    window.location.reload();
}
showProduct();
