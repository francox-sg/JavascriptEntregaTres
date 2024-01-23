/* Aca esta todo lo que afecta al Carrito */
JSON.parse(localStorage.getItem("carrito")) === null && localStorage.setItem("carrito",JSON.stringify([]))

import {productosDisponibles} from "../js/main.js";
export let carrito= JSON.parse(localStorage.getItem("carrito"));


/* Funciones */
export const comprarProducto = (idProducto)=>{
    //Tomo el Producto Elegido
    const producto = productosDisponibles.find((producto)=> producto.id ===idProducto);
    const {id, nombre, descripcion, precio, imagen} = producto;
    
    const productoCarrito = carrito.find((producto)=>producto.id ===idProducto)
    if (productoCarrito === undefined){
        
        //Pusheo y mando al Storage
        carrito.push({id:id, nombre:nombre, descripcion:descripcion, precio:precio, imagen:imagen, cantidad: 1,});
        sessionStorage.setItem("carrito", JSON.stringify(carrito));
        
    }else{

        //Modifico y mando al Storage
        let indice =carrito.findIndex((producto)=> producto.id ===idProducto);
        carrito[indice].cantidad++;
        carrito[indice].precio = precio*carrito[indice].cantidad;
        sessionStorage.setItem("carrito", JSON.stringify(carrito));
    }

    /* Actualizo la variable  Carrito */
    carrito = JSON.parse(sessionStorage.getItem("carrito")); 
    renderizarCarrito();
}




/* Boton Carrito */

const btnCarrito = document.getElementById("carrito");
const popUpCarrito = document.getElementById("popUpCarrito");
btnCarrito.addEventListener("click",()=>visualizarCarrito());

//visualizacion de PopUp
const visualizarCarrito = ()=>{
    if(popUpCarrito.style.display ==="none"){
        popUpCarrito.style.display ="block"
        renderizarCarrito();
    }else{
        popUpCarrito.style.display ="none"
    }
}

//Funcion Renderizado PopUp
export const renderizarCarrito = () =>{

    popUpCarrito.innerHTML =`<p id="cerrarPopUpCarrito" >X</p>`;
    carrito.forEach((producto) => {
        let {id , nombre , descripcion , imagen , precio, cantidad} = producto;
        
        let div = document.createElement("div");
        div.className = "cardPopUpCarrito"
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
                    <div>
                        <button id="sumarProducto${id}" >+</button>
                        <p> Cantidad: ${cantidad}</p>
                        <button id="restarProducto${id}" >-</button>
                    </div>
                </div>
        `;
        popUpCarrito.append(div);

        const btnSumarProducto = document.getElementById(`sumarProducto${id}`);
        const btnRestarProducto = document.getElementById(`restarProducto${id}`);
        btnSumarProducto.addEventListener("click", ()=> funcSumarProducto(id));
        btnRestarProducto.addEventListener("click", ()=> funcRestarProducto(id));
        
    }); 


    generarTotales();
}


const funcSumarProducto = (id)=>{
    const indice =  carrito.findIndex((producto)=> producto.id === id);
    const precio = carrito[indice].precio/carrito[indice].cantidad;
    carrito[indice].cantidad++;
    carrito[indice].precio= precio*carrito[indice].cantidad;

    //Actualizo Carrito y Renderizo
    sessionStorage.setItem("carrito", JSON.stringify(carrito));
    carrito = JSON.parse(sessionStorage.getItem("carrito"));
    renderizarCarrito();
}


const funcRestarProducto = (id)=>{
    let indice =  carrito.findIndex((producto)=> producto.id === id);

    if(carrito[indice].cantidad === 1){
        carrito.splice(indice,1);
    }else{
        const precio = carrito[indice].precio/carrito[indice].cantidad;
        carrito[indice].cantidad--;
        carrito[indice].precio= precio*carrito[indice].cantidad;
    }

        //Actualizo Carrito y Renderizo
    sessionStorage.setItem("carrito", JSON.stringify(carrito));
    carrito = JSON.parse(sessionStorage.getItem("carrito"));
    renderizarCarrito();
}

const generarTotales= () =>{
    let div = document.createElement("div");
    div.innerHTML="";

    if(carrito.length >0){
        
        const costoTotal =carrito.reduce((total, {precio} )=> total + precio, 0);
        const cantidadTotal =carrito.reduce((total, {cantidad} )=> total + cantidad, 0);
        div.className = "totales"
        div.innerHTML = `
                <p>Total: $ ${costoTotal}</p>
                <p> Cantidad: ${cantidadTotal}</p>
                
        `; 
        
    }else{
        div.innerHTML = "<p>No Hay productos en Carrito</p>"
    }
    popUpCarrito.append(div);
}