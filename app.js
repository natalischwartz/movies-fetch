//funcion para que cargue las peliculas

window.addEventListener("load", ()=>{
    cargarPeliculas();
})

//https://api.themoviedb.org/3/movie/popular?api_key=1cc738c63d5ee481b761b9be6d5af96b&language=es-MX&page=1 .el 1 tiene que ser un parametro dinamico


let pagina = 1; // variable para controlar la paginacion



//capturamos los botones
const btnAnterior = document.querySelector("#btnAnterior");
const btnSiguiente = document.querySelector("#btnSiguiente");

//funcion boton anterior

btnAnterior.addEventListener("click", () =>{
   if (pagina>1){
    //si es mayor a 1 podes presionar en anterior
    pagina -= 1 // es lo mismo que pagina = pagina -1
    //llamar a la funcion que carga las páginas
    cargarPeliculas();
   }
})

btnSiguiente.addEventListener("click",()=>{
    if(pagina<500){
        pagina += 1
    //llamar a la funcion que carga las páginas
    cargarPeliculas();
    }
}
)

//funcion que carga las peliculas

const cargarPeliculas = async () =>{
    // va a ser un pedido asincrono , voy a consultar una API
    //fetch: llamabamos a la pagina , se guardaba esa respuesta y esa respuesta se pasa a un json para poder utilizarla en una variable
    try {
        let respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=1cc738c63d5ee481b761b9be6d5af96b&language=es-MX&page=${pagina}`);
        console.log(respuesta); //response
        //si en la respuesta , que viaja toda la info , entre ellas el status
        //este pedido hay que guardarlo en un json

        if(respuesta.status===200){
            const datos = await respuesta.json()// guardame el json con la info 
            console.log(datos)

            let peliculas ="";

            //cada una de las peliculas que voy recorriendo ,lo estoy guardando en la variable pelicula.
            datos.results.forEach(pelicula => {
                peliculas += `<div class="pelicula">
                <img class="poster" src="https://image.tmdb.org/t/p/w500${pelicula.poster_path}">
                <h3 class="titulo">${pelicula.original_title}</h3>
                </div>`

            });

           document.querySelector("#contenedor").innerHTML = peliculas;


        }else if(respuesta.status === 404){
            console.log("lo buscado no esta disponible");

        }

        

        
    } catch (error) {
        console.log(error);
    }

    let titulo = document.querySelector("#titulo").innerHTML =`Pagina: ${pagina}` ;
}
