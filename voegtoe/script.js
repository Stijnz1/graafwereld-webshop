function previewImage(event) {
    event.preventDefault();
    const imageUrl = document.getElementById("image-url").value;
    const previewContainer = document.getElementById("image-preview");
    previewContainer.innerHTML = "";

    if (imageUrl) {
        const imageElement = document.createElement("img");
        imageElement.src = imageUrl;
        imageElement.style.maxWidth = "300px";
        imageElement.style.marginLeft = "22px";
        previewContainer.appendChild(imageElement);
    }
}

document.getElementById("voegtoe").addEventListener("click", function () {
    const naam = document.getElementById('naam').value;
    const prijs = document.getElementById('prijs').value;
    const bouwjaar = document.getElementById('bouwjaar').value;
    const voertuig = document.getElementById('voertuig').value;
    const foto = document.getElementById('image-url').value;

    if (naam && prijs && bouwjaar && voertuig && foto != '') {
        let machines = JSON.parse(localStorage.getItem('machines')) || [];
        machines.push({
            naam: naam, foto: foto, prijs: prijs, bouwjaar: bouwjaar, voertuig: voertuig,
        });
        localStorage.setItem('machines', JSON.stringify(machines));
    }
});
