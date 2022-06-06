// Obtenemos el ID de la imagen y creamos la URL de Obtensión de esta
const photo = document.querySelector("#photo");
const photoId = (() => {
    let url = new URL(location);
    let photoid = url.searchParams.get("photoid");
    return photoid;
})();
const photoURL = ((id)=>`/API/index.php?action=imgJPG&photoid=${id}`)(photoId)

// Escribimos en los respectivos campos la URL de la imagen
const writeUrlFields = (url) => {
    const buttonDownload = document.querySelector("#download");
        buttonDownload.href = url;
    return true;
};

writeUrlFields(photoURL);

// Insertamos La foto principal en el documento
const createImg = (src) => {
    const card = document.querySelector("#card-photo");
    let newImg = document.createElement("img");
    let containerCard = document.querySelector('#containerCard');

    newImg.setAttribute("src", src);
    newImg.setAttribute("id", "photo");
    newImg.classList.add("card-img-top");

    newImg.addEventListener("error", () => {
        document.querySelector("#spinnerPhoto").classList.add("d-none");
        document.querySelector("#alertError").classList.remove("d-none");
    });

    newImg.addEventListener("load", () => {
        containerCard.classList.remove("d-none");
        containerCard.classList.add('d-md-flex')
        document.querySelector("#spinnerPhoto").classList.add("d-none");
    });

    card.prepend(newImg);
    return true;
};

createImg(photoURL);

// Mostramos el numero de visitas
const elementViews = document.querySelector("#views");

const writeNumberViews = (() => {
    let views;

    fetch(`/API/?action=viewsImg&photoid=${photoId}`, { method: "GET" })
        .then((response) => response.text())
        .then((response) => (elementViews.textContent = response));

    return views;
})();

// Boton de copiar el link para compartir foto
const buttonShareLink = document.querySelector("#shareLink");

buttonShareLink.addEventListener("click", () => {
    let aux = document.createElement("input");
    aux.value = location.href;

    document.body.appendChild(aux);

    aux.select();
    document.execCommand("copy");

    document.body.removeChild(aux);

    createdToast("New Message", "Just Now", "Copied to clipboard successfully");
});

// Sumar visitas
fetch("/API/index.php", {
    method: "PUT",
    body: JSON.stringify({ photoid: photoId }),
});

// Activamos los Tooltips
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))