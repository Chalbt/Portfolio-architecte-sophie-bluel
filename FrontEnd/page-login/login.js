const loginForm = document.getElementById("login");
loginForm.addEventListener("submit", onFormSubmit)

async function onFormSubmit(event) {
    event.preventDefault();
    //stocker les valeurs du formulaire
    const utilisateur = {
        email: event.target.querySelector("[name=email]").value,
        password: event.target.querySelector("[name=password]").value
    }

    //requête fetch post
    const response = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
            "accept": "application/json",
            "Content-Type":"application/json"
        },
        body: JSON.stringify(utilisateur)
    });

    if(response.status !== 200) {
        return document.getElementById("errors").innerText = "Erreur dans l'identifiant ou le mot de passe.";
    }

    //attendre la réponse du serveur avec await
    const result = await response.json();

    //récupérer et stocker le token d'authentification dans la réponse
    localStorage.setItem("userId", result.userId);
    localStorage.setItem("token", result.token);
    document.location.href="../index.html";
}