import { API_URL } from "./config.js";

export async function getUser(username, token) {
    try {

        const response = await fetch(`https://api.github.com/users/${username}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/vnd.github+json"
                }
            }

        );
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

export async function getRepos(url,token) {
    try {
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/vnd.github+json"
            }
        });
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