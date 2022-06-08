// Metodos para mostrar u ocular el cargador de imagenes al scroll

const loaderScroll = {
    loader: document.querySelector("#loader"),

    show() {
        this.loader.classList.remove("d-none");
    },

    hide() {
        this.loader.classList.add("d-none");
    },
};

// Creamos Clase para la petición de imagenes
class FetchListImgs {
    excludedImages = { list: [] };
    limitIds;

    excludedImagesStringify() {
        let response = JSON.stringify(this.excludedImages);
        return response;
    }

    addExcludedImages(listArr) {
        this.excludedImages.list.push(...listArr);
        return true;
    }

    async getListImgIds() {
        const path = `/API/index.php`;
        const body = `?action=listImgsId&limit=${
            this.limitIds
        }&excludedImages=${this.excludedImagesStringify()}`;
        const options = {
            method: "GET",
        };
        const request = fetch(path + body, options)
            .then((response) => response.json())
            .then((response) => {
                this.addExcludedImages(response);
                return response;
            });

        return await request;
    }
}

let listIds = new FetchListImgs();

// Creamos los tags a insertar
const createImgs = (listIds) => {
    let documentFragment = document.createDocumentFragment();

    listIds.forEach((id) => {
        let newA = document.createElement("a");
        let newImg = document.createElement("img");

        let src = `/API/index.php?action=imgJPG&photoid=${id}`;

        newA.classList.add("grid-gallery-item");
        newA.setAttribute("href", "#" + id);

        newImg.setAttribute("src", src);
        newImg.classList.add("grid-gallery-image");

        newA.append(newImg);
        documentFragment.append(newA);
    });

    return documentFragment;
};

// Insertamos Imagenes en el documento
const main = document.querySelector("#main");

// Indicamos la cantidad de imagenes maxima a obtener segun el viewport
const limitIds = () => {
    let limit;
    let windowWidth = window.innerWidth;

    if (windowWidth >= 1200) {
        limit = 50;
    } else if (windowWidth >= 992) {
        limit = 40;
    } else if (windowWidth >= 768) {
        limit = 30;
    } else if (windowWidth >= 576) {
        limit = 21;
    } else if (windowWidth < 576) {
        limit = 22;
    }

    return limit;
};

    // Función para insertar imagenes en el documento
const insertImgs = () => {
    listIds.limitIds = limitIds();

    listIds
        .getListImgIds()
        .then((response) => {
            main.append(createImgs(response));
            loaderScroll.hide();
        })
        .catch((response) => {
            loaderScroll.hide();
            document.querySelector("#noResults").classList.remove("d-none");

            // Evitamos seguir haciendo peticiones al servidor
            document.onscroll = null;
        });

    return true;
};

insertImgs();

// Insertamos mas imagenes al llegar al final del scroll
const scrolled = () => {
    let viewportHeight = window.innerHeight;
    let scrollHeight = scrollY;
    let bodyHeight = document.querySelector("body").offsetHeight;

    if (bodyHeight == scrollHeight + viewportHeight) {
        loaderScroll.show();
        insertImgs();
    }
};

    // Insertar evento de esta manera para poder quitarlo despues
document.onscroll = scrolled; 