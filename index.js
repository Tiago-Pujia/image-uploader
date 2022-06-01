// Movimiento Barra de progreso

const transformPxNumber = (px) => Number(px.replace("px", ""));

const progressBar = document.querySelector("#progressbar");
const progress = document.querySelector("#progress");
let i = 1;

const intervalProgressBar = setInterval(() => {
    let progressBarWidth = getComputedStyle(progressBar).width;
    let progressWidth = getComputedStyle(progress).width;

    if (
        i >=
        transformPxNumber(progressBarWidth) - transformPxNumber(progressWidth)
    ) {
        i = 0;
    }

    progress.style.marginLeft = i + "px";

    i++;
}, 10);

// Previsulizar Imagen del Form

const inputFile = document.querySelector("#inputFile"),
    inputFilePreviewer = document.querySelector("#inputFilePreviewer"),
    formCard1 = document.querySelector("#formCard1");

inputFile.addEventListener("change", (e) => {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.addEventListener("load", () => {
        inputFilePreviewer.src = reader.result;
        formCard1.submit();
    });
});

// Cambio de Cards y Envio de formulario

// inputFile;

formCard1.addEventListener("submit", (e) => {
    e.preventDefault();

    // fetch("api")
    //     .then((response) => response.json())
    //     .then(console.log);
});
