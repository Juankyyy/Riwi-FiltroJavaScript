const user = localStorage.getItem("admin")
if (!user) {
    location.href = "../index.html"
}

const urlAdmins = "http://localhost:3000/admin";
const urlBrands = "http://localhost:3000/brands";

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

fetch(urlBrands).then(r => r.json()).then(d => {
    d.forEach(brand => {
        // --- --- CARD --- ---
        const tr = document.createElement("tr");
        tbody.appendChild(tr);

        const id = document.createElement("td");
        id.textContent = brand.id;

        const img = document.createElement("td");
        const logo = document.createElement("img");
        logo.src = brand.logo;
        logo.setAttribute("width", "200px");

        const name = document.createElement("td");
        name.textContent = brand.name;

        const local = document.createElement("td");
        local.textContent = brand.local;

        const floor = document.createElement("td");
        floor.textContent = brand.floor;

        const schedule = document.createElement("td");
        schedule.style = "font-size: 12px;"
        schedule.innerHTML = brand.schedule;

        const website = document.createElement("td");
        const a = document.createElement("a");
        a.textContent = "Sitio Web"
        a.href = brand.website;


        const actions = document.createElement("td");

        // -- DETAILS --
        const details = document.createElement("button");
        details.setAttribute("data-bs-toggle", "modal");
        details.setAttribute("data-bs-target", "#modalCard");
        details.className = "btn btn-sm btn-info";
        details.textContent = "Detalles";

        details.addEventListener("click", () => {
            const body = document.querySelector("#modalTextDetails");
            const closeDetails = document.querySelector("#closeDetails")

            fetch(urlBrands + `/${brand.id}`).then(r => r.json()).then(d => {
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

        // -- EDIT --
        const edit = document.createElement("button");
        edit.setAttribute("data-bs-toggle", "modal");
        edit.setAttribute("data-bs-target", "#modalEdit");
        edit.className = "btn btn-sm btn-warning m-1";
        edit.textContent = "Editar";

        edit.addEventListener("click", () => {
            const info = (edit.parentElement).parentElement;
            const id = info.children[0].innerText;

            const modalLogo = document.querySelector("#modalLogo");
            const modalName = document.querySelector("#modalName");
            const modalLocal = document.querySelector("#modalLocal");
            const modalFloor = document.querySelector("#modalFloor");
            const modalSchedule = document.querySelector("#modalSchedule");
            const modalWebsite = document.querySelector("#modalWebsite");
            const modalDescription = document.querySelector("#modalDescription");
            const modalSubmit = document.querySelector("#modalSubmit");
            const invalid = document.querySelector("#invalid");
            invalid.style = "display: none;"

            fetch(urlBrands + `/${id}`).then(r => r.json()).then(d => {
                modalLogo.value = d.logo;
                modalName.value = d.name;
                modalLocal.value = d.local;
                modalFloor.value = d.floor;
                modalSchedule.value = d.schedule;
                modalWebsite.value = d.website;
                modalDescription.value = d.description;
            })

            modalSubmit.addEventListener("click", () => {
                if (modalLogo.value != "" && modalName.value != "" && modalLocal.value != "" && modalFloor.value != "" && modalSchedule.value != "" && modalWebsite.value != "" && modalDescription.value != "") {
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

                        fetch(urlBrands + `/${id}`, options)
                    }
                } else {
                    invalid.style = "color: red; font-weight: bold; display: block;"
                }
            })
        })

        // -- REMOVE --
        const remove = document.createElement("button");
        remove.className = "btn btn-sm btn-danger";
        remove.textContent = "Eliminar";

        remove.addEventListener("click", () => {
            const info = (remove.parentElement).parentElement;
            const id = info.children[0].innerText;
            const options = {
                method: "DELETE"
            }

            const confirmation = confirm(`¿Está seguro de eliminar la marca ${info.children[2].innerText}?`);
            if (confirmation) {
                fetch(urlBrands + `/${id}`, options);
            }

        })

        img.appendChild(logo);
        website.appendChild(a)
        actions.append(details, edit, remove);
        tr.append(id, img, name, local, floor, schedule, website, actions)
    });
});

const modalCreate = document.querySelector("#modalCreate");

modalCreate.addEventListener("click", () => {
    const modalLogo = document.querySelector("#modalLogoCreate");
    const modalName = document.querySelector("#modalNameCreate");
    const modalLocal = document.querySelector("#modalLocalCreate");
    const modalFloor = document.querySelector("#modalFloorCreate");
    const modalSchedule = document.querySelector("#modalScheduleCreate");
    const modalWebsite = document.querySelector("#modalWebsiteCreate");
    const modalDescription = document.querySelector("#modalDescriptionCreate");
    const modalSubmit = document.querySelector("#modalSubmitCreate");
    const invalid = document.querySelector("#invalidCreate");
    invalid.style = "display: none;"

    modalSubmit.addEventListener("click", () => {
        if (modalLogo.value != "" && modalName.value != "" && modalLocal.value != "" && modalFloor.value != "" && modalSchedule.value != "" && modalWebsite.value != "" && modalDescription.value != "") {
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
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(data)
            }

            fetch(urlBrands, options);
            modalName.value = "";
            modalLocal.value = "";
            modalFloor.value = "";
            modalSchedule.value = "";
            modalLogo.value = "";
            modalWebsite.value = "";
            modalDescription.value = "";
        } else {
            invalid.style = "color: red; font-weight: bold; display: block;"
        };
    });
});