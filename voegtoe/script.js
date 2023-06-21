function previewImage(event) {
    event.preventDefault();
    const imageUrl = document.getElementById("image-url").value;
    const previewContainer = document.getElementById("image-preview");
    previewContainer.innerHTML = "";

    if (imageUrl) {
        const imageElement = document.createElement("img");
        imageElement.src = imageUrl;
        imageElement.classList.add('preview');
        previewContainer.appendChild(imageElement);
    }
}

document.getElementById("voegtoe").addEventListener("click", function (event) {
    event.preventDefault();

    const naam = document.getElementById('naam').value;
    const prijs = document.getElementById('prijs').value;
    const bouwjaar = document.getElementById('bouwjaar').value;
    const voertuig = document.getElementById('voertuig').value;
    const foto = document.getElementById('image-url').value;

    if (naam && prijs && bouwjaar && voertuig && foto != '') {
        window.location.href = "../machines/index.html";
        let machines = JSON.parse(localStorage.getItem('machines')) || [];
        let hoogsteId = 0;
        machines.forEach(machine => {
            if (machine.id > hoogsteId) {
                hoogsteId = machine.id;
            }
        });

        const newMachine = {
            id: hoogsteId + 1,
            naam: naam,
            foto: foto,
            prijs: prijs,
            bouwjaar: bouwjaar,
            voertuig: voertuig,
        };

        machines.push(newMachine);
        localStorage.setItem('machines', JSON.stringify(machines));
    }
});