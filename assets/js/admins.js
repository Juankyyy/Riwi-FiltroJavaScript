const user = localStorage.getItem("admin")
if (!user) {
    location.href = "../index.html"
}

const urlAdmins = "http://localhost:3000/admin";
const adminName = document.querySelector("#adminName");
const tbody = document.querySelector("tbody");

const signOut = document.querySelector("#signOut");
signOut.style = "cursor: pointer;";

signOut.addEventListener("click", () => {
    localStorage.clear();
    location.href = "../index.html"
});

fetch(urlAdmins).then(r => r.json()).then(d => {
    adminName.textContent = user;

    d.forEach(admin => {
        const tr = document.createElement("tr");
        tbody.appendChild(tr);
        
        const id = document.createElement("td");
        id.textContent = admin.id;

        const name = document.createElement("td");
        name.textContent = admin.name;

        const email = document.createElement("td");
        email.textContent = admin.email;

        const actions = document.createElement("td");
        const details = document.createElement("button");
        details.setAttribute("data-bs-toggle", "modal");
        details.setAttribute("data-bs-target", "#modalCard");
        details.className = "btn btn-sm btn-info";
        details.textContent = "Detalles";

        details.addEventListener("click", () => {
            const body = document.querySelector("#modalTextDetails");
            const closeDetails = document.querySelector("#closeDetails")

            fetch(urlAdmins + `/${id.innerText}`).then(r => r.json()).then(d => {
                for (data in d) {
                    const p = document.createElement("p");
                    p.textContent = `${data}: ${d[data]}`;
                    body.appendChild(p);
                }
            })

            closeDetails.addEventListener("click", () => {
                body.innerHTML = "";
            })
        })

        const edit = document.createElement("button");
        edit.setAttribute("data-bs-toggle", "modal");
        edit.setAttribute("data-bs-target", "#modalEdit");
        edit.className = "btn btn-sm btn-warning m-1";
        edit.textContent = "Editar";

        edit.addEventListener("click", () => {
            const info = (edit.parentElement).parentElement;
            const id = info.children[0].innerText;

            const modalName = document.querySelector("#modalName");
            const modalEmail = document.querySelector("#modalEmail");
            const modalPassword = document.querySelector("#modalPassword");
            const modalSubmit = document.querySelector("#modalSubmit");

            const invalid = document.querySelector("#invalid");
            invalid.style = "display: none;"

            fetch(urlAdmins + `/${id}`).then(r => r.json()).then(d => {
                modalName.value = d.name;
                modalEmail.value = d.email;
            })
            modalSubmit.addEventListener("click", () => {
                if (modalName.value != "" && modalEmail.value != "") {
                    const confirmation = confirm(`¿Está seguro de editar la marca ${info.children[2].innerText}?`);
                    if (confirmation) {
                        const data = {
                            name: modalName.value,
                            local: modalLocal.value,
                            floor: modalFloor.value,
                            schedule: modalSchedule.value,
                            logo: modalLogo.value,
                            website: modalWebsite.value,
                            description: modalDescription.value
                        }

                        const options = {
                            method: "PUT",
                            headers: { "Content-type": "application/json" },
                            body: JSON.stringify(data)
                        }

                        fetch(urlAdmins + `/${id}`, options)
                    }
                } else {
                    invalid.style = "color: red; font-weight: bold; display: block;"
                }
            })
        })

        const remove = document.createElement("button");
        remove.className = "btn btn-sm btn-danger";
        remove.textContent = "Eliminar";

        remove.addEventListener("click", () => {
            const info = (remove.parentElement).parentElement;
            const id = info.children[0].innerText;
            const options = {
                method: "DELETE"
            }

            const confirmation = confirm(`¿Está seguro de eliminar el admin ${info.children[1].innerText}?`);
            if (confirmation) {
                fetch(urlAdmins + `/${id}`, options);
            }

        })

        actions.append(details, edit, remove);
        tr.append(id, name, email, actions);
    });
});

const adminCreate = document.querySelector("#adminCreate");

adminCreate.addEventListener("click", () => {
    const modalName = document.querySelector("#modalName");
    const modalEmail = document.querySelector("#modalEmail");
    const modalPassword = document.querySelector("#modalPassword");
    const modalSubmit = document.querySelector("#modalSubmit");
    const invalid = document.querySelector("#invalid");
    invalid.style = "display: none;"

    modalSubmit.addEventListener("click", () => {
        if(modalName.value != "" && modalEmail.value != "") {
            const data = {
                name: modalName.value,
                email: modalEmail.value,
                password: modalPassword.value
            }

            const options = {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(data)
            }

            fetch(urlAdmins, options);
            modalName.value = "";
            modalEmail.value = "";
            modalPassword.value = "";
        } else {
            invalid.style = "color: red; font-weight: bold; display: block;"
        }
    })
})