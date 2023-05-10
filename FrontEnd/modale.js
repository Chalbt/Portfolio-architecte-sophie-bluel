//modale apparait uniquement lorsque l'utilisateur est connectée
function isAuthenticated () {
   return !!localStorage.getItem("token");
}


const openModal = function (e) {
    afficherVignetteEdition();
    e.preventDefault();
    const modal = document.querySelector(e.target.getAttribute("href"));
    modal.style.display = null;
    modal.setAttribute("aria-hidden", "false");
    modal.setAttribute("aria-modal", "true");
    modal.addEventListener("click", closeModal.bind(modal));
    modal.querySelector(".js-modal-close").addEventListener("click", closeModal.bind(modal));
    modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation);
}

function closeModal(e) {
    //if (modal === null) return;
    if (e) {
        e.preventDefault();
    }
    this.style.display = "none";
    this.setAttribute("aria-hidden", "true");
    this.setAttribute("aria-modal", "false");
}

function closeAllModal() {
    let modals = document.querySelectorAll(".modal");
    modals.forEach(modal => closeModal.bind(modal));
}


const stopPropagation = function(e) {
    e.stopPropagation()
}

document.querySelectorAll(".js-modal").forEach(a => {
    a.addEventListener("click", openModal)
})


window.addEventListener("keydown", function(e) {
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
    buttonElt.addEventListener("click", suppressionTravaux.bind(vignetteElt, projet));
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

//function delete travaux
async function suppressionTravaux(projet) {
    const token = localStorage.getItem("token");
    try {
        const response = await fetch("http://localhost:5678/api/works/" + projet.id, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        if (response.status !== 204) {
            throw "Code http différent de 204"
        }
        //this contient la vignette grâce à la ligne 72 (fonction suppressionTravaux.bind)
        this.remove();
    } catch(error) {
        console.error("La suppression a échoué : " + error);
    }
}  


//ajouter un nouveau projet 
const form = document.getElementById("envoi-formulaire");
const token = localStorage.getItem("token");


//transformation des données de l'image
document.querySelector("#file").addEventListener('change', function() {
	// aucun fichier sélectionné 
	if(document.querySelector("#file").value == '') {
        return document.getElementById("error-form").innerText = "Aucun fichier sélectionné";
	}

	let file = document.querySelector("#file").files[0];
    let reader = new FileReader();
	reader.onload = async function(e) {
		// donnée binaire
		console.log(e.target.result);
        let img = document.getElementById("image-formulaire");
        img.src = e.target.result;
        img.style.display = "inline";
	};
	reader.onerror = function(e) {
		// erreur
		console.log('Erreur : ' + e.type);
	};
	reader.readAsDataURL(file);
    console.log(file)
});

//soumission du formulaire
form.addEventListener("submit", async function(event) {
    event.preventDefault();

    if(document.querySelector("#file").value == '') {
        return document.getElementById("error-form").innerText = "Aucun fichier sélectionné";
	}

    //récupérarion des valeurs du formulaire
    const nouveauProjet = {
        file: document.getElementById("file").files[0],
        title: document.getElementById("title").value,
        category: document.getElementById("category").value  
    }
    console.log(nouveauProjet)

    //validation des donnnées du formulaire
    if (!title || !category || !file) {
        console.error("Veuillez remplir tous les champs du formulaire");
        return;
    }

    //création de l'objet formData pour envoi du formulaire
    const formData = new FormData();
    formData.append("title", nouveauProjet.title);
    formData.append("category", nouveauProjet.category);
    formData.append("image", nouveauProjet.file);

    //envoi de la requête pour ajout du nouveau projet à la liste
    try { 
        const response = await fetch('http://localhost:5678/api/works', {
            method: 'POST',
            headers: {
                Authorization : `Bearer ${token}`, 
                'accept': 'application/json'
            },
            body: formData 
        })
        console.log(response.json());
        afficherLaGalerie();
        closeAllModal();
        return
    } catch(error) {
        console.error("Erreur lors de l'ajout du projet :", error)
    }
   
})


    

    



    



