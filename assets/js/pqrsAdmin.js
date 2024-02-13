const user = localStorage.getItem("admin")
if (!user) {
    location.href = "../index.html"
}

const urlAdmins = "http://localhost:3000/admin";
const urlPqrs = "http://localhost:3000/pqrs";

const adminName = document.querySelector("#adminName");
const tbody = document.querySelector("tbody");

const signOut = document.querySelector("#signOut");
signOut.style = "cursor: pointer;";

signOut.addEventListener("click", () => {
    localStorage.clear();
    location.href = "../index.html"
});

fetch(urlAdmins).then(r => r.json()).then(d => {
    adminName.textContent = user
});

fetch(urlPqrs).then(r => r.json()).then(d => {
    d.forEach(pqrs => {
        const tr = document.createElement("tr");
        tbody.appendChild(tr);

        const id = document.createElement("td");
        id.textContent = pqrs.id;

        const type = document.createElement("td");
        type.textContent = pqrs.type;

        const email = document.createElement("td");
        email.textContent = pqrs.email;

        const message = document.createElement("td");
        message.textContent = pqrs.message;

        const actions = document.createElement("td")
        const remove = document.createElement("div");
        remove.className = "btn btn-sm btn-danger";
        remove.textContent = "Eliminar";

        remove.addEventListener("click", () => {
            const info = (remove.parentElement).parentElement;
            const id = info.children[0].innerText;
            console.log(id);

            const confirmation = confirm(`¿Está seguro de eliminar el PQRS con el id ${id}?`);
            if (confirmation) {
                const options = {
                    method: "DELETE"
                }
    
                fetch(urlPqrs + `/${id}`, options);
            }
        })

        actions.appendChild(remove)
        tr.append(id, type, email, message, actions);
    });
});