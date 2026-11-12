import { getRepos, getUser } from "./api.js";
import { API_URL, GITHUB_TOKEN } from "./config.js";
import { validName } from "./utils.js";

const params = new URLSearchParams(window.location.search);

const username = params.get("username");

async function afficherProfil() {

    if (!username) return;

    const user = await getUser(username, GITHUB_TOKEN);

    if (!user) return;
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
    const allRepos = await getRepos(`${user.repos_url}?per_page=100&sort=updated`, GITHUB_TOKEN);
    repositorie(allRepos);





}

afficherProfil();



function repositorie(repos) {
    repos.forEach((repo) => {
        const parent = document.querySelector(".parentRepo");
        const article = aficheRepo(repo)
        parent.append(article)
    })

}

// function searchRepo(repos) {
//     const searchForm = document.querySelector("#formSearch");
//     searchForm.addEventListener("submit", (e) => {
//         e.preventDefault();
//         const parent = document.querySelector(".parentRepo");
//         const searchValue = document.querySelector("#searchRepo");
//         console.log(searchValue.value.toLocaleLowerCase());
//         const repo = repos.filter(repo => {
//             return repo.name.toLocaleLowerCase().includes(searchValue.value.toLocaleLowerCase());
//         })

//         const article = aficheRepo(repo[0]);
//         parent.replaceChildren(article);

//     })
// }

function aficheRepo(repo) {
    const article = document.createElement("article");
    const diffMs = Date.now() - new Date(repo.updated_at).getTime();
    const diffJours = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const dateText = diffJours === 0
        ? "Mis à jour aujourd'hui"
        : `Mis à jour il y a ${diffJours} jours`;


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


const myForm = document.querySelector("#myForm");

myForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.querySelector("#username");
    let nom = validName(name.value);
    if (!nom) return;
    const user = await getUser(nom, GITHUB_TOKEN);
    if (!user) {
        window.location.href = `../pages/introuvable.html?`;
        return;
    }
    window.location.href = `../pages/profil.html?username=${encodeURIComponent(user.login)}`;

})



const shortlistBtn = document.querySelector("#shortlist");
shortlistBtn.addEventListener("click", async () => {
    const user = await getUser(username, GITHUB_TOKEN);
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




