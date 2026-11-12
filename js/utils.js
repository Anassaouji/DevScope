
export function validName(name) {
    const errorSearch = document.querySelector(".error-search");
    
    const regex = /^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/;
    errorSearch.textContent = "";
    if (name === "") {
        errorSearch.textContent = "tu doit remplir le champs";
    }
    else if (!regex.test(name)) {
        errorSearch.textContent = "le nom doit etre en francais et commance pas par - et ne termine pas par -";
    }
    else {
        return name;
    }
}