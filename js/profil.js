import { getRepos, getUser } from "./api.js";
import { getUtilisateur, setUtilisateur } from "./cache.js";
import { validName } from "./utils.js";
const API_URL = "https://6af5f059f6270fa08d68eb75.mockapi.io/api/v1";
const params = new URLSearchParams(window.location.search);

const username = params.get("username");
let allRepos = [];
async function afficherProfil() {

    if (!username) return;
    let data = getUtilisateur(username);

    if (!data || !data.user) {
        const [user, repos] = await Promise.all([
            getUser(username),
            getRepos(`https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`)
        ]);
        if (!user) return;
        data = { user, repos };
        setUtilisateur(username, data);
    }

    const user = data.user;
    allRepos = data.repos;

    const name = document.querySelector("#username");
    name.value = user.login;
    console.log(user);
    const avatar = document.querySelector("#avatar");
    avatar.src = user.avatar_url;
    const nom = document.querySelector("#nom");
    nom.textContent = user.name || user.login;
    const usernom = document.querySelector("#user")
    usernom.textContent = user.login;
    const bio = document.querySelector("#bio")
    bio.textContent = user.bio || "Aucune bio";
    const location = document.querySelector("#location")
    location.textContent = user.location || "Aucune Location";
    const date = new Date(user.created_at);
    const mois = date.toLocaleString("fr-FR", { month: "long" });
    const annee = date.getFullYear();
    const createdAt = document.querySelector("#memebreDepuis")
    createdAt.textContent = `${mois} ${annee}` || "Aucune Date";
    const repos = document.querySelectorAll(".repos");
    repos.forEach((repo) => repo.textContent = user.public_repos || "Aucune Repo")
    const abonnee = document.querySelector("#abonnee")
    abonnee.textContent = user.followers;
    const abonnement = document.querySelector("#Abonnements")
    abonnement.textContent = user.following;
    const profilGitHub = document.querySelector("#profilGitHub");
    profilGitHub.href = user.html_url;
    // allRepos = await getRepos(`${user.repos_url}?per_page=100&sort=updated`);
    repositorie(allRepos);





}





const etat = { categorie: "Tous", recherch: "" };
let search = document.querySelector("#cherche")
search.addEventListener("input", () => {
    etat.recherch = search.value;
    repositorie(allRepos)
})
const parent = document.querySelector(".parentRepo");

function repositorie(repos) {
    const nouveauRespos = repos.filter(repo => {
        return repo.name.toLowerCase().includes(etat.recherch.toLowerCase()) &&
            (etat.categorie === "Tous" || repo.language === etat.categorie)
    })
    parent.innerHTML = ""
    const repose = document.querySelectorAll(".repos");
    repose.forEach((repo) => repo.textContent = nouveauRespos.length || "Aucune Repo")
    nouveauRespos.forEach((repo) => {
        const article = aficheRepo(repo)
        parent.append(article)
    })

}



function aficheRepo(repo) {
    const article = document.createElement("article");
    const diffMs = Date.now() - new Date(repo.updated_at).getTime();
    const diffJours = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const dateText = diffJours === 0 ? "Mis à jour aujourd'hui" : `Mis à jour il y a ${diffJours} jours`;


    article.innerHTML = `<article class="rounded-lg border border-slate-700 bg-slate-800 p-5">
    
                                <h3 id="nameRepo" class="mb-3 text-lg font-semibold text-cyan-400">
                                    ${repo.name}
                                </h3>
    
                                <p class="mb-4 text-sm text-gray-400">
                                    ${repo.description || "Aucune Description"}
                                </p>
    
                                <div class="mb-4 flex gap-4 text-sm text-gray-300">
                                    <span>${repo.language || "Non spécifié"}</span>
                                    <span>★ ${repo.stargazers_count}</span>
                                    <span>Forks : ${repo.forks_count}</span>
                                </div>
                                <div class="text-sm text-gray-300">
                                    <span>${dateText}</span>
                                </div>

                                <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer"
                                    class="text-sm text-cyan-400 hover:underline">
                                    Voir le dépôt
                                </a>
    
                            </article>`

    return article
}

const btnParent = document.querySelector("#filterRepo");
btnParent.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-filter]");

    if (btn) {
        document.querySelectorAll("[data-filter]").forEach(btn => btn.classList.remove("bg-[#00b8db]"));
        btn.classList.add("bg-[#00b8db]")
        etat.categorie = btn.dataset.filter;
        repositorie(allRepos);
    }
})


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



const shortlistBtn = document.querySelector("#shortlist");
shortlistBtn.addEventListener("click", async () => {
    const user = await getUser(username);
    const errorShortlist = document.querySelector(".error-shortlist");
    if (!user) return;
    const nouveauCandidat = {
        login: user.login,
        name: user.name || user.login,
        avatar_url: user.avatar_url,
        html_url: user.html_url,
        language: "JavaScript",
        rating: 3,
        status: "À contacter",
        note: "",
        createdAt: new Date().toISOString()
    };
    const resultats = await fetch(`${API_URL}/candidats`);
    if (!resultats.ok) {
        errorShortlist.textContent = "Erreur lors du chargement";
        errorShortlist.classList.add("text-red-600")
        return;
    }
    const candidats = await resultats.json()
    const candidat = candidats.some(candid => candid.login === user.login);
    if (candidat) {
        errorShortlist.textContent = "Candidat deja ajouter au shortList";
        errorShortlist.classList.add("text-red-600")
        return;
    }
    // errorShortlist.textContent="";
    const response = await fetch(`${API_URL}/candidats`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nouveauCandidat)
    });

    if (!response.ok) {
        errorShortlist.textContent = "Erreur lors de l'ajout";
        errorShortlist.classList.add("text-red-600")
        return;
    }

    errorShortlist.textContent = "Candidat ajouté avec succès";
    errorShortlist.classList.remove("text-red-600")
    errorShortlist.classList.add("text-green-600")

})




afficherProfil();