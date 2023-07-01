//modale apparait uniquement lorsque l'utilisateur est connectée
function isAuthenticated() {
   return !!localStorage.getItem("token");
}

//création des modales
const openModal = function(e) {
    afficherVignetteEdition();
    e.preventDefault();
    //élément déclencheur de l'ouverture des modales
    const modal = document.querySelector(e.target.getAttribute("href"));
    //suppression du display none et du hidden avec l'ajustement des attributs
    modal.style.display = null;
    modal.setAttribute("aria-hidden", "false");
    modal.setAttribute("aria-modal", "true");
    //écouteur d'évènement pour fermer la modale
    modal.addEventListener("click", closeModal.bind(modal));
    modal.querySelector(".js-modal-close").addEventListener("click", closeModal.bind(modal));
    modal.querySelector(".js-modal-close-all").addEventListener("click", closeModal.bind(modal));
    modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation);   
}

function closeModal(e) {
    //if (modal === null) return;
    if (e) {
        e.preventDefault();
    }
    //ajustement des attributs pour fermer la modale en la masquant
    this.style.display = "none";
    this.setAttribute("aria-hidden", "true");
    this.setAttribute("aria-modal", "false");
}

function closeAllModal() {
    //simuler l'évènement click pour fermer modal (ajout closeModal sur le listener de la ligne 17)
    const modal1 = document.querySelector("#modal1");
    modal1.click();
    const modal2 = document.querySelector("#modal2");
    modal2.click();
}

//empêcher la propagation
const stopPropagation = function(e) {
    e.stopPropagation()
}

//ouverture des modales
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

//création des vignettes projets dans les modales
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

//affichage des vignettes
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
    //récupération du token pour l'authorisation
    const token = localStorage.getItem("token");
    try {
        //envoie de la requête suppression à l'aide de la méthode DELETE et de l'id du projet
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
        //this contient la vignette grâce à la ligne 78 (fonction suppressionTravaux.bind)
        this.remove();
    } catch(error) {
        console.error("La suppression a échoué : " + error);
    }
    afficherLaGalerie();
}  


//ajouter un nouveau projet 
const form = document.getElementById("envoi-formulaire");
const token = localStorage.getItem("token");

//transformation des données et affichage de l'image dans le formulaire
document.querySelector("#file").addEventListener('change', function() {
	// aucun fichier sélectionné 
	if(document.querySelector("#file").value == '') {
        return document.getElementById("error-form").innerText = "Aucun fichier sélectionné";
	}

    //récupération du fichier
	let file = document.querySelector("#file").files[0];

    //transformation en donnée binaire
    let reader = new FileReader();
	reader.onload = async function(e) {
		console.log(e.target.result);
        //affichage de l'image
        let img = document.getElementById("image-formulaire");
        img.src = e.target.result;
        img.style.display = "inline";
	};
	reader.onerror = function(e) {
		// erreur
		console.log('Erreur : ' + e.type);
	};

    //conversion du fichier
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



    

    



    



