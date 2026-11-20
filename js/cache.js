const DURATION = 10 * 60 * 1000;

export function setUtilisateur(key, user) {
    localStorage.setItem(key, JSON.stringify({ data: user, createdAt: Date.now() }))
}

export function getUtilisateur(key) {
    const user = JSON.parse(localStorage.getItem(key));
    if (user && Date.now() - user.createdAt < DURATION) {
        return user.data;
    }
    else {
        return null;
    }
}