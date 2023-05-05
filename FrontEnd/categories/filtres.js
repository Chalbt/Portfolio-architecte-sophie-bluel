afficherLesFiltres ()

async function afficherLesFiltres() {
    let projets = await recupererProjets();
    console.log(projets)

    const filtresSet = new Set ();
    filtresSet.add("Tous");
 
    const containerFiltres = document.getElementById("filtres");
    for (let projet of projets) {
        filtresSet.add(projet.category.name);   
    }

    for (let filtre of filtresSet) {
        const boutonFiltre = creerBoutonFiltre(filtre);
        containerFiltres.appendChild(boutonFiltre);
    }
}

function creerBoutonFiltre(filtre) {
    const boutonElt = document.createElement("button");
    boutonElt.innerText = filtre;
    boutonElt.addEventListener("click", auClickSurFiltre.bind(boutonElt, filtre));
    return boutonElt;
}

async function auClickSurFiltre(filtre) {
    let projets = await recupererProjets();
    if (filtre !== "Tous") {
        //appliquer le filtre
        
        projets = projets.filter(projet => projet.category.name === filtre);
    }
    afficherLaGalerie(projets);   
}
