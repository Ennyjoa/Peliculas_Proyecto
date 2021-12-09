// Configurando controller con --> Express
const { query } = require('express');
const express = require('express');
const controladorPeliculas = express.Router(); // instancia de un enrutador que nos permite crear Rutas, que las convierte en metedos
const servicioPeliculas = require('./service'); //para incluir un módulo o archivo incorporado en JavaScript -> service.js
const rutaProtegida = require('../auth/jwt').validarToken;

//    1) GET -> Obtener todas las peliculas --> OK
//    2) GET -> Obtener una pelicula por el ID --> 
//    3) GET -> Buscar peliculas por el titulo
//    4) POST -> Crear peliculas
//    5) PUT -> Actualizar peliculas
//    6) DELETE -> Eliminar Peliculas
//---------------------------------------------------

//    1) GET -> Obtener todas las peliculas --> OK
controladorPeliculas.get("/obtenerPeliculas", rutaProtegida, async function(request, response){
    //Capturar los datos y enviarlos al servicio
    //response.send("Listado de películas.....");
    let peliculas = await servicioPeliculas.obtenerPeliculas();
    response.send({
        "mensaje": "Lista de Películas",
        "data": peliculas
    })
    
});

//    2) GET -> Obtener una pelicula por el ID --> Controlador para buscar una película por ID
controladorPeliculas.get("/obtenerPelicula/:id", rutaProtegida, async function(request, response){
    let id = request.params.id;  //params-> 
    let pelicula = await servicioPeliculas.obtenerPelicula(id); // el servicio que voy a llamar
    response.send({
        "mensaje": "Detalle de la película",
        "data": pelicula

    })
});

//    3) GET -> Buscar peliculas por el titulo
controladorPeliculas.get("/buscarPeliculasTitulo/:titulo", async function(request, response){
    let nombre = request.params.nombre; // parametros de la URL
    let peliculas = await servicioPeliculas.buscarPeliculasTitulo(nombre);
    response.send({
        "mensaje": "Resultado de busqueda",
        "busqueda": nombre,
        "datos": peliculas
    });
})

//    4) POST -> Crear una nueva pelicula, inserte una nueva película
controladorPeliculas.post("/crearPelicula", rutaProtegida,  async function (request, response){
    let pelicula = request.body; //capturamos el cuerpo
    let resultado = await servicioPeliculas.crearPelicula(pelicula);
    response.send(resultado);
    
    // que la pelicula no sea vacio
    // que la pelicula existe
    // revisar si mongo inserto la pelicula 

})

//   5) --> actualizar Película
// metodo PUT http -> actualizar
controladorPeliculas.put("/actualizarPelicula/:id", rutaProtegida, async function(request, response){
    let id = request.params.id;
    let nuevosDatos = request.body;

    //llamamos el metodo del servicio
    let resultado = await servicioPeliculas.actualizarPelicula(id, nuevosDatos);
    response.send(resultado);

}) 

// http://localhost:3300/api/peliculas/eliminarPelicula?id=xxx
// 6) --> eliminar Pelicula por ID
// metodo http -> DELETE -> eliminar
controladorPeliculas.delete("/eliminarPelicula", rutaProtegida, async function(request, response){
    let id = request.query.id;
    let resultado = await servicioPeliculas.eliminarPelicula(id);
    response.send(resultado);
})


module.exports = controladorPeliculas; 

