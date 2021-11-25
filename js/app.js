
const cardshw = document.getElementById('cardshw')
const cardssw = document.getElementById('cardssw')
const templateCard = document.getElementById('template_card').content;
const fragment = document.createDocumentFragment()
var carrito

if(localStorage.getItem('carrito') == null){
    carrito = {}
} else {
    carrito = JSON.parse(localStorage.getItem('carrito'))
}

const pintarCard = (datahw, datasw) => {
    datahw.forEach(producto => {
        templateCard.querySelector('h5').textContent = producto.nombre
        templateCard.querySelector('span').textContent = producto.precio
        templateCard.querySelector('img').setAttribute("src", producto.img)
        templateCard.querySelector('.btn').dataset.id = producto.id 
        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
    })
    cardshw.appendChild(fragment)

    datasw.forEach(producto => {
        templateCard.querySelector('h5').textContent = producto.nombre
        templateCard.querySelector('span').textContent = producto.precio
        templateCard.querySelector('img').setAttribute("src", producto.img)
        templateCard.querySelector('.btn').dataset.id = producto.id 
        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
    })
    cardssw.appendChild(fragment)
}


cardshw.addEventListener('click', e => {
    addCarrito(e)
})

cardssw.addEventListener('click', e => {
    addCarrito(e)
})

const fetchData = async () => {
    try {
        const hardware = await fetch('json/hardware.json')
        const software = await fetch('json/software.json')
        const datahw = await hardware.json()
        const datasw = await software.json()
        pintarCard(datahw, datasw)
    } catch (error) {
        console.log(error)
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchData()
})

const addCarrito = e => {
    if(e.target.classList.contains('btn')){
        setCarrito(e.target.parentElement)
    }
    e.stopPropagation()
}

const setCarrito = objeto => {
    const producto = {
        id: objeto.querySelector('.btn').dataset.id,
        nombre: objeto.querySelector('h5').textContent,
        precio: objeto.querySelector('span').textContent,
        cantidad: 1
    }

    if(carrito.hasOwnProperty(producto.id)) {
        producto.cantidad = carrito[producto.id].cantidad + 1
    }

    carrito[producto.id] = {...producto}
    localStorage.setItem('carrito', JSON.stringify(carrito))
}

function tienda() {
    var cklogin = localStorage.getItem("cklogin");

    if(cklogin != 1) {
        alert("Primerament t'has de registrar trampós!")
        window.location.href = "index.html";
    }
}

