document.addEventListener("DOMContentLoaded", function () {
    const machineId = parseInt(new URLSearchParams(window.location.search).get("id"), 20);
    const form = document.querySelector("form");
    const naamInput = document.getElementById("naam");
    const prijsInput = document.getElementById("prijs");
    const bouwjaarInput = document.getElementById("bouwjaar");
    const voertuigInput = document.getElementById("voertuig");
    const imageUrlInput = document.getElementById("image-url");

    function loadMachineData() {
        fetch("/kranen.json")
            .then((response) => response.json())
            .then((data) => {
                const machines = JSON.parse(localStorage.getItem("machines"));
          if (machines) {
            const selectedMachine = machines.find((machine) => machine.id === machineId);
            if (selectedMachine) {
              naamInput.value = selectedMachine.naam;
              prijsInput.value = selectedMachine.prijs;
              bouwjaarInput.value = selectedMachine.bouwjaar;
              voertuigInput.value = selectedMachine.voertuig;
              imageUrlInput.value = selectedMachine.foto;
            }
          }
        });
    }
  
    function updateMachineData(event) {
      event.preventDefault();
      const machines = JSON.parse(localStorage.getItem("machines"));
  
      if (machines) {
        const updatedMachine = {
          id: machineId,
          naam: naamInput.value,
          prijs: prijsInput.value,
          bouwjaar: bouwjaarInput.value,
          voertuig: voertuigInput.value,
          foto: imageUrlInput.value,
        };
  
        const machineIndex = machines.findIndex((machine) => machine.id === machineId);
  
        if (machineIndex !== -1) {
          machines[machineIndex] = updatedMachine;
          localStorage.setItem("machines", JSON.stringify(machines));
        }
      }
    }
  
    loadMachineData();
    form.addEventListener("submit", updateMachineData);
  });