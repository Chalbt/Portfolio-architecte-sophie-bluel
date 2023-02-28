afficherLesFiltres ()

async function afficherLesFiltres() {
    const response = await fetch('http://localhost:5678/api/works');
    let filtres = await response.json();
    console.log(filtres)

    const containerFiltres = document.getElementById("filtres")
    for (let filtre of filtres) {
        const boutonFiltre = creerBoutonFiltre (filtre);
        containerFiltres.appendChild(boutonFiltre);
        boutonFiltre.addEventListener("click", () => {
           
        })
    }

    const categoriesSet = new Set ();
    categoriesSet.add("Tous");
    categoriesSet.add("Objets");
    categoriesSet.add("Appartements");
    categoriesSet.add("Hôtels et restaurants");
}

function creerBoutonFiltre (filtre) {
    const boutonElt = document.createElement("button");
    const nomBoutonElt = document.createElement("p");
    nomBoutonElt.innerText = filtre.category.name;
    boutonElt.appendChild(nomBoutonElt);
    return boutonElt;
}

