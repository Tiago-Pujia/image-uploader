const createToastContainer = () => {
    const body = document.querySelector("body");
    const ToastContainer = document.createElement("div");

    ToastContainer.classList.add("toast-container","position-fixed","bottom-0","end-0","m-3");
    ToastContainer.setAttribute("id", "toastContainer");

    body.append(ToastContainer);

    return true;
};

const createdToast = (title, time, message) => {
    let toastContainer = document.querySelector("#toastContainer");
    const template = document.querySelector("#toastTemplate");
    const newTemplate = template.content.cloneNode(true);

    newTemplate.querySelector(".toast-title").innerHTML = title;
    newTemplate.querySelector(".toast-time").innerHTML = time;
    newTemplate.querySelector(".toast-message").innerHTML = message;

    if (!toastContainer) {
        createToastContainer();
        toastContainer = document.querySelector("#toastContainer");
    }

    toastContainer.append(newTemplate);

    const newToast = toastContainer.lastElementChild;

    let newToastClass = new bootstrap.Toast(newToast);
        newToastClass.show();

    return true;
};