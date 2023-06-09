function showProduct() {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const tableBody = document.getElementById("winkelwagen-body");
    tableBody.innerHTML = "";
    let orderId = 0;
    if (orders.length > 0) {
        orders.forEach((order) => {
            const row = document.createElement("tr");
            const idCell = document.createElement("td");
            const totalCell = document.createElement("td");
            const datetimeCell = document.createElement("td");
            idCell.textContent = orderId++;
            idCell.classList.add('id');
            totalCell.textContent = order.total;
            datetimeCell.textContent = order.dateTime;
            row.appendChild(idCell);
            row.appendChild(totalCell);
            row.appendChild(datetimeCell);
            tableBody.appendChild(row);
        });
    }
}
document.addEventListener("DOMContentLoaded", function () {
    showProduct();
});