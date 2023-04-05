//modale apparait uniquement lorsque l'utilisateur est connectée
function isAuthenticated () {
   return !!localStorage.getItem("token");
}


let modal = null;

const openModal = function (e) {
    afficherVignetteEdition();
    e.preventDefault();
    modal = document.querySelector(e.target.getAttribute("href"));
    modal.style.display = null;
    modal.setAttribute("aria-hidden", "false");
    modal.setAttribute("aria-modal", "true");
    modal.addEventListener("click", closeModal);
    modal.querySelector(".js-modal-close").addEventListener("click", closeModal);
    modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation);
}

const closeModal = function (e) {
    if (modal === null) return;
    e.preventDefault();
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    modal.setAttribute("aria-modal", "false");
    modal.removeEventListener("click", closeModal);
    modal.querySelector(".js-modal-close").removeEventListener("click", closeModal);
    modal.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation);
    modal = null;
}


const stopPropagation = function (e) {
    e.stopPropagation()
}

document.querySelectorAll(".js-modal").forEach(a => {
    a.addEventListener("click", openModal)
})

window.addEventListener("keydown", function (e) {
    if (e.key === "Escape" || e.key === "Esc") {
        closeModal(e)
    }
})

//element uniquement lorsque utilisateur authentifié 
if (isAuthenticated()) {
    const adminElts = document.querySelectorAll("[data-admin-status]")
    for (let adminElt of adminElts) {
        adminElt.dataset.adminStatus = "visible"
    }
}

function creerVignetteEdition(projet) {
    const vignetteElt = document.createElement("figure");
    const titleElt = document.createElement("figcaption");
    titleElt.innerText = "éditer";
    const imageElt = document.createElement("img");
    imageElt.src = projet.imageUrl;
    imageElt.alt = projet.title;
    const buttonElt = document.createElement("icone");
    buttonElt.setAttribute("class", "fa-solid fa-trash-can");
    vignetteElt.appendChild(imageElt);
    vignetteElt.appendChild(buttonElt);
    vignetteElt.appendChild(titleElt);
    return vignetteElt
}

async function afficherVignetteEdition() {
    let projets = await recupererProjets();
    const container = document.querySelector(".galerie-modale")
    container.innerHTML = "";
    for (let projet of projets) { 
        const vignette = creerVignetteEdition(projet);
        container.appendChild(vignette);
    }   
}

//envoie formulaire
document.getElementById("test-formulaire").addEventListener("submit", envoieFormulaire)

function envoieFormulaire(e) {
    e.preventDefault();
    console.log(e)
}



//methode post works
/*const ajouterNouveauProjet = await fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
        "accept: application/json",
        "Content-Type: multipart/form-data",
        "image=",
        "title=",
        "category=",
        },
        
    });*/




