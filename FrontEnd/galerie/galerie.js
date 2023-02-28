afficherLaGalerie()

async function afficherLaGalerie() {
    const response = await fetch('http://localhost:5678/api/works');
    let projets = await response.json();
    console.log(projets)
    
    const container = document.getElementById("galerie")
    for (let projet of projets) { 
        const vignette = creerVignetteProjet (projet)
        container.appendChild(vignette)
    }
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

