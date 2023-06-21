fetch("/kranen.json")
    .then((response) => response.json())
    .then((data) => {
        const resetButton = document.getElementById("reset");
        resetButton.addEventListener("click", function () {
            localStorage.removeItem("machines");
            const machineData = localStorage.getItem("machines");
            if (!machineData) {
                localStorage.setItem("machines", JSON.stringify(data));
            }
            window.location.reload();
        });
    });
const tableBody = document.getElementById("winkelwagen-body");
const machineTemplate = document.getElementById("machine-template").content;

if (localStorage.getItem("machines")) {
    const machines = JSON.parse(localStorage.getItem("machines"));

    machines.forEach(function (machine) {
        const row = machineTemplate.cloneNode(true).querySelector("tr");

        row.querySelector(".id").textContent = machine.id;
        row.querySelector(".naam").textContent = machine.naam;
        row.querySelector(".prijs").textContent = machine.prijs;
        row.querySelector(".afbeelding").innerHTML = machine.foto;

        const editLink = row.querySelector(".edit-link");
        editLink.href = `../edit/index.html?id=${machine.id}`;

        const removeCell = row.querySelector(".remove-cell");
        removeCell.addEventListener("click", function () {
            row.remove();
            const index = machines.findIndex(function (item) {
                return item.id === machine.id;
            });
            if (index !== -1) {
                machines.splice(index, 1);
                localStorage.setItem("machines", JSON.stringify(machines));
            }
        });

        tableBody.appendChild(row);
    });
}
