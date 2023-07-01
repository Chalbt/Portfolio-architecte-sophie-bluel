afficherLaGalerie()

async function afficherLaGalerie(projets = null) {
    //si aucun projet placé en argument
    if (projets === null) {
        projets = await recupererProjets();
    }
    //création de l'emplacement de la galerie
    const container = document.getElementById("galerie")
    container.innerHTML = "";
    for (let projet of projets) { 
        //pour chaque projet, on crée une vignette
        const vignette = creerVignetteProjet(projet);
        //on appelle la vignette dans le conteneur
        container.appendChild(vignette)
    }       
}

//méthode GET de l'API 
async function recupererProjets() {
    const response = await fetch('http://localhost:5678/api/works');
    //transormation de la réponse en json
    let projets = await response.json();
    return projets
}

//création des différents éléments d'une vignette avec createElement et appendChild
function creerVignetteProjet(projet) {
    const vignetteElt = document.createElement("figure");
    const titleElt = document.createElement("figcaption");
    titleElt.innerText = projet.title
    const imageElt = document.createElement("img");
    imageElt.src = projet.imageUrl
    imageElt.alt = projet.title
    vignetteElt.appendChild(imageElt)
    vignetteElt.appendChild(titleElt)
    return vignetteElt
}

