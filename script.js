const AllButton = document.getElementById("alles");
const RupsButton = document.getElementById("rups");
const MobielButton = document.getElementById("mobiel");
const ShovelButton = document.getElementById("shovels");
const winkelwagenAantal = document.getElementById("winkelwagen-aantal");

fetch("kranen.json")
    .then((response) => response.json())
    .then((data) => {
        const machineData = localStorage.getItem("machines");
        let machines;
        if (machineData) {
            machines = JSON.parse(machineData);
        } else {
            machines = data;
        }
        const kraanTemplate = document.getElementById("kraan-template");
        const kranenContainer = document.querySelector(".kranen");
        for (const kraan of machines) {
            const kraanElement = kraanTemplate.content.cloneNode(true);
            kraanElement.querySelector(".kranen-voertuig").textContent = kraan.naam;
            kraanElement.querySelector(".foto").src = kraan.foto;
            kraanElement.querySelector(".text-gray-700:nth-of-type(1)").textContent = `bouwjaar: ${kraan.bouwjaar}`;
            kraanElement.querySelector(".text-gray-700:nth-of-type(2)").textContent = `prijs: €${kraan.prijs}`;
            kraanElement.querySelector(".machine").setAttribute("data-voertuig", kraan.voertuig);
            const inWinkelwagenButton = kraanElement.querySelector(".inwinkelwagen-button");
            inWinkelwagenButton.setAttribute("data-naam", kraan.naam);
            inWinkelwagenButton.setAttribute("data-prijs", kraan.prijs);
            kranenContainer.appendChild(kraanElement);
        }
        if (!machineData) {
            localStorage.setItem("machines", JSON.stringify(data));
        }
        const inWinkelwagenButtons = document.querySelectorAll(
            ".inwinkelwagen-button"
        );
        inWinkelwagenButtons.forEach((button) => {
            button.addEventListener("click", (event) => {
                const productnaam = event.target.getAttribute("data-naam");
                const productprijs = event.target.getAttribute("data-prijs");
                let shoppingCart =
                    JSON.parse(localStorage.getItem("shopping_cart")) || [];
                shoppingCart.push({ name: productnaam, price: productprijs });
                localStorage.setItem("shopping_cart", JSON.stringify(shoppingCart));
                const kraanNaam =
                    event.target.parentNode.querySelector(".kranen-voertuig").textContent;
                openModal(`De machine ${kraanNaam} is toegevoegd aan de winkelwagen.`);
                updateWinkelwagenIcon();
            });
        });

        function updateWinkelwagenIcon() {
            const shoppingCart =
                JSON.parse(localStorage.getItem("shopping_cart")) || [];
            if (shoppingCart.length > 0) {
                winkelwagenAantal.textContent = shoppingCart.length;
                winkelwagenAantal.style.display = "block";
            } else {
                winkelwagenAantal.style.display = "none";
            }
        }
        updateWinkelwagenIcon();

        function openModal(message) {
            const modal = document.getElementById("modal");
            const modalMessage = document.getElementById("modal-message");
            modalMessage.textContent = message;
            modal.style.display = "block";
            const closeBtn = document.getElementsByClassName("close")[0];
            closeBtn.addEventListener("click", closeModal);
            window.addEventListener("click", function (event) {
                if (event.target == modal) {
                    closeModal();
                }
            });
        }
        function closeModal() {
            const modal = document.getElementById("modal");
            modal.style.display = "none";
        }
    });

function filterMachines(voertuig) {
    const kraanDivs = document.querySelectorAll(".machine");
    kraanDivs.forEach((kraanDiv) => {
        const kraanVoertuig = kraanDiv.getAttribute("data-voertuig");
        if (voertuig !== "alles" && kraanVoertuig !== voertuig) {
            kraanDiv.classList.add("hidden");
        } else {
            kraanDiv.classList.remove("hidden");
        }
    });
}

AllButton.addEventListener("click", (event) => {
    filterMachines(event.target.textContent.trim().toLowerCase());
});

RupsButton.addEventListener("click", (event) => {
    filterMachines(event.target.textContent.trim().toLowerCase());
});

MobielButton.addEventListener("click", (event) => {
    filterMachines(event.target.textContent.trim().toLowerCase());
});

ShovelButton.addEventListener("click", (event) => {
    filterMachines(event.target.textContent.trim().toLowerCase());
});
