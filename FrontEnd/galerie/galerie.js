afficherLaGalerie()

async function afficherLaGalerie(projets = null) {
    if (projets === null) {
        projets = await recupererProjets();
    }
    
    
    const container = document.getElementById("galerie")
    container.innerHTML = "";
    for (let projet of projets) { 
        const vignette = creerVignetteProjet (projet)
        container.appendChild(vignette)
    }       
}

async function recupererProjets() {
    const response = await fetch('http://localhost:5678/api/works');
    let projets = await response.json();
    return projets
}

function creerVignetteProjet (projet) {
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

