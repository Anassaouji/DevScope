const API_URL = "https://6af5f059f6270fa08d68eb75.mockapi.io/api/v1";

export async function getUser(username) {
    try {

        const response = await fetch(`https://api.github.com/users/${username}`);
        if (response.status === 404) {
            throw new Error("Aucun développeur trouvé");
        }
        if (response.status === 403 || response.status === 429) {
            throw new Error("Limite de requêtes atteinte. Réessayez plus tard.");
        }
        if (!response.ok) {
            throw new Error("Erreur du serveur : " + response.status);
        }

        const data = await response.json();

        console.log(data);

        return data;
    } catch (error) {
        // On arrive ici pour nos erreurs ET pour une erreur réseau
        console.error(error.message);
    }
}

export async function getRepos(url) {
    try {
        const response = await fetch(url);
        if (response.status === 404) {
            throw new Error("Aucun Repo trouvé");
        }
        if (response.status === 403 || response.status === 429) {
            throw new Error("Limite de requêtes atteinte. Réessayez plus tard.");
        }
        if (!response.ok) {
            throw new Error("Erreur du serveur : " + response.status);
        }

        const data = await response.json();

        console.log(data);

        return data;
    } catch (error) {
        // On arrive ici pour nos erreurs ET pour une erreur réseau
        console.error(error.message);
    }


}


export async function getCandidats(candidats) {
    try {
        const response = await fetch(`${API_URL}/${candidats}`);
        if (response.status === 404) {
            throw new Error("Aucune Candidats Trouvé");
        }
        if (response.status === 403 || response.status === 429) {
            throw new Error("Limite de requêtes atteinte. Réessayez plus tard.");
        }
        if (!response.ok) {
            throw new Error("Erreur du serveur : " + response.status);
        }

        return await response.json();

    }
    catch (error) {
        console.log(error.message);

    }
}


export async function modifieCandidat(id, candidat) {
    const reponse = await fetch(`${API_URL}/candidats/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(candidat),
    });
    if (!reponse.ok) throw new Error(`Erreur HTTP ${reponse.status}`);
    return reponse.json(); // la tâche modifiée, renvoyée par le serveur
}


export async function deleteCandidat(id) {
    const reponse = await fetch(`${API_URL}/candidats/${id}`, {method: "DELETE",});
    if (!reponse.ok) throw new Error(`Erreur HTTP ${reponse.status}`);
}


