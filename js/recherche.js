import { getUser } from "./api.js";
import { validName } from "./utils.js";

const myForm = document.querySelector("#myForm");

myForm.addEventListener("submit", async(e) => {
    e.preventDefault();
    const name = document.querySelector("#username");
    let nom = validName(name.value);
    if (!nom) return;
    const user= await getUser(nom);
    if(!user){
        window.location.href = `../pages/introuvable.html?`;
        return;
    }
    window.location.href = `../pages/profil.html?username=${encodeURIComponent(user.login)}`;

})