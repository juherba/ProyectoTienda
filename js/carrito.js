
const items = document.getElementById('items')
const footer = document.getElementById('footer')
const templateFooter = document.getElementById('template_footer').content;
const templateCarrito = document.getElementById('template_carrito').content;
const fragment = document.createDocumentFragment()
var carrito

if(localStorage.getItem('carrito') == null){
    carrito = {}
} else {
    carrito = JSON.parse(localStorage.getItem('carrito'))
}

items.addEventListener('click', e => {
    btnAction(e)
})

function carritoLoad() {
    printarCarrito()
}

var printarCarrito = () => {
    items.innerHTML = ''
    Object.values(carrito).forEach(producto => {
        templateCarrito.querySelector('th').textContent = producto.id
        templateCarrito.querySelectorAll('td')[0].textContent = producto.nombre
        templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
        templateCarrito.querySelector('.btn_mas').dataset.id = producto.id
        templateCarrito.querySelector('.btn_menos').dataset.id = producto.id
        templateCarrito.querySelector('span').textContent = producto.cantidad * producto.precio
        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })
    items.appendChild(fragment)

    pintarFooter()
}

var pintarFooter= () => {
    footer.innerHTML = ''
    if (Object.keys(carrito).length === 0) {
        footer.innerHTML = `
        <th scope="row" colspan="5">Carrito vacío - comience a comprar!</th> 
        `
        return
    }

    const nCantidad = Object.values(carrito).reduce((acc, {cantidad}) => acc + cantidad, 0)
    const nPrecio = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio, 0)

    templateFooter.querySelectorAll('td')[0].textContent = nCantidad
    templateFooter.querySelector('span').textContent = nPrecio

    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone)
    footer.appendChild(fragment)

    const btnVaciar = document.getElementById('vaciar-carrito')
    btnVaciar.addEventListener('click', () => {
        carrito = {}
        localStorage.removeItem('carrito')
        printarCarrito()
    })
}

const btnAction = e => {
    if(e.target.classList.contains('btn_mas')) {
        carrito[e.target.dataset.id]
        const producto = carrito[e.target.dataset.id]
        producto.cantidad = carrito[e.target.dataset.id].cantidad + 1
        
        carrito[producto.id] = {...producto}
        localStorage.setItem('carrito', JSON.stringify(carrito))
        printarCarrito()
    } 

    if(e.target.classList.contains('btn_menos')) {
        carrito[e.target.dataset.id]
        const producto = carrito[e.target.dataset.id]
        producto.cantidad = carrito[e.target.dataset.id].cantidad - 1
        if(producto.cantidad === 0) {
            delete carrito[e.target.dataset.id]
        }
        localStorage.setItem('carrito', JSON.stringify(carrito))
        printarCarrito()
    } 
    e.stopPropagation()
}