const urlBrands = "http://localhost:3000/brands";
const brandsContainer = document.querySelector("#brands");
fetch(urlBrands).then(r => r.json()).then(d => {
    // --- --- BRANDS CARDS --- ---
    d.forEach(brand => {
        const div = document.createElement("div");
        div.className = "col-md-6 col-lg-3 d-flex align-items-stretch mb-3";
        brandsContainer.appendChild(div);

        const content = document.createElement("div");
        content.className = "icon-box h-100";
        content.setAttribute("data-aos", "fade-up")
        content.setAttribute("data-aos-delay", "100")
        div.appendChild(content);

        const img = document.createElement("img")
        img.classList.add("img-fluid")
        img.src = brand.logo;

        const title = document.createElement("h4");
        title.classList.add("title");
        title.textContent = brand.name;

        const description = document.createElement("p")
        description.classList.add("description");
        description.textContent = brand.description;

        const divider = document.createElement("br");

        const details = document.createElement("button");
        details.setAttribute("data-bs-toggle", "modal");
        details.setAttribute("data-bs-target", "#modalCard");
        details.className = "btn btn-primary w-100 btn-sm";
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

        content.append(img, title, description, divider, details);


        // --- --- SEARCH --- ---
        const search = document.querySelector("#search");
        const brandNames = d.flatMap(brand => brand.name);
        const titles = document.querySelectorAll(".title");
        search.addEventListener("keyup", (event) => {
            brandNames.forEach(brand => {
                if (brand.toLowerCase().startsWith(search.value)) {
                    titles.forEach(card => {
                        const title = card.parentElement;
                        if (title.children[1].textContent.toLowerCase().startsWith(search.value)) {
                            title.parentElement.style = "display: flex !important;"
                        } else {
                            title.parentElement.style = "display: none !important;"
                        }
                    })
                }   
            })
        })
    });
})