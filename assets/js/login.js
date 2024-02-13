const url = "http://localhost:3000/admin";

const email = document.querySelector("#email");
const password = document.querySelector("#password");
const submit = document.querySelector("#submit");

const message = document.querySelector(".hidden")
message.style = "display: none;"

const user = localStorage.getItem("admin");

if (user) {
    location.href = "./admin/index.html"
}

submit.addEventListener("click", () => {
    fetch(url).then(r => r.json()).then(d => {
        const user = d.find(user => { return user.email === email.value && user.password === password.value; });
        
        if (user) {
            localStorage.setItem("admin", user.name)
            location.href = "./admin/index.html"
        } else {
            message.style = "color: red; font-weight: bold;"
            email.classList.add("is-invalid");
            password.classList.add("is-invalid");
        }
    })
})