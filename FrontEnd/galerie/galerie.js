afficherLaGalerie()

async function afficherLaGalerie() {
    const response = await fetch('http://localhost:5678/api/works');
    let json = await response.json();
    console.log(json)
    
    const container = document.getElementById("galerie")
    for (let image of json) {
        const imageElt = document.createElement("img");
        imageElt.src = image.imageUrl
        imageElt.alt = image.title
        container.appendChild(imageElt)
    }
}