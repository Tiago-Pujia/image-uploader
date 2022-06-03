// Obtenemos el ID de la imagen

const photo = document.querySelector("#photo");

const photoId = (() => {
    let url = new URL(location);
    let photoid = url.searchParams.get("photoid");

    return photoid;
})();

// Escribimos en los respectivos campos la URL de la imagen
const writeUrlFields = (id) => {
    const buttonDownload = document.querySelector("#download");

    let urlImg = "/API/index.php?photoid=" + id;

    photo.src = urlImg;
    // buttonDownload.href = urlImg;
};

writeUrlFields(photoId);

// photo.addEventListener("error", () => {
//     document.querySelector("#main").classList.add("d-none");
//     document.querySelector("#alertError").classList.remove("d-none");
//     document.querySelector("#spinnerPhoto").classList.add("d-none");
// });

photo.addEventListener("load", (e) => {
    document.querySelector("#spinnerPhoto").classList.add("d-none");
    document.querySelector("#main").classList.remove("d-none");
});

// Mostramos el numero de visitas

const elementViews = document.querySelector("#views");

const writeNumberViews = (() => {
    let views;

    fetch(`/API/?photoid=${photoId}&views=0`, { method: "GET" })
        .then((response) => response.text())
        .then((response) => (elementViews.textContent = response));

    return views;
})();

// Sumar visitas
(() => {
    fetch("/API/index.php", {
        method: "PUT",
        body: JSON.stringify({ photoid: photoId }),
    });
})();
