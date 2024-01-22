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
    carrito = JSON.parse(localStorage.getItem("carrito")); 
}