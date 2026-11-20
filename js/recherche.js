import { getRepos, getUser } from "./api.js";
import { getUtilisateur, setUtilisateur } from "./cache.js";
import { validName } from "./utils.js";

const myForm = document.querySelector("#myForm");

myForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const messageCharge = document.querySelector("#messageCharge")
    const name = document.querySelector("#username");
    let nom = validName(name.value);
    if (!nom) return;
    let utilisateur = getUtilisateur(nom);
    if (utilisateur) {
        messageCharge.textContent = "charge depuis le cache"
    }
    else {
        // utilisateur = await getUser(nom);
        const results = await Promise.all([getUser(nom), getRepos(`https://api.github.com/users/${nom}/repos?per_page=100&sort=updated`)])
        const user = results[0];
        const repos = results[1];
        if (!user) {
            window.location.href = "/pages/introuvable.html";
            return;
        }
        utilisateur = { user, repos }
        setUtilisateur(nom, utilisateur);
        messageCharge.textContent = "Chargé depuis API";
    }
    window.location.href = `/pages/profil.html?username=${encodeURIComponent(nom)}`;

})