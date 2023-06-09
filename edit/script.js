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
