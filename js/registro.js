const nav_tienda = document.getElementById('nav_tienda')
const login = document.getElementById('login')
var nom = document.getElementById('nom')


function cargado() {
    nav_tienda.style.display = "none"
}

login.addEventListener('click', button => {
    compLogin(button)
})

var compLogin = button => {
    if(button.target.classList.contains('entrar')){
        if (nom.value == '') {
            alert("Primerament has d'introduir un nom")
        } else {
            nav_tienda.style.display = "flex"
            login.style.display = "none"
            window.location.href = "tienda.html";
        }
    }
}