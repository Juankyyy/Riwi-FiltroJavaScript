const urlPqrs = "http://localhost:3000/pqrs";

const type = document.querySelector("#type");
const email = document.querySelector("#email");
const message = document.querySelector("#message");
const submit = document.querySelector("#submit");

submit.addEventListener("click", (e) => {
    e.preventDefault();

    if(!type.value) {
        type.classList.add("is-invalid");
    } else {
        type.classList.remove("is-invalid");
        type.classList.add("is-valid");
    }

    if(!email.value) {
        email.classList.add("is-invalid");
    } else {
        email.classList.remove("is-invalid");
        email.classList.add("is-valid");
    }

    if(!message.value) {
        message.classList.add("is-invalid");
    } else {
        message.classList.remove("is-invalid");
        message.classList.add("is-valid");
    }
    if (type.value && email.value && message.value) {
        const data = {
            type: type.value,
            email: email.value,
            message: message.value
        };
    
        const options = {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(data)
        };
    
        fetch(urlPqrs, options).then(alert("Se ha enviado correctamente"));
    }

})