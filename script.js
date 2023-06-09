const AllButton = document.getElementById("alles");
const RupsButton = document.getElementById("rups");
const MobielButton = document.getElementById("mobiel");
const ShovelButton = document.getElementById("shovels");
const naamTd = document.getElementById("naam");
const winkelwagenAantal = document.getElementById("winkelwagen-aantal");

fetch("kranen.json")
	.then((response) => response.json())
	.then((data) => {
		const kranen = document.querySelector(".kranen");
		const machineData = localStorage.getItem("machines");
		let machines;
		if (machineData) {
			machines = JSON.parse(machineData);
		} else {
			machines = data;
		}
		for (const kraan of machines) {
			const kraanElement = document.createElement("div");
			kraanElement.className =
				"shadow shadow-lg flex flex-col justify-center items-center bg-white rounded-lg p-4 gap-4";
			kraanElement.innerHTML = `
            <h2 class='kranen-voertuig text-lg font-bold mb-2 text-gray-800'>${kraan.naam}</h2>
            <img class='foto object-contain h-48 w-full mb-2' src="${kraan.foto}">
            <p class='text-gray-700 mb-2'>bouwjaar: ${kraan.bouwjaar}</p>
            <p class='text-gray-700 mb-2'>prijs: €${kraan.prijs}</p>
            <button class='bg-blue-300 text-white py-1 px-2 rounded-lg'
            data-naam='${kraan.naam}' data-prijs='${kraan.prijs}'>in winkelwagen</button>
        `;
			kranen.appendChild(kraanElement);
			kraanElement.setAttribute("data-voertuig", kraan.voertuig);
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
				localStorage.setItem(
					"shopping_cart",
					JSON.stringify(shoppingCart)
				);
				const kraanNaam =
					event.target.parentNode.querySelector(
						".kranen-voertuig"
					).textContent;
				openModal(
					`De machine ${kraanNaam} is toegevoegd aan de winkelwagen.`
				);
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
			kraanDiv.classList.add("dontShow");
		} else {
			kraanDiv.classList.remove("dontShow");
		}
	});
}

AllButton.addEventListener("click", () => {
	filterMachines("alles");
});

RupsButton.addEventListener("click", () => {
	filterMachines("rupskranen");
});

MobielButton.addEventListener("click", () => {
	filterMachines("mobiele kranen");
});

ShovelButton.addEventListener("click", () => {
	filterMachines("shovels");
});
