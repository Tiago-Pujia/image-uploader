// Movimiento Barra de progreso
const transformPxNumber = (px) => Number(px.replace("px", ""));

const activateProgressBar = () => {
    const progressBar = document.querySelector("#progressbar");
    const progress = document.querySelector("#progress");
    let i = 1;

    setInterval(() => {
        let progressBarWidth = getComputedStyle(progressBar).width;
        let progressWidth = getComputedStyle(progress).width;

        if (
            i >=
            transformPxNumber(progressBarWidth) -
                transformPxNumber(progressWidth)
        ) {
            i = 0;
        }

        progress.style.marginLeft = i + "px";

        i++;
    }, 10);

    return true;
};

// Previsualizar Imagen en el card3
const inputFile = document.querySelector("#inputFile"),
    inputFilePreviewer = document.querySelector("#inputFilePreviewer");

const previewImg = () => {
    let reader = new FileReader();

    reader.readAsDataURL(inputFile.files[0]);
    reader.addEventListener("load", () => {
        inputFilePreviewer.src = reader.result;
    });
};

// Envio de Información al servidor
const formCard1 = document.querySelector("#formCard1"),
    urlResult = document.querySelector("#urlResult");

formCard1.addEventListener("submit", (e) => e.preventDefault());

const submitData = () => {
    let data = new FormData();
    data.append("img", inputFile.files[0]);

    let petition = fetch("/API/index.php", { method: "POST", body: data });

    return petition;
};

// Cambio de Card
const changeCard = (cardID) => {
    let cards = Array.from(document.querySelectorAll(".card"));
    let cardShow = document.querySelector(`#${cardID}`);

    cards.forEach((card) => {
        card.classList.add("d-none");
    });

    cardShow.classList.remove("d-none");

    return true;
};

// Envio de Formulario

const tagShowError = document.querySelector("#formCard1 .invalid-feedback");

const formCompleteSubmit = () => {
    inputFile.classList.remove("is-invalid");
    formCard1.classList.remove("was-validated");

    changeCard("cardLoad");
    activateProgressBar();
    submitData()
        .then((response) => response.json())
        .then((response) => {
            if (response.status != 1) throw new Error(response.response);
            return response.response;
        })
        .then((response) => {
            urlResult.value = response;
            previewImg();
        })
        .then(() => changeCard("cardResult"))

        .catch((error) => {
            tagShowError.textContent = error;

            inputFile.classList.add("is-invalid");
            formCard1.classList.add("was-validated");

            changeCard("cardForm");
        });
};

inputFile.addEventListener("change", formCompleteSubmit);

// Boton para copiar link
const buttonCopyLink = document.querySelector("#copyLink");

buttonCopyLink.addEventListener("click", () => {
    urlResult.select();
    document.execCommand("copy");
    createdToast("New Message", "Just Now", "Copied to clipboard successfully");
});
