import { getCandidats } from "./api.js";

async function afichCandidats() {
    const nombreCandidats = document.querySelector("#nombreCandidats");
    const candidatsParent = document.querySelector("#candidats");
    const candidats = await getCandidats("candidats");
    if (!candidats) return;
    nombreCandidats.textContent = `${candidats.length} candidats dans votre shortlist`;
    candidats.forEach(candidat => {
        const article = afichCandidat(candidat);
        candidatsParent.append(article);
    });
}

function afichCandidat(candidat) {
    const article = document.createElement("article");
    article.innerHTML = `<article class="rounded-xl border border-slate-700 bg-slate-900 p-5">
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
                                    ★★★★★
                                </p>
                                <span class="rounded-lg border border-red-500 px-3 py-2 text-sm text-red-400">
                                    Refusé
                                </span>
                                <button type="button"
                                    class="rounded-lg border border-cyan-500 px-4 py-2 text-cyan-400 hover:bg-slate-800">
                                    Modifier
                                </button>
                                <button type="button"
                                    class="rounded-lg border border-red-500 px-4 py-2 text-red-400 hover:bg-red-950">
                                    Supprimer
                                </button>
                            </div>
                        </div>
                    </article>`

    return article
}

afichCandidats();