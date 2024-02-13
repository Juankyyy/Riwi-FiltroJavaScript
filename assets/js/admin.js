const user = localStorage.getItem("admin")
if (!user) {
    location.href = "../index.html"
}

const urlAdmins = "http://localhost:3000/admin";
const urlBrands = "http://localhost:3000/brands";
const urlPqrs = "http://localhost:3000/pqrs";

const adminName = document.querySelector("#adminName");
const signOut = document.querySelector("#signOut");
signOut.style = "cursor: pointer;";

const adminsCounter = document.querySelector("#admins");
const brandsCounter = document.querySelector("#brands");
const pqrsCounter = document.querySelector("#pqrs");

signOut.addEventListener("click", () => {
    localStorage.clear();
    location.href = "../index.html"
});

fetch(urlAdmins).then(r => r.json()).then(d => {
    adminName.textContent = user

    const admins = d.length;
    adminsCounter.textContent = admins;
});

fetch(urlBrands).then(r => r.json()).then(d => {
    const brands = d.length;
    brandsCounter.textContent = brands;
});

fetch(urlPqrs).then(r => r.json()).then(d => {
    const pqrs = d.length;
    pqrsCounter.textContent = pqrs;
})