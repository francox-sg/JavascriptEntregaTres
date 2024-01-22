
/* Imports */
import { comprarProducto } from "../js/carrito.js";

/* Tomar Elementos DOM */
const busquedaContenedor = document.getElementById("busquedaContenedor");

/* Traigo productos del Local Storage */
export let productosDisponibles = JSON.parse(localStorage.getItem("productos"));
console.log(productosDisponibles);



/* Ejecutar cada vez que se abre el documento */
document.addEventListener("DOMContentLoaded",()=>{
    generarCardsProductos(productosDisponibles);
})


/* Funciones */

const generarCardsProductos = (productos) =>{

    busquedaContenedor.innerHTML = ``; // Borro el Contenedor

    productos.forEach((producto)=>{
        let {id , nombre , descripcion , imagen , precio} = producto;
        /* Creacion de Card */
        let div = document.createElement("div");
        div.className = "cardBusqueda"
        div.innerHTML = `
                <div class="cardBusquedaImg">
                    <img src="${imagen}" alt="">
                </div>
                <div class="cardBusquedaInfo">
                    <h2>${nombre}</h2>
                    <p>${descripcion}</p>
                </div>
                <div class="cardBusquedaPrecio">
                    <h3>$${precio}</h3>
                    <button>
                        <img id="agregarACarrito${id}" src="../assets/img/carritoNaranja56pxDer.png" alt="Imagen Carrito">
                    </button>
                </div>
        `;
        busquedaContenedor.append(div);

        /* Acciones DOM */
        const agregarACarrito = document.getElementById(`agregarACarrito${id}`);
        agregarACarrito.addEventListener("click", ()=>comprarProducto(id));
        


        
    })
}



/* Programa */

generarCardsProductos(productosDisponibles);