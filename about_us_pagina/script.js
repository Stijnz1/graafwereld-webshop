const winkelwagenAantal = document.getElementById("winkelwagen-aantal");


function updateWinkelwagenIcon() {
    const shoppingCart = JSON.parse(localStorage.getItem("shopping_cart"));
    if (shoppingCart.length > 0) {
        winkelwagenAantal.textContent = shoppingCart.length;
        winkelwagenAantal.style.display = "block";
    } else {
        winkelwagenAantal.style.display = "none";
    }
}
updateWinkelwagenIcon();
