const btnLoguearse =document.getElementById("loguearse");
const btnRegistrarse =document.getElementById("registrarse");
const formLogin =document.getElementById("formLogin");
const formRegistrarse =document.getElementById("formRegistrarse");
const headerIngresar =document.getElementsByClassName("headerGrid-ingresar");

const mensajeLogin=document.getElementById("mensajeLogin"); 
const mensajeRegistro=document.getElementById("mensajeRegistro");

mensajeLogin.style.display= "none";
mensajeRegistro.style.display= "none";


let usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));;

let usuarios = JSON.parse(localStorage.getItem("usuarios"));

/* Ejecutar cada vez que se abre el documento */
document.addEventListener("DOMContentLoaded",()=>verificarUsuarioActivo());




class usuario{
    constructor(usuario,password){
        this.id = usuarios.length +1;
        this.user=usuario;
        this.pass=password;
        this.admin=false;
    }
}

btnLoguearse.addEventListener("click",(e)=>{
    e.preventDefault();
    const user = formLogin.children[1].children[1].value;
    const pass = formLogin.children[2].children[1].value;
    const usuarioExiste = usuarios.find((usuario)=>usuario.user ===user);

    if(usuarioExiste === undefined || usuarioExiste.pass != pass){
        //Error de Usuario o pass
        mensajeLogin.style.display= "block";

    }else{
            usuarioActivo = {
            user: usuarioExiste.user,
            pass: usuarioExiste.pass,
            admin: usuarioExiste.admin,
        }
        //Guardo el Usuario activo
        localStorage.setItem("usuarioActivo",JSON.stringify(usuarioActivo));

        verificarUsuarioActivo();
        location.href="./busqueda.html";
    }
    
});



btnRegistrarse.addEventListener("click",(e)=>{
    e.preventDefault();
    const nuevoUser = formRegistrarse.children[1].children[1].value;
    const nuevoPass = formRegistrarse.children[2].children[1].value;
    const usuarioExiste = usuarios.find((usuario)=>usuario.user ===nuevoUser);
    if(usuarioExiste === undefined){
        const nuevoUsuario = new usuario(nuevoUser , nuevoPass);
        usuarios.push(nuevoUsuario);
    
        localStorage.setItem("usuarios",JSON.stringify(usuarios));
        usuarios = JSON.parse(localStorage.getItem("usuarios"));
        mensajeRegistro.innerHTML= "Usuario Registrado";
        mensajeRegistro.style.color= "green";
        mensajeRegistro.style.display= "block";
    }else{
        //El usuario ya existe
        mensajeRegistro.innerHTML= "El Usuario ya existe";
        mensajeRegistro.style.color= "orange";
        mensajeRegistro.style.display= "block";
    }

});

const verificarUsuarioActivo = ()=>{
    
    console.log("verificacion de Usuario y avatar");
    if(usuarioActivo!= null){
        
        headerIngresar[0].innerHTML = `
        <a href="">${usuarioActivo.user}</a>
        <div>
            <img src="https://yca.org.ar/wp-content/uploads/sites/4/2019/06/perfil-avatar-hombre-icono-redondo_24640-14044.jpg" alt="Avatar">
        </div>
        <p id="logout">Logout</p>
    `;
    let logout = document.getElementById("logout");
    logout.addEventListener("click",()=>funcLogout())
    }
}


const funcLogout =()=>{
    console.log("logout");
    localStorage.removeItem("usuarioActivo");
    headerIngresar[0].innerHTML = `
    <a href="#">Ingresar</a>
    <div>
        <img src="../assets/img/login 56px.png" alt="Avatar">
    </div>
    `;
}