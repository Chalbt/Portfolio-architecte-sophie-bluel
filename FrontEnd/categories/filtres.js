afficherLesFiltres ()

async function afficherLesFiltres() {
    //sotckage des projets 
    let projets = await recupererProjets();
    console.log(projets)
    //création de l'objet Set 
    const filtresSet = new Set ();
    filtresSet.add("Tous");
 
    const containerFiltres = document.getElementById("filtres");
    //Pour chaque projet, ajout des catégories à l'objet Set
    for (let projet of projets) {
        filtresSet.add(projet.category.name);   
    }
    //création des boutons filtres 
    for (let filtre of filtresSet) {
        const boutonFiltre = creerBoutonFiltre(filtre);
        containerFiltres.appendChild(boutonFiltre);
    }
}

//craétion des boutons html avec createElement
function creerBoutonFiltre(filtre) {
    const boutonElt = document.createElement("button");
    boutonElt.innerText = filtre;
    //appel de auClickSurFiltre avec la fonction bind
    //this fait référence à boutonElt et le filtre est passé en argument à la fonction
    boutonElt.addEventListener("click", auClickSurFiltre.bind(boutonElt, filtre));
    return boutonElt;
}

//fonction asynchrone qui prend le paramètre filtre
async function auClickSurFiltre(filtre) {
    //récupération des projets
    let projets = await recupererProjets();
    //si filtre !== à tous, affichage de tous les projets
    if (filtre !== "Tous") {
        //méthode filter sur le tableau des projets. Création d'un nouveau tableau projets 
        //contenant uniquement les projets dont la catégorie correspond au filtre sélectionné.
        projets = projets.filter(projet => projet.category.name === filtre);
    }
    //affichage des projets filtrés
    afficherLaGalerie(projets);   
}
