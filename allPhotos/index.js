// Creamos Clase para la petición de imagenes
class FetchListImgs {
    excludedImages = { list: [] };
    limitImgs;

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
            this.limitImgs
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

const listIds = new FetchListImgs();

// Creamos los tags a insertar
const createImgs = (listIds) => {
    let documentFragment = document.createDocumentFragment();

    listIds.forEach((id) => {
        let newImg = document.createElement("img");
        let src = `/API/index.php?action=imgJPG&photoid=${id}`;

        newImg.setAttribute("src", src);
        newImg.classList.add("img-fluid");

        documentFragment.append(newImg);
    });

    return documentFragment;
};

// Insertamos Imagenes en el documento
const main = document.querySelector("#main");

const insertImgs = () => {
    listIds.limitImgs = 10;
    listIds
        .getListImgIds()
        .then((response) => {
            main.append(createImgs(response));
        })
        .catch((response) => {
            document.querySelector('#noResults').classList.remove('d-none');
        });

    return true;
};

insertImgs();
