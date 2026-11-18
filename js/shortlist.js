import { deleteCandidat, getCandidats, modifieCandidat } from "./api.js";

let candidats = await getCandidats("candidats");
const candidatsParent = document.querySelector("#candidats");
let indexCandidat = null;
const etat = {filter:"Tous" , cherch:""}
const searchCandidate = document.querySelector("#searchCandidate");
searchCandidate.addEventListener("input",()=>{
    etat.cherch=searchCandidate.value;
    afichCandidats(candidats)
})

const filterParent = document.querySelector("#filterParent");
filterParent.addEventListener("click",(e)=>{
    const btn = e.target.closest("[data-filter]");
    btn.classList.add("bg-slate-800")
    if(btn){
        etat.filter = btn.dataset.filter;
        filterParent.querySelectorAll("[data-filter]").forEach(btn => {
            btn.classList.remove("bg-cyan-500","text-slate-950");
            btn.classList.add("bg-slate-800","text-gray-300","hover:bg-slate-700")

        })
        btn.classList.remove("bg-slate-800","hover:bg-slate-700")
        btn.classList.add("bg-cyan-500","font-medium","text-slate-950")
        afichCandidats(candidats)
    }
})

function afichCandidats() {
    const nombreCandidats = document.querySelector("#nombreCandidats");
    if (!candidats) return;
    candidatsParent.innerHTML = "";
    nombreCandidats.textContent = `${candidats.length} candidats dans votre shortlist`;
    const nCandidats = candidats.filter(candid => {
        return candid.login.toLowerCase().includes(etat.cherch.toLowerCase()) &&
        (etat.filter === "Tous" || candid.status === etat.filter)
    })
    nCandidats.forEach(candidat => {
        const article = afichCandidat(candidat);
        candidatsParent.append(article);
    });
}

function afichCandidat(candidat) {
    const article = document.createElement("article");
    article.innerHTML = `<article id="${candidat.id}" class="candidatArt rounded-xl border border-slate-700 bg-slate-900 p-5">
                        <div class="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                            <!-- Candidate Information -->
                            <div class="flex items-center gap-4">
                                <img src="${candidat.avatar_url}" alt="Avatar du candidat"
                                    class="h-20 w-20 rounded-full border-2 border-cyan-400 object-cover">
                                <div>
                                    <h3 class="text-xl font-bold">
                                        ${candidat.neme || candidat.login}
                                    </h3>
                                    <p class="mt-1 text-sm text-gray-400">
                                        @${candidat.login}
                                    </p>
                                    <span
                                        class="mt-2 inline-block rounded-md bg-slate-800 px-3 py-1 text-sm text-cyan-400">
                                        ${candidat.language}
                                    </span>
                                    <p class="mt-2 text-sm italic text-gray-300">
                                        Développeur ${candidat.language} passionné.
                                    </p>
                                    <p class="mt-2 text-xs text-gray-500">
                                        Ajouté le ${new Date(candidat.createdAt).toLocaleDateString("fr-FR")}
                                    </p>
                                </div>
                            </div>
                            <!-- Candidate Actions -->
                            <div class="flex flex-wrap items-center gap-3">
                                <p class="text-xl text-yellow-400" aria-label="5 étoiles sur 5">
                                    ${"★".repeat(candidat.rating || 0)}
                                </p>
                                <span class="rounded-lg border border-red-500 px-3 py-2 text-sm text-red-400">
                                    ${candidat.status}
                                </span>
                                <button type="button" data-action="modifier"
                                    class="rounded-lg border border-cyan-500 px-4 py-2 text-cyan-400 hover:bg-slate-800">
                                    Modifier
                                </button>
                                <button type="button" data-action="supprimer"
                                    class="rounded-lg border border-red-500 px-4 py-2 text-red-400 hover:bg-red-950">
                                    Supprimer
                                </button>
                            </div>
                        </div>
                    </article>`

    return article
}

afichCandidats();



// const modifierC = document.querySelector("#modifierC");
// const candidatArt = document.querySelector(".candidatArt");
const modalSuppression = document.querySelector("#modalSuppression")
const modalModifier = document.querySelector("#modalModifier");
const form = document.querySelector("#formModifier");
candidatsParent.addEventListener("click", (e) => {
    const modifierC = e.target.closest("[data-action='modifier']")
    const supprimeC = e.target.closest("[data-action='supprimer']")
    if (modifierC) {
        const parent = modifierC.closest(".candidatArt");
        const id = parent.id
        const candidat = candidats.find(candidat => candidat.id === id);
        const statut = document.querySelector("#statut");
        const rating = document.querySelector("#rating");
        const commentaire = document.querySelector("#commentaire");
        statut.value = candidat.status;
        rating.value = candidat.rating
        commentaire.value = candidat.note
        indexCandidat = id;
        console.log(candidat);
        modalModifier.classList.remove("hidden")

    }
    if (supprimeC) {
        const parent = supprimeC.closest(".candidatArt");
        const id = parent.id
        indexCandidat = id;
        modalSuppression.classList.remove("hidden");

    }

})

modalModifier.addEventListener("click", (e) => {
    const hide = e.target.closest("#fermerModal");
    const anulee = e.target.closest("#annulerModal");
    const btn = hide || anulee;
    if (btn) {
        modalModifier.classList.add("hidden");
        form.reset();
    }
})


form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const enregistrer = document.querySelector("#enregistrer");
    if (indexCandidat !== null) {
        const statut = document.querySelector("#statut");
        const rating = document.querySelector("#rating");
        const commentaire = document.querySelector("#commentaire");
        const candidat = candidats.find(candidat => candidat.id === indexCandidat);
        const changement = { status: statut.value, rating: Number(rating.value), note: commentaire.value }
        enregistrer.disabled = true;
        enregistrer.textContent = "Enregistrement";
        enregistrer.classList.add("disabled:opacity-50", "disabled:cursor-not-allowed");

        try {
            await modifieCandidat(indexCandidat, { ...candidat, ...changement });
            candidats = await getCandidats("candidats")
            afichCandidats(candidats)
            indexCandidat = null;
            form.reset()
            modalModifier.classList.add("hidden");
        }
        catch (err) {
            console.log("Erreur", err);
        }
        finally {
            enregistrer.disabled = false;
            enregistrer.textContent = "Modifier";
        }
    }
})


// suprimer Candidat

modalSuppression.addEventListener("click", async (e) => {
    const anulle = e.target.closest("#annulerSuppression")
    const confirmer = e.target.closest("#confirmerSuppression")
    if (anulle) {
        modalSuppression.classList.add("hidden");
    }
    if (confirmer) {
        confirmer.disabled = true;
        confirmer.textContent = "Enregistrement";
        confirmer.classList.add("disabled:opacity-50", "disabled:cursor-not-allowed");

        try {
            await deleteCandidat(indexCandidat);
            candidats = await getCandidats("candidats");
            afichCandidats(candidats)
            indexCandidat = null;
            modalSuppression.classList.add("hidden");
        }
        catch (err) {
            console.log('Erreur ', err);

        }
        finally {
            confirmer.disabled = false;
            confirmer.textContent = "Supprimer"
        }
    }

})
