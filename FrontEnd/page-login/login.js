const loginForm = document.getElementById("login");
loginForm.addEventListener("submit", onFormSubmit)

async function onFormSubmit(event) {
    event.preventDefault();
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

    //attendre la réponse du serveur avec await
    const result = await response.json();
    console.log(result)
    //récupérer et stocker le token d'authentification dans la réponse
    // Si connexion ok : rediriger vers la page d'accueil
    // Si ko : "Erreur dans l'identifiant ou le mot de passe." sur la page du formulaire
    localStorage.setItem("userId", 1);
    localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1MTg3NDkzOSwiZXhwIjoxNjUxOTYxMzM5fQ.JGN1p8YIfR-M-5eQ-Ypy6Ima5cKA4VbfL2xMr2MgHm4");
}